import type { SymbolId } from "@/game/math";

const STILL: Record<Exclude<SymbolId, "wild" | "scatter" | "relic">, string> = {
  coin: "/game/symbols/sym-1.png",
  gem: "/game/symbols/sym-2.png",
  crystal: "/game/symbols/sym-3.png",
  rune: "/game/symbols/sym-4.png",
  lyra: "/game/symbols/sym-5.png",
  kael: "/game/symbols/sym-6.png",
  nyx: "/game/symbols/sym-7.png",
  sol: "/game/symbols/sym-8.png",
};

export const WILD_FRAMES = [
  "/game/wild/wing-1.png",
  "/game/wild/wing-2.png",
  "/game/wild/wing-3.png",
  "/game/wild/wing-4.png",
];

export function symbolSrc(id: SymbolId, frame = 0): string {
  if (id === "wild") return WILD_FRAMES[frame % WILD_FRAMES.length] ?? WILD_FRAMES[0]!;
  if (id === "scatter") return "/game/scatter.png";
  if (id === "relic") return "/game/relic.png";
  return STILL[id];
}
