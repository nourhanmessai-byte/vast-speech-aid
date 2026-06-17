import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { LESSONS, getLesson, isLessonCategory, type LessonCategory } from "@/lib/lessons";
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, Mic, Square, Gauge } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/lesson/$category/$id")({
  component: LessonDetail,
});

function LessonDetail() {
  const { category, id } = Route.useParams();
  const { t, lang } = useI18n();

  const [speaking, setSpeaking] = useState(false);
  const [slow, setSlow] = useState(false);
  const [recording, setRecording] = useState(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  useEffect(() => {
    setRecordedUrl(null);
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, [id, category]);

  if (!isLessonCategory(category)) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Category not found.</p>
        <Link to="/exercises" className="text-brand font-bold mt-3 inline-block">{t("back")}</Link>
      </div>
    );
  }

  const item = getLesson(category, id);
  const list = LESSONS[category as LessonCategory];

  if (!item) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Item not found.</p>
        <Link to="/exercises" className="text-brand font-bold mt-3 inline-block">{t("back")}</Link>
      </div>
    );
  }

  const idx = list.findIndex((it) => it.id === item.id);
  const nextItem = list[(idx + 1) % list.length];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const progressPct = Math.round(((idx + 1) / list.length) * 100);

  const speak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeaking(true);
    const rate = slow ? 0.5 : 0.8;
    const utterances: SpeechSynthesisUtterance[] = [];
    const uAr = new SpeechSynthesisUtterance(item.ar);
    uAr.lang = "ar-SA";
    uAr.rate = rate;
    utterances.push(uAr);
    const uFr = new SpeechSynthesisUtterance(item.fr);
    uFr.lang = "fr-FR";
    uFr.rate = rate;
    utterances.push(uFr);
    let remaining = utterances.length;
    utterances.forEach((u) => {
      u.onend = () => {
        remaining -= 1;
        if (remaining <= 0) setSpeaking(false);
      };
      u.onerror = () => {
        remaining -= 1;
        if (remaining <= 0) setSpeaking(false);
      };
      window.speechSynthesis.speak(u);
    });
  };

  const toggleRecord = async () => {
    if (recording) {
      recRef.current?.stop();
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecordedUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((tr) => tr.stop());
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      alert(lang === "ar" ? "تعذر الوصول إلى الميكروفون" : "Accès au microphone refusé");
    }
  };

  const backTo = `/${category}` as "/numbers" | "/days" | "/months" | "/verbs" | "/animals" | "/furniture" | "/objects";

  return (
    <div className="space-y-5 pb-2">
      <div className="flex items-center justify-between">
        <Link
          to={backTo}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("back")}
        </Link>
        <span className="text-[11px] font-semibold text-muted-foreground">
          {idx + 1} / {list.length}
        </span>
      </div>

      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-brand rounded-full transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${item.tint} shadow-soft p-6 aspect-square flex items-center justify-center`}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.fr}
            width={512}
            height={512}
            className="w-full h-full object-contain drop-shadow-xl animate-float"
          />
        ) : (
          <div
            className="text-[10rem] leading-none font-extrabold text-brand drop-shadow-sm animate-float select-none"
            style={{ fontFamily: "Tajawal, sans-serif" }}
          >
            {item.symbol}
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-card shadow-card p-5 text-center space-y-2">
        <div className="text-[11px] font-bold tracking-wider uppercase text-brand">
          {t("pronunciation")}
        </div>
        <div className="text-4xl font-extrabold" style={{ fontFamily: "Tajawal, sans-serif" }}>
          {item.ar}
        </div>
        <div className="text-2xl font-extrabold text-foreground/90">{item.fr}</div>
        <div className="text-xs text-muted-foreground">{item.ipa}</div>
      </div>

      <div className="rounded-3xl bg-gradient-brand p-5 shadow-soft text-brand-foreground">
        <div className="text-[11px] font-bold tracking-wider uppercase opacity-90 mb-3 text-center">
          {t("watchMouth")}
        </div>
        <AnimatedMouth speaking={speaking} slow={slow} />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={speak}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-brand font-bold py-3 shadow-card hover:scale-[1.01] transition active:scale-95"
          >
            <RotateCcw className="h-4 w-4" /> {t("replay")}
          </button>
          <button
            onClick={() => setSlow((s) => !s)}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl font-bold py-3 transition active:scale-95 ${
              slow ? "bg-white/95 text-brand" : "bg-white/15 text-white border border-white/30"
            }`}
          >
            <Gauge className="h-4 w-4" /> {slow ? t("slowMode") : t("normalMode")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={speak}
          className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-card shadow-card py-4 hover:shadow-soft transition active:scale-95"
        >
          <div className="h-11 w-11 rounded-2xl bg-gradient-soft flex items-center justify-center text-brand">
            <Volume2 className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold">{t("listen")}</span>
        </button>
        <button
          onClick={toggleRecord}
          className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl py-4 transition active:scale-95 ${
            recording ? "bg-destructive text-destructive-foreground shadow-soft" : "bg-card shadow-card hover:shadow-soft"
          }`}
        >
          <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${
            recording ? "bg-white/20 text-white animate-pulse-ring" : "bg-gradient-brand text-brand-foreground"
          }`}>
            {recording ? <Square className="h-5 w-5" fill="currentColor" /> : <Mic className="h-5 w-5" />}
          </div>
          <span className="text-xs font-bold">
            {recording ? t("stopRec") : t("startRec")}
          </span>
        </button>
      </div>

      {recordedUrl && (
        <div className="rounded-2xl bg-card shadow-card p-3">
          <div className="text-[11px] font-bold text-brand mb-1.5">{t("playback")}</div>
          <audio controls src={recordedUrl} className="w-full" />
        </div>
      )}

      <Link
        to="/lesson/$category/$id"
        params={{ category, id: nextItem.id }}
        onClick={() => window.speechSynthesis?.cancel()}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand text-brand-foreground font-bold py-4 shadow-soft hover:scale-[1.01] transition"
      >
        {t("next")} · {lang === "ar" ? nextItem.ar : nextItem.fr}
        <Arrow className="h-4 w-4" />
      </Link>
    </div>
  );
}

function AnimatedMouth({ speaking, slow }: { speaking: boolean; slow: boolean }) {
  const dur = slow ? "0.85s" : "0.42s";
  return (
    <div className="mx-auto h-44 w-44 rounded-full bg-white/15 backdrop-blur flex items-center justify-center relative">
      <div className={`absolute inset-0 rounded-full ${speaking ? "animate-pulse-ring" : ""}`} />
      <svg viewBox="0 0 200 200" className="w-36 h-36" aria-hidden>
        <ellipse cx="100" cy="100" rx="80" ry="80" fill="#FFE3D0" />
        <circle cx="72" cy="78" r="5" fill="#3a2a4a" />
        <circle cx="128" cy="78" r="5" fill="#3a2a4a" />
        <ellipse
          cx="100"
          cy={speaking ? 130 : 128}
          rx={speaking ? 28 : 26}
          ry={speaking ? 22 : 6}
          fill="#B5354B"
          style={{
            transition: "all 220ms ease-in-out",
            animation: speaking ? `mouth-talk ${dur} ease-in-out infinite` : undefined,
            transformOrigin: "100px 130px",
          }}
        />
        {speaking && <rect x="82" y={118} width="36" height="5" rx="2" fill="white" />}
        {speaking && <ellipse cx="100" cy="140" rx="14" ry="6" fill="#E96A82" />}
      </svg>
      <style>{`
        @keyframes mouth-talk {
          0%, 100% { transform: scaleY(0.45); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
