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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 animate-slide-left overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200/80 bg-gradient-to-r from-brand-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500/30 border border-brand-400/40 flex items-center justify-center text-brand-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">CrowdTrust AI Assistant</h3>
              <p className="text-xs text-slate-300">Smart campaign clarity & trust auditor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Analyze Trigger Bar */}
          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-brand-950 uppercase tracking-wide">
                Campaign Pre-Audit
              </h4>
              <p className="text-xs text-brand-800/80 mt-0.5">
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
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Clarity & Trust Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-slate-900">
                      {analysis.clarityScore || 75}
                    </span>
                    <span className="text-xs font-bold text-slate-400">/ 100</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {analysis.clarityScore >= 80
                      ? 'High trust signals detected. Ready for submission.'
                      : 'Good baseline. Follow the recommendations below to improve donor trust.'}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-lg">
                  {analysis.riskLevel === 'Low Risk' ? 'A+' : 'B'}
                </div>
              </div>

              {/* Suggested Category */}
              {analysis.suggestedCategory && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Recommended Category
                    </span>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {analysis.suggestedCategory}
                    </p>
                  </div>
                  {onApplyCategory && (
                    <button
                      type="button"
                      onClick={() => onApplyCategory(analysis.suggestedCategory)}
                      className="text-xs text-brand-600 hover:text-brand-800 font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200 hover:border-brand-300 transition"
                    >
                      Apply Category
                    </button>
                  )}
                </div>
              )}

              {/* AI Generated Summary */}
              {analysis.summary && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                      Generated Elevator Summary
                    </span>
                    {onApplySummary && (
                      <button
                        type="button"
                        onClick={() => onApplySummary(analysis.summary)}
                        className="text-xs text-brand-600 hover:text-brand-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:border-brand-300 transition"
                      >
                        Use as Summary
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{analysis.summary}"
                  </p>
                </div>
              )}

              {/* Missing Information */}
              {analysis.missingInformation && analysis.missingInformation.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4 text-amber-600" />
                    Missing Information Checklist
                  </h4>
                  <div className="space-y-2">
                    {analysis.missingInformation.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-brand-600" />
                    Actionable Improvement Tips
                  </h4>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((tip, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Structure */}
              {analysis.suggestedStructure && analysis.suggestedStructure.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Recommended Story Outline
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
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
            <div className="text-center py-12 text-slate-400 space-y-3">
              <Sparkles className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
              <p className="text-sm font-medium text-slate-600">
                Click "Run AI Analysis" to audit your campaign draft.
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Get instant suggestions on story clarity, itemized budget transparency, and compliance tips before submitting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
