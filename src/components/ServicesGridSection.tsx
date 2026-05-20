import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Living Spaces",
    desc: "Transform your living room into a sanctuary of comfort and sophistication.",
    img: "/images-for-everything/a65-design-GAZwGtrlozo-unsplash.jpg",
    color: "#1a1a2e"
  },
  {
    num: "02",
    title: "Modular Kitchens",
    desc: "Culinary spaces that blend functionality with aesthetics, designed for the modern epicurean.",
    img: "/images-for-everything/clay-banks-KLPARZr59Vs-unsplash.jpg",
    color: "#2d3436"
  },
  {
    num: "03",
    title: "Tv Units",
    desc: "Intimate retreats crafted for rest and rejuvenation, balancing serenity with expression.",
    img: "/images-for-everything/collov-home-design-5a7URgkummE-unsplash.jpg",
    color: "#0c0c1d"
  },
  {
    num: "04",
    title: "Wardrobes",
    desc: "Custom storage solutions that celebrate organization and architectural beauty.",
    img: "/images-for-everything/greg-rivers-upekOABr32I-unsplash.jpg",
    color: "#1e272e"
  },
  {
    num: "05",
    title: "Interior Design",
    desc: "Transform your living room into a sanctuary of comfort and sophistication.",
    img: "/images-for-everything/lisa-anna-6Zq6ZlCnUWM-unsplash.jpg",
    color: "#2d2d3f"
  },
  {
    num: "06",
    title: "Custom Furniture",
    desc: "Bespoke pieces designed and crafted to perfectly match your space.",
    img: "/images-for-everything/spacejoy-Cc-grZAayAk-unsplash.jpg",
    color: "#1a1a2e"
  }
];

const ServicesGridSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(".svc-header",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Cards stagger in with 3D effect
      gsap.fromTo(".svc-card",
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".svc-grid", start: "top 85%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={ref} className="py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-[#F9F8F6] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="svc-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-foreground/30"></span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50">Our Services</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
              What We<br />Create
            </h2>
          </div>
          <p className="text-foreground/50 max-w-sm text-sm md:text-base font-sans font-normal leading-relaxed">
            From concept to completion, we craft extraordinary spaces that reflect your unique vision and lifestyle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="svc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="svc-card group relative h-[280px] sm:h-[320px] md:h-[380px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={s.img}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50"></div>

              {/* Number tag */}
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6">
                <span className="text-white/30 text-xs font-semibold tracking-widest uppercase group-hover:text-white/60 transition-colors duration-500">
                  {s.num}
                </span>
              </div>

              {/* Arrow Button */}
              <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-serif font-medium mb-2 transform group-hover:-translate-y-1 transition-transform duration-500">
                  {s.title}
                </h3>
                <p className="text-white/0 font-sans font-normal text-xs sm:text-sm leading-relaxed max-w-[280px] group-hover:text-white/70 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  {s.desc}
                </p>
              </div>

              {/* Bottom border accent on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white/60 group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
