import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import './LogoLoop.css';

export const LogoLoop = ({
  logos = [],
  speed = 70,
  direction = 'left',
  logoHeight = 36,
  gap = 48,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor,
  ariaLabel = 'Partner organizations and trusted brands',
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);
  const sequenceRef = useRef(null);
  const trackRef = useRef(null);

  const [containerSize, setContainerSize] = useState(0);
  const [sequenceSize, setSequenceSize] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isHorizontal = direction === 'left' || direction === 'right';
  const isReverse = direction === 'right' || direction === 'down';

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Image loading checker
  useEffect(() => {
    if (!logos || logos.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const imageLogos = logos.filter((item) => item.src);
    if (imageLogos.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageLogos.length;

    const onImageLoad = () => {
      loadedCount += 1;
      if (loadedCount >= totalImages) {
        setImagesLoaded(true);
      }
    };

    imageLogos.forEach((item) => {
      const img = new Image();
      img.src = item.src;
      if (img.complete) {
        onImageLoad();
      } else {
        img.onload = onImageLoad;
        img.onerror = onImageLoad;
      }
    });
  }, [logos]);

  // Measure container and sequence sizes
  const updateSizes = useCallback(() => {
    if (!containerRef.current || !sequenceRef.current) return;

    const cSize = isHorizontal
      ? containerRef.current.clientWidth
      : containerRef.current.clientHeight;

    const sSize = isHorizontal
      ? sequenceRef.current.offsetWidth
      : sequenceRef.current.offsetHeight;

    setContainerSize(cSize);
    setSequenceSize(sSize);
  }, [isHorizontal]);

  useEffect(() => {
    updateSizes();
    const handleResize = () => updateSizes();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => updateSizes());
    if (containerRef.current) observer.observe(containerRef.current);
    if (sequenceRef.current) observer.observe(sequenceRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [updateSizes, imagesLoaded]);

  // Calculate number of copies needed to seamlessly fill container + loop buffer
  const copyCount = useMemo(() => {
    if (!containerSize || !sequenceSize) return 2;
    return Math.max(2, Math.ceil((containerSize * 2) / sequenceSize) + 1);
  }, [containerSize, sequenceSize]);

  // Continuous animation loop using requestAnimationFrame
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(null);
  const currentSpeedRef = useRef(speed);

  useEffect(() => {
    if (prefersReducedMotion || !sequenceSize) return;

    let animId;

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Smoothly transition between normal speed and hoverSpeed
      const targetSpeed = isHovered ? hoverSpeed : speed;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * Math.min(deltaTime * 8, 1);

      const distance = currentSpeedRef.current * deltaTime;

      if (isReverse) {
        offsetRef.current = (offsetRef.current + distance) % sequenceSize;
      } else {
        offsetRef.current = (offsetRef.current - distance) % sequenceSize;
        if (offsetRef.current < -sequenceSize) {
          offsetRef.current += sequenceSize;
        }
      }

      if (trackRef.current) {
        if (isHorizontal) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        } else {
          trackRef.current.style.transform = `translate3d(0, ${offsetRef.current}px, 0)`;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [speed, hoverSpeed, isHovered, sequenceSize, isHorizontal, isReverse, prefersReducedMotion]);

  const renderItem = (logo, key) => {
    const isImage = !!logo.src;
    const content = isImage ? (
      <img
        src={logo.src}
        alt={logo.alt || ''}
        className="logoloop__img"
        style={{ height: `${logoHeight}px` }}
        loading="lazy"
      />
    ) : (
      logo.node || null
    );

    return (
      <div
        key={key}
        className="logoloop__item"
        style={{
          marginRight: isHorizontal ? `${gap}px` : 0,
          marginBottom: !isHorizontal ? `${gap}px` : 0,
        }}
      >
        {logo.href ? (
          <a
            href={logo.href}
            target="_blank"
            rel="noreferrer"
            className="logoloop__link"
            title={logo.title || logo.alt}
            aria-label={logo.ariaLabel || logo.alt || logo.title}
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    );
  };

  const customStyles = {
    ...style,
    ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
  };

  const fadeClass = fadeOut
    ? isHorizontal
      ? 'logoloop--fade-horizontal'
      : 'logoloop--fade-vertical'
    : '';

  const orientationClass = isHorizontal ? 'logoloop--horizontal' : 'logoloop--vertical';
  const scaleClass = scaleOnHover ? 'logoloop--scale-hover' : '';

  return (
    <div
      ref={containerRef}
      className={`logoloop ${orientationClass} ${fadeClass} ${scaleClass} ${className}`}
      style={customStyles}
      role="region"
      aria-label={ariaLabel}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div ref={trackRef} className="logoloop__track">
        {/* Measured template sequence */}
        <div ref={sequenceRef} className="logoloop__track">
          {logos.map((logo, idx) => renderItem(logo, `seq-0-${idx}`))}
        </div>

        {/* Cloned sequences for seamless continuous looping */}
        {Array.from({ length: copyCount - 1 }).map((_, copyIdx) => (
          <div key={`copy-${copyIdx}`} className="logoloop__track" aria-hidden="true">
            {logos.map((logo, idx) => renderItem(logo, `seq-${copyIdx + 1}-${idx}`))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
