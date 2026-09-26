import React from 'react';

export const ProgressBar = ({
  percentage = 0,
  height = 'h-2.5',
  showLabel = false,
  color = 'terracotta',
  animated = true,
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage)));

  const colorVariants = {
    terracotta: 'bg-gradient-to-r from-[#C96F4A] to-[#E8B89D]',
    emerald: 'bg-gradient-to-r from-[#C96F4A] to-[#D9825E]',
    trust: 'bg-gradient-to-r from-[#C96F4A] to-[#B85D3B]',
    brand: 'bg-gradient-to-r from-[#C96F4A] to-[#E8B89D]',
    amber: 'bg-gradient-to-r from-[#D97706] to-[#F59E0B]',
    cyan: 'bg-gradient-to-r from-[#C96F4A] to-[#E8B89D]',
  };

  const selectedColor = colorVariants[color] || colorVariants.terracotta;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-bold text-[#6B5140] mb-1.5">
          <span>Funded Progress</span>
          <span className="text-[#C96F4A] font-extrabold">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-[#EFE5D3] rounded-full overflow-hidden ${height} border border-[#DCCBB5]`}>
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
