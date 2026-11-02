export const SYMBOLS = [
  "coin",
  "gem",
  "crystal",
  "rune",
  "lyra",
  "kael",
  "nyx",
  "sol",
  "wild",
  "scatter",
  "relic",
] as const;

export type SymbolId = (typeof SYMBOLS)[number];
export type Grid = SymbolId[][];

export const NAMES: Record<SymbolId, string> = {
  coin: "Solar Coin",
  gem: "Prism Claw",
  crystal: "Ember Shard",
  rune: "Star Rune",
  lyra: "Lyra",
  kael: "Kael",
  nyx: "Nyx",
  sol: "Sol",
  wild: "Ashwing",
  scatter: "Eclipse Gate",
  relic: "Heart",
};

export const LINES = 20;
export const BETS = [20, 40, 100, 200, 500] as const;
export const START_CREDITS = 2000;
export const REFILL_CREDITS = 2000;
export const STORM_ODDS = 20;
export const HUNT_PICKS = 3;

export const LINE_ROWS: number[][] = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
  [0, 0, 1, 0, 0],
  [2, 2, 1, 2, 2],
  [1, 0, 0, 0, 1],
  [1, 2, 2, 2, 1],
  [0, 1, 1, 1, 0],
  [2, 1, 1, 1, 2],
  [1, 0, 1, 2, 1],
  [1, 2, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [2, 1, 2, 1, 2],
  [1, 1, 0, 1, 1],
  [1, 1, 2, 1, 1],
  [0, 1, 2, 2, 1],
  [2, 1, 0, 0, 1],
  [0, 2, 1, 2, 0],
];

/** Line pays for 3 / 4 / 5 of a kind, in line-bet units (total bet / 20). Lows pay from 4. */
const PAY: Record<string, [number, number, number]> = {
  coin: [0, 10, 30],
  gem: [0, 14, 40],
  crystal: [0, 18, 56],
  rune: [0, 24, 74],
  lyra: [12, 40, 130],
  kael: [16, 56, 180],
  nyx: [26, 88, 270],
  sol: [40, 130, 400],
  wild: [18, 70, 480],
};

const REEL_WEIGHTS: number[][] = [
  // coin gem crystal rune lyra kael nyx sol wild scatter relic
  [22, 16, 12, 8, 4, 2, 1, 1, 2, 2, 1],
  [18, 14, 11, 8, 5, 3, 2, 1, 2, 2, 2],
  [16, 12, 10, 8, 5, 3, 2, 1, 3, 2, 2],
  [18, 14, 11, 8, 5, 3, 2, 1, 2, 2, 2],
  [22, 16, 12, 8, 4, 2, 1, 1, 2, 2, 1],
];

export interface Jackpots {
  mini: number;
  minor: number;
  major: number;
  grand: number;
}

export type Pot = keyof Jackpots;

export const JACKPOT_MULT: Record<Pot, number> = {
  mini: 8,
  minor: 20,
  major: 60,
  grand: 200,
};

export function freshPots(bet = 40): Jackpots {
  return {
    mini: JACKPOT_MULT.mini * bet,
    minor: JACKPOT_MULT.minor * bet,
    major: JACKPOT_MULT.major * bet,
    grand: JACKPOT_MULT.grand * bet,
  };
}

export const JACKPOT_SEED: Jackpots = freshPots(40);

export type Seal =
  | { type: "pay"; mult: number }
  | { type: "pot"; pot: Pot }
  | { type: "double" }
  | { type: "lock" };

export interface WheelSlice {
  label: string;
  kind: "mult" | "pot" | "respin";
  mult?: number;
  pot?: Pot;
  weight: number;
  tone: "gold" | "ink" | "ember" | "star";
}

export const WHEEL: WheelSlice[] = [
  { label: "5×", kind: "mult", mult: 5, weight: 20, tone: "gold" },
  { label: "8×", kind: "mult", mult: 8, weight: 18, tone: "ink" },
  { label: "MINI", kind: "pot", pot: "mini", weight: 8, tone: "ember" },
  { label: "10×", kind: "mult", mult: 10, weight: 16, tone: "gold" },
  { label: "12×", kind: "mult", mult: 12, weight: 12, tone: "ink" },
  { label: "15×", kind: "mult", mult: 15, weight: 8, tone: "gold" },
  { label: "MINOR", kind: "pot", pot: "minor", weight: 4, tone: "ember" },
  { label: "6×", kind: "mult", mult: 6, weight: 16, tone: "ink" },
  { label: "MAJOR", kind: "pot", pot: "major", weight: 2, tone: "ember" },
  { label: "20×", kind: "mult", mult: 20, weight: 5, tone: "gold" },
  { label: "RESPIN", kind: "respin", weight: 3, tone: "star" },
  { label: "GRAND", kind: "pot", pot: "grand", weight: 1, tone: "ember" },
];

