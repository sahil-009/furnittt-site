import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;

      // Image slides in from left
      gsap.fromTo(".founder-img",
        { x: -80, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Glass card fades in after image
      gsap.fromTo(".founder-glass",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Label line draws in
      gsap.fromTo(".founder-label-line",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.8, delay: 0.4, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Label text fades in
      gsap.fromTo(".founder-label",
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Each word of the heading reveals individually
      gsap.fromTo(".founder-word",
        { y: 60, opacity: 0, rotateX: -15 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 0.9,
          stagger: isMobile ? 0 : 0.08,
          delay: 0.5,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Paragraph text fades in
      gsap.fromTo(".founder-body",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, delay: 1, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Signature / name area slides in
      gsap.fromTo(".founder-signature",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Quote mark floats in
      gsap.fromTo(".founder-quote-mark",
        { scale: 0, opacity: 0, rotation: -20 },
        {
          scale: 1, opacity: 1, rotation: 0, duration: 1, delay: 0.8, ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const headingWords = ["Designing", "spaces", "that", "tell", "your", "unique", "story."];

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        {/* Left: Image with overlays */}
        <div className="founder-img w-full lg:w-[45%] aspect-square lg:aspect-[4/5] bg-muted rounded-[2rem] overflow-hidden relative shadow-2xl">
          <img
            src="/public/founder-side.jpg"
            alt="Founder"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

          {/* Glassmorphism Card Overlay */}
          <div className="founder-glass absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center shadow-2xl z-10">
            <div className="flex-1 space-y-4 md:space-y-5">
              <p className="text-white/95 text-[10px] md:text-sm leading-relaxed font-sans font-normal">
                Curating environments that blend personal narratives with sophisticated design, our bespoke interiors capture the true spirit of refined living.
              </p>
              <button className="bg-black text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-semibold tracking-wider hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-300 uppercase">
                View More ↗
              </button>
            </div>
            <div className="relative w-full md:w-32 h-20 md:h-24 rounded-xl overflow-hidden shrink-0 border border-white/30 shadow-inner">
              <video
                src="/public/video-founder.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20 cursor-pointer pointer-events-none">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white pl-1 border border-white/50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="w-full lg:w-[55%] flex flex-col items-start text-left relative">
          {/* Decorative large quote mark */}
          <span className="founder-quote-mark absolute -top-8 -left-4 md:-top-12 md:-left-8 text-[120px] md:text-[180px] font-serif text-primary/10 leading-none select-none pointer-events-none">
            "
          </span>

          {/* Label with animated line */}
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <span className="founder-label-line w-10 h-[1px] bg-primary/60 origin-left"></span>
            <span className="founder-label text-xs font-semibold tracking-[0.2em] uppercase text-primary/80">About the Founder</span>
          </div>

          {/* Heading with per-word animation */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-bold tracking-tight mb-10 leading-[1.15] relative z-10" style={{ perspective: "600px" }}>
            {headingWords.map((word, i) => (
              <span key={i} className="founder-word inline-block mr-[0.3em]" style={{ transformStyle: "preserve-3d" }}>
                {word}
              </span>
            ))}
          </h2>

          {/* Body text */}
          <p className="founder-body font-sans font-normal text-foreground/60 leading-[1.8] text-base md:text-lg mb-10 max-w-lg relative z-10">
            With a passion for aesthetics and functional design, we strive to bring spaces to life. Our approach is deeply personal — ensuring that every project reflects the true essence of its inhabitants while pushing boundaries of contemporary design.
          </p>

          {/* Signature area */}
          <div className="founder-signature flex items-center gap-6 relative z-10">
            <div className="w-16 h-[1px] bg-foreground/20"></div>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-xl md:text-2xl text-foreground italic">Abhinandan Belagur</span>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">Founder & CEO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
