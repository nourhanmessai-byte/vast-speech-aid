import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { FOODS } from "@/lib/foods";
import { CLOTHES } from "@/lib/clothes";
import { Check, RotateCcw, Sparkles, Volume2 } from "lucide-react";

export const Route = createFileRoute("/classify")({
  component: Classify,
});

type Category = "fruit" | "vegetable" | "clothing";

interface Card {
  id: string;
  fr: string;
  ar: string;
  image: string;
  tint: string;
  category: Category;
}

function buildDeck(): Card[] {
  const fruits = FOODS.filter((f) => f.kind === "fruit").slice(0, 4).map((f) => ({ ...f, category: "fruit" as Category }));
  const veg = FOODS.filter((f) => f.kind === "vegetable").slice(0, 4).map((f) => ({ ...f, category: "vegetable" as Category }));
  const clothes = CLOTHES.slice(0, 4).map((c) => ({ ...c, category: "clothing" as Category }));
  const all: Card[] = [...fruits, ...veg, ...clothes].map((it) => ({
    id: it.id,
    fr: it.fr,
    ar: it.ar,
    image: it.image,
    tint: it.tint,
    category: it.category,
  }));
  // shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

function Classify() {
  const { lang, t } = useI18n();
  const [deck, setDeck] = useState<Card[]>(() => buildDeck());
  const [placed, setPlaced] = useState<Record<string, Category>>({});
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const current = deck.find((c) => !placed[c.id]);
  const score = useMemo(
    () => Object.entries(placed).filter(([id, cat]) => deck.find((d) => d.id === id)?.category === cat).length,
    [placed, deck],
  );
  const done = !current;

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "ar" ? "ar-SA" : "fr-FR";
    u.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const choose = (cat: Category) => {
    if (!current) return;
    const correct = current.category === cat;
    setFeedback(correct ? "correct" : "wrong");
    setTimeout(() => {
      setPlaced((p) => ({ ...p, [current.id]: cat }));
      setFeedback(null);
    }, 600);
  };

  const reset = () => {
    setDeck(buildDeck());
    setPlaced({});
    setFeedback(null);
  };

  const categories: { key: Category; emoji: string; ar: string; fr: string; color: string }[] = [
    { key: "fruit", emoji: "🍎", ar: "الفواكه", fr: "Fruits", color: "from-rose-400 to-amber-400" },
    { key: "vegetable", emoji: "🥕", ar: "الخضر", fr: "Légumes", color: "from-emerald-400 to-lime-400" },
    { key: "clothing", emoji: "👕", ar: "الملابس", fr: "Vêtements", color: "from-green-400 to-emerald-400" },
  ];

  const total = deck.length;
  const answered = Object.keys(placed).length;
  const progress = total ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <span className="h-9 w-9 rounded-2xl bg-gradient-brand text-primary-foreground flex items-center justify-center shadow-soft">
            <Sparkles className="h-5 w-5" />
          </span>
          {t("classify")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t("classifyDesc")}</p>
      </header>

      <div className="rounded-2xl bg-card shadow-card p-3">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span>{t("progress")}</span>
          <span className="text-brand">{answered}/{total} · {score} ✓</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-brand transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {done ? (
        <div className="rounded-3xl bg-card shadow-card p-6 text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <div className="text-xl font-extrabold">{t("goodJob")}</div>
          <div className="text-sm text-muted-foreground">
            {score} / {total}
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground font-bold px-5 py-3 shadow-soft"
          >
            <RotateCcw className="h-4 w-4" /> {t("replay")}
          </button>
        </div>
      ) : (
        <>
          <div
            className={`relative overflow-hidden rounded-3xl shadow-card transition-all bg-gradient-to-br ${current!.tint} ${
              feedback === "correct" ? "ring-4 ring-emerald-400" : feedback === "wrong" ? "ring-4 ring-rose-400" : ""
            }`}
          >
            <div className="aspect-[4/3] flex items-center justify-center p-6">
              <img
                src={current!.image}
                alt={current!.fr}
                width={512}
                height={512}
                className="max-h-full max-w-full object-contain drop-shadow-md"
              />
            </div>
            <div className="bg-white/80 backdrop-blur p-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-extrabold">{lang === "ar" ? current!.ar : current!.fr}</div>
                <div className="text-xs text-muted-foreground">{lang === "ar" ? current!.fr : current!.ar}</div>
              </div>
              <button
                onClick={() => speak(lang === "ar" ? current!.ar : current!.fr)}
                className="h-11 w-11 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center shadow-soft"
                aria-label={t("listen")}
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            {feedback && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div
                  className={`h-20 w-20 rounded-full flex items-center justify-center text-primary-foreground text-4xl shadow-soft ${
                    feedback === "correct" ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                >
                  {feedback === "correct" ? <Check className="h-10 w-10" strokeWidth={3} /> : "✗"}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => choose(c.key)}
                disabled={!!feedback}
                className={`rounded-2xl p-4 bg-gradient-to-br ${c.color} text-primary-foreground shadow-soft active:scale-95 transition disabled:opacity-60`}
              >
                <div className="text-3xl">{c.emoji}</div>
                <div className="mt-2 text-sm font-extrabold leading-tight">
                  {lang === "ar" ? c.ar : c.fr}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
