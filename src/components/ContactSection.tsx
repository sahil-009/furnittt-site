import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-anim").forEach((el, i) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: i * 0.05, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-24 md:py-36 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground border border-border px-4 py-1.5 rounded-full mb-6">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light">Let's Create Together</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div className="contact-anim opacity-0 bg-background/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-border">
            <div className="space-y-5">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-transparent border-border rounded-xl h-12"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-transparent border-border rounded-xl h-12"
              />
              <Input
                placeholder="Phone (+91)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-transparent border-border rounded-xl h-12"
              />
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full h-12 rounded-xl border border-border bg-transparent px-3 text-sm text-foreground"
              >
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="commercial">Commercial</option>
                <option value="other">Other</option>
              </select>
              <Textarea
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-transparent border-border rounded-xl min-h-[120px]"
              />
              <button className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors">
                Begin Your Design Journey →
              </button>
            </div>
          </div>
          <div className="space-y-10">
            <div className="contact-anim opacity-0 flex gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">Studio Address</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  2nd Floor, Plot No. 1234, Road No. 45,<br />
                  Jubilee Hills, Hyderabad  500033,<br />
                  Telangana, India
                </p>
              </div>
            </div>
            <div className="contact-anim opacity-0 flex gap-4">
              <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">Phone</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                <p className="text-sm text-muted-foreground">+91 40 2355 6789</p>
              </div>
            </div>
            <div className="contact-anim opacity-0 flex gap-4">
              <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">Email</p>
                <p className="text-sm text-muted-foreground">hello@ruinteriordesigns.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
