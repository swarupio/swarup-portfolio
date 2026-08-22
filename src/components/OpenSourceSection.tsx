import AnimatedSection from "./AnimatedSection";

const stats = [
  { label: "Global Rank", value: "#113" },
  { label: "PRs Merged", value: "95" },
  { label: "Projects", value: "10" },
];

const badges = [
  "GSSoC Champion",
  "Elite",
  "Prolific",
  "Power Contributor",
  "On a Roll",
  "Rising Star",
];

const topProjects = [
  { name: "commitpulse", prs: 37 },
  { name: "internhack", prs: 21 },
  { name: "easemotion-css", prs: 18 },
  { name: "draftdeckai", prs: 11 },
];

const OpenSourceSection = () => {
  return (
    <AnimatedSection className="flex-1 flex flex-col">
      <div className="p-6 md:p-12 border-b flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-2">
          <h2 className="font-serif text-2xl md:text-4xl italic">Open Source</h2>
          <a
            href="https://gssoc.girlscript.org/profile/c39a9029-443a-43ed-ac9b-e6a8cc284855"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors underline"
          >
            GSSoC Profile →
          </a>
        </div>
        <p className="text-sm italic text-muted-foreground mb-8">GirlScript Summer of Code (May'26 – August'26)</p>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="border p-4 text-center">
              <p className="font-serif text-2xl md:text-3xl">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Top Projects</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {topProjects.map((p) => (
              <span key={p.name} className="text-sm">
                {p.name} <span className="text-muted-foreground">({p.prs} PRs)</span>
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Badges Earned</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="text-[10px] uppercase tracking-wider border px-2 py-0.5 text-muted-foreground">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default OpenSourceSection;
