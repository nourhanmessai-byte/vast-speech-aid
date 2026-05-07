import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { TrendingUp, Award, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const { t } = useI18n();
  const data = [40, 55, 48, 62, 70, 75, 82];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const max = Math.max(...data);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold">{t("progress")}</h1>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-gradient-brand text-brand-foreground shadow-soft p-4">
          <Award className="h-5 w-5 opacity-80" />
          <div className="mt-3 text-3xl font-extrabold">78%</div>
          <div className="text-xs opacity-90">{t("fluencyScore")}</div>
        </div>
        <div className="rounded-2xl bg-card shadow-card p-4">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <div className="mt-3 text-3xl font-extrabold">42</div>
          <div className="text-xs text-muted-foreground">{t("completedSessions")}</div>
        </div>
      </div>

      <div className="rounded-2xl bg-card shadow-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-brand" />
          <h2 className="font-bold text-sm">{t("weeklyImprovement")}</h2>
        </div>
        <div className="flex items-end justify-between gap-2 h-40">
          {data.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-xl bg-gradient-brand transition-all" style={{ height: `${(v / max) * 100}%` }} />
              <div className="text-[10px] text-muted-foreground font-semibold">{days[i]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-card shadow-card p-4 space-y-3">
        {[
          { label: t("letters"), pct: 95 },
          { label: t("syllables"), pct: 80 },
          { label: t("words"), pct: 65 },
          { label: t("sentences"), pct: 40 },
        ].map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold">{r.label}</span>
              <span className="text-brand font-bold">{r.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-brand rounded-full" style={{ width: `${r.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
