import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, ArrowLeft, Sparkles, Flame, Trophy, Play } from "lucide-react";
import hero from "@/assets/hero-therapy.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 shadow-soft text-brand-foreground">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[11px] font-semibold">
            <Sparkles className="h-3 w-3" /> {t("welcome")}
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight">{t("tagline")}</h1>
          <Link
            to="/exercises"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-brand font-bold px-5 py-3 shadow-card hover:scale-[1.02] transition"
          >
            {t("startTherapy")} <Arrow className="h-4 w-4" />
          </Link>
        </div>
        <img
          src={hero}
          alt="Speech therapy"
          width={1024}
          height={768}
          className="absolute -bottom-4 -end-8 w-44 opacity-90 pointer-events-none animate-float"
        />
      </section>

      <Link
        to="/foods"
        className="block rounded-3xl bg-card shadow-card p-4 hover:shadow-soft transition active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-200 to-amber-100 flex items-center justify-center text-2xl">
            🍎
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-sm">{t("fruitsVeg")}</div>
            <div className="text-[11px] text-muted-foreground truncate">{t("fruitsVegDesc")}</div>
          </div>
          <Arrow className="h-4 w-4 text-brand" />
        </div>
      </Link>

      <section className="grid grid-cols-2 gap-3">
        <StatCard icon={Flame} label={t("dailyExercises")} value="3 / 5" hint={t("exercisesDone")} />
        <StatCard icon={Trophy} label={t("fluencyScore")} value="78%" hint={t("goodJob")} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">{t("todayGoal")}</h2>
          <Link to="/exercises" className="text-xs font-semibold text-brand">{t("continue")}</Link>
        </div>
        <div className="space-y-2.5">
          {[
            { title: t("letters"), desc: t("letterDesc"), pct: 100 },
            { title: t("syllables"), desc: t("syllableDesc"), pct: 60 },
            { title: t("words"), desc: t("wordDesc"), pct: 20 },
          ].map((it) => (
            <div key={it.title} className="rounded-2xl bg-card shadow-card p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-soft flex items-center justify-center text-brand">
                <Play className="h-5 w-5" fill="currentColor" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{it.title}</div>
                <div className="text-xs text-muted-foreground truncate">{it.desc}</div>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-brand rounded-full transition-all" style={{ width: `${it.pct}%` }} />
                </div>
              </div>
              <div className="text-xs font-bold text-brand">{it.pct}%</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, hint }: { icon: any; label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl bg-card shadow-card p-4">
      <div className="flex items-center gap-2 text-brand">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-extrabold">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>
    </div>
  );
}
