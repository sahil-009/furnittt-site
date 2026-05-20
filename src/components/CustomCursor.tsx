import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const isMounted = useRef(true);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.style.cursor = "none";
    isMounted.current = true;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Use event delegation instead of MutationObserver
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")) {
        setIsHovering(false);
      }
    };

    // RAF loop — only update DOM, no GSAP overhead
    const tick = () => {
      if (!isMounted.current) return;

      // Dot follows mouse instantly
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
      }

      // Ring follows with lerp (smooth lag)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      isMounted.current = false;
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot — snappy, instant */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-[#C9A87C]"
        style={{
          willChange: "transform",
          mixBlendMode: "multiply",
          transition: isHovering
            ? "width 0.3s ease, height 0.3s ease, background-color 0.3s ease"
            : "width 0.3s ease, height 0.3s ease",
          width: isHovering ? "10px" : "8px",
          height: isHovering ? "10px" : "8px",
        }}
      />

      {/* Outer ring — smooth lag */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-[#C9A87C]/40"
        style={{
          willChange: "transform",
          width: isHovering ? "52px" : "40px",
          height: isHovering ? "52px" : "40px",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease",
          borderColor: isHovering ? "rgba(201,168,124,0.7)" : "rgba(201,168,124,0.35)",
        }}
      />
    </>
  );
};

export default CustomCursor;
