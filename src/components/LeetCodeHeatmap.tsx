import { useEffect, useState } from "react";

interface CalendarData {
  [timestamp: string]: number;
}

const USERNAME = "swarup__";

const LeetCodeHeatmap = () => {
  const [calendar, setCalendar] = useState<CalendarData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const response = await fetch("https://leetcode.com/graphql/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query userProfileCalendar($username: String!, $year: Int) {
                matchedUser(username: $username) {
                  userCalendar(year: $year) {
                    submissionCalendar
                  }
                }
              }
            `,
            variables: { username: USERNAME, year: new Date().getFullYear() },
          }),
        });
        const data = await response.json();
        const calStr = data?.data?.matchedUser?.userCalendar?.submissionCalendar;
        if (calStr) {
          setCalendar(JSON.parse(calStr));
        }
      } catch (err) {
        console.error("Failed to fetch LeetCode calendar:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendar();
  }, []);

  // Build weeks for the last 52 weeks
  const now = new Date();
  const weeks: { date: Date; count: number }[][] = [];

  // Start from 52 weeks ago, aligned to Sunday
  const start = new Date(now);
  start.setDate(start.getDate() - (52 * 7) - start.getDay());

  let currentWeek: { date: Date; count: number }[] = [];
  const cursor = new Date(start);

  while (cursor <= now) {
    const ts = Math.floor(new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()).getTime() / 1000).toString();
    currentWeek.push({
      date: new Date(cursor),
      count: calendar[ts] || 0,
    });

    if (cursor.getDay() === 6 || cursor.getTime() >= now.getTime()) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    cursor.setDate(cursor.getDate() + 1);
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const getColor = (count: number): string => {
    if (count === 0) return "bg-muted";
    if (count <= 1) return "bg-purple-300 dark:bg-purple-800";
    if (count <= 3) return "bg-purple-400 dark:bg-purple-600";
    if (count <= 5) return "bg-purple-500 dark:bg-purple-500";
    return "bg-purple-600 dark:bg-purple-400";
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Determine month labels
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week[0];
    if (firstDay && firstDay.date.getMonth() !== lastMonth) {
      lastMonth = firstDay.date.getMonth();
      monthLabels.push({ label: months[lastMonth], col: i });
    }
  });

  if (loading) {
    return (
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Submission Heatmap</p>
        <div className="h-24 flex items-center justify-center text-sm text-muted-foreground">
          Loading heatmap...
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

      <div className="overflow-x-auto">
        {/* Month labels */}
        <div className="flex gap-[3px] mb-1 ml-0">
          {monthLabels.map((m, i) => (
            <span
              key={i}
              className="text-[9px] text-muted-foreground"
              style={{ position: "relative", left: `${m.col * 13}px` }}
            >
              {i === 0 || monthLabels[i].col - (monthLabels[i - 1]?.col || 0) > 3 ? m.label : ""}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week[di];
                if (!day) return <div key={di} className="w-[10px] h-[10px]" />;
                return (
                  <div
                    key={di}
                    className={`w-[10px] h-[10px] rounded-full ${getColor(day.count)} transition-colors`}
                    title={`${day.date.toLocaleDateString()}: ${day.count} submission${day.count !== 1 ? "s" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="w-[10px] h-[10px] rounded-full bg-muted" />
        <div className="w-[10px] h-[10px] rounded-full bg-purple-300 dark:bg-purple-800" />
        <div className="w-[10px] h-[10px] rounded-full bg-purple-400 dark:bg-purple-600" />
        <div className="w-[10px] h-[10px] rounded-full bg-purple-500" />
        <div className="w-[10px] h-[10px] rounded-full bg-purple-600 dark:bg-purple-400" />
        <span>More</span>
      </div>
    </div>
  );
};

export default LeetCodeHeatmap;
