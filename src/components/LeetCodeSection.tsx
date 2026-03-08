const stats = [
  { label: "Problems Solved", value: "152" },
  { label: "Submissions", value: "575" },
  { label: "Max Streak", value: "54" },
  { label: "Acceptance Rate", value: "67.6%" },
];

const milestones = [
  { date: "Mar 2026", text: "150+ Problems Solved" },
  { date: "Feb 2026", text: "50 Days Badge" },
  { date: "Dec 2025", text: "100 Problems Solved" },
  { date: "Oct 2025", text: "Started LeetCode Journey" },
];

const topSkills = [
  { level: "Advanced", skills: "Dynamic Programming, Divide and Conquer, Trie" },
  { level: "Intermediate", skills: "Binary Search, Math, Hash Table" },
  { level: "Fundamental", skills: "Array, String, Sorting" },
];

const LeetCodeSection = () => {
  return (
    <div className="p-6 md:p-12 border-b">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl md:text-4xl italic">LeetCode</h2>
        <a
          href="https://leetcode.com/u/swarup__/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors underline"
        >
          View Profile →
        </a>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border p-4 text-center">
            <p className="font-serif text-2xl md:text-3xl">{s.value}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Breakdown bar */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Breakdown</p>
        <div className="flex h-3 overflow-hidden border">
          <div className="bg-green-600" style={{ width: `${(92 / 152) * 100}%` }} title="Easy: 92" />
          <div className="bg-amber-500" style={{ width: `${(57 / 152) * 100}%` }} title="Medium: 57" />
          <div className="bg-red-500" style={{ width: `${(3 / 152) * 100}%` }} title="Hard: 3" />
        </div>
        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-600 inline-block" /> Easy 92/930</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 inline-block" /> Medium 57/2021</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 inline-block" /> Hard 3/913</span>
        </div>
      </div>

      {/* Top Skills */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Top Skills</p>
        {topSkills.map((s) => (
          <div key={s.level} className="flex justify-between py-1.5 border-b last:border-b-0">
            <span className="text-sm font-medium">{s.level}</span>
            <span className="text-sm text-muted-foreground">{s.skills}</span>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Milestones</p>
        {milestones.map((m) => (
          <div key={m.date} className="flex gap-4 py-1.5 border-b last:border-b-0">
            <span className="text-xs uppercase tracking-wider text-muted-foreground w-20 shrink-0">{m.date}</span>
            <span className="text-sm">{m.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeetCodeSection;
