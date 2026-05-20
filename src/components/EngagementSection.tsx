import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EngagementSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".engage-anim").forEach((el) => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-36 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="engage-anim opacity-0 font-serif text-3xl md:text-5xl font-light mb-6">
          Engage With Us<br /><em>in Conversation</em>
        </h2>
        <p className="engage-anim opacity-0 text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
          Every great interior begins with a meaningful dialogue. Let's discuss your vision and explore how we can bring it to life.
        </p>
        <a
          href="#contact"
          className="engage-anim opacity-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
        >
          Start Your Design Journey →
        </a>
      </div>
    </section>
  );
};

export default EngagementSection;
