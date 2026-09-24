import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';

let aiClient = null;
if (env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  } catch (err) {
    console.warn('[AI Service] Failed to initialize GoogleGenAI client:', err.message);
  }
}

/**
 * Fallback heuristic analysis engine
 */
const runHeuristicAnalysis = ({ title = '', description = '', category = '', goalAmount = 0, budget = [] }) => {
  const missingInfo = [];
  const suggestions = [];
  const riskFlags = [];

  const text = `${title} ${description}`.toLowerCase();

  // Check title
  if (title.length < 15) {
    suggestions.push('Consider a more descriptive campaign title that clearly communicates the core purpose.');
  }

  // Check description length
  if (description.length < 150) {
    missingInfo.push('The description is quite brief. Add more context about background and urgency.');
  }

  // Beneficiary check
  const beneficiaryKeywords = ['for', 'children', 'students', 'community', 'family', 'hospital', 'patients', 'village', 'animals', 'shelter'];
  const hasBeneficiary = beneficiaryKeywords.some((w) => text.includes(w));
  if (!hasBeneficiary) {
    missingInfo.push('Explicit beneficiary details: clearly state who will directly benefit from this funding.');
  }

  // Objective check
  const objectiveKeywords = ['aim', 'goal', 'objective', 'plan to', 'will provide', 'will build', 'purchase', 'deliver'];
  const hasObjective = objectiveKeywords.some((w) => text.includes(w));
  if (!hasObjective) {
    suggestions.push('Clarify your primary objectives and milestones so donors know exactly how funds will be deployed.');
  }

  // Budget explanation check
  if (!budget || budget.length === 0) {
    missingInfo.push('Line-item budget breakdown is missing. Transparent campaigns with budgets attract 4x more donations.');
    riskFlags.push('No itemized budget provided for requested target amount.');
  } else {
    const budgetSum = budget.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    if (goalAmount > 0 && Math.abs(budgetSum - goalAmount) > goalAmount * 0.1) {
      riskFlags.push(`Budget items total (₹${budgetSum.toLocaleString()}) does not match the target goal (₹${goalAmount.toLocaleString()}).`);
    }
  }

  // Suggested category
  let suggestedCategory = category || 'Community';
  if (text.includes('school') || text.includes('student') || text.includes('study') || text.includes('education') || text.includes('books')) {
    suggestedCategory = 'Education';
  } else if (text.includes('surgery') || text.includes('cancer') || text.includes('hospital') || text.includes('medical') || text.includes('treatment')) {
    suggestedCategory = 'Medical';
  } else if (text.includes('disaster') || text.includes('flood') || text.includes('earthquake') || text.includes('relief') || text.includes('emergency')) {
    suggestedCategory = 'Emergency';
  } else if (text.includes('tree') || text.includes('solar') || text.includes('climate') || text.includes('plastic') || text.includes('river')) {
    suggestedCategory = 'Environment';
  } else if (text.includes('app') || text.includes('software') || text.includes('open source') || text.includes('ai') || text.includes('hardware')) {
    suggestedCategory = 'Technology';
  } else if (text.includes('film') || text.includes('art') || text.includes('music') || text.includes('book') || text.includes('album')) {
    suggestedCategory = 'Creative Projects';
  } else if (text.includes('business') || text.includes('startup') || text.includes('prototype') || text.includes('founder')) {
    suggestedCategory = 'Startup';
  }

  // Suggested structure
  const suggestedStructure = [
    '1. The Problem / Urgent Need: Introduce the context and why immediate support is required.',
    '2. The Solution: Step-by-step roadmap of how the campaign will address the need.',
    '3. Budget Allocation: Itemized cost breakdown demonstrating financial transparency.',
    '4. Team & Verification: Background of the organizer and direct beneficiaries.',
    '5. Impact Milestones: Measurable outcomes donors can track upon completion.',
  ];

  // Concise summary
  const summary = description.length > 50
    ? description.slice(0, 160).trim() + '...'
    : `${title} seeks to raise funds for ${suggestedCategory.toLowerCase()} initiatives, empowering transparent execution through CrowdTrust milestones.`;

  return {
    source: 'heuristic',
    suggestedCategory,
    summary,
    missingInformation: missingInfo.length > 0 ? missingInfo : ['Ensure regular weekly milestone updates are planned.'],
    clarityScore: Math.max(60, Math.min(95, 70 + (description.length > 300 ? 15 : 0) + (budget.length > 0 ? 10 : 0))),
    suggestions: suggestions.length > 0 ? suggestions : ['Add high-resolution photos of the project site to boost donor confidence.'],
    suggestedStructure,
    riskIndicators: riskFlags,
    riskLevel: riskFlags.length > 0 ? 'Review Needed' : 'Low Risk',
  };
};

export const analyzeCampaign = async ({ title, description, category, goalAmount, budget = [] }) => {
  // If Gemini API is available, try generating through model
  if (aiClient) {
    try {
      const prompt = `You are the CrowdTrust AI Campaign Assistant. Analyze this crowdfunding campaign draft for transparency, completeness, and donor trust:
Title: ${title}
Category: ${category}
Goal Amount: ${goalAmount}
Budget Items: ${JSON.stringify(budget)}
Description: ${description}

Return a valid JSON object with the following schema:
{
  "suggestedCategory": string,
  "summary": string (concise 1-2 sentences),
  "missingInformation": string[],
  "clarityScore": number (0-100),
  "suggestions": string[],
  "suggestedStructure": string[],
  "riskIndicators": string[],
  "riskLevel": "Low Risk" | "Review Needed" | "Elevated Risk"
}
Do not include markdown fences, return only pure JSON.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
      });

      const text = response.text ? response.text.trim() : '';
      const cleanJson = text.replace(/^```json/, '').replace(/```$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      return { source: 'gemini', ...parsed };
    } catch (err) {
      console.warn('[AI Service] Gemini API call failed or timed out, using heuristic analyzer:', err.message);
    }
  }

  // Fallback to robust heuristic analysis
  return runHeuristicAnalysis({ title, description, category, goalAmount, budget });
};

export const checkSimilarity = async (newTitle, newDescription, existingCampaigns = []) => {
  const newKeywords = new Set(
    `${newTitle} ${newDescription}`
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 4)
  );

  const similarities = [];

  for (const camp of existingCampaigns) {
    const campKeywords = `${camp.title} ${camp.shortDescription || ''}`
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 4);

    if (campKeywords.length === 0) continue;

    let matchCount = 0;
    for (const w of campKeywords) {
      if (newKeywords.has(w)) matchCount++;
    }

    const similarityRatio = Math.round((matchCount / Math.max(campKeywords.length, newKeywords.size)) * 100);

    if (similarityRatio >= 40) {
      similarities.push({
        campaignId: camp._id,
        title: camp.title,
        similarityPercentage: similarityRatio,
        reason: 'Significant overlap in description phrasing and keywords.',
      });
    }
  }

  return similarities;
};
