import { useEffect, useRef } from "react";
import { decoySymbol, NAMES, type SymbolId } from "@/game/math";
import { symbolSrc } from "@/components/slot/sprites";

interface ReelProps {
  reel: number;
  symbols: SymbolId[];
  spinToken: number;
  delay: number;
  duration: number;
  cell: number;
  frame: number;
  hotRows: boolean[];
  slamRows: boolean[];
  spinning: boolean;
  onStop: () => void;
}

export function Reel({
  reel,
  symbols,
  spinToken,
  delay,
  duration,
  cell,
  frame,
  hotRows,
  slamRows,
  spinning,
  onStop,
}: ReelProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const symbolsRef = useRef(symbols);
  const cellRef = useRef(cell);
  const onStopRef = useRef(onStop);
  symbolsRef.current = symbols;
  cellRef.current = cell;
  onStopRef.current = onStop;

  useEffect(() => {
    if (!spinToken) return;
    const size = cellRef.current;
    const track = trackRef.current;
    if (!track || size < 8) return;
    let dead = false;
    const result = symbolsRef.current;
    const decoys = Array.from({ length: 16 }, () => decoySymbol(reel));
    const pad = decoySymbol(reel);
    const strip = [pad, ...result, ...decoys];
    const start = -(strip.length - 3) * size;
    const end = -size;
    track.replaceChildren();
    for (const id of strip) {
      const cellEl = document.createElement("div");
      cellEl.className = "symbol-cell";
      cellEl.style.height = `${size}px`;
      const img = document.createElement("img");
      img.src = symbolSrc(id, 0);
      img.alt = "";
      img.draggable = false;
      cellEl.appendChild(img);
      track.appendChild(cellEl);
    }
    track.style.transform = `translateY(${start}px)`;
    track.style.filter = "blur(5px)";
    const t0 = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      if (dead) return;
      if (now < t0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      let y = start + (end - start) * eased;
      if (t > 0.86) {
        const u = (t - 0.86) / 0.14;
        y += Math.sin(u * Math.PI) * size * 0.07;
      }
      track.style.transform = `translateY(${y}px)`;
      track.style.filter = t < 0.72 ? "blur(5px)" : t < 0.9 ? "blur(1.5px)" : "none";
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        track.style.transform = `translateY(${end}px)`;
        track.style.filter = "none";
        onStopRef.current();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
    };
  }, [spinToken, delay, duration, reel]);

  return (
    <div className="reel" aria-hidden={spinning}>
      <div ref={trackRef} className="reel-track" style={{ display: spinning ? "block" : "none" }} />
      <div className="reel-rest" style={{ display: spinning ? "none" : "flex" }}>
        {symbols.map((id, row) => (
          <div
            key={`${reel}-${row}-${id}`}
            className={`symbol-cell${hotRows[row] ? " is-hot" : ""}${slamRows[row] ? " is-slam" : ""}`}
          >
            <img src={symbolSrc(id, frame)} alt={NAMES[id]} draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
