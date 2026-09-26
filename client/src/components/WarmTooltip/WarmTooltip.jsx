import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useId,
  useEffect
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './WarmTooltip.css';

const WarmTooltipContext = createContext({
  delay: 300,
  warmWindow: 300,
  travel: 320,
  lean: 0,
  isGroupWarm: false,
  setGroupWarm: () => {},
  notifyOpen: () => {},
  notifyClose: () => {}
});

export const WarmTooltipGroup = ({
  delay = 300,
  warmWindow = 300,
  travel = 320,
  lean = 0,
  children
}) => {
  const [isGroupWarm, setIsGroupWarm] = useState(false);
  const warmTimerRef = useRef(null);

  const notifyOpen = useCallback(() => {
    if (warmTimerRef.current) {
      clearTimeout(warmTimerRef.current);
      warmTimerRef.current = null;
    }
    setIsGroupWarm(true);
  }, []);

  const notifyClose = useCallback(() => {
    if (warmTimerRef.current) {
      clearTimeout(warmTimerRef.current);
    }
    warmTimerRef.current = setTimeout(() => {
      setIsGroupWarm(false);
      warmTimerRef.current = null;
    }, warmWindow);
  }, [warmWindow]);

  useEffect(() => {
    return () => {
      if (warmTimerRef.current) {
        clearTimeout(warmTimerRef.current);
      }
    };
  }, []);

  return (
    <WarmTooltipContext.Provider
      value={{
        delay,
        warmWindow,
        travel,
        lean,
        isGroupWarm,
        notifyOpen,
        notifyClose
      }}
    >
      {children}
    </WarmTooltipContext.Provider>
  );
};

export const WarmTooltip = ({
  content,
  side = 'top',
  surfaceColor = '#E8D5B7',
  inkColor = '#3A2418',
  size = 'md',
  radius = 8,
  gap = 8,
  arrow = true,
  popDuration = 160,
  popScale = 0.94,
  popBlur = 4,
  showFuse = false,
  className = '',
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const tooltipId = useId();
  const groupContext = useContext(WarmTooltipContext);

  const handleOpen = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const effectiveDelay = groupContext.isGroupWarm ? 0 : (groupContext.delay ?? 300);

    if (effectiveDelay === 0) {
      setIsOpen(true);
      groupContext.notifyOpen?.();
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(true);
        groupContext.notifyOpen?.();
      }, effectiveDelay);
    }
  }, [groupContext]);

  const handleClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
    groupContext.notifyClose?.();
  }, [groupContext]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Compute offset positioning
  const getOffsetStyle = () => {
    switch (side) {
      case 'top':
        return { marginBottom: `${gap}px`, transform: 'translateX(-50%)' };
      case 'bottom':
        return { marginTop: `${gap}px`, transform: 'translateX(-50%)' };
      case 'left':
        return { marginRight: `${gap}px`, transform: 'translateY(-50%)' };
      case 'right':
        return { marginLeft: `${gap}px`, transform: 'translateY(-50%)' };
      default:
        return { marginBottom: `${gap}px`, transform: 'translateX(-50%)' };
    }
  };

  const getMotionOffsets = () => {
    switch (side) {
      case 'top':
        return { initialY: 6, animateY: 0, exitY: 4 };
      case 'bottom':
        return { initialY: -6, animateY: 0, exitY: -4 };
      case 'left':
        return { initialX: 6, animateX: 0, exitX: 4 };
      case 'right':
        return { initialX: -6, animateX: 0, exitX: -4 };
      default:
        return { initialY: 6, animateY: 0, exitY: 4 };
    }
  };

  const offsets = getMotionOffsets();

  return (
    <div
      className={`warm-tooltip-wrapper ${className}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
      onTouchStart={handleOpen}
      onTouchEnd={handleClose}
    >
      {children}

      <AnimatePresence>
        {isOpen && content && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{
              opacity: 0,
              scale: popScale,
              filter: `blur(${popBlur}px)`,
              x: side === 'top' || side === 'bottom' ? '-50%' : offsets.initialX || 0,
              y: side === 'left' || side === 'right' ? '-50%' : offsets.initialY || 0
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              x: side === 'top' || side === 'bottom' ? '-50%' : offsets.animateX || 0,
              y: side === 'left' || side === 'right' ? '-50%' : offsets.animateY || 0
            }}
            exit={{
              opacity: 0,
              scale: popScale,
              filter: `blur(${popBlur}px)`,
              x: side === 'top' || side === 'bottom' ? '-50%' : offsets.exitX || 0,
              y: side === 'left' || side === 'right' ? '-50%' : offsets.exitY || 0
            }}
            transition={{
              duration: popDuration / 1000,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{
              backgroundColor: surfaceColor,
              color: inkColor,
              borderRadius: `${radius}px`,
              ...getOffsetStyle()
            }}
            className={`warm-tooltip-bubble warm-tooltip-size-${size} warm-tooltip-side-${side}`}
          >
            {content}
            {arrow && <div className="warm-tooltip-arrow" style={{ backgroundColor: surfaceColor }} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WarmTooltip;
