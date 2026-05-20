import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;

      gsap.fromTo(".service-anim",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: isMobile ? 0 : 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={ref} className="py-20 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* Left Image */}
        <div className="service-anim w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80"
            alt="Living room interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="service-anim w-full lg:w-1/2 flex flex-col items-start max-w-xl">
          <div className="flex items-center gap-2 mb-6 mt-4 lg:mt-0">
            <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-foreground/80">
              Services
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/40" />
            <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-foreground/80">
              Expertise
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Bespoke Services<br />Timeless Spaces
          </h2>

          <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-8 max-w-[400px]">
            Discover our comprehensive interior design services, from bespoke living spaces and modular kitchens to custom furniture, redefining your environment with elegance and functionality.
          </p>

          <button className="bg-black text-white px-8 py-3 rounded-full text-xs font-semibold tracking-wider hover:bg-black/80 transition-colors uppercase flex items-center gap-2">
            Explore Services ↗
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
