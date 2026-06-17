import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Type, Music2, BookA, MessageSquare, MessagesSquare, Apple, Carrot, Hash, CalendarDays, Calendar, Activity, ChevronRight, Shapes } from "lucide-react";

export const Route = createFileRoute("/exercises")({
  component: Exercises,
});

function Exercises() {
  const { t } = useI18n();
  const items = [
    { key: "fruits", to: "/fruits" as const, icon: Apple, color: "from-rose-400 to-amber-400", title: t("fruits"), desc: t("fruitsDesc") },
    { key: "vegetables", to: "/legumes" as const, icon: Carrot, color: "from-emerald-400 to-lime-400", title: t("vegetables"), desc: t("vegetablesDesc") },
    { key: "classify", to: "/classify" as const, icon: Shapes, color: "from-violet-500 to-fuchsia-400", title: t("classify"), desc: t("classifyDesc") },
    { key: "numbers", to: "/numbers" as const, icon: Hash, color: "from-violet-400 to-indigo-400", title: t("numbers"), desc: t("numbersDesc") },
    { key: "days", to: "/days" as const, icon: CalendarDays, color: "from-sky-400 to-violet-400", title: t("days"), desc: t("daysDesc") },
    { key: "months", to: "/months" as const, icon: Calendar, color: "from-pink-400 to-violet-400", title: t("months"), desc: t("monthsDesc") },
    { key: "verbs", to: "/verbs" as const, icon: Activity, color: "from-emerald-400 to-violet-400", title: t("verbs"), desc: t("verbsDesc") },
    { key: "letters", to: "/videos" as const, icon: Type, color: "from-violet-400 to-indigo-400", title: t("letters"), desc: t("letterDesc") },
    { key: "syllables", to: "/videos" as const, icon: Music2, color: "from-fuchsia-400 to-violet-400", title: t("syllables"), desc: t("syllableDesc") },
    { key: "words", to: "/videos" as const, icon: BookA, color: "from-indigo-400 to-sky-400", title: t("words"), desc: t("wordDesc") },
    { key: "sentences", to: "/videos" as const, icon: MessageSquare, color: "from-purple-400 to-pink-400", title: t("sentences"), desc: t("sentenceDesc") },
    { key: "conversation", to: "/videos" as const, icon: MessagesSquare, color: "from-violet-500 to-purple-400", title: t("conversation"), desc: t("convDesc") },
  ];
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold">{t("exercises")}</h1>
      <div className="space-y-3">
        {items.map(({ key, to, icon: Icon, color, title, desc }) => (
          <Link
            key={key}
            to={to}
            className="group flex items-center gap-4 rounded-2xl bg-card shadow-card p-4 hover:shadow-soft transition"
          >
            <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-soft`}>
              <Icon className="h-6 w-6" strokeWidth={2.4} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold">{title}</div>
              <div className="text-xs text-muted-foreground">{desc}</div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground rtl:rotate-180" />
          </Link>
        ))}
      </div>
    </div>
  );
}
