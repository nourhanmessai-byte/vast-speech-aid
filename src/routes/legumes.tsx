import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { VEGETABLES } from "@/lib/foods";
import { Apple, Carrot, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/legumes")({
  component: LegumesPage,
});

function LegumesPage() {
  const { t, lang } = useI18n();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold leading-tight flex items-center gap-2">
          <span className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-300 to-lime-300 text-white flex items-center justify-center shadow-soft">
            <Carrot className="h-5 w-5" />
          </span>
          {t("vegetables")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t("vegetablesDesc")}</p>
      </header>

      <div className="flex gap-2">
        <Link
          to="/fruits"
          className="flex-1 text-center rounded-full px-4 py-2 text-xs font-bold bg-card shadow-card text-foreground/70 inline-flex items-center justify-center gap-1.5"
        >
          <Apple className="h-3.5 w-3.5" /> {t("fruits")} <Arrow className="h-3 w-3" />
        </Link>
        <Link
          to="/legumes"
          className="flex-1 text-center rounded-full px-4 py-2 text-xs font-bold bg-gradient-brand text-brand-foreground shadow-soft inline-flex items-center justify-center gap-1.5"
        >
          <Carrot className="h-3.5 w-3.5" /> {t("vegetables")}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {VEGETABLES.map((f) => (
          <Link
            key={f.id}
            to="/foods/$id"
            params={{ id: f.id }}
            className="group relative overflow-hidden rounded-3xl bg-card shadow-card hover:shadow-soft transition-all hover:-translate-y-0.5"
          >
            <div className={`aspect-square bg-gradient-to-br ${f.tint} flex items-center justify-center p-3`}>
              <img
                src={f.image}
                alt={f.fr}
                width={512}
                height={512}
                loading="lazy"
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-extrabold text-sm truncate">
                  {lang === "ar" ? f.ar : f.fr}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {lang === "ar" ? f.fr : f.ar}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-brand rtl:rotate-180 shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
