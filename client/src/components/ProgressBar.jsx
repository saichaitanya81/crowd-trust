import React from 'react';

export const ProgressBar = ({
  percentage = 0,
  height = 'h-2.5',
  showLabel = false,
  color = 'emerald',
  animated = true,
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage)));

  const colorVariants = {
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50',
    trust: 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-sm shadow-cyan-500/50',
    brand: 'bg-gradient-to-r from-teal-500 to-emerald-400',
    amber: 'bg-gradient-to-r from-amber-500 to-orange-400 shadow-sm shadow-orange-500/50',
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-400',
  };

  const selectedColor = colorVariants[color] || colorVariants.emerald;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1.5">
          <span>Funded Progress</span>
          <span className="text-emerald-400 font-bold">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-950 rounded-full overflow-hidden ${height} border border-slate-800`}>
        <div
          className={`${height} rounded-full ${selectedColor} ${
            animated ? 'transition-all duration-700 ease-out' : ''
          }`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
