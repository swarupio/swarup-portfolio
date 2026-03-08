import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import FooterSection from "@/components/FooterSection";
import avatarImg from "@/assets/avatar.png";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen max-w-4xl mx-auto border-x bg-background text-foreground transition-colors duration-300">
      <HeroSection isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <main className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:border-r">
          <AboutSection />
          <ProjectsSection />
          <LeetCodeSection />
        </div>
        <div className="lg:col-span-5">
          {/* Avatar - like reference site */}
          <div className="border-b flex justify-center bg-secondary/30 overflow-hidden">
            <div className="w-full h-48 md:h-64 flex items-center justify-center">
              <img
                src={avatarImg}
                alt="Swarup Patil avatar"
                className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          <ExperienceSection />
          <SkillsSection />
          <EducationSection />
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
