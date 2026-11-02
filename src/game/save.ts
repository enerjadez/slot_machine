import { BETS, JACKPOT_SEED, START_CREDITS, type Jackpots } from "@/game/math";

export interface Stats {
  spins: number;
  wagered: number;
  won: number;
  storms: number;
  wheels: number;
  hunts: number;
  biggest: number;
}

export interface Save {
  version: 1;
  credits: number;
  bet: number;
  jackpots: Jackpots;
  stats: Stats;
  mute: boolean;
  shake: boolean;
}

export const emptyStats = (): Stats => ({
  spins: 0,
  wagered: 0,
  won: 0,
  storms: 0,
  wheels: 0,
  hunts: 0,
  biggest: 0,
});

const KEY = "vault-of-nine-suns-v1";

export function defaultSave(): Save {
  return {
    version: 1,
    credits: START_CREDITS,
    bet: 40,
    jackpots: { ...JACKPOT_SEED },
    stats: emptyStats(),
    mute: false,
    shake: true,
  };
}

export function loadSave(): Save {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw) as Partial<Save>;
    if (parsed.version !== 1) return defaultSave();
    const bet = BETS.includes(parsed.bet as (typeof BETS)[number]) ? (parsed.bet as number) : 40;
    return {
      ...defaultSave(),
      ...parsed,
      bet,
      jackpots: { ...JACKPOT_SEED, ...parsed.jackpots },
      stats: { ...emptyStats(), ...parsed.stats },
    };
  } catch {
    return defaultSave();
  }
}

export function writeSave(save: Save) {
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch {
    /* private mode */
  }
}
