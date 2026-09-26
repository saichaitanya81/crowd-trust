import React from 'react';
import { ShieldCheck, ShieldAlert, Clock } from 'lucide-react';

export const VerificationBadge = ({ status = 'verified', size = 'md', showText = true }) => {
  const isVerified = status === 'verified';
  const isPending = status === 'pending';

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5',
  };

  if (isVerified) {
    return (
      <span
        title="Identity & Campaign Verification Approved"
        className={`inline-flex items-center rounded-full font-bold bg-[#F0DDC7] text-[#7A452F] border border-[#DCCBB5] shadow-xs backdrop-blur-md ${sizeClasses[size]}`}
      >
        <ShieldCheck className={`${iconSizes[size]} text-[#C96F4A] shrink-0`} />
        {showText && <span>Verified Trust</span>}
      </span>
    );
  }

  if (isPending) {
    return (
      <span
        title="Verification review in progress"
        className={`inline-flex items-center rounded-full font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] shadow-xs backdrop-blur-md ${sizeClasses[size]}`}
      >
        <Clock className={`${iconSizes[size]} text-[#D97706] shrink-0`} />
        {showText && <span>Verification Pending</span>}
      </span>
    );
  }

  return (
    <span
      title="Unverified Campaign"
      className={`inline-flex items-center rounded-full font-medium bg-[#F1E7D6] text-[#8A7463] border border-[#DCCBB5] backdrop-blur-md ${sizeClasses[size]}`}
    >
      <ShieldAlert className={`${iconSizes[size]} text-[#8A7463] shrink-0`} />
      {showText && <span>Unverified</span>}
    </span>
  );
};

export default VerificationBadge;
