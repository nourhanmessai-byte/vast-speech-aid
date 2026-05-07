import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Type, Music2, BookA, MessageSquare, MessagesSquare, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/exercises")({
  component: Exercises,
});

function Exercises() {
  const { t } = useI18n();
  const items = [
    { key: "letters", icon: Type, color: "from-violet-400 to-indigo-400", title: t("letters"), desc: t("letterDesc") },
    { key: "syllables", icon: Music2, color: "from-fuchsia-400 to-violet-400", title: t("syllables"), desc: t("syllableDesc") },
    { key: "words", icon: BookA, color: "from-indigo-400 to-sky-400", title: t("words"), desc: t("wordDesc") },
    { key: "sentences", icon: MessageSquare, color: "from-purple-400 to-pink-400", title: t("sentences"), desc: t("sentenceDesc") },
    { key: "conversation", icon: MessagesSquare, color: "from-violet-500 to-purple-400", title: t("conversation"), desc: t("convDesc") },
  ];
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold">{t("exercises")}</h1>
      <div className="space-y-3">
        {items.map(({ key, icon: Icon, color, title, desc }) => (
          <Link
            key={key}
            to="/videos"
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
