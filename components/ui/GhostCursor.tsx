"use client";

import { useEffect, useMemo, useRef, CSSProperties } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import './GhostCursor.css';

export interface GhostCursorProps {
  className?: string;
  style?: CSSProperties;
  trailLength?: number;
  inertia?: number;
  grainIntensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  brightness?: number;
  color?: string;
  mixBlendMode?: string;
  edgeIntensity?: number;
  maxDevicePixelRatio?: number;
  targetPixels?: number;
  fadeDelayMs?: number;
  fadeDurationMs?: number;
  zIndex?: number;
}

const GhostCursor = ({
  className,
  style,
  trailLength = 50,
  inertia = 0.5,
  grainIntensity = 0.05,
  bloomStrength = 0.1,
  bloomRadius = 1.0,
  bloomThreshold = 0.025,

  brightness = 2,
  color = '#B497CF',
  mixBlendMode = 'screen',
  edgeIntensity = 0,

  maxDevicePixelRatio = 0.75,
  targetPixels,

  fadeDelayMs,
  fadeDurationMs,
  zIndex = 40
}: GhostCursorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);
  const filmPassRef = useRef<ShaderPass | null>(null);

  const trailBufRef = useRef<THREE.Vector2[]>([]);
  const headRef = useRef(0);

  const rafRef = useRef<number | null>(null);
  const resizeObsRef = useRef<ResizeObserver | null>(null);
  const currentMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const velocityRef = useRef(new THREE.Vector2(0, 0));
  const fadeOpacityRef = useRef(1.0);
  const lastMoveTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now());
  const pointerActiveRef = useRef(false);
  const runningRef = useRef(false);
  const hasValidSizeRef = useRef(false);

  const isTouch = useMemo(
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.8e6);
  const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);
  const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);

  const baseVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float iTime;
    uniform vec3  iResolution;
    uniform vec2  iMouse;
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform float iScale;
    uniform vec3  iBaseColor;
    uniform float iBrightness;
    uniform float iEdgeIntensity;
    uniform float iIsMobile;
    varying vec2  vUv;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f *= f * (3. - 2. * f);
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
    }
    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for(int i=0;i<5;i++){
        v += a * noise(p);
        p = m * p * 2.0;
        a *= 0.5;
      }
      return v;
    }

    // Exact original desktop tints (100% locked and restored)
    vec3 tint1(vec3 base){ return mix(base, vec3(0.9, 0.95, 1.0), 0.12); }
    vec3 tint2(vec3 base){ return mix(base, vec3(0.68, 0.75, 0.85), 0.20); }

    // Desktop blob calculation (100% original)
    vec4 desktopBlob(vec2 p, vec2 mousePos, float intensity) {
      float radius = 0.35 + 0.20 * (1.0 / iScale);
      float d = length(p - mousePos);
      if (d > radius) return vec4(0.0);

      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));

      float smoke = fbm(p * iScale + r * 0.8);
      float distFactor = 1.0 - smoothstep(0.0, radius, d);
      float alpha = pow(smoke, 2.3) * distFactor * 0.85;

      vec3 c1 = tint1(iBaseColor);
      vec3 c2 = tint2(iBaseColor);
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);

      return vec4(color * alpha * intensity, alpha * intensity);
    }

    // Mobile localized touch blob calculation (Strictly 45-70px radius)
    vec4 mobileTouchBlob(vec2 fragPx, vec2 touchPx, float intensity) {
      float dpr = max(1.0, iResolution.x / max(1.0, iResolution.z));
      float maxRadiusPx = 58.0 * dpr;  // ~58 CSS pixels radius = 116px total diameter
      float coreRadiusPx = 20.0 * dpr; // ~20 CSS pixels core radius
      float distPx = length(fragPx - touchPx);

      if (distPx > maxRadiusPx) return vec4(0.0);

      vec2 p = (fragPx / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      float smoke = fbm(p * 4.0 + iTime * 0.15);

      float distFactor = 1.0 - smoothstep(coreRadiusPx * 0.3, maxRadiusPx, distPx);
      float alpha = pow(smoke, 1.7) * distFactor;

      // Color hierarchy: Center #C4B5FD (~22% opacity) -> Mid #A78BFA (~10%) -> Outer dark-violet
      float tDist = clamp(distPx / maxRadiusPx, 0.0, 1.0);
      vec3 coreColor = vec3(0.77, 0.71, 0.99); // #C4B5FD
      vec3 midColor = vec3(0.65, 0.55, 0.98);  // #A78BFA
      vec3 outerColor = vec3(0.38, 0.22, 0.60); // dark violet outer diffusion
      vec3 color = mix(coreColor, midColor, smoothstep(0.0, 0.45, tDist));
      color = mix(color, outerColor, smoothstep(0.45, 1.0, tDist));

      float falloffAlpha = mix(0.24, 0.10, smoothstep(0.0, 0.45, tDist));
      falloffAlpha = mix(falloffAlpha, 0.0, smoothstep(0.45, 1.0, tDist));

      float finalAlpha = alpha * falloffAlpha * intensity;
      return vec4(color * finalAlpha, finalAlpha);
    }

    void main() {
      if (iOpacity <= 0.001) {
        gl_FragColor = vec4(0.0);
        return;
      }

      vec3 colorAcc = vec3(0.0);
      float alphaAcc = 0.0;

      if (iIsMobile > 0.5) {
        // ── MOBILE TOUCH RENDERING ──
        vec2 touchPx = iMouse.xy * iResolution.xy;
        vec4 b = mobileTouchBlob(gl_FragCoord.xy, touchPx, 1.0);
        colorAcc += b.rgb;
        alphaAcc += b.a;

        // Short touch trail (up to 12 nodes)
        for (int i = 0; i < 12; i++) {
          if (i >= MAX_TRAIL_LENGTH) break;
          vec2 pmPx = iPrevMouse[i].xy * iResolution.xy;
          float t = pow(1.0 - float(i) / 12.0, 2.2) * 0.70;
          if (t > 0.02) {
            vec4 bt = mobileTouchBlob(gl_FragCoord.xy, pmPx, t);
            colorAcc += bt.rgb;
            alphaAcc += bt.a;
          }
        }

        if (alphaAcc <= 0.001) {
          gl_FragColor = vec4(0.0);
          return;
        }

        float outAlpha = clamp(alphaAcc * iOpacity, 0.0, 1.0);
        gl_FragColor = vec4(colorAcc * (iBrightness * 1.2), outAlpha);

      } else {
        // ── DESKTOP RENDERING (100% UNTOUCHED ORIGINAL) ──
        vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
        vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);

        vec4 b = desktopBlob(uv, mouse, 1.0);
        colorAcc += b.rgb;
        alphaAcc += b.a;

        for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
          vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
          float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
          t = pow(t, 2.0);
          if (t > 0.01) {
            vec4 bt = desktopBlob(uv, pm, t * 0.8);
            colorAcc += bt.rgb;
            alphaAcc += bt.a;
          }
        }

        if (alphaAcc <= 0.001) {
          gl_FragColor = vec4(0.0);
          return;
        }

        colorAcc *= iBrightness;

        vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
        float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
        float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);
        float k = clamp(iEdgeIntensity, 0.0, 1.0);
        float edgeMask = mix(1.0 - k, 1.0, distFromEdge);

        float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);
        gl_FragColor = vec4(colorAcc, outAlpha);
      }
    }
  `;

  const FilmGrainShader = useMemo(() => {
    return {
      uniforms: {
        tDiffuse: { value: null as THREE.Texture | null },
        iTime: { value: 0 },
        intensity: { value: grainIntensity }
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float iTime;
        uniform float intensity;
        varying vec2 vUv;

        float hash1(float n){ return fract(sin(n)*43758.5453); }

        void main(){
          vec4 color = texture2D(tDiffuse, vUv);
          if (color.a <= 0.001 && max(color.r, max(color.g, color.b)) <= 0.001) {
            gl_FragColor = vec4(0.0);
            return;
          }
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;
          color.rgb += n * intensity * color.rgb;
          gl_FragColor = color;
        }
      `
    };
  }, [grainIntensity]);

  const UnpremultiplyPass = useMemo(
    () =>
      new ShaderPass({
        uniforms: { tDiffuse: { value: null } },
        vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main(){
            vec4 c = texture2D(tDiffuse, vUv);
            if (c.a <= 0.001 && max(c.r, max(c.g, c.b)) <= 0.001) {
              gl_FragColor = vec4(0.0);
              return;
            }
            float a = max(c.a, 1e-4);
            vec3 straight = c.rgb / a;
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);
          }
        `
      }),
    []
  );

  function calculateScale(el: HTMLElement) {
    const r = el.getBoundingClientRect();
    const base = 600;
    const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));
    return Math.max(0.5, Math.min(2.0, current / base));
  }

  useEffect(() => {
    const host = containerRef.current;
    const parent = host?.parentElement;
    if (!host || !parent) return;

    let active = true;

    const prevParentPos = parent.style.position;
    if (!prevParentPos || prevParentPos === 'static') {
      parent.style.position = 'relative';
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: !isTouch,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: isTouch ? 'low-power' : 'high-performance',
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    renderer.domElement.style.pointerEvents = 'none';
    if (mixBlendMode) {
      renderer.domElement.style.mixBlendMode = String(mixBlendMode);
    } else {
      renderer.domElement.style.removeProperty('mix-blend-mode');
    }

    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geom = new THREE.PlaneGeometry(2, 2);

    const maxTrail = Math.max(1, Math.floor(trailLength));
    trailBufRef.current = Array.from({ length: maxTrail }, () => new THREE.Vector2(0.5, 0.5));
    headRef.current = 0;

    const baseColor = new THREE.Color(color);

    const initialIsMobile = typeof window !== 'undefined' ? (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) : false;

    // Mobile starts hidden (fadeOpacity 0) until touch occurs
    fadeOpacityRef.current = initialIsMobile ? 0.0 : 1.0;

    const material = new THREE.ShaderMaterial({
      defines: { MAX_TRAIL_LENGTH: maxTrail },
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: trailBufRef.current.map(v => v.clone()) },
        iOpacity: { value: initialIsMobile ? 0.0 : 1.0 },
        iScale: { value: 1.0 },
        iBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },
        iBrightness: { value: brightness },
        iEdgeIntensity: { value: edgeIntensity },
        iIsMobile: { value: initialIsMobile ? 1.0 : 0.0 }
      },
      vertexShader: baseVertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);

    const composer = new EffectComposer(renderer);
    composerRef.current = composer;

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      bloomStrength,
      bloomRadius,
      bloomThreshold
    );
    bloomPassRef.current = bloomPass;
    composer.addPass(bloomPass);

    const filmPass = new ShaderPass(FilmGrainShader);
    filmPassRef.current = filmPass;
    composer.addPass(filmPass);

    composer.addPass(UnpremultiplyPass);

    const resize = () => {
      if (!active) return;

      const rect = host.getBoundingClientRect();
      const cssW = Math.floor(rect.width);
      const cssH = Math.floor(rect.height);

      if (cssW <= 0 || cssH <= 0) {
        hasValidSizeRef.current = false;
        return;
      }

      const isMobile = cssW < 768 || window.matchMedia('(pointer: coarse)').matches;
      if (materialRef.current) {
        materialRef.current.uniforms.iIsMobile.value = isMobile ? 1.0 : 0.0;
      }

      const currentDPR = Math.min(
        typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
        maxDevicePixelRatio
      );
      const need = cssW * cssH * currentDPR * currentDPR;
      const scale = need <= pixelBudget ? 1 : Math.max(0.5, Math.min(1, Math.sqrt(pixelBudget / Math.max(1, need))));
      const pixelRatio = currentDPR * scale;

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(cssW, cssH, false);

      composer.setPixelRatio?.(pixelRatio);
      composer.setSize(cssW, cssH);

      const wpx = Math.max(1, Math.floor(cssW * pixelRatio));
      const hpx = Math.max(1, Math.floor(cssH * pixelRatio));
      material.uniforms.iResolution.value.set(wpx, hpx, cssW);
      material.uniforms.iScale.value = calculateScale(host);
      bloomPass.setSize(wpx, hpx);

      if (isMobile) {
        bloomPass.strength = 0.04;
        bloomPass.radius = 0.2;
      } else {
        bloomPass.strength = bloomStrength;
        bloomPass.radius = bloomRadius;
      }

      hasValidSizeRef.current = true;
    };

    resize();
    const ro = new ResizeObserver(() => {
      if (!active) return;
      resize();
    });
    resizeObsRef.current = ro;
    ro.observe(parent);
    ro.observe(host);

    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const animate = () => {
      if (!active) return;

      if (!hasValidSizeRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      const t = (now - start) / 1000;

      const mat = materialRef.current;
      const comp = composerRef.current;
      if (!mat || !comp) return;

      const isMobile = typeof window !== 'undefined' ? (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) : false;

      if (pointerActiveRef.current) {
        const lerpFactor = isMobile ? 0.40 : 1.0;
        velocityRef.current.set(
          currentMouseRef.current.x - mat.uniforms.iMouse.value.x,
          currentMouseRef.current.y - mat.uniforms.iMouse.value.y
        );
        if (isMobile) {
          mat.uniforms.iMouse.value.lerp(currentMouseRef.current, lerpFactor);
        } else {
          mat.uniforms.iMouse.value.copy(currentMouseRef.current);
        }
        fadeOpacityRef.current = 1.0;
      } else {
        if (!isMobile) {
          velocityRef.current.multiplyScalar(inertia);
          if (velocityRef.current.lengthSq() > 1e-6) {
            mat.uniforms.iMouse.value.add(velocityRef.current);
          }
        }
        const dt = now - lastMoveTimeRef.current;
        const delay = isMobile ? 80 : fadeDelay;
        const duration = isMobile ? 450 : fadeDuration;
        if (dt > delay) {
          const k = Math.min(1, (dt - delay) / duration);
          fadeOpacityRef.current = Math.max(0, 1 - k);
        }
      }

      const N = trailBufRef.current.length;
      headRef.current = (headRef.current + 1) % N;
      trailBufRef.current[headRef.current].copy(mat.uniforms.iMouse.value);
      const arr = mat.uniforms.iPrevMouse.value;
      for (let i = 0; i < N; i++) {
        const srcIdx = (headRef.current - i + N) % N;
        arr[i].copy(trailBufRef.current[srcIdx]);
      }

      mat.uniforms.iOpacity.value = fadeOpacityRef.current;
      mat.uniforms.iTime.value = t;

      if (filmPassRef.current?.uniforms?.iTime) {
        filmPassRef.current.uniforms.iTime.value = t;
      }

      comp.render();

      if (!pointerActiveRef.current && fadeOpacityRef.current <= 0.001) {
        runningRef.current = false;
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const ensureLoop = () => {
      if (!runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const updatePointerPos = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      const x = THREE.MathUtils.clamp((clientX - rect.left) / Math.max(1, rect.width), 0, 1);
      const y = THREE.MathUtils.clamp(1 - (clientY - rect.top) / Math.max(1, rect.height), 0, 1);
      currentMouseRef.current.set(x, y);
    };

    const onPointerDown = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
      if (materialRef.current) {
        materialRef.current.uniforms.iMouse.value.copy(currentMouseRef.current);
        const N = trailBufRef.current.length;
        for (let i = 0; i < N; i++) {
          trailBufRef.current[i].copy(currentMouseRef.current);
          materialRef.current.uniforms.iPrevMouse.value[i].copy(currentMouseRef.current);
        }
      }
      pointerActiveRef.current = true;
      fadeOpacityRef.current = 1.0;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
      pointerActiveRef.current = true;
      fadeOpacityRef.current = 1.0;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };

    const onPointerUp = () => {
      pointerActiveRef.current = false;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
        if (materialRef.current) {
          materialRef.current.uniforms.iMouse.value.copy(currentMouseRef.current);
          const N = trailBufRef.current.length;
          for (let i = 0; i < N; i++) {
            trailBufRef.current[i].copy(currentMouseRef.current);
            materialRef.current.uniforms.iPrevMouse.value[i].copy(currentMouseRef.current);
          }
        }
        pointerActiveRef.current = true;
        fadeOpacityRef.current = 1.0;
        lastMoveTimeRef.current = performance.now();
        ensureLoop();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
        pointerActiveRef.current = true;
        fadeOpacityRef.current = 1.0;
        lastMoveTimeRef.current = performance.now();
        ensureLoop();
      }
    };

    const onTouchEnd = () => {
      pointerActiveRef.current = false;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    ensureLoop();

    return () => {
      active = false;
      hasValidSizeRef.current = false;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      rafRef.current = null;

      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);

      resizeObsRef.current?.disconnect();

      scene.clear();
      geom.dispose();
      material.dispose();
      materialRef.current = null;
      composer.dispose();
      composerRef.current = null;
      renderer.dispose();
      renderer.forceContextLoss();
      rendererRef.current = null;

      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      if (!prevParentPos || prevParentPos === 'static') {
        parent.style.position = prevParentPos;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    trailLength,
    inertia,
    grainIntensity,
    bloomStrength,
    bloomRadius,
    bloomThreshold,
    pixelBudget,
    fadeDelay,
    fadeDuration,
    isTouch,
    color,
    brightness,
    mixBlendMode,
    edgeIntensity
  ]);

  useEffect(() => {
    if (materialRef.current) {
      const c = new THREE.Color(color);
      materialRef.current.uniforms.iBaseColor.value.set(c.r, c.g, c.b);
    }
  }, [color]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iBrightness.value = brightness;
    }
  }, [brightness]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iEdgeIntensity.value = edgeIntensity;
    }
  }, [edgeIntensity]);

  useEffect(() => {
    if (filmPassRef.current?.uniforms?.intensity) {
      filmPassRef.current.uniforms.intensity.value = grainIntensity;
    }
  }, [grainIntensity]);

  useEffect(() => {
    const el = rendererRef.current?.domElement;
    if (!el) return;
    if (mixBlendMode) {
      el.style.mixBlendMode = String(mixBlendMode);
    } else {
      el.style.removeProperty('mix-blend-mode');
    }
  }, [mixBlendMode]);

  const mergedStyle = useMemo(() => ({ zIndex, ...style }), [zIndex, style]);

  return <div ref={containerRef} className={`ghost-cursor ${className ?? ''}`} style={mergedStyle} />;
};

export default GhostCursor;
