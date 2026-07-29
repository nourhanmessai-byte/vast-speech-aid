import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "./log-practice-session";

export default defineTool({
  name: "list_practice_sessions",
  title: "List practice history",
  description:
    "Read the signed-in patient's recorded practice sessions, most recent first, optionally filtered by category.",
  inputSchema: {
    category: z.string().describe("Optional category id filter.").optional(),
    limit: z.number().describe("How many sessions to return (default 20, max 100).").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text" as const, text: "Not authenticated" }], isError: true };
    }
    const take = Math.max(1, Math.min(100, Math.round(limit ?? 20)));
    let query = supabaseForUser(ctx)
      .from("practice_sessions")
      .select("id, category, item_id, language, score, notes, created_at")
      .order("created_at", { ascending: false })
      .limit(take);
    if (category) query = query.eq("category", category);

    const { data, error } = await query;
    return error
      ? { content: [{ type: "text" as const, text: error.message }], isError: true }
      : {
          content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
          structuredContent: { sessions: data ?? [] },
        };
  },
});
