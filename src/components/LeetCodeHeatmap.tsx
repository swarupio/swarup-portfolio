import { useEffect, useState } from "react";

interface CalendarData {
  [timestamp: string]: number;
}

const USERNAME = "swarup__";

const LeetCodeHeatmap = () => {
  const [calendar, setCalendar] = useState<CalendarData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${USERNAME}`);
        const data = await res.json();
        if (data?.submissionCalendar) {
          const parsed = typeof data.submissionCalendar === "string"
            ? JSON.parse(data.submissionCalendar)
            : data.submissionCalendar;
          setCalendar(parsed);
        }
      } catch (err) {
        console.error("Failed to fetch LeetCode calendar:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendar();
  }, []);

  // Build 52 weeks of data
  const now = new Date();
  const weeks: { date: Date; count: number }[][] = [];

  const start = new Date(now);
  start.setDate(start.getDate() - (52 * 7) - start.getDay());

  let currentWeek: { date: Date; count: number }[] = [];
  const cursor = new Date(start);

  while (cursor <= now) {
    const ts = Math.floor(
      Date.UTC(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()) / 1000,
    ).toString();
    currentWeek.push({ date: new Date(cursor), count: calendar[ts] || 0 });

    if (cursor.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const getColor = (count: number): string => {
    if (count === 0) return "heatmap-0";
    if (count <= 1) return "heatmap-1";
    if (count <= 3) return "heatmap-2";
    if (count <= 5) return "heatmap-3";
    return "heatmap-4";
  };

  if (loading) {
    return (
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Submission Heatmap</p>
        <div className="h-24 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
          Loading heatmap...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Submission Heatmap</p>
        <div className="h-24 flex items-center justify-center text-sm text-muted-foreground">
          Could not load heatmap data
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Submission Heatmap</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Last Year</p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week[di];
                if (!day) return <div key={di} className="w-2.5 h-2.5" />;
                return (
                  <div
                    key={di}
                    className={`w-2.5 h-2.5 rounded-full ${getColor(day.count)}`}
                    title={`${day.date.toLocaleDateString()}: ${day.count} submission${day.count !== 1 ? "s" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded-full heatmap-0" />
        <div className="w-2.5 h-2.5 rounded-full heatmap-1" />
        <div className="w-2.5 h-2.5 rounded-full heatmap-2" />
        <div className="w-2.5 h-2.5 rounded-full heatmap-3" />
        <div className="w-2.5 h-2.5 rounded-full heatmap-4" />
        <span>More</span>
      </div>
    </div>
  );
};

export default LeetCodeHeatmap;
