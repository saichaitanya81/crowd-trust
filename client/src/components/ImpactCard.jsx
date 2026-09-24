import React from 'react';
import { Target, Award, Sparkles, TrendingUp } from 'lucide-react';

export const ImpactCard = ({ impacts = [] }) => {
  if (!impacts || impacts.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 text-xs bg-slate-50 rounded-xl">
        No measurable impact metrics published yet for this project.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {impacts.map((imp, idx) => (
        <div
          key={imp._id || idx}
          className="p-5 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
            <Target className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">
              {Number(imp.metricValue).toLocaleString()}
            </span>
            {imp.unit && <span className="text-xs font-bold text-slate-500">{imp.unit}</span>}
          </div>
          <h4 className="text-sm font-bold text-slate-800 mt-1">{imp.metricName}</h4>
          {imp.description && (
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{imp.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};
