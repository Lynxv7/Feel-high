import { motion, AnimatePresence } from "motion/react";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayer } from "./PlayerProvider";
import { Waveform } from "./Waveform";
import { getTrackSubtitle } from "@/lib/tracks";

function fmt(ms: number) {
  if (!ms || !isFinite(ms)) return "0:00";
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function GlobalPlayer() {
  const p = usePlayer();
  return (
    <AnimatePresence>
      {p.currentTrack && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_20px_60px_-20px_oklch(0_0_0/0.8)]">
              <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.74_0.2_42/0.08)] via-transparent to-[oklch(0.74_0.2_42/0.08)] pointer-events-none" />

              {/* Progress bar */}
              <button
                aria-label="Seek"
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  p.seekFraction((e.clientX - r.left) / r.width);
                }}
                className="group relative block w-full h-[3px] bg-white/10"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--color-ember)] transition-[width] duration-150"
                  style={{ width: `${p.progress * 100}%` }}
                />
              </button>

              <div className="flex items-center gap-3 sm:gap-5 p-3 sm:p-4">
                <motion.img
                  key={p.currentTrack.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={p.currentTrack.cover}
                  alt=""
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-md object-cover flex-shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 truncate">
                    <span className="text-sm font-medium truncate">{p.currentTrack.title}</span>
                    <span className="hidden sm:inline text-xs text-white/40 truncate">
                      {getTrackSubtitle(p.currentTrack)}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 mt-1 text-[10px] font-mono text-white/40">
                    <span>{fmt(p.position)}</span>
                    <div className="h-3 flex-1 max-w-[200px]">
                      <Waveform active={p.isPlaying} bars={32} />
                    </div>
                    <span>{fmt(p.duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={p.prev}
                    aria-label="Previous"
                    className="p-2 text-white/60 hover:text-white transition"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => p.toggle()}
                    aria-label={p.isPlaying ? "Pause" : "Play"}
                    className="grid place-items-center h-10 w-10 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-transform"
                  >
                    {p.isPlaying ? (
                      <Pause className="h-4 w-4 fill-current" />
                    ) : (
                      <Play className="h-4 w-4 fill-current translate-x-[1px]" />
                    )}
                  </button>
                  <button
                    onClick={p.next}
                    aria-label="Next"
                    className="p-2 text-white/60 hover:text-white transition"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>

                <div className="hidden md:flex items-center gap-2 w-32 pl-3 border-l border-white/10">
                  <Volume2 className="h-4 w-4 text-white/40" />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={p.volume}
                    onChange={(e) => p.setVolume(Number(e.target.value))}
                    className="w-full accent-[var(--color-ember)]"
                    aria-label="Volume"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
