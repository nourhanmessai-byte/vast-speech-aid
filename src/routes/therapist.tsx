import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Plus, Upload, ChevronRight } from "lucide-react";
import session from "@/assets/therapist-session.jpg";

export const Route = createFileRoute("/therapist")({
  component: Therapist,
});

function Therapist() {
  const { t } = useI18n();
  const patients = [
    { name: "Ahmad K.", pct: 78, sessions: 42 },
    { name: "Sara M.", pct: 64, sessions: 28 },
    { name: "Omar L.", pct: 91, sessions: 56 },
    { name: "Lina R.", pct: 35, sessions: 12 },
  ];
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold">{t("therapist")}</h1>

      <div className="relative overflow-hidden rounded-3xl shadow-soft">
        <img src={session} alt="Therapist" width={1024} height={768} loading="lazy" className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent" />
        <div className="absolute bottom-3 start-4 end-4 text-brand-foreground">
          <div className="text-xs opacity-90">{t("monitorPatients")}</div>
          <div className="text-lg font-bold">{patients.length} {t("patient")}s</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="rounded-2xl bg-card shadow-card p-4 flex flex-col items-start gap-2 hover:shadow-soft transition">
          <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center text-brand-foreground">
            <Plus className="h-5 w-5" />
          </div>
          <div className="text-sm font-bold text-start">{t("addExercise")}</div>
        </button>
        <button className="rounded-2xl bg-card shadow-card p-4 flex flex-col items-start gap-2 hover:shadow-soft transition">
          <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center text-brand-foreground">
            <Upload className="h-5 w-5" />
          </div>
          <div className="text-sm font-bold text-start">{t("uploadVideo")}</div>
        </button>
      </div>

      <div className="space-y-2.5">
        {patients.map((p) => (
          <div key={p.name} className="rounded-2xl bg-card shadow-card p-4 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-soft flex items-center justify-center text-brand font-bold">
              {p.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{p.name}</div>
              <div className="text-[11px] text-muted-foreground">{p.sessions} {t("completedSessions")}</div>
              <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-brand" style={{ width: `${p.pct}%` }} />
              </div>
            </div>
            <div className="text-sm font-bold text-brand">{p.pct}%</div>
            <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
          </div>
        ))}
      </div>
    </div>
  );
}
