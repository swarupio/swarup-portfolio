## Goal
Use your own Supabase project (instead of Lovable Cloud) to host the `leetcode-calendar` edge function that powers the dynamic heatmap.

## Important constraint
Lovable's auto-managed files (`src/integrations/supabase/client.ts`, `src/integrations/supabase/types.ts`, `.env`) are locked to Lovable Cloud and cannot be edited to point at a different Supabase project. So we set up a **second, parallel** Supabase client dedicated to your project — Lovable Cloud stays connected but unused for this feature.

## What you'll do (one-time setup on your side)
1. Go to https://supabase.com → create a free org + project.
2. From **Project Settings → API**, copy:
   - Project URL (e.g. `https://xxxx.supabase.co`)
   - `anon` public key
3. Install Supabase CLI: `npm i -g supabase`
4. From your local machine (clone of this repo or any folder):
   ```
   supabase login
   supabase link --project-ref <your-project-ref>
   ```
5. Copy `supabase/functions/leetcode-calendar/index.ts` from this project into your local folder, then deploy:
   ```
   supabase functions deploy leetcode-calendar --no-verify-jwt
   ```
6. Share the Project URL + anon key with me.

## What I'll do (in this codebase)
1. **Create `src/lib/personalSupabase.ts`** — a separate Supabase client hardcoded with your project's URL and anon key (anon keys are public/safe to commit).
   ```ts
   import { createClient } from "@supabase/supabase-js";
   export const personalSupabase = createClient(
     "https://YOUR-REF.supabase.co",
     "YOUR_ANON_KEY"
   );
   ```
2. **Update `src/components/LeetCodeHeatmap.tsx`** — replace the current fetch (which hits Lovable Cloud's edge function URL) with one that hits your project's edge function URL:
   ```ts
   const fnUrl = "https://YOUR-REF.supabase.co/functions/v1/leetcode-calendar";
   ```
   Use your anon key in the `Authorization` and `apikey` headers.
3. **Leave `supabase/functions/leetcode-calendar/index.ts` in this repo as a reference copy** so the source of truth lives with the frontend, but it will no longer be the deployed instance — yours is.
4. Optional cleanup: we can delete the Lovable Cloud copy of the function if you want the codebase to reflect that only your Supabase runs it.

## Files touched
- **Create**: `src/lib/personalSupabase.ts`
- **Edit**: `src/components/LeetCodeHeatmap.tsx`
- **Unchanged**: `supabase/functions/leetcode-calendar/index.ts` (you deploy this verbatim to your own project)
- **Untouched** (Lovable-managed): `.env`, `src/integrations/supabase/client.ts`, `src/integrations/supabase/types.ts`

## What I need from you to proceed
- Your Supabase **Project URL**
- Your Supabase **anon public key**
- Confirmation that you've deployed the `leetcode-calendar` function to your project

Once you share those, I'll wire it up in one pass.

## Note on Lovable Cloud
We can't fully "disable" Lovable Cloud once enabled — it'll just sit unused for this feature. That's fine and costs nothing on the free tier.
