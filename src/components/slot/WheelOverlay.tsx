import { useEffect, useRef, useState } from "react";
import { WHEEL } from "@/game/math";
import { audio } from "@/game/audio";

const SLICE = 360 / WHEEL.length;

function toneColor(tone: (typeof WHEEL)[number]["tone"]) {
  if (tone === "gold") return "var(--color-gold-deep)";
  if (tone === "ember") return "var(--color-ember)";
  if (tone === "star") return "var(--color-star)";
  return "var(--color-ink)";
}

export function WheelOverlay({
  index,
  spinKey,
  reduce,
  onArm,
  onDone,
}: {
  index: number;
  spinKey: number;
  reduce: boolean;
  onArm: () => void;
  onDone: () => void;
}) {
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (spinKey < 1) return;
    let dead = false;
    const turns = reduce ? 1 : 6;
    const startAngle = angleRef.current;
    const target = turns * 360 - index * SLICE;
    const delta = target - (startAngle % 360);
    const finalAngle = startAngle + (delta <= 180 ? delta + 360 : delta);
    const t0 = performance.now();
    const dur = reduce ? 450 : 5200;
    let raf = 0;
    let lastSlice = -1;
    const tick = (now: number) => {
      if (dead) return;
      const t = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = startAngle + (finalAngle - startAngle) * eased;
      angleRef.current = next;
      setAngle(next);
      const sliceNow = Math.floor(((360 - (((next % 360) + 360) % 360)) / SLICE) % WHEEL.length);
      if (sliceNow !== lastSlice) {
        lastSlice = sliceNow;
        if (t < 0.94) audio.wheelTick();
      }
      if (t < 1) raf = requestAnimationFrame(tick);
      else onDoneRef.current();
    };
    raf = requestAnimationFrame(tick);
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
    };
  }, [spinKey, index, reduce]);

  const gradient = `conic-gradient(from -${SLICE / 2}deg, ${WHEEL.map((slice, i) => {
    return `${toneColor(slice.tone)} ${i * SLICE}deg ${(i + 1) * SLICE}deg`;
  }).join(", ")})`;

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Wheel of Suns">
      <div className="overlay-card wheel-card">
        <p className="eyebrow">Eclipse Gate</p>
        <h2 className="font-display">Wheel of Suns</h2>
        <p className="muted">Three gates. One spin. Jackpots live on the ember slices.</p>
        <div className="wheel-wrap">
          <div className="wheel-pointer" aria-hidden />
          <div className="wheel" style={{ background: gradient, transform: `rotate(${angle}deg)` }}>
            {WHEEL.map((item, i) => (
              <span key={`${item.label}-${i}`} style={{ transform: `rotate(${i * SLICE}deg) translateY(-42%)` }}>
                {item.label}
              </span>
            ))}
          </div>
          <div className="wheel-hub font-display">SUN</div>
        </div>
        {spinKey < 1 ? (
          <button
            className="spin-btn"
            onClick={() => {
              audio.unlock();
              audio.click();
              onArm();
            }}
          >
            Spin the sun
          </button>
        ) : (
          <p className="wheel-note">Listen for the click. The pointer is the judge.</p>
        )}
      </div>
    </div>
  );
}