export type FeatureKind = "expand" | "rain" | "multi" | "twin";

export interface Feature {
  kind: FeatureKind;
  multiplier: number;
  injected: Array<{ reel: number; row: number }>;
  title: string;
  detail: string;
}

export interface LineWin {
  index: number;
  rows: number[];
  symbol: SymbolId;
  count: number;
  amount: number;
}

export interface SpinOutcome {
  natural: Grid;
  final: Grid;
  feature: Feature | null;
  lineWins: LineWin[];
  lineWin: number;
  stormBless: number;
  scatter: number;
  relic: number;
  scatterPay: number;
  anticipate: boolean;
  wheelIndex: number | null;
  hunt: Seal[] | null;
}

export type Rng = () => number;

const SPECIAL = new Set<SymbolId>(["scatter", "relic"]);

function mulberry32(seed: number): Rng {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(list: T[], rng: Rng): T[] {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = tmp;
  }
  return arr;
}

function expandStrip(weights: number[], seed: number): SymbolId[] {
  const bag: SymbolId[] = [];
  SYMBOLS.forEach((id, i) => {
    for (let n = 0; n < (weights[i] ?? 0); n++) bag.push(id);
  });
  return shuffle(bag, mulberry32(seed));
}

export const STRIPS: SymbolId[][] = REEL_WEIGHTS.map((w, i) => expandStrip(w, 9000 + i * 17));

export function contribute(jp: Jackpots, bet: number): Jackpots {
  return {
    mini: jp.mini + bet * 0.012,
    minor: jp.minor + bet * 0.006,
    major: jp.major + bet * 0.003,
    grand: jp.grand + bet * 0.0012,
  };
}

function rollWindow(reel: number, rng: Rng): SymbolId[] {
  const strip = STRIPS[reel]!;
  const stop = Math.floor(rng() * strip.length);
  return [0, 1, 2].map((offset) => strip[(stop + offset) % strip.length]!);
}

function countSym(grid: Grid, id: SymbolId): number {
  let n = 0;
  for (const reel of grid) for (const s of reel) if (s === id) n++;
  return n;
}

function cloneGrid(grid: Grid): Grid {
  return grid.map((col) => col.slice());
}

function scoreLine(syms: SymbolId[]): { symbol: SymbolId; count: number } | null {
  let target: SymbolId | null = null;
  let count = 0;
  for (const s of syms) {
    if (SPECIAL.has(s)) break;
    if (s === "wild") {
      count++;
      continue;
    }
    if (target === null) {
      target = s;
      count++;
      continue;
    }
    if (s === target) {
      count++;
      continue;
    }
    break;
  }
  if (count < 3) return null;
  return { symbol: target ?? "wild", count };
}

function evaluate(grid: Grid, bet: number, multiplier: number): { wins: LineWin[]; total: number } {
  const lineBet = bet / LINES;
  const wins: LineWin[] = [];
  let total = 0;
  LINE_ROWS.forEach((rows, index) => {
    const syms = rows.map((row, reel) => grid[reel]![row]!);
    const hit = scoreLine(syms);
    if (!hit) return;
    const table = PAY[hit.symbol];
    if (!table) return;
    const units = table[hit.count - 3] ?? 0;
    if (!units) return;
    const amount = Math.round(units * lineBet * multiplier);
    if (amount <= 0) return;
    total += amount;
    wins.push({ index, rows, symbol: hit.symbol, count: hit.count, amount });
  });
  wins.sort((a, b) => b.amount - a.amount);
  return { wins, total };
}

function pickWeighted<T extends { weight: number }>(items: T[], rng: Rng): T {
  const sum = items.reduce((n, item) => n + item.weight, 0);
  let roll = rng() * sum;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1]!;
}

const FEATURE_TABLE: Array<{ kind: FeatureKind; weight: number }> = [
  { kind: "expand", weight: 46 },
  { kind: "rain", weight: 30 },
  { kind: "multi", weight: 18 },
  { kind: "twin", weight: 6 },
];

function inject(grid: Grid, reel: number, row: number, injected: Feature["injected"]) {
  const cell = grid[reel]![row]!;
  if (SPECIAL.has(cell) || cell === "wild") return;
  grid[reel]![row] = "wild";
  injected.push({ reel, row });
}

