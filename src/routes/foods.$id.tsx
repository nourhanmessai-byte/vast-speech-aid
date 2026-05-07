import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { FOODS, getFood } from "@/lib/foods";
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, Mic, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/foods/$id")({
  component: FoodDetail,
});

function FoodDetail() {
  const { id } = Route.useParams();
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const food = getFood(id);

  const [speaking, setSpeaking] = useState(false);
  const [recording, setRecording] = useState(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  // Reset when navigating between foods
  useEffect(() => {
    setRecordedUrl(null);
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, [id]);

  if (!food) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Item not found.</p>
        <Link to="/foods" className="text-brand font-bold mt-3 inline-block">Back</Link>
      </div>
    );
  }

  const idx = FOODS.findIndex((f) => f.id === food.id);
  const nextFood = FOODS[(idx + 1) % FOODS.length];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const speak = (which: "ar" | "en" | "both" = "both") => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeaking(true);
    const utterances: SpeechSynthesisUtterance[] = [];
    if (which === "ar" || which === "both") {
      const u = new SpeechSynthesisUtterance(food.ar);
      u.lang = "ar-SA";
      u.rate = 0.7;
      utterances.push(u);
    }
    if (which === "en" || which === "both") {
      const u = new SpeechSynthesisUtterance(food.en);
      u.lang = "en-US";
      u.rate = 0.7;
      utterances.push(u);
    }
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
        stream.getTracks().forEach((t) => t.stop());
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      alert(lang === "ar" ? "تعذر الوصول إلى الميكروفون" : "Microphone access denied");
    }
  };

  return (
    <div className="space-y-5 pb-2">
      <div className="flex items-center justify-between">
        <Link
          to="/foods"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("back")}
        </Link>
        <span className="text-[11px] font-semibold text-muted-foreground">
          {idx + 1} / {FOODS.length}
        </span>
      </div>

      {/* Hero image */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${food.tint} shadow-soft p-6 aspect-square`}>
        <img
          src={food.image}
          alt={food.en}
          width={512}
          height={512}
          className="w-full h-full object-contain drop-shadow-xl animate-float"
        />
      </div>

      {/* Pronunciation card */}
      <div className="rounded-3xl bg-card shadow-card p-5 text-center space-y-2">
        <div className="text-[11px] font-bold tracking-wider uppercase text-brand">
          {t("pronunciation")}
        </div>
        <div className="text-4xl font-extrabold" style={{ fontFamily: "Tajawal, sans-serif" }}>
          {food.ar}
        </div>
        <div className="text-2xl font-extrabold text-foreground/90">{food.en}</div>
        <div className="text-xs text-muted-foreground">{food.ipa}</div>
      </div>

      {/* Animated mouth video */}
      <div className="rounded-3xl bg-gradient-brand p-5 shadow-soft text-brand-foreground">
        <div className="text-[11px] font-bold tracking-wider uppercase opacity-90 mb-3 text-center">
          {t("watchMouth")}
        </div>
        <AnimatedMouth speaking={speaking} />
        <button
          onClick={() => speak("both")}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-brand font-bold py-3 shadow-card hover:scale-[1.01] transition active:scale-95"
        >
          <RotateCcw className="h-4 w-4" /> {t("replay")}
        </button>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => speak("both")}
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
        to="/foods/$id"
        params={{ id: nextFood.id }}
        onClick={() => window.speechSynthesis?.cancel()}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand text-brand-foreground font-bold py-4 shadow-soft hover:scale-[1.01] transition"
      >
        {t("next")} · {lang === "ar" ? nextFood.ar : nextFood.en}
        <Arrow className="h-4 w-4" />
      </Link>
    </div>
  );
}

function AnimatedMouth({ speaking }: { speaking: boolean }) {
  return (
    <div className="mx-auto h-44 w-44 rounded-full bg-white/15 backdrop-blur flex items-center justify-center relative">
      <div
        className={`absolute inset-0 rounded-full ${speaking ? "animate-pulse-ring" : ""}`}
      />
      <svg viewBox="0 0 200 200" className="w-36 h-36" aria-hidden>
        {/* face */}
        <ellipse cx="100" cy="100" rx="80" ry="80" fill="#FFE3D0" />
        {/* eyes */}
        <circle cx="72" cy="78" r="5" fill="#3a2a4a" />
        <circle cx="128" cy="78" r="5" fill="#3a2a4a" />
        {/* mouth */}
        <ellipse
          cx="100"
          cy={speaking ? 130 : 128}
          rx={speaking ? 28 : 26}
          ry={speaking ? 22 : 6}
          fill="#B5354B"
          style={{
            transition: "all 220ms ease-in-out",
            animation: speaking ? "mouth-talk 0.42s ease-in-out infinite" : undefined,
            transformOrigin: "100px 130px",
          }}
        />
        {/* teeth */}
        {speaking && (
          <rect x="82" y={118} width="36" height="5" rx="2" fill="white" />
        )}
        {/* tongue */}
        {speaking && (
          <ellipse cx="100" cy="140" rx="14" ry="6" fill="#E96A82" />
        )}
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
