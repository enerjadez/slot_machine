import { useEffect, useRef, type MutableRefObject } from "react";

export type BurstKind = "win" | "big" | "mega" | "storm" | "jackpot";

export interface FxHandle {
  burst: (kind: BurstKind) => void;
  kick: (amount: number) => void;
  trauma: { current: number };
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
  grav: number;
  spin: number;
  vr: number;
  alive: boolean;
}

const POOL = 220;

export function FxCanvas({ fxRef, heat }: { fxRef: MutableRefObject<FxHandle | null>; heat: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heatRef = useRef(heat);
  heatRef.current = heat;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const particles: Particle[] = Array.from({ length: POOL }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 2, color: "#f0c14b", grav: 0, spin: 0, vr: 0, alive: false,
    }));

    const colors = () => {
      const css = getComputedStyle(parent);
      return {
        gold: css.getPropertyValue("--color-gold").trim() || "#f0c14b",
        ember: css.getPropertyValue("--color-ember").trim() || "#ff4d6d",
        star: css.getPropertyValue("--color-star").trim() || "#7ee7ff",
        parchment: css.getPropertyValue("--color-parchment").trim() || "#f6edd8",
      };
    };

    const trauma = { current: 0 };
    const spawn = (kind: BurstKind) => {
      const palette = colors();
      const rect = canvas.getBoundingClientRect();
      const cx = rect.width * 0.5;
      const cy = rect.height * 0.46;
      const count = kind === "jackpot" ? 140 : kind === "mega" ? 100 : kind === "storm" ? 80 : kind === "big" ? 60 : 28;
      let made = 0;
      for (const p of particles) {
        if (p.alive || made >= count) continue;
        const angle = Math.random() * Math.PI * 2;
        const speed = 80 + Math.random() * (kind === "jackpot" ? 620 : 380);
        p.alive = true;
        p.x = cx + (Math.random() - 0.5) * 40;
        p.y = cy;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed - 80;
        p.life = 0;
        p.max = 0.7 + Math.random() * 0.9;
        p.size = 2 + Math.random() * (kind === "jackpot" ? 7 : 4);
        p.grav = 280 + Math.random() * 200;
        p.spin = Math.random() * 6;
        p.vr = Math.random() * 6 - 3;
        const roll = Math.random();
        p.color = roll < 0.5 ? palette.gold : roll < 0.8 ? palette.ember : roll < 0.93 ? palette.star : palette.parchment;
        made++;
      }
    };

    fxRef.current = {
      burst: spawn,
      kick: (amount) => {
        trauma.current = Math.min(1, trauma.current + amount);
      },
      trauma,
    };

    let raf = 0;
    let last = performance.now();
    let ambient = 0;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const rect = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ambient += dt;
      const palette = colors();
      if (ambient > 0.08) {
        ambient = 0;
        const moteCount = 1 + Math.floor(heatRef.current / 40);
        let made = 0;
        for (const p of particles) {
          if (p.alive || made >= moteCount) continue;
          p.alive = true;
          p.x = Math.random() * rect.width;
          p.y = rect.height + 6;
          p.vx = (Math.random() - 0.5) * 20;
          p.vy = -30 - Math.random() * 50 - heatRef.current * 0.4;
          p.life = 0;
          p.max = 2.4 + Math.random();
          p.size = 1.2 + Math.random() * 2;
          p.grav = -8;
          p.spin = 0;
          p.vr = 0;
          p.color = Math.random() > 0.7 ? palette.ember : palette.gold;
          made++;
        }
      }
      for (const p of particles) {
        if (!p.alive) continue;
        p.life += dt;
        if (p.life >= p.max) {
          p.alive = false;
          continue;
        }
        p.vy += p.grav * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.spin += p.vr * dt;
        const a = 1 - p.life / p.max;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        ctx.globalAlpha = Math.max(0, a);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size, -p.size * 0.6, p.size * 2, p.size * 1.2);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      fxRef.current = null;
    };
  }, [fxRef]);

  return <canvas ref={canvasRef} className="fx-layer" aria-hidden />;
}
