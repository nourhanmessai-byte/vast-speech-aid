import { useEffect, useRef, useState } from "react";

/**
 * Affiche la vidéo d'articulation (mouvement de la bouche) si elle existe,
 * sinon repli automatique sur la bouche animée en SVG.
 *
 * Convention : déposez le fichier dans  public/mouth-videos/<id>.mp4
 * Exemple : public/mouth-videos/apple.mp4  → utilisé pour l'exercice "apple".
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
  const [hasVideo, setHasVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const src = `/mouth-videos/${id}.mp4`;

  useEffect(() => {
    setHasVideo(true);
  }, [id]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hasVideo) return;
    v.playbackRate = slow ? 0.5 : 1;
    if (speaking) {
      v.currentTime = 0;
      void v.play().catch(() => undefined);
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [speaking, slow, hasVideo]);

  if (!hasVideo) return <AnimatedMouth speaking={speaking} slow={slow} />;

  return (
    <div className="mx-auto h-44 w-44 rounded-full overflow-hidden bg-white/15 backdrop-blur relative">
      <div className={`absolute inset-0 rounded-full ${speaking ? "animate-pulse-ring" : ""}`} />
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        preload="metadata"
        onError={() => setHasVideo(false)}
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
