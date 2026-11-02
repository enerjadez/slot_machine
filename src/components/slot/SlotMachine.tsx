import { useCallback, useEffect, useRef, useState } from "react";
import { Info, Minus, Plus, Repeat, Volume2, VolumeX } from "lucide-react";
import {
  BETS,
  HUNT_PICKS,
  JACKPOT_MULT,
  LINE_ROWS,
  NAMES,
  REFILL_CREDITS,
  STORM_ODDS,
  awardWheel,
  contribute,
  rollSpin,
  rollWheelIndex,
  sealAward,
  type Grid,
  type Jackpots,
  type SpinOutcome,
  type SymbolId,
} from "@/game/math";
import { audio } from "@/game/audio";
import { defaultSave, loadSave, writeSave, type Stats } from "@/game/save";
import { Reel } from "@/components/slot/Reel";
import { FxCanvas, type FxHandle } from "@/components/slot/FxCanvas";
import { WheelOverlay } from "@/components/slot/WheelOverlay";
import { HuntOverlay } from "@/components/slot/HuntOverlay";
import { Paytable } from "@/components/slot/Paytable";
import { symbolSrc } from "@/components/slot/sprites";

type Phase = "boot" | "idle" | "spinning" | "storm" | "tally" | "wheel" | "hunt" | "broke";
type Tier = "none" | "tickle" | "win" | "big" | "mega" | "ultra";

const INTRO: Grid = [
  ["lyra", "coin", "crystal"],
  ["gem", "sol", "rune"],
  ["kael", "wild", "gem"],
  ["rune", "nyx", "coin"],
  ["crystal", "sol", "lyra"],
];

const FACES: SymbolId[] = ["lyra", "kael", "nyx", "sol"];

function tierOf(win: number, bet: number): Tier {
  const x = win / Math.max(1, bet);
  if (x <= 0) return "none";
  if (x < 2) return "tickle";
  if (x < 8) return "win";
  if (x < 20) return "big";
  if (x < 50) return "mega";
  return "ultra";
}

function bannerFor(tier: Tier) {
  if (tier === "tickle") return "SPARK";
  if (tier === "win") return "WIN";
  if (tier === "big") return "BIG WIN";
  if (tier === "mega") return "MEGA WIN";
  if (tier === "ultra") return "SUN BURST";
  return "";
}

