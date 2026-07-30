import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const logPracticeSession = defineTool({
  name: "log_practice_session",
  title: "Log a practice session",
  description:
    "Record that the signed-in patient practiced one item, with an optional self-rated score from 0 to 100 and notes.",
  inputSchema: {
    category: z.string().describe("Category id, e.g. fruits, verbs, numbers."),
    item_id: z.string().describe("Item id inside that category, e.g. apple, eat, one."),
    language: z.string().describe("Language practiced: ar or fr.").optional(),
    score: z.number().describe("Self-rated pronunciation score from 0 to 100.").optional(),
    notes: z.string().describe("Free-text notes about the session.").optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ category, item_id, language, score, notes }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text" as const, text: "Not authenticated" }], isError: true };
    }
    const clamped =
      typeof score === "number" ? Math.max(0, Math.min(100, Math.round(score))) : null;
    const { data, error } = await supabaseForUser(ctx)
      .from("practice_sessions")
      .insert({
        user_id: ctx.getUserId(),
        category,
        item_id,
        language: language === "fr" ? "fr" : "ar",
        score: clamped,
        notes: notes ?? null,
      })
      .select()
      .single();

    return error
      ? { content: [{ type: "text" as const, text: error.message }], isError: true }
      : {
          content: [{ type: "text" as const, text: JSON.stringify(data) }],
          structuredContent: { session: data },
        };
  },
});

export default logPracticeSession;
