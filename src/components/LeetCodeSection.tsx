import { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import LeetCodeHeatmap from "./LeetCodeHeatmap";

const PERSONAL_SUPABASE_URL = "https://efpjuonqhumeaunexwyu.supabase.co";
const PERSONAL_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmcGp1b25xaHVtZWF1bmV4d3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODc3NTQsImV4cCI6MjA4ODU2Mzc1NH0.A2Q2k-p5gbRg8yoFx4FR8RqEQC5S4eosD63W_-q6ZNI";

const USERNAME = "swarup__";
const CACHE_KEY = "leetcode-data-v2";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

interface SubStat {
  difficulty: string;
  count: number;
  submissions: number;
}

interface LCData {
  calendar: Record<string, number>;
  acStats: SubStat[];
  totalQuestions: SubStat[];
  totalSolved: number;
  totalSubmissions: number;
  acceptanceRate: number;
  maxStreak: number;
}

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

const fnUrl = `${PERSONAL_SUPABASE_URL}/functions/v1/leetcode-calendar`;
const headers = {
  Authorization: `Bearer ${PERSONAL_SUPABASE_ANON_KEY}`,
  apikey: PERSONAL_SUPABASE_ANON_KEY,
};

const LeetCodeSection = () => {
  const [data, setData] = useState<LCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        // 24h cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.ts < CACHE_TTL_MS) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        }

        const currentYear = new Date().getUTCFullYear();
        const [curRes, prevRes] = await Promise.all([
          fetch(`${fnUrl}?username=${USERNAME}&year=${currentYear}`, { headers }),
          fetch(`${fnUrl}?username=${USERNAME}&year=${currentYear - 1}`, { headers }),
        ]);

        if (!curRes.ok) throw new Error(`HTTP ${curRes.status}`);
        const cur = await curRes.json();
        const prev = prevRes.ok ? await prevRes.json() : null;

        const calendar: Record<string, number> = {
          ...(prev?.submissionCalendar || {}),
          ...(cur?.submissionCalendar || {}),
        };

        const acStats: SubStat[] = cur?.submitStats?.acSubmissionNum || [];
        const totalSubArr: SubStat[] = cur?.submitStats?.totalSubmissionNum || [];
        const totalQuestions: SubStat[] = cur?.allQuestionsCount || [];

        const acAll = acStats.find((s) => s.difficulty === "All");
        const totAll = totalSubArr.find((s) => s.difficulty === "All");
        const totalSolved = acAll?.count ?? 0;
        const totalSubmissions = acAll?.submissions ?? 0;
        const acceptanceRate =
          totAll && totAll.submissions > 0
            ? ((acAll!.submissions / totAll.submissions) * 100)
            : 0;

        const result: LCData = {
          calendar,
          acStats,
          totalQuestions,
          totalSolved,
          totalSubmissions,
          acceptanceRate,
          maxStreak: cur?.maxStreak ?? 0,
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: result }));
        setData(result);
      } catch (err) {
        console.error("LeetCode fetch failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const get = (diff: string) => data?.acStats.find((s) => s.difficulty === diff)?.count ?? 0;
  const getTotal = (diff: string) => data?.totalQuestions.find((s) => s.difficulty === diff)?.count ?? 0;

  const easy = get("Easy");
  const medium = get("Medium");
  const hard = get("Hard");
  const total = easy + medium + hard || 1;

  const stats = [
    { label: "Problems Solved", value: data ? String(data.totalSolved) : "—" },
    { label: "Submissions", value: data ? String(data.totalSubmissions) : "—" },
    { label: "Max Streak", value: data ? String(data.maxStreak) : "—" },
    { label: "Acceptance Rate", value: data ? `${data.acceptanceRate.toFixed(1)}%` : "—" },
  ];

  return (
    <AnimatedSection>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="border p-4 text-center">
              <p className={`font-serif text-2xl md:text-3xl ${loading ? "animate-pulse" : ""}`}>{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <LeetCodeHeatmap calendar={data?.calendar || {}} loading={loading} error={error} />

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Breakdown</p>
          <div className="flex h-3 overflow-hidden border">
            <div className="bg-green-600" style={{ width: `${(easy / total) * 100}%` }} title={`Easy: ${easy}`} />
            <div className="bg-amber-500" style={{ width: `${(medium / total) * 100}%` }} title={`Medium: ${medium}`} />
            <div className="bg-red-500" style={{ width: `${(hard / total) * 100}%` }} title={`Hard: ${hard}`} />
          </div>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-600 inline-block" /> Easy {easy}/{getTotal("Easy")}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 inline-block" /> Medium {medium}/{getTotal("Medium")}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 inline-block" /> Hard {hard}/{getTotal("Hard")}</span>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Top Skills</p>
          {topSkills.map((s) => (
            <div key={s.level} className="flex justify-between py-1.5 border-b last:border-b-0">
              <span className="text-sm font-medium">{s.level}</span>
              <span className="text-sm text-muted-foreground">{s.skills}</span>
            </div>
          ))}
        </div>

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
    </AnimatedSection>
  );
};

export default LeetCodeSection;
