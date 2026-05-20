import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

gsap.registerPlugin(ScrollTrigger);

const LocationSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".loc-header",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      gsap.fromTo(".loc-card",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="loc-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-foreground/30"></span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50">Location</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
              Visit Our Studio
            </h2>
          </div>
          <p className="text-foreground/50 max-w-sm text-sm md:text-base font-sans font-normal leading-relaxed">
            We welcome you to experience our design philosophy in person.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Left: Contact Info & Form */}
          <div className="loc-card flex flex-col gap-6">
            {/* Contact Info Card */}
            <div className="bg-[#F9F8F6] p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem]">
              <h3 className="text-xl md:text-2xl font-serif font-medium mb-6">Contact Us</h3>
              <div className="space-y-4 text-foreground/60 text-sm md:text-base font-sans font-normal">
                <p>
                  <strong className="text-foreground block mb-1 font-semibold text-sm">Furnit</strong>
                  No. 238/1, Balaraju Building<br/>
                  17th, Begur Rd<br/>
                  Near St Francis School, Amalodhbhava Nagar<br/>
                  Begur, Bengaluru, Karnataka 560068
                </p>
                <div className="flex flex-col gap-1 mt-4">
                  <a href="tel:+919581017161" className="hover:text-foreground transition-colors">+91 9581017161</a>
                  <a href="tel:+918431473987" className="hover:text-foreground transition-colors">+91 8431473987</a>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-[#0F0F0F] p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem] flex-1">
              <h3 className="text-xl md:text-2xl font-serif font-medium mb-6 text-white">Send a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="Your Name" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-12" />
                <Input placeholder="Your Email" type="email" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-12" />
                <Input placeholder="Phone Number" type="tel" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-12" />
                <Textarea placeholder="How can we help you?" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl min-h-[120px]" />
                <button className="w-full bg-white text-black py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-white/90 transition-colors mt-2">
                  Submit Request
                </button>
              </form>
            </div>
          </div>

          {/* Right: Map */}
          <div className="loc-card h-[400px] lg:h-auto min-h-[500px] bg-muted rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.765804624346!2d77.5630727105839!3d12.922768299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e42dea70b1%3A0x215ba32c36807d67!2sFurnitt%20Design%20Studio!5e0!3m2!1sen!2sin!4v1748036400000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
