import { useEffect, useRef } from "react";

/**
 * Lightweight scroll-reveal hook using IntersectionObserver.
 * Adds `.is-visible` to elements with `.reveal` class inside `containerRef`.
 * Cheaper than GSAP ScrollTrigger for simple fade-in animations.
 */
export const useScrollReveal = (containerRef: React.RefObject<HTMLElement>, threshold = 0.15) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef, threshold]);
};

export default useScrollReveal;
