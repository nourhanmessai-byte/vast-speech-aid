import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_exercise_items",
  title: "List exercise items",
  description:
    "List the practice items in one VAST Speech category, with the Arabic word, French word and phonetic transcription for each.",
  inputSchema: {
    category: z
      .string()
      .describe("Category id, e.g. fruits, legumes, numbers, days, months, verbs, animals, furniture, objects."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category }) => {
    const { LESSONS } = await import("@/lib/lessons");
    const { FRUITS, VEGETABLES } = await import("@/lib/foods");

    let items: Array<{ id: string; ar: string; fr: string; ipa?: string }> = [];
    if (category === "fruits") items = FRUITS;
    else if (category === "legumes") items = VEGETABLES;
    else if (category in LESSONS) items = LESSONS[category as keyof typeof LESSONS];
    else {
      return {
        content: [{ type: "text" as const, text: `Unknown category: ${category}` }],
        isError: true,
      };
    }

    const rows = items.map((i) => ({ id: i.id, ar: i.ar, fr: i.fr, ipa: i.ipa ?? null }));
    return {
      content: [{ type: "text" as const, text: JSON.stringify(rows, null, 2) }],
      structuredContent: { category, items: rows },
    };
  },
});
