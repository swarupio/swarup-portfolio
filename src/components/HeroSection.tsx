import { useEffect, useState } from "react";

const HeroSection = () => {
  const [time, setTime] = useState(new Date());
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const formattedTime = time.toLocaleTimeString("en-IN", { hour12: false, timeZone: "Asia/Kolkata" });
  const formattedDate = time.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).toUpperCase();

  return (
    <>
      {/* Top nav bar */}
      <div className="border-b grid grid-cols-4 text-xs uppercase tracking-widest font-medium">
        <div className="p-4 border-r">
          <span>Swarup Patil</span>
        </div>
        <div
          className="p-4 border-r cursor-pointer hover:bg-secondary transition-colors select-none"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? "Light Edition" : "Dark Edition"}
        </div>
        <div className="p-4 border-r font-mono">{formattedTime}</div>
        <div className="p-4">{formattedDate}</div>
      </div>

      {/* Big name */}
      <div className="border-b py-12 md:py-20 px-6 text-center">
        <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl tracking-tighter">
          SWARUP PATIL
        </h1>
      </div>
    </>
  );
};

export default HeroSection;
