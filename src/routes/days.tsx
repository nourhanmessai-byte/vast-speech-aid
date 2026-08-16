import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { LessonGrid } from "@/components/LessonGrid";
import { DAYS } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/days")({
  component: DaysPage,
});

function DaysPage() {
  const { t } = useI18n();
  return (
    <LessonGrid
      category="days"
      items={DAYS}
      title={t("days")}
      description={t("daysDesc")}
      icon={CalendarDays}
      iconTint="from-emerald-300 to-green-300"
    />
  );
}
