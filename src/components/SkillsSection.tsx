const skillCategories = [
  {
    label: "LANGUAGES",
    skills: [
      { name: "Java", level: "EXP" },
      { name: "JavaScript", level: "EXP" },
      { name: "HTML", level: "EXP" },
      { name: "CSS", level: "EXP" },
    ],
  },
  {
    label: "FRONTEND",
    skills: [
      { name: "React", level: "EXP" },
      { name: "Shadcn/UI", level: "INT" },
    ],
  },
  {
    label: "BACKEND & DB",
    skills: [
      { name: "Node.js", level: "EXP" },
      { name: "MongoDB", level: "INT" },
      { name: "Supabase", level: "INT" },
      { name: "Firebase", level: "INT" },
      { name: "Convex", level: "BEG" },
      { name: "Inngest", level: "BEG" },
    ],
  },
  {
    label: "TOOLS",
    skills: [
      { name: "Git", level: "EXP" },
      { name: "GitHub", level: "EXP" },
      { name: "AWS", level: "BEG" },
      { name: "Claude", level: "EXP" },
      { name: "Cursor", level: "EXP" },
    ],
  },
  {
    label: "INTERESTS",
    skills: [
      { name: "Open Source", level: "" },
      { name: "Game Dev", level: "" },
      { name: "WebSockets", level: "" },
    ],
  },
];

const SkillsSection = () => {
  return (
    <div className="p-6 md:p-12 border-b">
      <h2 className="font-serif text-2xl md:text-4xl italic mb-8">Tools & Tech</h2>
      <div className="space-y-6">
        {skillCategories.map((cat) => (
          <div key={cat.label}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">{cat.label}</p>
            <div className="space-y-0">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="flex justify-between items-center py-1.5 border-b last:border-b-0">
                  <span className="text-sm font-medium">{skill.name}</span>
                  {skill.level && (
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">[{skill.level}]</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
