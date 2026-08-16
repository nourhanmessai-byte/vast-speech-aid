import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { LessonGrid } from "@/components/LessonGrid";
import { OBJECTS } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/objects")({
  component: ObjectsPage,
});

function ObjectsPage() {
  const { t } = useI18n();
  return (
    <LessonGrid
      category="objects"
      items={OBJECTS}
      title={t("objects")}
      description={t("objectsDesc")}
      icon={Package}
      iconTint="from-teal-300 to-emerald-300"
    />
  );
}
