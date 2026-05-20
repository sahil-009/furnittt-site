import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What interior design services do you offer?",
    a: "We offer a comprehensive range of design services including space planning, concept design, 3D visualization, material selection, and full execution for residential and commercial spaces."
  },
  {
    q: "Do you handle both design and execution?",
    a: "Yes, we provide end-to-end turnkey solutions. Our team handles everything from the initial design concept through to the complete execution and final handover."
  },
  {
    q: "How long does an interior project take?",
    a: "The timeline varies based on the scope and complexity of the project. A typical residential project can take anywhere from 8 to 16 weeks from design approval to final handover."
  },
  {
    q: "How do I get started?",
    a: "You can start by contacting us through our website, calling our direct lines, or visiting our studio. We'll schedule an initial consultation to understand your requirements."
  },
  {
    q: "Need to know more about our services?",
    a: "Feel free to reach out to our team at any time or explore our detailed services section on the website. We're always happy to answer any specific questions you might have."
  }
];

const FaqSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-header",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );

      gsap.fromTo(".faq-content",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-[#F9F8F6] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>

      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="faq-header text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-foreground/30"></span>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50">Common Questions</span>
            <span className="w-12 h-[1px] bg-foreground/30"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-foreground tracking-tight">
            Frequently Asked
          </h2>
        </div>
        
        <div className="faq-content">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-foreground/10">
                <AccordionTrigger className="text-left text-base md:text-lg font-serif hover:no-underline hover:text-primary transition-colors py-7 md:py-8">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/50 leading-relaxed text-sm md:text-base pb-8 font-sans font-normal">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
