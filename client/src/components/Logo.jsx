import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({
  size = 'md',
  showText = true,
  showTagline = true,
  to = '/',
  className = '',
  imageOnly = false,
  variant = 'light',
}) => {
  const sizeStyles = {
    sm: {
      img: 'w-8 h-8 rounded-lg',
      title: 'text-base sm:text-lg',
      tagline: 'text-[9px]',
    },
    md: {
      img: 'w-10 h-10 rounded-xl',
      title: 'text-xl tracking-tight',
      tagline: 'text-[10px]',
    },
    lg: {
      img: 'w-12 h-12 rounded-xl',
      title: 'text-2xl sm:text-3xl tracking-tight',
      tagline: 'text-xs',
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;
  const isDark = variant === 'dark';

  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <img
        src="/images/crowdtrust-logo.png"
        alt="CrowdTrust - Verified and Transparent Crowdfunding"
        className={`${currentSize.img} object-contain shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0`}
        loading="eager"
      />
      {showText && !imageOnly && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold flex items-center gap-0.5 ${currentSize.title} ${isDark ? 'text-[#FFF8EE]' : 'text-[#3A2418]'}`}>
            Crowd<span className="text-[#C96F4A]">Trust</span>
          </span>
          {showTagline && (
            <span className={`font-semibold tracking-wide uppercase ${currentSize.tagline} ${isDark ? 'text-[#CBB4A0]' : 'text-[#6B5140]'}`}>
              Verified • Transparent
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C96F4A] rounded-xl inline-block"
        aria-label="CrowdTrust - Verified and Transparent Crowdfunding"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
