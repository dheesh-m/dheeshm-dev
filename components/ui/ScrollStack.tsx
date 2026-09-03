"use client";

import React, { useLayoutEffect, useRef, useCallback, CSSProperties, ReactNode } from 'react';
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
      transformStyle: 'preserve-3d',
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
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
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

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = (useWindowScroll ? containerRef.current : scrollerRef.current)?.querySelector('.scroll-stack-end') as HTMLElement | null;
    const endElementTop = endElement
      ? (useWindowScroll ? (endElement.getBoundingClientRect().top + window.scrollY) : endElement.offsetTop)
      : 0;

    const lastCardIndex = cardsRef.current.length - 1;
    const lastCard = cardsRef.current[lastCardIndex];
    const lastCardAppliedY = lastCard ? (lastTransformsRef.current.get(lastCardIndex)?.translateY || 0) : 0;
    const lastCardTop = lastCard
      ? (useWindowScroll ? (lastCard.getBoundingClientRect().top + window.scrollY - lastCardAppliedY) : lastCard.offsetTop)
      : 0;
    const lastCardPinStart = lastCardTop - stackPositionPx - itemStackDistance * lastCardIndex;
    const commonPinEnd = lastCardPinStart + 200;

    let topCardIndex = 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // Stable layout position invariant to active CSS transforms
      const currentAppliedY = lastTransformsRef.current.get(i)?.translateY || 0;
      const cardTop = useWindowScroll
        ? (card.getBoundingClientRect().top + window.scrollY - currentAppliedY)
        : card.offsetTop;

      // Official React Bits calculation formulas
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
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
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = useWindowScroll ? getElementDocumentTop(cardsRef.current[j]) : cardsRef.current[j].offsetTop;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            currentTopCard = j;
          }
        }

        if (i < currentTopCard) {
          const depthInStack = currentTopCard - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      // Exact React Bits translation logic
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
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
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        if (filter) card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
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
    getScrollData
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const globalLenis = typeof window !== 'undefined' ? (window as any).__lenis : null;

      const onScrollHandler = () => {
        updateCardTransforms();
      };

      window.addEventListener('resize', onScrollHandler, { passive: true });
      window.addEventListener('scroll', onScrollHandler, { passive: true });

      if (globalLenis && typeof globalLenis.on === 'function') {
        globalLenis.on('scroll', onScrollHandler);
        return () => {
          globalLenis.off('scroll', onScrollHandler);
          window.removeEventListener('scroll', onScrollHandler);
          window.removeEventListener('resize', onScrollHandler);
        };
      }

      return () => {
        window.removeEventListener('scroll', onScrollHandler);
        window.removeEventListener('resize', onScrollHandler);
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

      lenis.on('scroll', handleScroll);

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
  }, [handleScroll, updateCardTransforms, useWindowScroll]);

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
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
      card.style.zIndex = String(i + 1);
    });

    const cleanupScroll = setupLenis();
    updateCardTransforms();

    return () => {
      cleanupScroll?.();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);

  if (useWindowScroll) {
    return (
      <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
        <div className="scroll-stack-inner w-full pb-[20rem]">
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
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
