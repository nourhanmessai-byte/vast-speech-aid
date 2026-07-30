import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_exercise_categories",
  title: "List exercise categories",
  description:
    "List every VAST Speech therapy category (fruits, vegetables, numbers, days, months, verbs, animals, furniture, objects) with how many items each contains.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const { LESSONS } = await import("@/lib/lessons");
    const { FRUITS, VEGETABLES } = await import("@/lib/foods");

    const categories = [
      { id: "fruits", labelFr: "Fruits", labelAr: "الفواكه", count: FRUITS.length },
      { id: "legumes", labelFr: "Légumes", labelAr: "الخضر", count: VEGETABLES.length },
      ...Object.entries(LESSONS).map(([id, items]) => ({
        id,
        labelFr: id,
        labelAr: id,
        count: items.length,
      })),
    ];

    return {
      content: [{ type: "text" as const, text: JSON.stringify(categories, null, 2) }],
      structuredContent: { categories },
    };
  },
});

export const categoryEnum = z.string();
