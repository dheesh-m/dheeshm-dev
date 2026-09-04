"use client";

import React, { useRef, useEffect, useState, useCallback, CSSProperties, KeyboardEvent, MouseEvent } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

export interface AccordionGalleryItem {
  id?: string;
  image?: string;
  label?: string;
  link?: string;
  alt?: string;
  number?: string;
  categoryBadge?: string;
  containImage?: boolean;
}

export interface AccordionGalleryProps {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
  isLightMode?: boolean;
}

const DEFAULT_ITEMS: AccordionGalleryItem[] = [];

export default function AccordionGallery({
  items = DEFAULT_ITEMS,
  defaultIndex = 0,
  activeIndex,
  onActiveChange,
  accentColor = '#E50909',
  overlayColor = '#05060B',
  textColor = '#ffffff',
  height = 440,
  gap = 12,
  radius = 20,
  expandRatio = 0.50,
  orientation = 'horizontal',
  duration = 0.55,
  ease = 'power3.out',
  parallax = 0.35,
  tilt = 5,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
  isLightMode = false,
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(360);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [internalActive, setInternalActive] = useState(
    Math.min(Math.max(defaultIndex, 0), count > 0 ? count - 1 : 0)
  );

  const active = activeIndex !== undefined ? activeIndex : internalActive;

  const setActive = useCallback((i: number) => {
    setInternalActive(i);
    onActiveChange?.(i);
  }, [onActiveChange]);

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const overlayBg = isLightMode
    ? `linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.7) 100%), rgba(255,255,255,calc(var(--ag-dim, 0.25) * 100%))`
    : `linear-gradient(180deg, transparent 40%, rgba(5,6,11,0.85) 100%), color-mix(in srgb, ${overlayColor} calc(var(--ag-dim, 0.35) * 100%), transparent)`;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 0.85) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.4,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(160, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.25);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i: number) => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i: number, e: MouseEvent) => {
    e.preventDefault();
    setActive(i);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "flex w-full max-w-full [perspective:1400px] max-[520px]:!flex-col max-[520px]:[perspective:none] select-none",
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
      style={{
        gap: `${gap}px`,
        height: vertical ? `${Math.round(height * 1.5)}px` : `${height}px`
      }}
      role="list"
      aria-label="Project accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <div
            key={item.id || i}
            ref={(el: HTMLElement | null) => {
              panelRefs.current[i] = el;
            }}
            className={cn(
              "group relative block min-w-0 min-h-0 flex-[1_1_0] cursor-pointer overflow-hidden outline-none",
              "[transform-style:preserve-3d] [transform-origin:center] max-[520px]:min-h-[88px] max-[520px]:!transform-none",
              "border transition-[border-color,box-shadow] duration-300",
              isLightMode
                ? isActive
                  ? "bg-white border-[#E50909]/40 shadow-[0_12px_36px_rgba(229,9,9,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]"
                  : "bg-white/80 border-black/10 hover:border-black/25 shadow-sm"
                : isActive
                  ? "bg-[#090C17]/90 border-[#E50909]/50 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_24px_rgba(229,9,9,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "bg-[#090C17]/75 border-white/10 hover:border-white/20 shadow-md"
            )}
            style={
              {
                borderRadius: `${radius}px`,
                '--ag-accent': accentColor,
                willChange: 'flex-grow, transform'
              } as CSSProperties
            }
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              {/* Media Container with GSAP shift and filter */}
              <span
                ref={(el: HTMLElement | null) => {
                  mediaRefs.current[i] = el;
                }}
                className={cn(
                  "absolute top-1/2 left-1/2 flex items-center justify-center [filter:grayscale(var(--ag-gray,1))]",
                  item.containImage ? (isLightMode ? "bg-slate-100" : "bg-[#080912]") : ""
                )}
                style={{
                  width: vertical ? '100%' : 'var(--ag-media-size, 360px)',
                  height: vertical ? 'var(--ag-media-size, 360px)' : '100%',
                  willChange: 'transform, filter'
                }}
              >
                {/* Ambient glow inside panel if image is contained (Humanoid) */}
                {item.containImage && (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_75%)] pointer-events-none" />
                )}

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.alt || item.label || ''}
                    draggable={false}
                    className={cn(
                      "block h-full w-full select-none [-webkit-user-drag:none]",
                      item.containImage
                        ? "object-contain object-center p-2"
                        : "object-cover object-center"
                    )}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-400 p-4">
                    <span className="font-mono text-sm font-bold text-white/90 mb-1">{item.label}</span>
                    <span className="font-mono text-[10px] text-[#E50909] uppercase tracking-wider">{item.categoryBadge}</span>
                  </div>
                )}
              </span>

              {/* Gradient Overlay */}
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: overlayBg }}
                aria-hidden="true"
              />
            </span>

            {/* Top-Left: Project Number Badge */}
            {item.number && (
              <div
                className={cn(
                  "absolute top-3.5 left-3.5 z-10 px-2.5 py-0.5 rounded-md backdrop-blur-md border shadow-sm transition-colors",
                  isLightMode
                    ? "bg-white/95 border-black/10 text-[#111111]"
                    : "bg-black/80 border-white/15 text-white",
                  isActive && (isLightMode ? "border-[#E50909]/40 text-[#E50909]" : "border-[#E50909]/50 text-white")
                )}
              >
                <span className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-wider">
                  {item.number}
                </span>
              </div>
            )}

            {/* Top-Right: Category Badge */}
            {item.categoryBadge && (
              <div
                className={cn(
                  "absolute top-3.5 right-3.5 z-10 px-2.5 py-0.5 rounded-md backdrop-blur-md border shadow-sm transition-all duration-300",
                  isLightMode
                    ? "bg-white/95 border-black/10 text-[#E50909]"
                    : "bg-black/80 border-white/15 text-[#E50909]",
                  !isActive && "opacity-60 max-[520px]:hidden"
                )}
              >
                <span className="font-mono text-[8.5px] sm:text-[9px] font-bold tracking-wider uppercase">
                  {item.categoryBadge}
                </span>
              </div>
            )}

            {/* Bottom: Animated Caption Label */}
            {showLabels && (
              <span
                className="pointer-events-none absolute bottom-4 left-4 right-4 z-[2] flex items-center gap-2.5"
                aria-hidden="true"
              >
                <span
                  ref={(el: HTMLElement | null) => {
                    barRefs.current[i] = el;
                  }}
                  className="h-[22px] w-[3px] flex-none rounded-[3px] opacity-0"
                  style={{
                    background: accentColor,
                    boxShadow: `0 0 10px rgba(229,9,9,0.7)`
                  }}
                />
                <span
                  ref={(el: HTMLElement | null) => {
                    textRefs.current[i] = el;
                  }}
                  className={cn(
                    "overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(0.95rem,1.3vw,1.3rem)] font-bold tracking-tight opacity-0",
                    isLightMode ? "text-[#111111]" : "text-white"
                  )}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    textShadow: isLightMode ? "0 1px 4px rgba(255,255,255,0.8)" : "0 2px 14px rgba(0,0,0,0.8)"
                  }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
