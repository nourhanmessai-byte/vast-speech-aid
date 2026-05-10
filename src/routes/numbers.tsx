import { createFileRoute } from "@tanstack/react-router";
import { Hash } from "lucide-react";
import { LessonGrid } from "@/components/LessonGrid";
import { NUMBERS } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/numbers")({
  component: NumbersPage,
});

function NumbersPage() {
  const { t } = useI18n();
  return (
    <LessonGrid
      category="numbers"
      items={NUMBERS}
      title={t("numbers")}
      description={t("numbersDesc")}
      icon={Hash}
      iconTint="from-violet-300 to-indigo-300"
    />
  );
}
