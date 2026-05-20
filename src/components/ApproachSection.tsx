import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ApproachSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { yPercent: -5 }, {
        yPercent: 5, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".approach-anim").forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="overflow-hidden rounded-2xl h-[500px]">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
            alt="Modern interior with timeless design elements"
            className="w-full h-[120%] object-cover"
          />
        </div>
        <div className="space-y-6">
          <span className="approach-anim opacity-0 inline-block text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground border border-border px-4 py-1.5 rounded-full">
            Elegance + Purpose
          </span>
          <h2 className="approach-anim opacity-0 font-serif text-3xl md:text-5xl font-light leading-tight">
            Modern Style,<br /><em>Timeless Charm</em>
          </h2>
          <p className="approach-anim opacity-0 text-muted-foreground leading-relaxed max-w-md">
            We merge contemporary aesthetics with enduring design principles. Every material, texture, and proportion is considered to create spaces that feel both current and eternal — interiors that age with grace.
          </p>
          <a href="#services" className="approach-anim opacity-0 inline-block story-link text-sm font-medium text-foreground tracking-wide">
            Explore Our Services →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
