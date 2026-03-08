import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import FooterSection from "@/components/FooterSection";

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
          <ExperienceSection />
          <SkillsSection />
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
