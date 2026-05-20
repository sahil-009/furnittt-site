import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInHero, setIsInHero] = useState(false);

  // Subtle parallax: track mouse for hero card tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main background image slight zoom out
      gsap.fromTo(
        ".hero-bg",
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );

      // Hero title cinematic reveal
      gsap.fromTo(
        ".hero-title",
        { y: 120, opacity: 0, rotationX: -25 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.4,
          delay: 0.5,
          ease: "power4.out",
        }
      );

      // Floating badge
      gsap.fromTo(
        ".hero-badge",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: "power3.out" }
      );

      // Card slides up
      gsap.fromTo(
        ".hero-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.9, ease: "power3.out" }
      );

      // Continuous subtle float for the badge
      gsap.to(".hero-badge-inner", {
        y: -6,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Apply tilt to card on mouse move
  useEffect(() => {
    if (!cardRef.current || !isInHero) return;
    gsap.to(cardRef.current, {
      rotateX: -mousePos.y * 4,
      rotateY: mousePos.x * 4,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [mousePos, isInHero]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-4 lg:px-8 pt-24 pb-12 flex justify-center bg-background"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInHero(true)}
      onMouseLeave={() => {
        setIsInHero(false);
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.6)",
          });
        }
      }}
    >
      <div
        className="relative w-full max-w-[1400px] h-[85vh] min-h-[600px] rounded-[2rem] overflow-hidden shadow-2xl"
        style={{ perspective: "1200px" }}
      >
        {/* Main Background Image */}
        <img
          src="/assests-heroSection/hero.jpg"
          alt="Luxury contemporary interior"
          className="hero-bg absolute inset-0 w-full h-full object-cover"
        />

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, transparent 40%, rgba(0,0,0,0.15) 100%)`,
          }}
        />

        {/* Floating top-right badge */}
        <div className="hero-badge absolute top-8 right-8 hidden md:block">
          <div className="hero-badge-inner relative">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-xs font-semibold tracking-wider uppercase">
                Currently Accepting Projects
              </span>
            </div>
          </div>
        </div>

        {/* Huge Centered Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: "600px" }}>
          <h1 className="hero-title font-sans text-[2.75rem] sm:text-5xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-bold text-white tracking-tighter drop-shadow-lg"
            style={{ transformStyle: "preserve-3d" }}>
            Contemporary
          </h1>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-white/30 text-[9px] font-semibold tracking-[0.25em] uppercase">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        {/* Bottom Left Glassmorphism Card */}
        <div
          ref={cardRef}
          className="hero-card absolute bottom-6 left-6 md:bottom-10 md:left-10 w-[calc(100%-3rem)] md:w-auto md:max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center shadow-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex-1 space-y-6">
            <p className="text-white/95 text-xs md:text-sm leading-relaxed font-sans font-medium">
              Crafting spaces that harmonize modern aesthetics with timeless elegance, our contemporary interior designs breathe life into every room, redefining the essence of chic living.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] md:text-xs font-semibold tracking-wider hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 uppercase btn-magnetic"
              >
                Get Started ↗
              </a>
              <a
                href="#portfolio"
                className="text-white/70 hover:text-white text-[10px] md:text-xs font-semibold tracking-wider uppercase transition-colors duration-300 underline underline-offset-4 decoration-white/30 hover:decoration-white/70"
              >
                View Portfolio
              </a>
            </div>
          </div>
          <div className="relative w-full md:w-56 h-36 rounded-2xl overflow-hidden shrink-0 hidden md:block border border-white/30 shadow-inner">
            <video
              src="/assests-heroSection/redesign-this-image-with-enhanced-color-grading-fo.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20 cursor-pointer pointer-events-none">
              <div className="w-12 h-12 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white pl-1 border border-white/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
