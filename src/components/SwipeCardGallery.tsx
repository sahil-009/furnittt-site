import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images-for-everything/spacejoy-KJUGhE9ojro-unsplash.jpg",
    title: "The Penthouse Suite",
    location: "Bengaluru"
  },
  {
    src: "/images-for-everything/spacejoy-TjBKSTxWxQA-unsplash.jpg",
    title: "Coastal Retreat",
    location: "Pune"
  },
  {
    src: "/images-for-everything/spacejoy-V9BfXrN0ezM-unsplash.jpg",
    title: "Urban Loft",
    location: "Mumbai"
  },
  {
    src: "/images-for-everything/spacejoy-Cc-grZAayAk-unsplash.jpg",
    title: "Heritage Mansion",
    location: "Delhi"
  },
  {
    src: "/images-for-everything/spacejoy-TjBKSTxWxQA-unsplash (1).jpg",
    title: "Sky Garden Villa",
    location: "Hyderabad"
  }
];

interface CardProps {
  image: typeof images[0];
  stackIndex: number;
  totalVisible: number;
  onSwipe: () => void;
  active: boolean;
}

const DraggableCard = ({ image, stackIndex, totalVisible, onSwipe, active }: CardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const skipOpacity = useTransform(x, [-80, 0], [1, 0]);

  const depth = stackIndex;
  const cardScale = 1 - depth * 0.06;
  const cardY = depth * 14;
  const cardRotate = depth * 1.5;

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 60;
    const velocityThreshold = 200;

    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocityThreshold) {
      const flyDirection = info.offset.x > 0 ? 1 : -1;
      animate(x, flyDirection * 600, {
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
        onComplete: () => {
          x.set(0);
          onSwipe();
        },
      });
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  if (active) {
    return (
      <motion.div
        className="absolute top-0 left-1/2 cursor-grab active:cursor-grabbing touch-none"
        style={{
          x,
          rotate,
          marginLeft: "-160px",
          width: "320px",
          zIndex: totalVisible + 1,
        }}
        drag="x"
        dragElastic={0.9}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      >
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] bg-white select-none">
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-1">
              {image.location}
            </p>
            <h3 className="text-white text-xl md:text-2xl font-serif font-medium">
              {image.title}
            </h3>
          </div>

          {/* Like indicator */}
          <motion.div
            className="absolute top-5 left-5 bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full pointer-events-none"
            style={{ opacity: likeOpacity }}
          >
            Love ♥
          </motion.div>

          {/* Skip indicator */}
          <motion.div
            className="absolute top-5 right-5 bg-rose-500 text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full pointer-events-none"
            style={{ opacity: skipOpacity }}
          >
            Next →
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Background stacked cards (non-draggable)
  return (
    <motion.div
      className="absolute top-0 left-1/2 pointer-events-none"
      animate={{
        scale: cardScale,
        y: cardY,
        rotate: cardRotate,
        opacity: 1 - depth * 0.2,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{
        marginLeft: "-160px",
        width: "320px",
        zIndex: totalVisible - depth,
      }}
    >
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] bg-white">
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
};

const SwipeCardGallery = () => {
  const [order, setOrder] = useState(images.map((_, i) => i));
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSwipe = () => {
    setOrder((prev) => {
      const newOrder = [...prev];
      const swiped = newOrder.shift()!;
      newOrder.push(swiped);
      return newOrder;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gallery-header",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
      gsap.fromTo(".gallery-stack",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const visibleCards = order.slice(0, 4);

  return (
    <section id="portfolio" ref={sectionRef} className="py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-[#F9F8F6] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
      <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="gallery-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-foreground/30"></span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50">Portfolio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
              View Our<br />Works
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-foreground/50 text-sm md:text-base font-sans font-normal leading-relaxed mb-4"><b>Swipe through</b> our curated collection of handcrafted interiors. Each project tells a unique story.</p>
            <p className="text-foreground/30 text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              <b>Drag to explore</b>
            </p>
          </div>
        </div>

        {/* Card Stack */}
        <div className="gallery-stack flex items-center justify-center relative" style={{ height: "500px" }}>
          <div className="relative w-[320px] h-full">
            {visibleCards.map((imgIndex, stackIndex) => (
              <DraggableCard
                key={`card-${imgIndex}`}
                image={images[imgIndex]}
                stackIndex={stackIndex}
                totalVisible={visibleCards.length}
                onSwipe={handleSwipe}
                active={stackIndex === 0}
              />
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${order[0] === i ? "bg-foreground w-8" : "bg-foreground/15 w-2"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SwipeCardGallery;
