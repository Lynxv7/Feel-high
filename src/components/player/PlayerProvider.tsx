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
  requestStart: (forcePlay?: boolean) => void;
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
const defaultTrackIndex = Math.max(
  0,
  tracks.findIndex((track) => track.id === defaultTrack.id),
);
const initialSoundCloudUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  defaultTrack.soundcloudUrl,
)}&auto_play=false`;
const FADE_DURATION_MS = 3500;
const SCROLL_THRESHOLD_PX = 0;

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
  const [currentIndex, setCurrentIndex] = useState<number>(defaultTrackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolumeState] = useState(75);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const lastLoadedRef = useRef<string | null>(null);
  const scrollFadeRafRef = useRef<number | null>(null);
  const scrollStopTimeoutRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const volumeRef = useRef(75);
  const targetVolumeRef = useRef(75);
  const touchStartYRef = useRef<number | null>(null);
  const pendingStartRef = useRef(false);
  const pendingTimeoutRef = useRef<number | null>(null);
  const trackLoadedRef = useRef(false);
  const isReadyRef = useRef(false);
  const queuedStartRef = useRef(false);
  const autoPlayNextRef = useRef(false);

  const stopScrollFade = useCallback(() => {
    if (scrollFadeRafRef.current !== null) {
      window.cancelAnimationFrame(scrollFadeRafRef.current);
      scrollFadeRafRef.current = null;
    }
  }, []);

  const stopScrollActivity = useCallback(() => {
    isScrollingRef.current = false;
    if (scrollStopTimeoutRef.current !== null) {
      window.clearTimeout(scrollStopTimeoutRef.current);
      scrollStopTimeoutRef.current = null;
    }
  }, []);

  const clearPendingTimeout = useCallback(() => {
    if (pendingTimeoutRef.current !== null) {
      window.clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
  }, []);

  const startScrollFade = useCallback(() => {
    if (scrollFadeRafRef.current !== null) return;
    let last = window.performance.now();

    const step = (now: number) => {
      const delta = now - last;
      last = now;

      if (isScrollingRef.current && isPlaying) {
        const target = targetVolumeRef.current;
        const rate = target / FADE_DURATION_MS;
        const next = Math.min(target, volumeRef.current + rate * delta);
        if (next !== volumeRef.current) {
          volumeRef.current = next;
          setVolumeState(next);
          widgetRef.current?.setVolume(next);
        }
      }

      if (isScrollingRef.current && volumeRef.current < targetVolumeRef.current) {
        scrollFadeRafRef.current = window.requestAnimationFrame(step);
      } else {
        scrollFadeRafRef.current = null;
      }
    };

    scrollFadeRafRef.current = window.requestAnimationFrame(step);
  }, [isPlaying]);

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
      isReadyRef.current = true;
      setIsReady(true);
      w.setVolume(0);
      volumeRef.current = 0;
      setVolumeState(0);
      // Start paused, never auto-play
      w.pause();
      if (queuedStartRef.current) {
        queuedStartRef.current = false;
        startPlaybackFromInteraction(true);
      }
    });
    w.bind(E.PLAY, () => {
      setIsPlaying(true);
      if (pendingStartRef.current) {
        pendingStartRef.current = false;
        clearPendingTimeout();
        setHasUserInteracted(true);
        // Volume sobe apenas enquanto houver scroll ativo.
      }
    });
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
    trackLoadedRef.current = false;
    const shouldAutoPlay = autoPlayNextRef.current || pendingStartRef.current;
    w.load(t.soundcloudUrl, {
      auto_play: shouldAutoPlay,
      show_artwork: false,
      visual: false,
      hide_related: true,
      show_comments: false,
      show_user: false,
      show_reposts: false,
      show_teaser: false,
      callback: () => {
        trackLoadedRef.current = true;
        w.getDuration((d) => setDuration(d));
        const nextVolume = hasUserInteracted ? volumeRef.current : 0;
        w.setVolume(nextVolume);
        volumeRef.current = nextVolume;
        setVolumeState(nextVolume);
        if (autoPlayNextRef.current) {
          autoPlayNextRef.current = false;
        }
        if (pendingStartRef.current) {
          w.play();
        }
      },
    });
  }, [currentIndex, hasUserInteracted, isReady, volume]);

  const startPlaybackFromInteraction = useCallback(
    (forcePlay = false) => {
      if (hasUserInteracted || pendingStartRef.current) return;
      if (!isReadyRef.current) {
        queuedStartRef.current = true;
        return;
      }

      const w = widgetRef.current;
      if (!w) return;

      pendingStartRef.current = true;
      clearPendingTimeout();
      w.setVolume(0);
      volumeRef.current = 0;
      setVolumeState(0);

      if (forcePlay || trackLoadedRef.current) {
        w.play();
      }

      pendingTimeoutRef.current = window.setTimeout(() => {
        pendingStartRef.current = false;
      }, 1500);
    },
    [clearPendingTimeout, hasUserInteracted, isReady],
  );

  // Track user interaction: first downward scroll triggers playback
  useEffect(() => {
    if (!isReady) return;

    const markScrolling = () => {
      isScrollingRef.current = true;
      if (scrollStopTimeoutRef.current !== null) {
        window.clearTimeout(scrollStopTimeoutRef.current);
      }
      scrollStopTimeoutRef.current = window.setTimeout(() => {
        stopScrollActivity();
      }, 140);
      startScrollFade();
    };

    const stopListeners = () => {
      window.removeEventListener("scroll", handleFirstScroll);
      window.removeEventListener("wheel", handleFirstWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };

    const handleFirstScroll = () => {
      if (window.scrollY <= SCROLL_THRESHOLD_PX) return;
      markScrolling();
      startPlaybackFromInteraction();
    };

    const handleFirstWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0) return;
      markScrolling();
      startPlaybackFromInteraction();
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY ?? null;
      if (startY === null || currentY === null) return;
      if (currentY >= startY) return;
      markScrolling();
      startPlaybackFromInteraction();
    };

    const handlePointerDown = () => {
      startPlaybackFromInteraction(true);
    };

    const handleKeyDown = () => {
      startPlaybackFromInteraction(true);
    };

    window.addEventListener("scroll", handleFirstScroll, { passive: true });
    window.addEventListener("wheel", handleFirstWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      stopListeners();
    };
  }, [isReady, startPlaybackFromInteraction, startScrollFade, stopScrollActivity]);

  const play = useCallback(
    (soundcloudUrl?: TrackUrl) => {
      setHasUserInteracted(true);
      if (soundcloudUrl) {
        const idx = getTrackIndex(soundcloudUrl);
        if (idx < 0) return;
        if (idx !== currentIndex) {
          autoPlayNextRef.current = true;
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
          autoPlayNextRef.current = true;
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
    autoPlayNextRef.current = true;
    setCurrentIndex((i) => (i + 1) % tracks.length);
  }, []);

  const prev = useCallback(() => {
    setHasUserInteracted(true);
    autoPlayNextRef.current = true;
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

  const setVolume = useCallback(
    (v: number) => {
      const clamped = Math.max(0, Math.min(100, v));
      targetVolumeRef.current = clamped;
      volumeRef.current = clamped;
      setVolumeState(clamped);
      stopScrollFade();
      widgetRef.current?.setVolume(clamped);
    },
    [stopScrollFade],
  );

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
      requestStart: startPlaybackFromInteraction,
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
      startPlaybackFromInteraction,
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
