import { createFileRoute } from "@tanstack/react-router";
import { PawPrint } from "lucide-react";
import { LessonGrid } from "@/components/LessonGrid";
import { ANIMALS } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/animals")({
  component: AnimalsPage,
});

function AnimalsPage() {
  const { t } = useI18n();
  return (
    <LessonGrid
      category="animals"
      items={ANIMALS}
      title={t("animals")}
      description={t("animalsDesc")}
      icon={PawPrint}
      iconTint="from-amber-300 to-rose-300"
    />
  );
}
