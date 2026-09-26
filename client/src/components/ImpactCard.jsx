import React from 'react';
import { Target, Award, Sparkles, TrendingUp } from 'lucide-react';

export const ImpactCard = ({ impacts = [] }) => {
  if (!impacts || impacts.length === 0) {
    return (
      <div className="p-6 text-center text-[#8A7463] text-xs bg-[#F1E7D6] rounded-2xl border border-[#DCCBB5]">
        No measurable impact metrics published yet for this project.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {impacts.map((imp, idx) => (
        <div
          key={imp._id || idx}
          className="p-5 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-sm hover:shadow-warm transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F0DDC7] text-[#C96F4A] flex items-center justify-center mb-3">
            <Target className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-[#3A2418]">
              {Number(imp.metricValue).toLocaleString()}
            </span>
            {imp.unit && <span className="text-xs font-bold text-[#8A7463]">{imp.unit}</span>}
          </div>
          <h4 className="text-sm font-bold text-[#3A2418] mt-1">{imp.metricName}</h4>
          {imp.description && (
            <p className="text-xs text-[#6B5140] mt-1 leading-relaxed">{imp.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImpactCard;
