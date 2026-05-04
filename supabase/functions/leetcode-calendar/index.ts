import { corsHeaders } from "@supabase/supabase-js/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username") || "swarup__";
    const yearParam = url.searchParams.get("year");
    const year = yearParam ? parseInt(yearParam, 10) : new Date().getUTCFullYear();

    const query = `
      query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
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
        operationName: "userProfileCalendar",
      }),
    });

    if (!lcRes.ok) {
      const text = await lcRes.text();
      return new Response(
        JSON.stringify({ error: `LeetCode request failed [${lcRes.status}]`, details: text }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await lcRes.json();
    const cal = data?.data?.matchedUser?.userCalendar;
    if (!cal) {
      return new Response(
        JSON.stringify({ error: "User not found or no calendar data", raw: data }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const submissionCalendar =
      typeof cal.submissionCalendar === "string"
        ? JSON.parse(cal.submissionCalendar)
        : cal.submissionCalendar;

    return new Response(
      JSON.stringify({
        year,
        username,
        activeYears: cal.activeYears,
        streak: cal.streak,
        totalActiveDays: cal.totalActiveDays,
        submissionCalendar,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});