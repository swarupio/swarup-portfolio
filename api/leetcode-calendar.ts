export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username") || "swarup__";
    const yearParam = url.searchParams.get("year");
    const year = yearParam ? parseInt(yearParam, 10) : new Date().getUTCFullYear();

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
      return new Response(JSON.stringify({ error: `LeetCode request failed [${lcRes.status}]`, details: text }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await lcRes.json();
    const user = data?.data?.matchedUser;
    const cal = user?.userCalendar;

    if (!user || !cal) {
      return new Response(JSON.stringify({ error: "User not found or no calendar data", raw: data }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
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

    return new Response(JSON.stringify({
      year,
      username,
      activeYears: cal.activeYears,
      streak: cal.streak,
      maxStreak,
      totalActiveDays: cal.totalActiveDays,
      submissionCalendar,
      submitStats: user.submitStats,
      allQuestionsCount: data?.data?.allQuestionsCount,
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
      }
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
