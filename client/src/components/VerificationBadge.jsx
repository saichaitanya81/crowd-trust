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
        className={`inline-flex items-center rounded-full font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-xs shadow-emerald-500/20 backdrop-blur-md ${sizeClasses[size]}`}
      >
        <ShieldCheck className={`${iconSizes[size]} text-emerald-400 shrink-0`} />
        {showText && <span>Verified Trust</span>}
      </span>
    );
  }

  if (isPending) {
    return (
      <span
        title="Verification review in progress"
        className={`inline-flex items-center rounded-full font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-xs shadow-amber-500/20 backdrop-blur-md ${sizeClasses[size]}`}
      >
        <Clock className={`${iconSizes[size]} text-amber-400 shrink-0`} />
        {showText && <span>Verification Pending</span>}
      </span>
    );
  }

  return (
    <span
      title="Unverified Campaign"
      className={`inline-flex items-center rounded-full font-medium bg-slate-900/80 text-slate-400 border border-slate-700/60 backdrop-blur-md ${sizeClasses[size]}`}
    >
      <ShieldAlert className={`${iconSizes[size]} text-slate-500 shrink-0`} />
      {showText && <span>Unverified</span>}
    </span>
  );
};

export default VerificationBadge;
