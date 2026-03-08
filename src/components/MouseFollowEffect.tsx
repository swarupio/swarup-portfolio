import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseFollowEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Glow orb */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.03) 0%, transparent 70%)",
        }}
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />
      {/* Small dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-primary/20"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 500 }}
      />
    </div>
  );
};

export default MouseFollowEffect;
