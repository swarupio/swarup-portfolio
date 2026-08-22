import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import FooterSection from "@/components/FooterSection";
import MouseFollowEffect from "@/components/MouseFollowEffect";

import OpenSourceSection from "@/components/OpenSourceSection";

const Index = () => {
  const [isDark, setIsDark] = useState(true);

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
      <MouseFollowEffect />
      <HeroSection isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <main className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:border-r flex flex-col">
          <AboutSection />
          <ProjectsSection />
          <LeetCodeSection />
          <EducationSection />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <div className="hidden lg:flex border-b w-full overflow-hidden">
            <img src="/batman.png" alt="batman" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <ExperienceSection />
          <SkillsSection />
          <OpenSourceSection />
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