function quoteFor(kind: "idle" | "lose" | "win" | "storm" | "jackpot") {
  const bank = {
    idle: ["The marble is warm.", "Nyx is counting eclipses.", "Kael wants heat.", "Lyra taps the glass."],
    lose: ["The house blinked.", "Sol looks away.", "Dry marble. Again."],
    win: ["Lyra laughs in gold.", "Kael grunts approval.", "The rune answered."],
    storm: ["Ashwing opens.", "Feathers in the reels.", "The wild door swings."],
    jackpot: ["The vault bows.", "Nine suns, one payout.", "Sol finally looks."],
  };
  const list = bank[kind];
  return list[Math.floor(Math.random() * list.length)] ?? list[0]!;
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

interface Model {
  phase: Phase;
  credits: number;
  bet: number;
  jackpots: Jackpots;
  grid: Grid;
  outcome: SpinOutcome | null;
  spinId: number;
  quote: string;
  banner: string;
  sub: string;
  auto: boolean;
  mute: boolean;
  shake: boolean;
  reduce: boolean;
  stats: Stats;
  paytable: boolean;
  huntOpen: number[];
  huntLabels: Record<number, string>;
  huntMult: number;
  huntLocked: boolean;
  wheelRun: number;
  wheelIndex: number | null;
  wheelRespun: boolean;
  heat: number;
  activeLine: number;
  shownWin: number;
}

function freshModel(): Model {
  const save = defaultSave();
  return {
    phase: "boot",
    credits: save.credits,
    bet: save.bet,
    jackpots: save.jackpots,
    grid: INTRO,
    outcome: null,
    spinId: 0,
    quote: "Nine suns. One vault. The wild door is Ashwing's.",
    banner: "",
    sub: "",
    auto: false,
    mute: false,
    shake: true,
    reduce: false,
    stats: save.stats,
    paytable: false,
    huntOpen: [],
    huntLabels: {},
    huntMult: 1,
    huntLocked: false,
    wheelRun: 0,
    wheelIndex: null,
    wheelRespun: false,
    heat: 12,
    activeLine: 0,
    shownWin: 0,
  };
}

export function SlotMachine() {
  const [model, setModel] = useState<Model>(freshModel);
  const modelRef = useRef(model);
  modelRef.current = model;
  const fxRef = useRef<FxHandle | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);
  const [cell, setCell] = useState(0);
  const [frame, setFrame] = useState(0);
  const stopped = useRef([false, false, false, false, false]);
  const tallyToken = useRef(0);
  const paidWheel = useRef(0);
  const [announce, setAnnounce] = useState("Vault of Nine Suns. Tap to play.");

  useEffect(() => {
    const save = loadSave();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setModel((prev) => ({
      ...prev,
      credits: save.credits,
      bet: save.bet,
      jackpots: save.jackpots,
      stats: save.stats,
      mute: save.mute,
      shake: reduce ? false : save.shake,
      reduce,
    }));
    audio.setMuted(save.mute);
    const onVis = () => {
      if (document.visibilityState === "visible") audio.resume();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (model.phase === "boot") return;
    writeSave({
      version: 1,
      credits: model.credits,
      bet: model.bet,
      jackpots: model.jackpots,
      stats: model.stats,
      mute: model.mute,
      shake: model.shake,
    });
  }, [model.phase, model.credits, model.bet, model.jackpots, model.stats, model.mute, model.shake]);

  useEffect(() => {
    const el = reelsRef.current;
    if (!el) return;
    const measure = () => setCell(el.clientHeight / 3);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (model.reduce) return;
    const id = window.setInterval(() => setFrame((value) => (value + 1) % 4), 160);
    return () => window.clearInterval(id);
  }, [model.reduce]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const trauma = fxRef.current?.trauma;
      if (trauma) trauma.current = Math.max(0, trauma.current - dt * 1.45);
      const mag = modelRef.current.shake && !modelRef.current.reduce ? (trauma?.current ?? 0) ** 2 : 0;
      const el = shellRef.current;
      if (el) {
        if (mag > 0.002) {
          const x = (Math.random() * 2 - 1) * 14 * mag;
          const y = (Math.random() * 2 - 1) * 10 * mag;
          const rot = (Math.random() * 2 - 1) * 1.4 * mag;
          el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
        } else el.style.transform = "";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const patch = useCallback((recipe: (prev: Model) => Model) => {
    setModel((prev) => recipe(prev));
  }, []);

  const goIdle = useCallback((credits: number) => {
    patch((prev) => ({
      ...prev,
      phase: credits < BETS[0] ? "broke" : "idle",
      banner: credits < BETS[0] ? "VAULT DRY" : prev.banner,
      auto: credits < BETS[0] ? false : prev.auto,
    }));
  }, [patch]);

  const openWheel = useCallback((index: number) => {
    paidWheel.current = 0;
    patch((prev) => ({
      ...prev,
      phase: "wheel",
      wheelIndex: index,
      wheelRun: 0,
      wheelRespun: false,
      quote: quoteFor("jackpot"),
    }));
  }, [patch]);

  const afterBonus = useCallback(() => {
    const cur = modelRef.current;
    if (cur.outcome?.wheelIndex !== null && cur.outcome?.wheelIndex !== undefined && cur.phase === "hunt") {
      openWheel(cur.outcome.wheelIndex);
      return;
    }
    goIdle(cur.credits);
  }, [goIdle, openWheel]);

  const finishTally = useCallback((amount: number, startCredits: number) => {
    const cur = modelRef.current;
    const outcome = cur.outcome;
    const credits = startCredits + amount;
    const tier = tierOf(amount, cur.bet);
    const stats: Stats = {
      ...cur.stats,
      won: cur.stats.won + amount,
      biggest: Math.max(cur.stats.biggest, amount),
      storms: cur.stats.storms + (outcome?.feature ? 1 : 0),
    };
    patch((prev) => ({
      ...prev,
      credits,
      stats,
      shownWin: amount,
      heat: Math.min(100, prev.heat + (amount > 0 ? 18 : -12) + (outcome?.feature ? 22 : 0)),
      quote: amount > prev.bet * 8 ? quoteFor("win") : amount > 0 ? quoteFor("win") : quoteFor("lose"),
    }));
    window.setTimeout(() => {
      const latest = modelRef.current;
      if (latest.outcome?.hunt) {
        patch((prev) => ({
          ...prev,
          phase: "hunt",
          huntOpen: [],
          huntLabels: {},
          huntMult: 1,
          huntLocked: false,
          stats: { ...prev.stats, hunts: prev.stats.hunts + 1 },
          quote: "Three hearts. The seals are warm.",
        }));
        return;
      }
      if (latest.outcome?.wheelIndex !== null && latest.outcome?.wheelIndex !== undefined) {
        patch((prev) => ({
          ...prev,
          stats: { ...prev.stats, wheels: prev.stats.wheels + 1 },
        }));
        openWheel(latest.outcome!.wheelIndex!);
        return;
      }
      goIdle(modelRef.current.credits);
      if (tier === "none") {
        patch((prev) => ({ ...prev, banner: "" }));
      }
    }, 240);
  }, [goIdle, openWheel, patch]);

  const runTally = useCallback((amount: number) => {
    const token = ++tallyToken.current;
    const startCredits = modelRef.current.credits;
    const bet = modelRef.current.bet;
    const tier = tierOf(amount, bet);
    const base = amount <= 0 ? 380 : tier === "tickle" ? 520 : tier === "win" ? 980 : tier === "big" ? 1600 : tier === "mega" ? 2200 : 2800;
    const dur = modelRef.current.reduce ? 280 : modelRef.current.auto && tier === "tickle" ? 360 : base;
    patch((prev) => ({
      ...prev,
      phase: "tally",
      banner: amount > 0 ? bannerFor(tier) : prev.outcome?.feature ? prev.banner : "NO SUN",
      sub: amount > 0 ? `${fmt(amount)} credits` : "The line stayed dark.",
    }));
    if (amount > 0 && tier !== "none") {
      const sound = tier === "ultra" || tier === "mega" ? "ultra" : tier === "tickle" ? "tickle" : tier;
      audio.win(sound);
      fxRef.current?.burst(tier === "ultra" ? "jackpot" : tier === "mega" ? "mega" : tier === "big" ? "big" : "win");
      fxRef.current?.kick(tier === "ultra" ? 0.85 : tier === "mega" ? 0.6 : tier === "big" ? 0.4 : 0.18);
    }
    setAnnounce(amount > 0 ? `Win ${fmt(amount)}` : "No win");
    const t0 = performance.now();
    const step = (now: number) => {
      if (tallyToken.current !== token) return;
      const t = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - t, 2);
      const wins = modelRef.current.outcome?.lineWins.length ?? 0;
      patch((prev) => ({
        ...prev,
        shownWin: Math.round(amount * eased),
        credits: startCredits + Math.round(amount * eased),
        activeLine: wins ? Math.min(wins - 1, Math.floor(eased * wins)) : 0,
      }));
      if (t < 1) requestAnimationFrame(step);
      else finishTally(amount, startCredits);
    };
    requestAnimationFrame(step);
  }, [finishTally, patch]);

  const beginStorm = useCallback((outcome: SpinOutcome) => {
    audio.storm();
    fxRef.current?.burst("storm");
    fxRef.current?.kick(0.62);
    setAnnounce(outcome.feature?.title ?? "Ashwing Storm");
    patch((prev) => ({
      ...prev,
      phase: "storm",
      grid: outcome.final,
      banner: outcome.feature?.title ?? "ASHWING STORM",
      sub: outcome.feature?.detail ?? "",
      quote: quoteFor("storm"),
      heat: Math.min(100, prev.heat + 30),
    }));
    window.setTimeout(() => {
      runTally(outcome.lineWin + outcome.scatterPay + outcome.stormBless);
    }, modelRef.current.reduce ? 280 : 1250);
  }, [patch, runTally]);

  const onStop = useCallback((reel: number) => {
    if (modelRef.current.phase !== "spinning") return;
    if (stopped.current[reel]) return;
    stopped.current[reel] = true;
    audio.reelStop(reel);
    if (!stopped.current.every(Boolean)) return;
    audio.stopSpin();
    const outcome = modelRef.current.outcome;
    if (!outcome) return;
    if (outcome.feature) beginStorm(outcome);
    else {
      patch((prev) => ({ ...prev, grid: outcome.final }));
      runTally(outcome.lineWin + outcome.scatterPay + outcome.stormBless);
    }
  }, [beginStorm, patch, runTally]);

  const spin = useCallback(() => {
    const cur = modelRef.current;
    if (cur.phase !== "idle" || cell < 8) return;
    audio.unlock();
    let bet = cur.bet;
    if (cur.credits < bet) {
      const lower = [...BETS].reverse().find((value) => value <= cur.credits);
      if (!lower) {
        patch((prev) => ({ ...prev, phase: "broke", auto: false, banner: "VAULT DRY" }));
        return;
      }
      bet = lower;
    }
    const outcome = rollSpin(bet, Math.random);
    const jackpots = contribute(cur.jackpots, bet);
    stopped.current = [false, false, false, false, false];
    audio.spin();
    setAnnounce(outcome.anticipate ? "The eclipse is leaning in." : "Reels spinning");
    patch((prev) => ({
      ...prev,
      phase: "spinning",
      bet,
      credits: prev.credits - bet,
      jackpots,
      outcome,
      grid: outcome.natural,
      spinId: prev.spinId + 1,
      banner: outcome.anticipate ? "ECLIPSE LEAN" : "",
      sub: outcome.anticipate ? "A gate is already on the glass." : "",
      shownWin: 0,
      activeLine: 0,
      quote: quoteFor("idle"),
      stats: {
        ...prev.stats,
        spins: prev.stats.spins + 1,
        wagered: prev.stats.wagered + bet,
      },
    }));
  }, [cell, patch]);

  useEffect(() => {
    if (!model.auto || model.phase !== "idle") return;
    const id = window.setTimeout(() => spin(), 480);
    return () => window.clearTimeout(id);
  }, [model.auto, model.phase, model.spinId, spin]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "Space" && event.code !== "Enter") return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "BUTTON" || tag === "INPUT") return;
      if (modelRef.current.phase === "boot") {
        event.preventDefault();
        audio.unlock();
        patch((prev) => ({ ...prev, phase: "idle" }));
        return;
      }
      if (modelRef.current.phase === "idle") {
        event.preventDefault();
        spin();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [patch, spin]);

  const pickSeal = (index: number) => {
    const cur = modelRef.current;
    const deck = cur.outcome?.hunt;
    if (cur.phase !== "hunt" || !deck || cur.huntLocked || cur.huntOpen.includes(index)) return;
    const seal = deck[index];
    if (!seal) return;
    audio.unlock();
    const first = cur.huntOpen.length === 0;
    const award = sealAward(seal, cur.bet, cur.jackpots, cur.huntMult);
    const consolation = award.lock && first ? cur.bet * 2 : 0;
    if (award.lock) audio.lock();
    else audio.pick();
    if (award.text === "GRAND" || award.text === "MAJOR") {
      audio.jackpot();
      fxRef.current?.burst("jackpot");
      fxRef.current?.kick(0.9);
    } else if (award.amount > cur.bet * 8) {
      fxRef.current?.burst("big");
    }
    const successBefore = cur.huntOpen.filter((i) => deck[i]?.type !== "lock").length;
    const nextCount = successBefore + (award.lock ? 0 : 1);
    const locked = award.lock || nextCount >= HUNT_PICKS;
    const gained = award.amount + consolation;
    setAnnounce(award.lock ? "Lock. The hunt ends." : `Seal reveals ${award.text}`);
    patch((prev) => ({
      ...prev,
      credits: prev.credits + gained,
      jackpots: award.jackpots,
      huntMult: award.nextMult,
      huntOpen: [...prev.huntOpen, index],
      huntLabels: { ...prev.huntLabels, [index]: award.lock && first ? "LOCK · 2×" : award.text },
      huntLocked: locked,
      shownWin: prev.shownWin + gained,
      stats: {
        ...prev.stats,
        won: prev.stats.won + gained,
        biggest: Math.max(prev.stats.biggest, gained),
      },
      quote: award.lock ? "The seal bites shut." : quoteFor("win"),
    }));
  };

  const onWheelDone = () => {
    const cur = modelRef.current;
    if (cur.wheelIndex === null || paidWheel.current === cur.wheelRun) return;
    paidWheel.current = cur.wheelRun;
    const award = awardWheel(cur.wheelIndex, cur.bet, cur.jackpots);
    if (award.respin && !cur.wheelRespun) {
      const next = rollWheelIndex(Math.random, false);
      audio.win("big");
      patch((prev) => ({
        ...prev,
        wheelIndex: next,
        wheelRun: prev.wheelRun + 1,
        wheelRespun: true,
        banner: "RESPIN",
        sub: "The sun refuses to sit.",
      }));
      return;
    }
    if (award.amount > 0) {
      const pot = award.label === "GRAND" || award.label === "MAJOR" || award.label === "MINOR" || award.label === "MINI";
      if (pot) {
        audio.jackpot();
        fxRef.current?.burst("jackpot");
        fxRef.current?.kick(1);
      } else {
        audio.win(award.amount > cur.bet * 15 ? "ultra" : "big");
        fxRef.current?.burst(award.amount > cur.bet * 15 ? "mega" : "big");
      }
    }
    setAnnounce(`Wheel pays ${fmt(award.amount)}`);
    patch((prev) => ({
      ...prev,
      credits: prev.credits + award.amount,
      jackpots: award.jackpots,
      shownWin: award.amount,
      banner: award.label,
      sub: `${fmt(award.amount)} credits`,
      quote: quoteFor("jackpot"),
      stats: {
        ...prev.stats,
        won: prev.stats.won + award.amount,
        biggest: Math.max(prev.stats.biggest, award.amount),
      },
    }));
    window.setTimeout(() => goIdle(modelRef.current.credits), 700);
  };

  const hotRow = (reel: number) => {
    const rows = [false, false, false];
    if (model.phase !== "tally" || !model.outcome) return rows;
    const win = model.outcome.lineWins[model.activeLine];
    if (!win || reel >= win.count) return rows;
    const row = win.rows[reel];
    if (row !== undefined) rows[row] = true;
    return rows;
  };

  const slamRow = (reel: number) => {
    const rows = [false, false, false];
    if (model.phase !== "storm" || !model.outcome?.feature) return rows;
    for (const spot of model.outcome.feature.injected) {
      if (spot.reel === reel) rows[spot.row] = true;
    }
    return rows;
  };

  const durations = model.outcome?.anticipate ? [980, 1200, 1500, 2200, 3100] : [880, 1100, 1340, 1600, 1900];
  const cheering = model.phase === "storm" || model.phase === "tally" && model.shownWin > model.bet;
  const lineLabel = (() => {
    const win = model.phase === "tally" ? model.outcome?.lineWins[model.activeLine] : undefined;
    if (!win) return model.sub;
    return `Line ${win.index + 1} · ${NAMES[win.symbol]} ×${win.count} · ${fmt(win.amount)}`;
  })();

  const boot = () => {
    audio.unlock();
    audio.click();
    patch((prev) => ({ ...prev, phase: "idle", quote: quoteFor("idle") }));
  };

  return (
    <div className={`stage${model.reduce ? " reduce-motion" : ""}${cheering ? " is-cheering" : ""}`}>
      <img className="temple" src="/game/temple.jpg" alt="" />
      <div className="vignette" />
      <FxCanvas fxRef={fxRef} heat={model.heat} />
      <div className="sr-only" aria-live="polite">
        {announce}
      </div>

      <header className="topbar">
        <div className="brand">
          <p className="eyebrow">Celestial casino</p>
          <h1 className="font-display">Vault of Nine Suns</h1>
        </div>
        <div className="pots" aria-label="Jackpots">
          {(["grand", "major", "minor", "mini"] as const).map((pot) => (
            <div key={pot} className={`pot pot-${pot}`}>
              <span>{pot}</span>
              <strong>{fmt(Math.max(model.jackpots[pot], JACKPOT_MULT[pot] * model.bet))}</strong>
            </div>
          ))}
        </div>
      </header>

      <div className="playfield">
        <img className={`host host-left${cheering ? " is-hot" : ""}`} src="/game/hosts/host-2.png" alt="Lyra, the comet dancer" />
        <div ref={shellRef} className="machine" data-heat={model.heat > 60 ? "high" : model.heat > 30 ? "warm" : "cool"}>
          <div className="marquee" aria-hidden>
            {Array.from({ length: 18 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />
            ))}
          </div>
          <div className="faces" aria-hidden>
            {FACES.map((id) => (
              <img key={id} src={symbolSrc(id, frame)} alt="" className={cheering ? "is-hot" : ""} />
            ))}
          </div>
          <p className="quote">{model.quote}</p>
          <div className="heat" aria-hidden>
            <span style={{ width: `${model.heat}%` }} />
          </div>
          <div className="reel-window" ref={reelsRef}>
            <div className="reels">
              {model.grid.map((symbols, reel) => (
                <Reel
                  key={reel}
                  reel={reel}
                  symbols={symbols}
                  spinToken={model.phase === "spinning" ? model.spinId : 0}
                  delay={0}
                  duration={durations[reel] ?? 1400}
                  cell={cell}
                  frame={frame}
                  hotRows={hotRow(reel)}
                  slamRows={slamRow(reel)}
                  spinning={model.phase === "spinning"}
                  onStop={() => onStop(reel)}
                />
              ))}
            </div>
            {model.phase === "tally" && model.outcome?.lineWins[model.activeLine] ? (
              <svg className="payline" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden>
                <polyline
                  points={LINE_ROWS[model.outcome.lineWins[model.activeLine]!.index]!
                    .map((row, reel) => `${reel * 20 + 10},${row * 20 + 10}`)
                    .join(" ")}
                />
              </svg>
            ) : null}
            <div className="glass" aria-hidden />
          </div>
          <div className={`banner${model.banner ? " is-on" : ""}`}>
            <strong className="font-display">{model.banner || "ASHWING STORM · 1 IN " + STORM_ODDS}</strong>
            <span>{model.banner ? lineLabel : `${fmt(model.credits)} in the vault`}</span>
          </div>
          <div className="meters">
            <div>
              <span>Win</span>
              <strong>{fmt(model.shownWin)}</strong>
            </div>
            <div>
              <span>Credits</span>
              <strong>{fmt(model.credits)}</strong>
            </div>
            <div>
              <span>Bet · {20} lines</span>
              <strong>{fmt(model.bet)}</strong>
            </div>
          </div>
          <div className="controls">
            <button
              className="icon-btn"
              aria-label="Lower bet"
              disabled={model.phase !== "idle"}
              onClick={() => {
                audio.click();
                const index = BETS.indexOf(model.bet as (typeof BETS)[number]);
                const next = BETS[Math.max(0, index - 1)] ?? BETS[0];
                patch((prev) => ({ ...prev, bet: next }));
              }}
            >
              <Minus />
            </button>
            <button
              className={`spin-btn${model.auto ? " is-auto" : ""}`}
              onClick={() => {
                if (model.phase === "boot") boot();
                else if (model.auto && model.phase === "idle") patch((prev) => ({ ...prev, auto: false }));
                else spin();
              }}
              disabled={model.phase === "spinning" || model.phase === "storm" || model.phase === "tally" || (model.phase === "idle" && cell < 8)}
            >
              {model.phase === "spinning" || model.phase === "storm" ? "LIVE" : "SPIN"}
            </button>
            <button
              className="icon-btn"
              aria-label="Raise bet"
              disabled={model.phase !== "idle"}
              onClick={() => {
                audio.click();
                const index = BETS.indexOf(model.bet as (typeof BETS)[number]);
                const next = BETS[Math.min(BETS.length - 1, index + 1)] ?? BETS[BETS.length - 1];
                patch((prev) => ({ ...prev, bet: next! }));
              }}
            >
              <Plus />
            </button>
            <button
              className={`icon-btn${model.auto ? " is-on" : ""}`}
              aria-label={model.auto ? "Stop auto spin" : "Auto spin"}
              aria-pressed={model.auto}
              onClick={() => {
                audio.unlock();
                audio.click();
                patch((prev) => ({ ...prev, auto: !prev.auto }));
              }}
            >
              <Repeat />
            </button>
            <button
              className="icon-btn"
              aria-label={model.mute ? "Unmute" : "Mute"}
              onClick={() => {
                audio.unlock();
                patch((prev) => {
                  audio.setMuted(!prev.mute);
                  return { ...prev, mute: !prev.mute };
                });
              }}
            >
              {model.mute ? <VolumeX /> : <Volume2 />}
            </button>
            <button
              className="icon-btn"
              aria-label="Paytable"
              onClick={() => {
                audio.click();
                patch((prev) => ({ ...prev, paytable: true }));
              }}
            >
              <Info />
            </button>
          </div>
          <p className="fine-print">
            Play money. Storm 1 in {STORM_ODDS}. Biggest haul {fmt(model.stats.biggest)}. Spins {model.stats.spins}.
          </p>
        </div>
        <img className={`host host-right${cheering ? " is-hot" : ""}`} src="/game/hosts/host-1.png" alt="Kael, the forge king" />
      </div>

      {model.phase === "boot" ? (
        <div className="overlay boot-overlay">
          <div className="overlay-card boot-card">
            <p className="eyebrow">Tap to wake the temple</p>
            <h2 className="font-display">Open the vault</h2>
            <p className="muted">
              Lyra deals. Kael keeps the heat. Nyx watches the eclipse. Sol pays only when the sun
              decides. Ashwing storms the reels about once every {STORM_ODDS} spins, and those wilds
              are the lenient door. Everything else belongs to the house.
            </p>
            <button className="spin-btn" onClick={boot}>
              Enter
            </button>
          </div>
        </div>
      ) : null}

      {model.phase === "broke" ? (
        <div className="overlay">
          <div className="overlay-card">
            <p className="eyebrow">Credits spent</p>
            <h2 className="font-display">The vault is dry</h2>
            <p className="muted">The edge is real. Take a house marker if you want another night.</p>
            <button
              className="spin-btn"
              onClick={() => {
                audio.click();
                patch((prev) => ({
                  ...prev,
                  credits: prev.credits + REFILL_CREDITS,
                  phase: "idle",
                  banner: "MARKER",
                  sub: `+${fmt(REFILL_CREDITS)}`,
                  quote: "The house lends. It always collects.",
                }));
              }}
            >
              Take {fmt(REFILL_CREDITS)}
            </button>
          </div>
        </div>
      ) : null}

      {model.phase === "wheel" && model.wheelIndex !== null ? (
        <WheelOverlay
          index={model.wheelIndex}
          spinKey={model.wheelRun}
          reduce={model.reduce}
          onArm={() => patch((prev) => ({ ...prev, wheelRun: Math.max(1, prev.wheelRun + (prev.wheelRun === 0 ? 1 : 0)) }))}
          onDone={onWheelDone}
        />
      ) : null}

      {model.phase === "hunt" ? (
        <HuntOverlay
          opened={model.huntOpen}
          labels={model.huntLabels}
          locked={model.huntLocked}
          picksLeft={Math.max(0, HUNT_PICKS - model.huntOpen.filter((i) => model.outcome?.hunt?.[i]?.type !== "lock").length)}
          onPick={pickSeal}
          onClose={afterBonus}
        />
      ) : null}

      {model.paytable ? <Paytable onClose={() => patch((prev) => ({ ...prev, paytable: false }))} /> : null}
    </div>
  );
}
