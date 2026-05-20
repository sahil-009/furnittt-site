import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-anim",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
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
    <section id="about" ref={ref} className="py-20 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8">

        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6 md:gap-8">
          <div className="about-anim w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
              alt="Elegant living room"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="about-anim flex flex-col items-start gap-4 px-2">
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wider uppercase border border-foreground/20 rounded-full px-4 py-1.5">
              Gorgeous Interior
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none text-foreground">
              Modern<br />Minimalist
            </h2>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-[400px] xl:w-[450px] flex flex-col gap-6 md:gap-8 lg:pt-0">

          {/* Top Beige Card */}
          <div className="about-anim bg-[#F2ECE4] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 flex flex-col justify-between h-auto min-h-[250px] sm:h-[300px] lg:h-[350px]">
            <div className="space-y-4">
              <span className="inline-block text-[10px] font-semibold tracking-wider uppercase border border-foreground/10 rounded-full px-3 py-1 bg-white/50">
                Aesthetic
              </span>
              <p className="text-xs md:text-sm font-sans font-normal text-foreground/80 leading-relaxed max-w-[200px]">
                Aesthetic furniture where every piece tells a story of style
              </p>
            </div>
            <h3 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mt-6">
              Into a gallery<br />of elegance
            </h3>
          </div>

          {/* Bottom Image Card */}
          <div className="about-anim relative h-[250px] sm:h-[300px] lg:h-[400px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80"
              alt="Artistic furniture piece"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            <div className="absolute top-6 left-6 right-6">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-white/90">
                Best Furniture
              </span>
              <p className="text-white text-sm md:text-base font-sans font-normal mt-2 max-w-[200px] leading-snug">
                Indulge in the artistry of chic living today
              </p>
            </div>
            <div className="absolute bottom-6 right-6 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/80 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
