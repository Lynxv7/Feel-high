import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { tracks, type Track, type TrackUrl } from "@/lib/tracks";

type SCWidget = {
  bind: (event: string, cb: (...args: unknown[]) => void) => void;
  load: (url: string, options?: Record<string, unknown>) => void;
  play: () => void;
  pause: () => void;
  seekTo: (ms: number) => void;
  setVolume: (v: number) => void;
  getDuration: (cb: (d: number) => void) => void;
  getPosition: (cb: (p: number) => void) => void;
};

declare global {
  interface Window {
    SC?: { Widget: ((iframe: HTMLIFrameElement) => SCWidget) & { Events: Record<string, string> } };
  }
}

type Ctx = {
  tracks: readonly Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  isReady: boolean;
  progress: number; // 0..1
  duration: number; // ms
  position: number; // ms
  volume: number; // 0..100
  hasUserInteracted: boolean;
  play: (soundcloudUrl?: TrackUrl) => void;
  pause: () => void;
  toggle: (soundcloudUrl?: TrackUrl) => void;
  next: () => void;
  prev: () => void;
  seekFraction: (f: number) => void;
  setVolume: (v: number) => void;
};

const PlayerCtx = createContext<Ctx | null>(null);
const defaultTrack = tracks.find((track) => track.id === "myownstorm") ?? tracks[0];
const initialSoundCloudUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  defaultTrack.soundcloudUrl,
)}&auto_play=false`;

export function usePlayer() {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<SCWidget | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolumeState] = useState(80);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const lastLoadedRef = useRef<string | null>(null);

  // Load SoundCloud Widget API script
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.SC?.Widget) {
      setScriptLoaded(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://w.soundcloud.com/player/api.js";
    s.async = true;
    s.onload = () => setScriptLoaded(true);
    document.body.appendChild(s);
  }, []);

  // Initialize widget once iframe & script ready
  useEffect(() => {
    if (!scriptLoaded || !iframeRef.current || widgetRef.current) return;
    const SC = window.SC;
    if (!SC) return;
    const w = SC.Widget(iframeRef.current);
    widgetRef.current = w;
    const E = SC.Widget.Events;

    w.bind(E.READY, () => {
      setIsReady(true);
      w.setVolume(volume);
      // Start paused, never auto-play
      w.pause();
    });
    w.bind(E.PLAY, () => setIsPlaying(true));
    w.bind(E.PAUSE, () => setIsPlaying(false));
    w.bind(E.FINISH, () => {
      setIsPlaying(false);
      // Auto-advance to next track when current finishes
      setCurrentIndex((i) => (i + 1) % tracks.length);
    });
    w.bind(E.PLAY_PROGRESS, (data: { currentPosition: number; relativePosition: number }) => {
      setPosition(data.currentPosition);
    });
  }, [scriptLoaded, volume]);

  const getTrackIndex = useCallback((soundcloudUrl: string) => {
    return tracks.findIndex((t) => t.soundcloudUrl === soundcloudUrl);
  }, []);

  // Auto-load current track
  useEffect(() => {
    const w = widgetRef.current;
    if (!w || !isReady) return;
    const t = tracks[currentIndex];
    if (lastLoadedRef.current === t.soundcloudUrl) return;
    lastLoadedRef.current = t.soundcloudUrl;
    w.load(t.soundcloudUrl, {
      auto_play: false, // NEVER auto-play
      show_artwork: false,
      visual: false,
      hide_related: true,
      show_comments: false,
      show_user: false,
      show_reposts: false,
      show_teaser: false,
      callback: () => {
        w.getDuration((d) => setDuration(d));
        w.setVolume(volume);
      },
    });
  }, [currentIndex, isReady, volume]);

  // Track user interaction: first scroll or click triggers playback
  useEffect(() => {
    if (hasUserInteracted || !isReady) return;

    const handleFirstInteraction = () => {
      if (hasUserInteracted) return;
      setHasUserInteracted(true);
      // Play current track on first interaction
      widgetRef.current?.play();
      // Remove listeners after first interaction
      window.removeEventListener("wheel", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("wheel", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("click", handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, [hasUserInteracted, isReady]);

  const play = useCallback(
    (soundcloudUrl?: TrackUrl) => {
      setHasUserInteracted(true);
      if (soundcloudUrl) {
        const idx = getTrackIndex(soundcloudUrl);
        if (idx < 0) return;
        if (idx !== currentIndex) {
          setCurrentIndex(idx);
          return;
        }
      }
      widgetRef.current?.play();
    },
    [currentIndex, getTrackIndex],
  );

  const pause = useCallback(() => widgetRef.current?.pause(), []);

  const toggle = useCallback(
    (soundcloudUrl?: TrackUrl) => {
      setHasUserInteracted(true);
      if (soundcloudUrl) {
        const idx = getTrackIndex(soundcloudUrl);
        if (idx < 0) return;
        if (idx !== currentIndex) {
          setCurrentIndex(idx);
          return;
        }
      }
      if (isPlaying) widgetRef.current?.pause();
      else widgetRef.current?.play();
    },
    [currentIndex, getTrackIndex, isPlaying],
  );

  const next = useCallback(() => {
    setHasUserInteracted(true);
    setCurrentIndex((i) => (i + 1) % tracks.length);
  }, []);

  const prev = useCallback(() => {
    setHasUserInteracted(true);
    setCurrentIndex((i) => (i <= 0 ? tracks.length - 1 : i - 1));
  }, []);

  const seekFraction = useCallback(
    (f: number) => {
      setHasUserInteracted(true);
      if (!duration) return;
      const ms = Math.max(0, Math.min(1, f)) * duration;
      widgetRef.current?.seekTo(ms);
      setPosition(ms);
    },
    [duration],
  );

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(100, v));
    setVolumeState(clamped);
    widgetRef.current?.setVolume(clamped);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      tracks,
      currentTrack: tracks[currentIndex] ?? null,
      isPlaying,
      isReady,
      progress: duration > 0 ? position / duration : 0,
      duration,
      position,
      volume,
      hasUserInteracted,
      play,
      pause,
      toggle,
      next,
      prev,
      seekFraction,
      setVolume,
    }),
    [
      currentIndex,
      isPlaying,
      isReady,
      duration,
      position,
      volume,
      hasUserInteracted,
      play,
      pause,
      toggle,
      next,
      prev,
      seekFraction,
      setVolume,
    ],
  );

  return (
    <PlayerCtx.Provider value={value}>
      {children}
      {/* Hidden SoundCloud iframe: actual audio engine */}
      <iframe
        ref={iframeRef}
        title="FEEL HIGH audio engine"
        aria-hidden="true"
        tabIndex={-1}
        allow="autoplay"
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          left: -9999,
          top: -9999,
          opacity: 0,
          pointerEvents: "none",
          border: 0,
        }}
        src={initialSoundCloudUrl}
      />
    </PlayerCtx.Provider>
  );
}
