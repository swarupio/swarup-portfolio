import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen max-w-4xl mx-auto border-x bg-background">
      <HeroSection />
      <main className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left column */}
        <div className="lg:col-span-7 lg:border-r">
          <AboutSection />
          <ProjectsSection />
          <LeetCodeSection />
        </div>
        {/* Right column */}
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
