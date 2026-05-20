import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(obj.val);
        setCount(rounded);
        if (progressRef.current) {
          progressRef.current.style.width = `${rounded}%`;
        }
      },
      onComplete: () => {
        // Exit animation
        tl.to(".loader-inner", {
          y: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        })
          .to(
            loaderRef.current,
            {
              yPercent: -100,
              duration: 0.9,
              ease: "power4.inOut",
            },
            "-=0.2"
          )
          .call(onComplete);
      },
    });

    // Entrance animations
    gsap.fromTo(
      ".loader-logo",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.2 }
    );
    gsap.fromTo(
      ".loader-tagline",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.5 }
    );
    gsap.fromTo(
      ".loader-progress-wrap",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.6 }
    );
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] bg-[#0D0D0D] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient gradient circles */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C9A87C]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8B7355]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="loader-inner flex flex-col items-center gap-10 w-full px-8">
        {/* Logo */}
        <div className="loader-logo flex flex-col items-center gap-3">
          {/* Icon mark */}
          <div className="relative w-16 h-16 mb-2">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="4" y="28" width="56" height="4" rx="2" fill="#C9A87C" opacity="0.3" />
              <rect x="12" y="16" width="4" height="32" rx="2" fill="#C9A87C" />
              <rect x="48" y="16" width="4" height="32" rx="2" fill="#C9A87C" />
              <rect x="16" y="24" width="32" height="3" rx="1.5" fill="#C9A87C" opacity="0.6" />
              <rect x="16" y="37" width="32" height="3" rx="1.5" fill="#C9A87C" opacity="0.6" />
            </svg>
            {/* Rotating ring */}
            <div
              className="absolute inset-0 border border-[#C9A87C]/20 rounded-full"
              style={{ animation: "spin 4s linear infinite" }}
            />
            <div
              className="absolute inset-[-8px] border border-dashed border-[#C9A87C]/10 rounded-full"
              style={{ animation: "spin 8s linear infinite reverse" }}
            />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-serif text-5xl font-bold tracking-tight text-white">
              Furnit
            </span>
            <span className="font-serif text-5xl font-light tracking-tight text-white/40">
              Interiors
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="loader-tagline text-[#C9A87C]/60 text-xs font-semibold tracking-[0.35em] uppercase">
          Crafting Extraordinary Spaces
        </p>

        {/* Progress */}
        <div className="loader-progress-wrap w-full max-w-xs flex flex-col gap-3">
          <div className="relative h-[1px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#C9A87C] to-[#E8D5B7] rounded-full transition-none"
              style={{ width: "0%", boxShadow: "0 0 12px rgba(201,168,124,0.6)" }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/20 text-[10px] tracking-widest uppercase">Loading</span>
            <span
              ref={counterRef}
              className="text-[#C9A87C] text-sm font-semibold tabular-nums"
            >
              {count}%
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
