import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add CORS headers for the proxy if needed (the edge function had it)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version"
    );
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
  });

  app.get("/api/leetcode-calendar", async (req, res) => {
    try {
      const username = req.query.username || "swarup__";
      const yearParam = req.query.year;
      const year = yearParam ? parseInt(yearParam as string, 10) : new Date().getUTCFullYear();

      const query = `
        query userFull($username: String!, $year: Int) {
          allQuestionsCount { difficulty count }
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum { difficulty count submissions }
              totalSubmissionNum { difficulty count submissions }
            }
            userCalendar(year: $year) {
              activeYears
              streak
              totalActiveDays
              submissionCalendar
            }
          }
        }
      `;

      const lcRes = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": `https://leetcode.com/u/${username}/`,
          "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
        },
        body: JSON.stringify({
          query,
          variables: { username, year },
          operationName: "userFull",
        }),
      });

      if (!lcRes.ok) {
        const text = await lcRes.text();
        return res.status(502).json({ error: `LeetCode request failed [${lcRes.status}]`, details: text });
      }

      const data = await lcRes.json();
      const user = data?.data?.matchedUser;
      const cal = user?.userCalendar;
      if (!user || !cal) {
        return res.status(404).json({ error: "User not found or no calendar data", raw: data });
      }

      const submissionCalendar =
        typeof cal.submissionCalendar === "string"
          ? JSON.parse(cal.submissionCalendar)
          : cal.submissionCalendar;

      const days = Object.keys(submissionCalendar)
        .map((t) => parseInt(t, 10))
        .filter((t) => (submissionCalendar[t.toString()] || 0) > 0)
        .sort((a, b) => a - b);
      let maxStreak = 0;
      let cur = 0;
      let prev = 0;
      for (const t of days) {
        if (prev && t - prev === 86400) cur += 1;
        else cur = 1;
        if (cur > maxStreak) maxStreak = cur;
        prev = t;
      }

      return res.json({
        year,
        username,
        activeYears: cal.activeYears,
        streak: cal.streak,
        maxStreak,
        totalActiveDays: cal.totalActiveDays,
        submissionCalendar,
        submitStats: user.submitStats,
        allQuestionsCount: data?.data?.allQuestionsCount,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      return res.status(500).json({ error: msg });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
