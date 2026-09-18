import React, { useEffect, useRef } from 'react';

const RING = {
  radiusX: 508,
  radiusY: 237,
  scaleMin: 0.8,
  scaleRange: 0.2,
  turns: 1,
  dragPerPx: 0.0032,
  friction: 0.94,
};

const GALLERY_IMAGES = [
  '/img/Creative_agency_website_interfac…_20260918134906.jpeg',
  '/img/Creative_portfolio_landing_page_…_20260918134817.jpeg',
  '/img/Hotel_booking_site_interface_design_20260918134741.jpeg',
  '/img/Lifestyle_brand_homepage_design_20260918134812.jpeg',
  '/img/Minimalist_fashion_e-commerce_we…_20260918134910.jpeg',
  '/img/Minimalist_footer_layout_with_ty…_20260918134822.jpeg',
  '/img/Minimalist_tech_company_landing_…_20260918134832.jpeg',
  '/img/Software_dashboard_interface_design_20260918134828.jpeg',
  '/img/Software_testimonial_page_layout_20260918134806.jpeg',
];

export const GalleryRing: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const frames = framesRef.current;
    if (!stage || frames.length === 0) return;

    const step = (Math.PI * 2) / frames.length;
    let scrollAngle = 0;
    let dragAngle = 0;
    let velocity = 0;
    let dragging = false;
    let pointerId: number | null = null;
    let lastX = 0;
    let painted: number | null = null;
    let scaleFactor = 1;
    let running = false;
    let rafId = 0;
    let last = performance.now();
    let onScreen = false;

    const measure = () => {
      const byWidth = stage.clientWidth / 1320;
      const cardH = frames[0]?.offsetHeight || 312;
      const byHeight = (stage.clientHeight - cardH) / (RING.radiusY * 2);
      scaleFactor = Math.max(0.25, Math.min(1, byWidth, byHeight));
    };
    measure();

    const readScroll = () => {
      const r = stage.getBoundingClientRect();
      const travel = window.innerHeight + r.height;
      const p = travel > 0 ? (window.innerHeight - r.top) / travel : 0;
      scrollAngle = -Math.min(Math.max(p, 0), 1) * Math.PI * 2 * RING.turns;
    };

    const render = () => {
      const angle = scrollAngle + dragAngle;
      if (painted !== null && Math.abs(angle - painted) < 0.0004) return;
      painted = angle;

      for (let i = 0; i < frames.length; i++) {
        const theta = angle + i * step;
        const cos = Math.cos(theta);
        const depth = (cos + 1) / 2;
        const x = RING.radiusX * scaleFactor * Math.sin(theta);
        const y = RING.radiusY * scaleFactor * cos;
        const scale = RING.scaleMin + RING.scaleRange * depth;
        const el = frames[i];
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        el.style.zIndex = String(Math.round(100 * depth));
      }
    };

    // Drag handlers
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true;
      pointerId = e.pointerId;
      lastX = e.clientX;
      velocity = 0;
      stage.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const delta = (e.clientX - lastX) * RING.dragPerPx;
      lastX = e.clientX;
      dragAngle += delta;
      velocity = delta;
      render();
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      if (pointerId !== null && stage.hasPointerCapture(pointerId)) {
        stage.releasePointerCapture(pointerId);
      }
      pointerId = null;
    };

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);

    // Animation loop
    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 1 / 20);
      last = now;
      readScroll();
      if (!dragging && velocity !== 0) {
        if (Math.abs(velocity) > 0.00002) {
          dragAngle += velocity;
          velocity *= Math.pow(RING.friction, dt * 60);
        } else velocity = 0;
      }
      render();
    };

    const start = () => { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(rafId); };
    const sync = () => (onScreen && !document.hidden ? start() : stop());

    readScroll();
    render();

    const io = new IntersectionObserver(entries => {
      onScreen = entries[0].isIntersecting;
      sync();
    }, { threshold: 0 });
    io.observe(stage);

    document.addEventListener('visibilitychange', sync);
    const remeasure = () => { measure(); readScroll(); painted = null; render(); };
    window.addEventListener('resize', remeasure, { passive: true });
    const ro = new ResizeObserver(remeasure);
    ro.observe(stage);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('resize', remeasure);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', endDrag);
      stage.removeEventListener('pointercancel', endDrag);
    };
  }, []);

  return (
    <section className="relative w-full h-[100svh] bg-[var(--ink)] overflow-hidden flex items-center justify-center select-none touch-none">
      {/* Display words */}
      <span className="absolute top-8 left-8 text-6xl md:text-8xl font-bold text-white/5 uppercase leading-none pointer-events-none">Gallery</span>
      <span className="absolute bottom-8 right-8 text-6xl md:text-8xl font-bold text-white/5 uppercase leading-none pointer-events-none">Works</span>

      {/* Ring stage */}
      <div ref={stageRef} data-gallery className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
        <div data-gallery-ring className="relative">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              ref={el => { if (el) framesRef.current[i] = el; }}
              data-frame
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[280px] md:w-[260px] md:h-[360px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#111] will-change-transform"
            >
              <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};