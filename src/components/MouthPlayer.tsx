import { useEffect, useRef, useState } from "react";
import mouth1 from "@/assets/mouth/mouth-1.mp4.asset.json";
import mouth2 from "@/assets/mouth/mouth-2.mp4.asset.json";
import mouth3 from "@/assets/mouth/mouth-3.mp4.asset.json";

/** Vidéos d'articulation par défaut (gros plan sur la bouche). */
const DEFAULT_MOUTH_VIDEOS = [mouth1.url, mouth2.url, mouth3.url];

function pickDefault(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return DEFAULT_MOUTH_VIDEOS[h % DEFAULT_MOUTH_VIDEOS.length];
}

/**
 * Affiche la vidéo d'articulation (mouvement de la bouche).
 * Une vidéo spécifique peut être déposée dans public/mouth-videos/<id>.mp4 ;
 * sinon une vidéo d'articulation par défaut est utilisée.
 */
export function MouthPlayer({
  id,
  speaking,
  slow,
}: {
  id: string;
  speaking: boolean;
  slow: boolean;
}) {
  const [src, setSrc] = useState(`/mouth-videos/${id}.mp4`);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setSrc(`/mouth-videos/${id}.mp4`);
    setFailed(false);
  }, [id]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed) return;
    v.playbackRate = slow ? 0.5 : 1;
    if (speaking) {
      v.currentTime = 0;
      void v.play().catch(() => undefined);
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [speaking, slow, src, failed]);

  const onError = () => {
    const fallback = pickDefault(id);
    if (src !== fallback) {
      setSrc(fallback);
    } else {
      setFailed(true);
    }
  };

  if (failed) return <AnimatedMouth speaking={speaking} slow={slow} />;

  return (
    <div className="mx-auto h-44 w-44 rounded-full overflow-hidden bg-white/15 backdrop-blur relative">
      <div
        className={`absolute inset-0 rounded-full pointer-events-none z-10 ${
          speaking ? "animate-pulse-ring" : ""
        }`}
      />
      <video
        ref={videoRef}
        key={src}
        src={src}
        muted
        playsInline
        loop
        preload="auto"
        onError={onError}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function AnimatedMouth({ speaking, slow }: { speaking: boolean; slow: boolean }) {
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
