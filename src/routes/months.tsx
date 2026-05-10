import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { LessonGrid } from "@/components/LessonGrid";
import { MONTHS } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/months")({
  component: MonthsPage,
});

function MonthsPage() {
  const { t } = useI18n();
  return (
    <LessonGrid
      category="months"
      items={MONTHS}
      title={t("months")}
      description={t("monthsDesc")}
      icon={Calendar}
      iconTint="from-pink-300 to-violet-300"
    />
  );
}
