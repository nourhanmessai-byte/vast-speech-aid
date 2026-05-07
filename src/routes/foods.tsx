import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { FOODS } from "@/lib/foods";
import { Apple, Carrot, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/foods")({
  component: FoodsPage,
});

function FoodsPage() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<"all" | "fruit" | "vegetable">("all");

  const items = FOODS.filter((f) => filter === "all" || f.kind === filter);

  const tabs = [
    { key: "all" as const, label: lang === "ar" ? "الكل" : "All" },
    { key: "fruit" as const, label: t("fruits"), icon: Apple },
    { key: "vegetable" as const, label: t("vegetables"), icon: Carrot },
  ];

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold leading-tight">
          {t("fruitsVeg")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t("fruitsVegDesc")}</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map((tab) => {
          const active = filter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
                active
                  ? "bg-gradient-brand text-brand-foreground shadow-soft"
                  : "bg-card shadow-card text-foreground/70"
              }`}
            >
              {tab.icon ? <tab.icon className="h-3.5 w-3.5" /> : null}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((f) => (
          <Link
            key={f.id}
            to="/foods/$id"
            params={{ id: f.id }}
            className="group relative overflow-hidden rounded-3xl bg-card shadow-card hover:shadow-soft transition-all hover:-translate-y-0.5"
          >
            <div className={`aspect-square bg-gradient-to-br ${f.tint} flex items-center justify-center p-3`}>
              <img
                src={f.image}
                alt={f.en}
                width={512}
                height={512}
                loading="lazy"
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-extrabold text-sm truncate">
                  {lang === "ar" ? f.ar : f.en}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {lang === "ar" ? f.en : f.ar}
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
