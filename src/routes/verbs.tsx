import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { LessonGrid } from "@/components/LessonGrid";
import { VERBS } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/verbs")({
  component: VerbsPage,
});

function VerbsPage() {
  const { t } = useI18n();
  return (
    <LessonGrid
      category="verbs"
      items={VERBS}
      title={t("verbs")}
      description={t("verbsDesc")}
      icon={Activity}
      iconTint="from-emerald-300 to-violet-300"
    />
  );
}