function buildFeature(grid: Grid, rng: Rng): Feature {
  const kind = pickWeighted(FEATURE_TABLE, rng).kind;
  const injected: Feature["injected"] = [];
  let multiplier = 1;
  let title = "ASHWING STORM";
  let detail = "Wilds tear through the glass.";

  const reelOrder = shuffle([0, 1, 2, 3, 4], rng);

  if (kind === "expand" || kind === "twin") {
    const n = kind === "twin" ? 2 : 1;
    for (const reel of reelOrder.slice(0, n)) {
      for (let row = 0; row < 3; row++) inject(grid, reel, row, injected);
    }
    if (kind === "twin") {
      multiplier = 2;
      title = "TWIN SUNS";
      detail = "Two reels ignite. Line wins pay ×2.";
    } else {
      title = "ASHWING REEL";
      detail = "A whole reel turns to wild fire.";
    }
  } else if (kind === "rain") {
    const spots: Array<{ reel: number; row: number }> = [];
    for (let reel = 0; reel < 5; reel++) {
      for (let row = 0; row < 3; row++) {
        const cell = grid[reel]![row]!;
        if (!SPECIAL.has(cell) && cell !== "wild") spots.push({ reel, row });
      }
    }
    const count = 4;
    for (const spot of shuffle(spots, rng).slice(0, count)) {
      inject(grid, spot.reel, spot.row, injected);
    }
    title = "WILD RAIN";
    detail = "Feathers of the phoenix stick to the reels.";
  } else {
    multiplier = rng() < 0.8 ? 2 : 3;
    const spots: Array<{ reel: number; row: number }> = [];
    for (let reel = 0; reel < 5; reel++) {
      for (let row = 0; row < 3; row++) {
        const cell = grid[reel]![row]!;
        if (!SPECIAL.has(cell) && cell !== "wild") spots.push({ reel, row });
      }
    }
    for (const spot of shuffle(spots, rng).slice(0, 2)) inject(grid, spot.reel, spot.row, injected);
    title = "SOLAR MULTIPLIER";
    detail = `Ashwing brands the spin. Line wins pay ×${multiplier}.`;
  }

  return { kind, multiplier, injected, title, detail };
}

function makeHunt(rng: Rng): Seal[] {
  const deck: Seal[] = [
    { type: "pay", mult: 3 },
    { type: "pay", mult: 4 },
    { type: "pay", mult: 5 },
    { type: "pay", mult: 6 },
    { type: "pay", mult: 8 },
    { type: "pay", mult: 10 },
    { type: "pay", mult: 14 },
    { type: "pot", pot: "mini" },
    { type: "double" },
    { type: "lock" },
    { type: "lock" },
    { type: "lock" },
  ];
  const roll = rng();
  const payIndex = deck.findIndex((seal) => seal.type === "pay" && seal.mult >= 10);
  if (payIndex >= 0 && roll < 0.004) deck[payIndex] = { type: "pot", pot: "grand" };
  else if (payIndex >= 0 && roll < 0.02) deck[payIndex] = { type: "pot", pot: "major" };
  else if (payIndex >= 0 && roll < 0.08) deck[payIndex] = { type: "pot", pot: "minor" };
  return shuffle(deck, rng);
}

function potValue(pot: Pot, jp: Jackpots, bet: number) {
  return Math.max(Math.round(jp[pot]), Math.round(JACKPOT_MULT[pot] * bet));
}

export function rollWheelIndex(rng: Rng, allowRespin = true): number {
  const pool = WHEEL.map((slice, index) => ({ slice, index })).filter(
    (item) => allowRespin || item.slice.kind !== "respin",
  );
  return pickWeighted(
    pool.map((item) => ({ ...item, weight: item.slice.weight })),
    rng,
  ).index;
}

export function awardWheel(index: number, bet: number, jp: Jackpots): {
  amount: number;
  jackpots: Jackpots;
  respin: boolean;
  label: string;
} {
  const slice = WHEEL[index] ?? WHEEL[0]!;
  if (slice.kind === "respin") {
    return { amount: 0, jackpots: jp, respin: true, label: slice.label };
  }
  if (slice.kind === "mult") {
    return {
      amount: Math.round(bet * (slice.mult ?? 0)),
      jackpots: jp,
      respin: false,
      label: slice.label,
    };
  }
  const pot = slice.pot ?? "mini";
  const amount = potValue(pot, jp, bet);
  return {
    amount,
    jackpots: { ...jp, [pot]: JACKPOT_MULT[pot] * bet },
    respin: false,
    label: slice.label,
  };
}

export function sealAward(
  seal: Seal,
  bet: number,
  jp: Jackpots,
  creditMult: number,
): { amount: number; jackpots: Jackpots; nextMult: number; lock: boolean; text: string } {
  if (seal.type === "lock") {
    return { amount: 0, jackpots: jp, nextMult: creditMult, lock: true, text: "LOCK" };
  }
  if (seal.type === "double") {
    return {
      amount: 0,
      jackpots: jp,
      nextMult: Math.min(4, creditMult * 2),
      lock: false,
      text: "×2 CREDITS",
    };
  }
  if (seal.type === "pot") {
    const amount = potValue(seal.pot, jp, bet);
    return {
      amount,
      jackpots: { ...jp, [seal.pot]: JACKPOT_MULT[seal.pot] * bet },
      nextMult: creditMult,
      lock: false,
      text: seal.pot.toUpperCase(),
    };
  }
  const amount = Math.round(bet * seal.mult * creditMult);
  return {
    amount,
    jackpots: jp,
    nextMult: creditMult,
    lock: false,
    text: `${seal.mult}×`,
  };
}

