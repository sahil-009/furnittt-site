import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    num: "01",
    title: "Discovery",
    desc: "We begin with deep listening — understanding your lifestyle, aspirations, and the stories you want your space to tell.",
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  },
  {
    num: "02",
    title: "Design",
    desc: "Translating your vision into comprehensive design concepts, mood boards, and detailed 3D spatial visualizations.",
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
  },
  {
    num: "03",
    title: "Execution",
    desc: "Our master craftsmen and project managers bring the design to life with unparalleled attention to detail.",
    icon: "M11.42 15.17l-5.6-5.6a1.5 1.5 0 010-2.12l.88-.88a1.5 1.5 0 012.12 0l3.54 3.54 7.07-7.07a1.5 1.5 0 012.12 0l.88.88a1.5 1.5 0 010 2.12L11.42 15.17z"
  },
  {
    num: "04",
    title: "Handover",
    desc: "The final reveal — a fully realized space where every element is perfected and ready for you to enjoy.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  }
];

const ProcessSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(".process-header",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      // Timeline line grows
      gsap.fromTo(".process-line",
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: ".process-steps", start: "top 80%" }
        }
      );

      // Cards stagger
      gsap.fromTo(".process-step",
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ".process-steps", start: "top 80%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className="py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#F9F8F6] rounded-full blur-[120px] translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Header */}
        <div className="process-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-28">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-foreground/30"></span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50">How We Work</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
              Our Process
            </h2>
          </div>
          <p className="text-foreground/50 max-w-sm text-sm md:text-base font-sans font-normal leading-relaxed">
            A seamless, curated journey from initial concept to the final, breathtaking reality of your space.
          </p>
        </div>

        {/* Process Steps */}
        <div className="process-steps relative">
          {/* Vertical timeline line - desktop */}
          <div className="process-line hidden lg:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-[1px] bg-foreground/10 origin-top"></div>

          <div className="flex flex-col gap-8 md:gap-12 lg:gap-0">
            {processes.map((p, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`process-step relative lg:flex lg:items-center lg:gap-16 ${isEven ? "" : "lg:flex-row-reverse"} ${i > 0 ? "lg:mt-[-40px]" : ""}`}>
                  {/* Content Card */}
                  <div className={`w-full lg:w-[calc(50%-40px)] ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                    <div className="group bg-[#F9F8F6] hover:bg-foreground p-8 md:p-10 lg:p-12 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden">
                      {/* Big background number */}
                      <span className="absolute -bottom-6 -right-4 text-[100px] md:text-[140px] font-serif font-bold text-black/[0.03] group-hover:text-white/[0.05] transition-colors duration-500 pointer-events-none select-none leading-none">
                        {p.num}
                      </span>

                      <div className="relative z-10">
                        <div className={`flex items-center gap-3 mb-6 ${isEven ? "lg:justify-end" : ""}`}>
                          <div className="w-10 h-10 rounded-xl bg-foreground/5 group-hover:bg-white/10 flex items-center justify-center transition-colors duration-500">
                            <svg className="w-5 h-5 text-foreground/40 group-hover:text-white/60 transition-colors duration-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold tracking-widest text-foreground/40 group-hover:text-white/50 transition-colors duration-500 uppercase">
                            Step {p.num}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-serif text-foreground group-hover:text-white mb-4 transition-colors duration-500">
                          {p.title}
                        </h3>
                        <p className="text-foreground/50 text-sm md:text-base font-sans font-normal leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot - desktop */}
                  <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-5 h-5">
                    <div className="w-3 h-3 rounded-full bg-foreground/20 border-2 border-white group-hover:bg-primary transition-colors duration-500"></div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden lg:block w-[calc(50%-40px)]"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
