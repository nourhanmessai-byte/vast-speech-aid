import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { FOODS, FRUITS, VEGETABLES, getFood } from "@/lib/foods";
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, Mic, Square, Gauge } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MouthPlayer } from "@/components/MouthPlayer";

export const Route = createFileRoute("/foods/$id")({
  component: FoodDetail,
});

function FoodDetail() {
  const { id } = Route.useParams();
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const food = getFood(id);

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
  }, [id]);

  if (!food) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Item not found.</p>
        <Link to="/fruits" className="text-brand font-bold mt-3 inline-block">{t("back")}</Link>
      </div>
    );
  }

  // Cycle within the same kind (fruits or vegetables)
  const list = food.kind === "fruit" ? FRUITS : VEGETABLES;
  const idx = list.findIndex((f) => f.id === food.id);
  const nextFood = list[(idx + 1) % list.length];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const speak = (which: "ar" | "fr" | "both" = "both") => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeaking(true);
    const utterances: SpeechSynthesisUtterance[] = [];
    const rate = slow ? 0.5 : 0.8;
    if (which === "ar" || which === "both") {
      const u = new SpeechSynthesisUtterance(food.ar);
      u.lang = "ar-SA";
      u.rate = rate;
      utterances.push(u);
    }
    if (which === "fr" || which === "both") {
      const u = new SpeechSynthesisUtterance(food.fr);
      u.lang = "fr-FR";
      u.rate = rate;
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
      alert(lang === "ar" ? "تعذر الوصول إلى الميكروفون" : "Accès au microphone refusé");
    }
  };

  const backTo = food.kind === "fruit" ? "/fruits" : "/legumes";

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

      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${food.tint} shadow-soft p-6 aspect-square`}>
        <img
          src={food.image}
          alt={food.fr}
          width={512}
          height={512}
          className="w-full h-full object-contain drop-shadow-xl animate-float"
        />
      </div>

      <div className="rounded-3xl bg-card shadow-card p-5 text-center space-y-2">
        <div className="text-[11px] font-bold tracking-wider uppercase text-brand">
          {t("pronunciation")}
        </div>
        <div className="text-4xl font-extrabold" style={{ fontFamily: "Tajawal, sans-serif" }}>
          {food.ar}
        </div>
        <div className="text-2xl font-extrabold text-foreground/90">{food.fr}</div>
        <div className="text-xs text-muted-foreground">{food.ipa}</div>
      </div>

      <div className="rounded-3xl bg-gradient-brand p-5 shadow-soft text-brand-foreground">
        <div className="text-[11px] font-bold tracking-wider uppercase opacity-90 mb-3 text-center">
          {t("watchMouth")}
        </div>
        <MouthPlayer id={food.id} speaking={speaking} slow={slow} />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => speak("both")}
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
        {t("next")} · {lang === "ar" ? nextFood.ar : nextFood.fr}
        <Arrow className="h-4 w-4" />
      </Link>
    </div>
  );
}