export function rollSpin(bet: number, rng: Rng): SpinOutcome {
  const natural = [0, 1, 2, 3, 4].map((reel) => rollWindow(reel, rng));
  const final = cloneGrid(natural);
  const feature = rng() < 1 / STORM_ODDS ? buildFeature(final, rng) : null;
  const multiplier = feature?.multiplier ?? 1;
  let evaluated = evaluate(final, bet, multiplier);
  let stormBless = 0;
  if (feature) {
    let guard = 0;
    while (evaluated.total < bet * 2 && guard < 5) {
      const spots: Array<{ reel: number; row: number }> = [];
      for (let reel = 0; reel < 5; reel++) {
        for (let row = 0; row < 3; row++) {
          const cell = final[reel]![row]!;
          if (!SPECIAL.has(cell) && cell !== "wild") spots.push({ reel, row });
        }
      }
      if (!spots.length) break;
      const spot = spots[Math.floor(rng() * spots.length)]!;
      inject(final, spot.reel, spot.row, feature.injected);
      evaluated = evaluate(final, bet, multiplier);
      guard++;
    }
    if (evaluated.total < bet * 2) {
      stormBless = Math.round(bet * 2 - evaluated.total);
    }
  }
  const { wins, total } = evaluated;
  const scatter = countSym(natural, "scatter");
  const relic = countSym(natural, "relic");
  let scatterPay = 0;
  if (scatter === 4) scatterPay = Math.round(bet * 4);
  if (scatter >= 5) scatterPay = Math.round(bet * 15);
  const anticipate = (() => {
    let n = 0;
    for (let reel = 0; reel < 3; reel++) {
      for (const s of natural[reel]!) if (s === "scatter" || s === "relic") n++;
    }
    return n >= 2;
  })();
  return {
    natural,
    final,
    feature,
    lineWins: wins,
    lineWin: total,
    stormBless,
    scatter,
    relic,
    scatterPay,
    anticipate,
    wheelIndex: scatter >= 3 ? rollWheelIndex(rng, true) : null,
    hunt: relic >= 3 ? makeHunt(rng) : null,
  };
}

export function decoySymbol(reel: number, rng: Rng = Math.random): SymbolId {
  const strip = STRIPS[reel] ?? STRIPS[0]!;
  return strip[Math.floor(rng() * strip.length)]!;
}

export function payFor(symbol: SymbolId, count: 3 | 4 | 5): number {
  const table = PAY[symbol];
  if (!table) return 0;
  return table[count - 3] ?? 0;
}

export function simulate(spins: number, bet = 100, seed = 7) {
  const rng = mulberry32(seed);
  let wagered = 0;
  let returned = 0;
  let storms = 0;
  let wheels = 0;
  let hunts = 0;
  let hits = 0;
  let biggest = 0;
  let jp: Jackpots = freshPots(bet);
  for (let i = 0; i < spins; i++) {
    wagered += bet;
    jp = contribute(jp, bet);
    const spin = rollSpin(bet, rng);
    if (spin.feature) storms++;
    let spinWin = spin.lineWin + spin.scatterPay + spin.stormBless;
    if (spinWin > 0) hits++;
    if (spin.wheelIndex !== null) {
      wheels++;
      let index = spin.wheelIndex;
      let guard = 0;
      while (guard++ < 2) {
        const award = awardWheel(index, bet, jp);
        jp = award.jackpots;
        spinWin += award.amount;
        if (!award.respin) break;
        index = rollWheelIndex(rng, false);
      }
    }
    if (spin.hunt) {
      hunts++;
      let mult = 1;
      let opened = 0;
      for (const seal of spin.hunt) {
        const award = sealAward(seal, bet, jp, mult);
        jp = award.jackpots;
        mult = award.nextMult;
        if (award.lock) {
          if (opened === 0) spinWin += bet * 2;
          break;
        }
        spinWin += award.amount;
        opened++;
        if (opened >= HUNT_PICKS) break;
      }
    }
    returned += spinWin;
    if (spinWin > biggest) biggest = spinWin;
  }
  return {
    rtp: returned / wagered,
    hit: hits / spins,
    storm: storms / spins,
    wheel: wheels / spins,
    hunt: hunts / spins,
    biggestX: biggest / bet,
  };
}
