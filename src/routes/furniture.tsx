import { createFileRoute } from "@tanstack/react-router";
import { Armchair } from "lucide-react";
import { LessonGrid } from "@/components/LessonGrid";
import { FURNITURE } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/furniture")({
  component: FurniturePage,
});

function FurniturePage() {
  const { t } = useI18n();
  return (
    <LessonGrid
      category="furniture"
      items={FURNITURE}
      title={t("furniture")}
      description={t("furnitureDesc")}
      icon={Armchair}
      iconTint="from-stone-300 to-amber-300"
    />
  );
}
