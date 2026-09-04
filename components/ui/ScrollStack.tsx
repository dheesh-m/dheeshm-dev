"use client";

import React, { useLayoutEffect, useEffect, useRef, useCallback, CSSProperties, ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  onClick,
  style
}) => (
  <div
    onClick={onClick}
    className={`scroll-stack-card relative w-full rounded-[24px] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      isolation: 'isolate',
      ...style
    }}
  >
    {children}
  </div>
);

export interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  mobileItemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  onActiveChange?: (index: number) => void;
}

// Stable layout document measurement that is completely unaffected by active CSS transforms
const getElementDocumentTop = (element: HTMLElement): number => {
  let top = 0;
  let curr: HTMLElement | null = element;
  while (curr) {
    top += curr.offsetTop;
    curr = curr.offsetParent as HTMLElement | null;
  }
  return top;
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 80,
  itemScale = 0.025,
  itemStackDistance = 28,
  mobileItemStackDistance,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.92,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
  onActiveChange
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const rafTickRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardTopsRef = useRef<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);
  const activeIndexRef = useRef<number>(0);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  // Pre-measure static document tops so scroll loop does zero DOM reads/reflows
  const measureCardPositions = useCallback(() => {
    if (!cardsRef.current.length) return;
    const isWin = useWindowScroll;
    cardTopsRef.current = cardsRef.current.map((card) => {
      if (!card) return 0;
      return isWin ? getElementDocumentTop(card) : card.offsetTop;
    });
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const currentStackDistance = isMobile && mobileItemStackDistance !== undefined
      ? mobileItemStackDistance
      : itemStackDistance;

    // Ensure positions are measured
    if (cardTopsRef.current.length !== cards.length) {
      measureCardPositions();
    }

    const lastCardIndex = cards.length - 1;
    const lastCardTop = cardTopsRef.current[lastCardIndex] || 0;
    const lastCardPinStart = lastCardTop - stackPositionPx - currentStackDistance * lastCardIndex;
    const pinReleaseDistance = isMobile ? 160 : 200;
    const commonPinEnd = lastCardPinStart + pinReleaseDistance;

    let topCardIndex = 0;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (!card) continue;

      // Pure cached numeric offset: 0 DOM layout reflows!
      const cardTop = cardTopsRef.current[i] || 0;

      const triggerStart = cardTop - stackPositionPx - currentStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = commonPinEnd;

      if (scrollTop >= pinStart - 10) {
        topCardIndex = i;
      }

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let currentTopCard = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = cardTopsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - currentStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            currentTopCard = j;
          }
        }

        if (i < currentTopCard) {
          const depthInStack = currentTopCard - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + currentStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + currentStackDistance * i;
      }

      const roundedTranslateY = Math.round(translateY * 10) / 10;
      const roundedScale = Math.round(scale * 1000) / 1000;
      const roundedRotation = Math.round(rotation * 10) / 10;
      const roundedBlur = Math.round(blur * 10) / 10;

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - roundedTranslateY) >= 0.1 ||
        Math.abs(lastTransform.scale - roundedScale) >= 0.001 ||
        Math.abs(lastTransform.rotation - roundedRotation) >= 0.1 ||
        Math.abs(lastTransform.blur - roundedBlur) >= 0.1;

      if (hasChanged) {
        // Fast 2D hardware-accelerated transform without heavy 3D perspective overhead
        const transformStr = roundedRotation !== 0
          ? `translate3d(0, ${roundedTranslateY}px, 0) scale(${roundedScale}) rotate(${roundedRotation}deg)`
          : `translate3d(0, ${roundedTranslateY}px, 0) scale(${roundedScale})`;

        card.style.transform = transformStr;

        if (blurAmount > 0) {
          card.style.filter = roundedBlur > 0 ? `blur(${roundedBlur}px)` : '';
        }

        lastTransformsRef.current.set(i, {
          translateY: roundedTranslateY,
          scale: roundedScale,
          rotation: roundedRotation,
          blur: roundedBlur
        });
      }

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    }

    if (activeIndexRef.current !== topCardIndex) {
      activeIndexRef.current = topCardIndex;
      onActiveChange?.(topCardIndex);
    }

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    mobileItemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    onActiveChange,
    calculateProgress,
    parsePercentage,
    getScrollData,
    measureCardPositions
  ]);

  // Coalesce scroll updates onto requestAnimationFrame for 60/120fps display sync
  const requestTick = useCallback(() => {
    if (rafTickRef.current !== null) return;
    rafTickRef.current = requestAnimationFrame(() => {
      rafTickRef.current = null;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const globalLenis = typeof window !== 'undefined' ? (window as any).__lenis : null;

      const onScrollHandler = () => {
        requestTick();
      };

      const onResizeHandler = () => {
        measureCardPositions();
        requestTick();
      };

      window.addEventListener('resize', onResizeHandler, { passive: true });
      window.addEventListener('orientationchange', onResizeHandler, { passive: true });
      window.addEventListener('scroll', onScrollHandler, { passive: true });

      if (globalLenis && typeof globalLenis.on === 'function') {
        globalLenis.on('scroll', onScrollHandler);
        return () => {
          globalLenis.off('scroll', onScrollHandler);
          window.removeEventListener('scroll', onScrollHandler);
          window.removeEventListener('resize', onResizeHandler);
          window.removeEventListener('orientationchange', onResizeHandler);
        };
      }

      return () => {
        window.removeEventListener('scroll', onScrollHandler);
        window.removeEventListener('resize', onResizeHandler);
        window.removeEventListener('orientationchange', onResizeHandler);
      };
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return () => {};

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      const onScrollerScroll = () => {
        requestTick();
      };

      lenis.on('scroll', onScrollerScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        lenis.destroy();
      };
    }
  }, [requestTick, measureCardPositions, useWindowScroll]);

  useLayoutEffect(() => {
    const scope = useWindowScroll ? containerRef.current : scrollerRef.current;
    if (!scope) return;

    const cards = Array.from(
      scope.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.webkitBackfaceVisibility = 'hidden';
      card.style.transform = 'translate3d(0, 0, 0)';
      card.style.zIndex = String(i + 1);
    });

    measureCardPositions();
    const cleanupScroll = setupLenis();
    updateCardTransforms();

    // Listen to container resize to keep cached tops accurate without scroll thrashing
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        measureCardPositions();
        requestTick();
      });
      resizeObserver.observe(scope);
    }

    return () => {
      if (rafTickRef.current !== null) {
        cancelAnimationFrame(rafTickRef.current);
        rafTickRef.current = null;
      }
      resizeObserver?.disconnect();
      cleanupScroll?.();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardTopsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    useWindowScroll,
    setupLenis,
    measureCardPositions,
    updateCardTransforms,
    requestTick
  ]);

  // Additional measurement safeguard once fonts load
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        measureCardPositions();
        requestTick();
      }).catch(() => {});
    }
  }, [measureCardPositions, requestTick]);

  if (useWindowScroll) {
    return (
      <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
        <div className="scroll-stack-inner w-full pb-[10rem] sm:pb-[18rem]">
          {children}
          {/* Spacer so the last pin can release cleanly */}
          <div className="scroll-stack-end w-full h-px pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'scroll-position'
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-4 sm:px-20 pb-[30rem] sm:pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;

