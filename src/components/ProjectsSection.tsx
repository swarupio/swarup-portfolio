import AnimatedSection from "./AnimatedSection";
import Tilt3DCard from "./Tilt3DCard";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Splitr",
    type: "Web App",
    description: "A web-based Splitwise clone designed for expense tracking and optimization among groups.",
    tech: "React, Node.js, MongoDB",
    link: "https://splitr-4pfu.vercel.app/",
  },
  {
    name: "ACM.DBIT Website",
    type: "Community Platform",
    description: "Developed a platform for the ACM club to showcase workshops, events, and member contributions.",
    tech: "HTML, JavaScript, CSS",
    link: "https://github.com/swarupio/ACM.DBIT-WEBSITE",
  },
  {
    name: "SocioSquad",
    type: "Social Platform",
    description: "A comprehensive volunteering platform for individuals and NGOs to connect, schedule events, and share impact stories.",
    tech: "React, Node.js, PostgreSQL, Supabase",
    link: "https://sociosquad.lovable.app",
  },
];

const ProjectsSection = () => {
  return (
    <div className="border-b">
      <AnimatedSection>
        <div className="p-6 md:p-12 border-b">
          <h2 className="font-serif text-2xl md:text-4xl italic">Featured Works</h2>
        </div>
      </AnimatedSection>
      {projects.map((project, i) => (
        <AnimatedSection key={project.name} delay={i * 0.1}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-6 md:p-12 hover:bg-secondary/50 transition-all duration-300 group ${i < projects.length - 1 ? "border-b" : ""}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-xl md:text-3xl italic group-hover:underline">{project.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground border px-2 py-1">
                  {project.type}
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
            <p className="text-muted-foreground mb-3 max-w-xl">{project.description}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{project.tech}</p>
          </a>
        </AnimatedSection>
      ))}
    </div>
  );
};

export default ProjectsSection;
