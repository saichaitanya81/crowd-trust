import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export const PillNav = ({
  logo,
  logoAlt = 'Logo',
  logoHref = '/',
  items = [],
  activeHref,
  ease = 'power3.easeOut',
  baseColor = '#E8D5B7',
  pillColor = '#F7F0E3',
  hoveredPillTextColor = '#FFF8EE',
  pillTextColor = '#3A2418',
  accentColor = '#C96F4A',
  children,
  className = '',
}) => {
  const location = useLocation();
  const currentPath = activeHref || location.pathname;
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const itemRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activeIndex = items.findIndex((item) => item.href === currentPath);

  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
    const activeEl = itemRefs.current[targetIndex];
    const pill = pillRef.current;

    if (activeEl && pill) {
      const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = activeEl;
      gsap.to(pill, {
        x: offsetLeft,
        y: offsetTop,
        width: offsetWidth,
        height: offsetHeight,
        opacity: 1,
        backgroundColor: hoveredIndex !== null || targetIndex === activeIndex ? accentColor : pillColor,
        duration: 0.35,
        ease: ease,
      });
    } else if (pill && hoveredIndex === null && activeIndex === -1) {
      gsap.to(pill, {
        opacity: 0,
        duration: 0.2,
      });
    }
  }, [hoveredIndex, activeIndex, currentPath, accentColor, pillColor, ease]);

  return (
    <nav
      ref={navRef}
      className={`relative inline-flex items-center p-1.5 rounded-full border border-[#DCCBB5] shadow-xs ${className}`}
      style={{ backgroundColor: baseColor }}
    >
      {/* Animated Floating Pill Background */}
      <div
        ref={pillRef}
        className="absolute top-0 left-0 rounded-full pointer-events-none opacity-0 shadow-xs z-0"
        style={{
          backgroundColor: pillColor,
        }}
      />

      {/* Nav Items */}
      <div className="relative z-10 flex items-center gap-1">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isHovered = index === hoveredIndex;
          const isHighlighted = isHovered || (hoveredIndex === null && isActive);

          return (
            <Link
              key={item.href || index}
              ref={(el) => (itemRefs.current[index] = el)}
              to={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-xs font-bold rounded-full transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap outline-none select-none"
              style={{
                color: isHighlighted ? hoveredPillTextColor : pillTextColor,
              }}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {children && <div className="relative z-10 ml-2">{children}</div>}
    </nav>
  );
};

export default PillNav;
