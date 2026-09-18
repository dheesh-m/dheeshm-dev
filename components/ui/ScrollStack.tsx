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

// cubic-bezier(0.22, 1, 0.36, 1) - smooth, soft cinematic deceleration curve
function easeOutCubicBezier(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  let x = t;
  for (let iter = 0; iter < 4; iter++) {
    const currentX = 3 * (1 - x) * (1 - x) * x * 0.22 + 3 * (1 - x) * x * x * 0.36 + x * x * x;
    const currentSlope = 3 * (1 - x) * (1 - x) * 0.22 + 6 * (1 - x) * x * (0.36 - 0.22) + 3 * x * x * (1 - 0.36);
    if (Math.abs(currentSlope) < 1e-5) break;
    x -= (currentX - t) / currentSlope;
  }
  return 3 * (1 - x) * (1 - x) * x * 1.0 + 3 * (1 - x) * x * x * 1.0 + x * x * x;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 200,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '25%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
  onActiveChange
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef<HTMLElement[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);
  const activeIndexRef = useRef<number>(0);

  // Cached layout measurements (separated Read Phase from Write Phase to avoid layout thrashing)
  const cardTopsRef = useRef<number[]>([]);
  const endElementTopRef = useRef<number>(0);
  const containerHeightRef = useRef<number>(0);

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

  // Pre-measure static layout geometry once on mount, resize, or font load
  const measureGeometry = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    containerHeightRef.current = useWindowScroll
      ? windowHeight
      : (scrollerRef.current ? scrollerRef.current.clientHeight : windowHeight);

    if (useWindowScroll) {
      const container = containerRef.current;
      if (!container) return;

      // Container's document top: container has no transforms, so its getBoundingClientRect() is completely stable
      const containerRect = container.getBoundingClientRect();
      const containerDocTop = containerRect.top + window.scrollY;

      const endElement = container.querySelector('.scroll-stack-end') as HTMLElement | null;
      if (endElement) {
        let endTop = 0;
        let el: HTMLElement | null = endElement;
        while (el && el !== container) {
          endTop += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        endElementTopRef.current = containerDocTop + endTop;
      }

      // Stable card base positions: compute static layout top relative to container via offsetTop.
      // offsetTop is completely invariant to CSS transforms (translate3d, scale, rotate), preventing any feedback loops.
      cardTopsRef.current = cards.map((card) => {
        if (!card) return 0;
        let top = 0;
        let el: HTMLElement | null = card;
        while (el && el !== container) {
          top += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        return containerDocTop + top;
      });
    } else {
      const scroller = scrollerRef.current;
      const endElement = scroller ? (scroller.querySelector('.scroll-stack-end') as HTMLElement | null) : null;
      if (endElement) {
        endElementTopRef.current = endElement.offsetTop;
      }
      cardTopsRef.current = cards.map((card) => (card ? card.offsetTop : 0));
    }
  }, [useWindowScroll]);

  // Pure Write Phase: zero layout reads (getBoundingClientRect/offsetTop) during animation frames
  const updateCardTransforms = useCallback((currentScrollTop?: number) => {
    const cards = cardsRef.current;
    if (!cards.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = currentScrollTop !== undefined
      ? currentScrollTop
      : (useWindowScroll ? window.scrollY : (scrollerRef.current ? scrollerRef.current.scrollTop : 0));

    const containerHeight = containerHeightRef.current || (typeof window !== 'undefined' ? window.innerHeight : 800);
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endElementTopRef.current;
    const cardTops = cardTopsRef.current;

    // Safety fallback if geometry not yet populated
    if (!cardTops.length) {
      measureGeometry();
    }

    const blendDistance = 45; // Smooth deceleration zone into the pin
    let topCardIndex = activeIndexRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTops[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      // Softened scaling curve via cubic-bezier(0.22, 1, 0.36, 1)
      const linearScaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const easedScaleProgress = easeOutCubicBezier(linearScaleProgress);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - easedScaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * easedScaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let currentStackTop = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = cardTops[j] ?? 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            currentStackTop = j;
          }
        }
        if (i < currentStackTop) {
          const depthInStack = currentStackTop - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      // Smooth pinning with continuous velocity (soft entry curve, no abrupt jerk)
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        const rawPinTranslateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
        const distanceFromPinStart = scrollTop - pinStart;

        if (distanceFromPinStart < blendDistance) {
          // Continuous S-curve transition from 0 to full pin velocity
          const t = distanceFromPinStart / blendDistance;
          const easeFactor = t * t * (3 - 2 * t);
          translateY = rawPinTranslateY * easeFactor;
        } else {
          translateY = rawPinTranslateY;
        }
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.05 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0005 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.05 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.05;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        if (blurAmount > 0) {
          card.style.filter = filter;
        }

        lastTransformsRef.current.set(i, newTransform);
      }

      // Track active step with 15px hysteresis to prevent threshold flipping
      const hysteresis = 15;
      if (i > topCardIndex && scrollTop >= pinStart + hysteresis) {
        topCardIndex = i;
      } else if (i === topCardIndex && i > 0 && scrollTop < pinStart - hysteresis) {
        topCardIndex = i - 1;
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
    });

    if (activeIndexRef.current !== topCardIndex) {
      activeIndexRef.current = topCardIndex;
      onActiveChange?.(topCardIndex);
    }

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    onActiveChange,
    calculateProgress,
    parsePercentage,
    measureGeometry
  ]);

  // Single coherent scroll pipeline: connects directly to existing global Lenis or native window scroll
  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      let isSubscribedToLenis = false;
      let cleanupLenisSub: (() => void) | null = null;
      let rafId: number | null = null;
      let pendingScrollY: number | undefined = undefined;

      // RAF-batched scroll handler: exactly one transform update per screen refresh frame (60Hz/120Hz)
      const scheduleCardUpdate = (scrollY?: number) => {
        pendingScrollY = scrollY;
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            rafId = null;
            const y = pendingScrollY !== undefined ? pendingScrollY : window.scrollY;
            updateCardTransforms(y);
          });
        }
      };

      // Native scroll handler for touch or when Lenis is not active
      const onNativeScroll = () => {
        // If Lenis is actively handling scroll, let Lenis be the single scroll pipeline
        if (isSubscribedToLenis) return;
        scheduleCardUpdate(window.scrollY);
      };

      // Debounced resize to avoid layout thrashing during mobile address-bar collapse
      let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
      const onResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          measureGeometry();
          updateCardTransforms();
        }, 100);
      };

      const onOrientationChange = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        measureGeometry();
        updateCardTransforms();
      };

      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('orientationchange', onOrientationChange, { passive: true });
      window.addEventListener('scroll', onNativeScroll, { passive: true });

      // Connect to global Lenis if active (e.g. desktop smooth scroll)
      const tryConnectLenis = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalLenis = typeof window !== 'undefined' ? (window as any).__lenis : null;
        if (globalLenis && typeof globalLenis.on === 'function' && !isSubscribedToLenis) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const onLenisScroll = (e: any) => {
            scheduleCardUpdate(e.scroll !== undefined ? e.scroll : window.scrollY);
          };
          globalLenis.on('scroll', onLenisScroll);
          isSubscribedToLenis = true;
          cleanupLenisSub = () => {
            globalLenis.off('scroll', onLenisScroll);
            isSubscribedToLenis = false;
          };
          return true;
        }
        return false;
      };

      const connected = tryConnectLenis();

      // If Lenis mounts slightly later (e.g. after React layout effect), poll once after mount
      let checkLenisTimer: ReturnType<typeof setTimeout> | null = null;
      if (!connected) {
        checkLenisTimer = setTimeout(() => {
          tryConnectLenis();
        }, 50);
      }

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        if (resizeTimeout) clearTimeout(resizeTimeout);
        if (checkLenisTimer) clearTimeout(checkLenisTimer);
        cleanupLenisSub?.();
        window.removeEventListener('scroll', onNativeScroll);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('orientationchange', onOrientationChange);
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onScrollerLenisScroll = (e: any) => {
        updateCardTransforms(e.scroll !== undefined ? e.scroll : scroller.scrollTop);
      };

      lenis.on('scroll', onScrollerLenisScroll);

      let rafId: number | null = null;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }
  }, [measureGeometry, updateCardTransforms, useWindowScroll]);

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
      card.style.webkitTransform = 'translate3d(0, 0, 0)';
      card.style.zIndex = String(i + 1);
    });

    measureGeometry();
    const cleanupLenis = setupLenis();
    updateCardTransforms();

    // Observe container size changes with debounce to prevent layout thrashing
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      let roTimeout: ReturnType<typeof setTimeout> | null = null;
      resizeObserver = new ResizeObserver(() => {
        if (roTimeout) clearTimeout(roTimeout);
        roTimeout = setTimeout(() => {
          measureGeometry();
          updateCardTransforms();
        }, 100);
      });
      resizeObserver.observe(scope);
    }

    return () => {
      resizeObserver?.disconnect();
      cleanupLenis?.();
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
    measureGeometry,
    updateCardTransforms
  ]);

  // Update layout when fonts load
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        measureGeometry();
        updateCardTransforms();
      }).catch(() => {});
    }
  }, [measureGeometry, updateCardTransforms]);

  if (useWindowScroll) {
    return (
      <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
        <div className="scroll-stack-inner w-full pb-[35vh] sm:pb-[45vh]">
          {children}
          {/* Spacer so the last pin can release cleanly according to official algorithm */}
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
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-4 sm:px-20 pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
