import AnimatedSection from "./AnimatedSection";

const experiences = [
  {
    role: "Asst. DSA Expert",
    org: "GDG DBIT",
    period: "Oct 2025 – Present",
    badge: "Active",
    description: "Assisting in curating DSA content, mentoring peers, and driving structured problem-solving initiatives. Contributed to organizing a structured 45-day DSA Bootcamp series.",
  },
  {
    role: "Tech Team Member",
    org: "ACM DBIT",
    period: "Sept 2025 – Present",
    badge: "Active",
    description: "Active member contributing to technical events, documentation, and building tools for the ACM chapter.",
  },
  {
    role: "Volunteer",
    org: "National Service Scheme (NSS)",
    period: "2024 – Present",
    badge: "Community",
    description: "Demonstrating community engagement through social service drives, teamwork, and leadership on campus.",
  },
];

const ExperienceSection = () => {
  return (
    <AnimatedSection>
      <div className="p-6 md:p-12 border-b">
        <h2 className="font-serif text-2xl md:text-4xl italic mb-8">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.role + exp.org}>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-base">{exp.org}</h3>
                <span className="text-[10px] uppercase tracking-wider border px-2 py-0.5 text-muted-foreground">
                  {exp.badge}
                </span>
              </div>
              <p className="text-sm italic text-muted-foreground mb-1">{exp.role} · {exp.period}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ExperienceSection;
