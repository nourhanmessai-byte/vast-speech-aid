import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { LessonCategory, LessonItem } from "@/lib/lessons";
import { useI18n } from "@/lib/i18n";
import type { LucideIcon } from "lucide-react";

interface Props {
  category: LessonCategory;
  items: LessonItem[];
  title: string;
  description: string;
  icon: LucideIcon;
  iconTint: string;
}

export function LessonGrid({ category, items, title, description, icon: Icon, iconTint }: Props) {
  const { lang } = useI18n();
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold leading-tight flex items-center gap-2">
          <span className={`h-9 w-9 rounded-2xl bg-gradient-to-br ${iconTint} text-primary-foreground flex items-center justify-center shadow-soft`}>
            <Icon className="h-5 w-5" />
          </span>
          {title}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {items.map((it) => (
          <Link
            key={it.id}
            to="/lesson/$category/$id"
            params={{ category, id: it.id }}
            className="group relative overflow-hidden rounded-3xl bg-card shadow-card hover:shadow-soft transition-all hover:-translate-y-0.5"
          >
            <div className={`aspect-square bg-gradient-to-br ${it.tint} flex items-center justify-center p-3`}>
              {it.image ? (
                <img
                  src={it.image}
                  alt={it.fr}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <span
                  className="text-6xl font-extrabold text-brand drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                  style={{ fontFamily: "Tajawal, sans-serif" }}
                >
                  {it.symbol}
                </span>
              )}
            </div>
            <div className="p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-extrabold text-sm truncate">
                  {lang === "ar" ? it.ar : it.fr}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {lang === "ar" ? it.fr : it.ar}
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
