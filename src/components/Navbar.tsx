import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(logoRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    if (linksRef.current) {
      tl.fromTo(linksRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      );
    }

    tl.fromTo(ctaRef.current,
      { y: -20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
            ? "py-2 px-4 sm:px-6"
            : "py-2 sm:py-3 px-4 sm:px-8"
          }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
              ? "bg-white/70 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/40 rounded-full px-6 sm:px-8 h-14 sm:h-16"
              : "bg-transparent px-2 sm:px-4 h-20"
            }`}
        >
          {/* Logo */}
          <a
            ref={logoRef}
            href="#"
            className="group flex items-center gap-2 relative z-10"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              Furnit
            </span>
            <span className="text-xl sm:text-2xl font-light tracking-tight text-foreground/60 group-hover:text-foreground transition-colors duration-300">
              Interiors
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/80 group-hover:scale-150 transition-transform duration-300 ml-0.5"></span>
          </a>

          {/* Desktop Links */}
          <div ref={linksRef} className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-[13px] font-medium tracking-wide text-foreground/60 hover:text-foreground transition-all duration-300 px-4 py-2 rounded-full hover:bg-foreground/5 group"
              >
                {l.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div ref={ctaRef} className="hidden md:block">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3)] hover:scale-[1.03] active:scale-[0.97]"
            >
              <span className="relative z-10">Get in Touch</span>
              <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <span className={`absolute left-0 block w-5 h-[1.5px] bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "top-[9px] rotate-45" : "top-[4px]"}`}></span>
              <span className={`absolute left-0 top-[9px] block w-5 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 translate-x-2" : "opacity-100"}`}></span>
              <span className={`absolute left-0 block w-5 h-[1.5px] bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "top-[9px] -rotate-45" : "top-[14px]"}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/98 backdrop-blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-4xl sm:text-5xl font-serif font-medium text-foreground hover:text-primary transition-all duration-300 hover:tracking-wider"
                style={{
                  transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${mobileOpen ? i * 80 : 0}ms`,
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(30px)",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-12 inline-flex items-center gap-2 bg-foreground text-background px-10 py-4 rounded-full text-sm font-semibold tracking-wider uppercase"
            style={{
              transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${mobileOpen ? navLinks.length * 80 + 100 : 0}ms`,
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(30px)",
            }}
          >
            Get in Touch
            <ArrowUpRight size={16} />
          </a>

          {/* Bottom info */}
          <div
            className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-6 text-xs text-foreground/40 tracking-wider"
            style={{
              transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${mobileOpen ? navLinks.length * 80 + 200 : 0}ms`,
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <span>+91 9581017161</span>
            <span className="w-1 h-1 bg-foreground/20 rounded-full"></span>
            <span>Bengaluru, India</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
