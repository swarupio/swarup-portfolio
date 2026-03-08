import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface HeroSectionProps {
  isDark: boolean;
  onToggle: () => void;
}

const HeroSection = ({ isDark, onToggle }: HeroSectionProps) => {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-IN", { hour12: false, timeZone: "Asia/Kolkata" });
  const formattedDate = time.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).toUpperCase();

  return (
    <>
      {/* Desktop nav */}
      <div className="border-b hidden md:grid grid-cols-4 text-xs uppercase tracking-widest font-medium">
        <div className="p-4 border-r">
          <span>Swarup Patil</span>
        </div>
        <div
          className="p-4 border-r cursor-pointer hover:bg-secondary transition-colors select-none"
          onClick={onToggle}
        >
          {isDark ? "Dark Mode" : "Light Mode"}
        </div>
        <div className="p-4 border-r">
          <span>Mumbai, IN</span>
          <span className="ml-4 font-mono">{formattedTime}</span>
        </div>
        <div className="p-4">{formattedDate}</div>
      </div>

      {/* Mobile nav */}
      <div className="border-b md:hidden flex items-center justify-between px-4 py-3">
        <span className="text-xs uppercase tracking-widest font-medium">Swarup Patil</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono">{formattedTime}</span>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-b divide-y text-xs uppercase tracking-widest font-medium"
        >
          <div
            className="p-4 cursor-pointer hover:bg-secondary transition-colors select-none"
            onClick={() => { onToggle(); setMenuOpen(false); }}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </div>
          <div className="p-4">Mumbai, IN</div>
          <div className="p-4">{formattedDate}</div>
        </motion.div>
      )}

      {/* Big name + status badge */}
      <div className="border-b py-12 md:py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-4"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider border px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to Opportunities
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-5xl md:text-8xl lg:text-9xl tracking-tighter"
        >
          SWARUP PATIL
        </motion.h1>
      </div>
    </>
  );
};

export default HeroSection;
