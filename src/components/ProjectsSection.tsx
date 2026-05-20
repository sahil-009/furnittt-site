         import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "The Penthouse Suite", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", tall: false },
  { title: "Coastal Retreat", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", tall: true },
  { title: "Urban Loft", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", tall: true },
  { title: "Heritage Mansion", img: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80", tall: false },
  { title: "Sky Garden", img: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80", tall: false },
  { title: "Minimalist Manor", img: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80", tall: false },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;

      gsap.fromTo(".project-anim",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: isMobile ? 0 : 0.2,
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
    <section id="projects" ref={ref} className="py-20 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <h2 className="project-anim font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] max-w-2xl">
            Explore Our Proudly<br />Collection
          </h2>
          <div className="project-anim flex flex-col items-start lg:items-end text-left lg:text-right max-w-sm gap-6">
            <button className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider hover:bg-black/80 transition-colors uppercase self-start lg:self-end">
              View More ↗
            </button>
            <p className="text-xs md:text-sm text-foreground/70 leading-relaxed font-medium">
              We showcase a vision of contemporary architecture, interior design trends, and innovative living reflecting modern timeless elegance.
            </p>
          </div>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px]">
          {projects.map((p, index) => (
            <div
              key={p.title}
              className={`project-anim group relative rounded-3xl overflow-hidden cursor-pointer ${p.tall ? 'row-span-2' : 'row-span-1'}`}
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <h3 className="text-white font-sans text-xl md:text-2xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
