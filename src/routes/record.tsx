import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Mic, Square, Play, Volume2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/record")({
  component: Record,
});

function Record() {
  const { t } = useI18n();
  const [recording, setRecording] = useState(false);
  const [hasRec, setHasRec] = useState(false);

  const toggle = () => {
    if (recording) {
      setRecording(false);
      setHasRec(true);
    } else {
      setRecording(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">{t("recordTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("recordSub")}</p>
      </div>

      <div className="rounded-3xl bg-card shadow-card p-6 text-center">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{t("target")}</div>
        <div className="text-3xl font-extrabold text-gradient-brand">« Bonjour »</div>
        <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-brand">
          <Volume2 className="h-4 w-4" /> {t("listen")}
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 py-4">
        <button
          onClick={toggle}
          className={`relative h-28 w-28 rounded-full flex items-center justify-center text-primary-foreground shadow-soft transition-all ${
            recording ? "bg-destructive scale-110 animate-pulse-ring" : "bg-gradient-brand hover:scale-105"
          }`}
          aria-label={recording ? t("stopRec") : t("startRec")}
        >
          {recording ? <Square className="h-10 w-10" fill="currentColor" /> : <Mic className="h-12 w-12" strokeWidth={2.2} />}
        </button>
        <div className="font-semibold text-sm">{recording ? t("stopRec") : t("startRec")}</div>

        <div className="flex items-end gap-1 h-10">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-gradient-brand transition-all"
              style={{
                height: recording ? `${20 + Math.abs(Math.sin(i + Date.now() / 200)) * 30}px` : "6px",
                opacity: recording ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {hasRec && (
        <div className="rounded-2xl bg-card shadow-card p-4 flex items-center gap-3 animate-in fade-in">
          <button className="h-11 w-11 rounded-full bg-gradient-brand text-brand-foreground flex items-center justify-center">
            <Play className="h-5 w-5" fill="currentColor" />
          </button>
          <div className="flex-1">
            <div className="font-semibold text-sm">{t("playback")}</div>
            <div className="h-1.5 mt-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-brand" />
            </div>
          </div>
          <div className="text-xs font-bold text-success">92%</div>
        </div>
      )}
    </div>
  );
}
