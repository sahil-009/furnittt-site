import { useState, useEffect } from "react";

const FloatingWhatsApp = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show button after 2 seconds
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Auto-show tooltip after 4 seconds
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setShowTooltip(true);
      const t2 = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(t2);
    }, 1500);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div
      className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.8)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Tooltip / Chat bubble */}
      <div
        className="relative bg-white rounded-2xl rounded-br-sm shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)] border border-black/5 px-4 py-3 max-w-[200px] pointer-events-none"
        style={{
          opacity: showTooltip || hovered ? 1 : 0,
          transform: showTooltip || hovered ? "translateY(0) scale(1)" : "translateY(8px) scale(0.95)",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="text-[11px] font-semibold text-gray-800 leading-relaxed">
          👋 Hi! Need help with your interior?
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">Chat with us on WhatsApp</p>
        {/* Arrow */}
        <div className="absolute -bottom-2 right-3 w-3 h-3 bg-white border-r border-b border-black/5 rotate-45" />
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919581017161?text=Hi%20Furnit!%20I'm%20interested%20in%20your%20interior%20design%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: hovered
            ? "0 12px 40px -8px rgba(37,211,102,0.6), 0 0 0 8px rgba(37,211,102,0.12)"
            : "0 8px 32px -8px rgba(37,211,102,0.5), 0 0 0 6px rgba(37,211,102,0.08)",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Pulse rings */}
        {!hovered && (
          <>
            <span
              className="absolute inset-0 rounded-full bg-[#25D366]"
              style={{
                animation: "whatsappPulse 2.5s ease-out infinite",
                opacity: 0,
              }}
            />
            <span
              className="absolute inset-0 rounded-full bg-[#25D366]"
              style={{
                animation: "whatsappPulse 2.5s ease-out infinite 0.8s",
                opacity: 0,
              }}
            />
          </>
        )}

        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-7 h-7 fill-white relative z-10"
          style={{
            transform: hovered ? "rotate(-10deg) scale(1.1)" : "rotate(0deg) scale(1)",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-23.1-115-65.1-157zM223.9 413.5c-33.1 0-65.5-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.3l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.9 83-184.9 184.9-184.9 54.3 0 105.4 21.2 143.8 59.5 38.4 38.3 59.5 89.4 59.5 143.8 0 101.9-82.9 184.9-184.9 184.9zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.2 7.6-14.1 1.4-2.8 2.8-5.2 3.2-7.1.4-1.9-.2-3.6-1.1-5-1.1-1.9-13-31.5-17.8-43-4.7-11.3-9.4-9.8-12.5-9.9-3-.1-6.5-.1-10-.1-3.7 0-9.7 1.4-14.8 7-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.7 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>

      <style>{`
        @keyframes whatsappPulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingWhatsApp;
