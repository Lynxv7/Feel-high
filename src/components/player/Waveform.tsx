type Props = {
  active?: boolean;
  bars?: number;
  className?: string;
};

// Deterministic pseudo-random heights so SSR matches client
function heights(n: number) {
  const out: number[] = [];
  let s = 7;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    out.push(0.25 + (s / 233280) * 0.75);
  }
  return out;
}

export function Waveform({ active = false, bars = 28, className = "" }: Props) {
  const h = heights(bars);
  return (
    <div className={`flex items-center gap-[2px] h-full ${className}`}>
      {h.map((v, i) => (
        <span
          key={i}
          className={`wave-bar inline-block w-[2px] rounded-full ${
            active ? "bg-[var(--color-ember)]" : "bg-white/30"
          }`}
          style={{
            height: `${Math.round(v * 100)}%`,
            animationPlayState: active ? "running" : "paused",
            animationDelay: `${(i % 7) * 0.08}s`,
            transform: active ? undefined : `scaleY(${v})`,
          }}
        />
      ))}
    </div>
  );
}
