import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Play, RotateCcw, Maximize2, Volume2 } from "lucide-react";
import { useState } from "react";
import mouth from "@/assets/mouth-visualization.jpg";

export const Route = createFileRoute("/videos")({
  component: Videos,
});

function Videos() {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(false);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">{t("videoTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("videoSub")}</p>
      </div>

      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-brand shadow-soft">
        <img src={mouth} alt="Mouth" width={1024} height={768} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <button
          onClick={() => setPlaying((p) => !p)}
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Play"
        >
          <span className="h-20 w-20 rounded-full bg-white/95 text-brand flex items-center justify-center shadow-soft animate-pulse-ring">
            <Play className="h-9 w-9" fill="currentColor" />
          </span>
        </button>
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-white">
          <div className="text-sm font-semibold">/ ba /</div>
          <div className="flex gap-2">
            <IconBtn label="Volume"><Volume2 className="h-4 w-4" /></IconBtn>
            <IconBtn label={t("replay")}><RotateCcw className="h-4 w-4" /></IconBtn>
            <IconBtn label={t("fullscreen")}><Maximize2 className="h-4 w-4" /></IconBtn>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-card shadow-card p-4">
        <div className="text-sm font-bold mb-2">{t("practice")}</div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["ba", "ma", "pa", "ta", "la", "sa"].map((s) => (
            <button key={s} className="px-4 py-2 rounded-full bg-gradient-soft text-brand font-semibold text-sm shrink-0 hover:scale-105 transition">
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button aria-label={label} className="h-9 w-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition">
      {children}
    </button>
  );
}
