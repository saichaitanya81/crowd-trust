import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb, ListChecks, ArrowRight, Loader2, X } from 'lucide-react';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

export const AiAssistantDrawer = ({
  draftData = {},
  isOpen = false,
  onClose,
  onApplyCategory,
  onApplySummary,
}) => {
  const { error } = useToast();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunAnalysis = async () => {
    try {
      setLoading(true);
      const res = await api.post('/ai/analyze', {
        title: draftData.title || '',
        description: draftData.description || '',
        category: draftData.category || '',
        goalAmount: Number(draftData.goalAmount || 0),
        budget: draftData.budget || [],
      });
      if (res.success) {
        setAnalysis(res.data.analysis);
      }
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#2C1810]/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FBF7EF] w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-[#DCCBB5] animate-slide-left overflow-hidden text-[#3A2418]">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#DCCBB5] bg-gradient-to-r from-[#3A2418] to-[#4A3022] text-[#FFF8EE] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#C96F4A]/30 border border-[#C96F4A]/50 flex items-center justify-center text-[#E8B89D]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#FFF8EE]">CrowdTrust AI Assistant</h3>
              <p className="text-xs text-[#EADDCB]">Smart campaign clarity & trust auditor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#EADDCB] hover:text-[#FFF8EE] hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Analyze Trigger Bar */}
          <div className="p-4 rounded-2xl bg-[#F0DDC7] border border-[#DCCBB5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-[#7A452F] uppercase tracking-wide">
                Campaign Pre-Audit
              </h4>
              <p className="text-xs text-[#6B5140] mt-0.5">
                Evaluates description clarity, missing details, and budget consistency.
              </p>
            </div>
            <button
              onClick={handleRunAnalysis}
              disabled={loading}
              className="btn-primary text-xs py-2 px-3.5 whitespace-nowrap shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Analyzing Draft...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  {analysis ? 'Re-Analyze Draft' : 'Run AI Analysis'}
                </>
              )}
            </button>
          </div>

          {/* Analysis Results View */}
          {analysis ? (
            <div className="space-y-6 animate-fade-in">
              {/* Clarity Score Card */}
              <div className="p-5 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#8A7463] uppercase tracking-wider">
                    Clarity & Trust Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-[#3A2418]">
                      {analysis.clarityScore || 75}
                    </span>
                    <span className="text-xs font-bold text-[#8A7463]">/ 100</span>
                  </div>
                  <p className="text-[11px] text-[#6B5140] mt-1">
                    {analysis.clarityScore >= 80
                      ? 'High trust signals detected. Ready for submission.'
                      : 'Good baseline. Follow the recommendations below to improve donor trust.'}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#E8F0DF] text-[#3D5A2B] border border-[#C8DCAE] flex items-center justify-center font-bold text-lg">
                  {analysis.riskLevel === 'Low Risk' ? 'A+' : 'B'}
                </div>
              </div>

              {/* Suggested Category */}
              {analysis.suggestedCategory && (
                <div className="p-4 rounded-2xl bg-[#F1E7D6] border border-[#DCCBB5] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#8A7463] uppercase tracking-wider">
                      Recommended Category
                    </span>
                    <p className="text-sm font-bold text-[#3A2418] mt-0.5">
                      {analysis.suggestedCategory}
                    </p>
                  </div>
                  {onApplyCategory && (
                    <button
                      type="button"
                      onClick={() => onApplyCategory(analysis.suggestedCategory)}
                      className="text-xs text-[#C96F4A] hover:text-[#B85D3B] font-bold bg-[#FBF7EF] px-3 py-1.5 rounded-xl border border-[#DCCBB5] hover:border-[#C96F4A] transition"
                    >
                      Apply Category
                    </button>
                  )}
                </div>
              )}

              {/* AI Generated Summary */}
              {analysis.summary && (
                <div className="p-4 rounded-2xl bg-[#F1E7D6] border border-[#DCCBB5] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#8A7463] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
                      Generated Elevator Summary
                    </span>
                    {onApplySummary && (
                      <button
                        type="button"
                        onClick={() => onApplySummary(analysis.summary)}
                        className="text-xs text-[#C96F4A] hover:text-[#B85D3B] font-bold bg-[#FBF7EF] px-2.5 py-1 rounded-lg border border-[#DCCBB5] hover:border-[#C96F4A] transition"
                      >
                        Use as Summary
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-[#6B5140] italic leading-relaxed">
                    "{analysis.summary}"
                  </p>
                </div>
              )}

              {/* Missing Information */}
              {analysis.missingInformation && analysis.missingInformation.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#3A2418] uppercase tracking-wider flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4 text-[#D97706]" />
                    Missing Information Checklist
                  </h4>
                  <div className="space-y-2">
                    {analysis.missingInformation.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2"
                      >
                        <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#3A2418] uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-[#C96F4A]" />
                    Actionable Improvement Tips
                  </h4>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((tip, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-xl bg-[#F1E7D6] border border-[#DCCBB5] text-xs text-[#6B5140] leading-relaxed flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#4A6B3A] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Structure */}
              {analysis.suggestedStructure && analysis.suggestedStructure.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#3A2418] uppercase tracking-wider">
                    Recommended Story Outline
                  </h4>
                  <div className="p-4 rounded-2xl bg-[#F1E7D6] border border-[#DCCBB5] space-y-2 text-xs text-[#6B5140]">
                    {analysis.suggestedStructure.map((step, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-[#8A7463] space-y-3">
              <Sparkles className="w-12 h-12 mx-auto text-[#D6BFA0] stroke-1" />
              <p className="text-sm font-semibold text-[#3A2418]">
                Click "Run AI Analysis" to audit your campaign draft.
              </p>
              <p className="text-xs text-[#8A7463] max-w-xs mx-auto">
                Get instant suggestions on story clarity, itemized budget transparency, and compliance tips before submitting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiAssistantDrawer;
