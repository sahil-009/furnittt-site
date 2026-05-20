import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    author: "Aditya & family",
    role: "Homeowner",
    quote: "Furnit paid attention to the smallest details. The space feels calm, functional, and timeless. We couldn't have asked for a better experience.",
    gradient: "from-[#1a1a2e] to-[#16213e]",
    accent: "#E8D5B7"
  },
  {
    author: "Vikash and Rupali",
    role: "Homeowner",
    quote: "Furnit paid attention to the smallest details. The space feels calm, functional, and timeless. We couldn't have asked for a better experience.",
    gradient: "from-[#F2ECE4] to-[#E8DDD0]",
    accent: "#8B7355"
  },
  {
    author: "Rupesh and family",
    role: "Architect & Homeowner",
    quote: "As an architect myself, I'm incredibly selective. Furnit exceeded every expectation. Their craftsmanship and vision are truly world-class.",
    gradient: "from-[#2d2d3f] to-[#1a1a2e]",
    accent: "#C9A87C"
  }
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading reveal
      gsap.fromTo(".test-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Cards stagger in with scale and rotation
      gsap.fromTo(".test-card",
        { y: 80, opacity: 0, scale: 0.9, rotateY: 5 },
        {
          y: 0, opacity: 1, scale: 1, rotateY: 0,
          duration: 1.2, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );

      // Quote marks pop in
      gsap.fromTo(".test-quote",
        { scale: 0, opacity: 0, rotation: -15 },
        {
          scale: 1, opacity: 1, rotation: 0,
          duration: 0.8, stagger: 0.2, delay: 0.4, ease: "elastic.out(1, 0.6)",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );

      // Author info slides up
      gsap.fromTo(".test-author",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8, stagger: 0.2, delay: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={ref} className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/40 rounded-full blur-[100px] translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="test-heading flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-primary/40"></span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/80">Voices of Trust</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
              Client Stories
            </h2>
          </div>
          <p className="text-foreground/50 max-w-sm text-base font-sans font-normal leading-relaxed">
            Real experiences from those who trusted us to transform their spaces into something extraordinary.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" style={{ perspective: "1200px" }}>
          {testimonials.map((t, idx) => {
            const isDark = idx === 0 || idx === 2;
            return (
              <div 
                key={idx} 
                className={`test-card group relative bg-gradient-to-br ${t.gradient} p-8 md:p-10 lg:p-12 rounded-[2rem] flex flex-col justify-between min-h-[380px] md:min-h-[420px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)]`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Subtle shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]"></div>
                
                {/* Decorative corner accent */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-[6rem] opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: t.accent }}
                ></div>

                {/* Quote content */}
                <div className="relative z-10">
                  <span 
                    className="test-quote block text-6xl md:text-7xl font-serif leading-none mb-6 select-none"
                    style={{ color: t.accent }}
                  >
                    "
                  </span>
                  <p className={`font-sans font-normal leading-[1.8] text-sm md:text-base ${isDark ? "text-white/80" : "text-foreground/70"}`}>
                    {t.quote}
                  </p>
                </div>

                {/* Author info */}
                <div className={`test-author mt-10 pt-6 flex items-center gap-4 ${isDark ? "border-t border-white/10" : "border-t border-foreground/10"}`}>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-serif font-bold shrink-0"
                    style={{ backgroundColor: t.accent, color: isDark ? "#1a1a2e" : "#fff" }}
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <span className={`block font-semibold text-sm ${isDark ? "text-white" : "text-foreground"}`}>
                      {t.author}
                    </span>
                    <span className={`block text-xs mt-1 ${isDark ? "text-white/50" : "text-foreground/50"}`}>
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
