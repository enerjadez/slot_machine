import { LINES, NAMES, STORM_ODDS, SYMBOLS, payFor, type SymbolId } from "@/game/math";
import { symbolSrc } from "@/components/slot/sprites";

const ORDER: SymbolId[] = [
  "sol",
  "nyx",
  "kael",
  "lyra",
  "wild",
  "rune",
  "crystal",
  "gem",
  "coin",
  "scatter",
  "relic",
];

export function Paytable({ onClose }: { onClose: () => void }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Paytable">
      <div className="overlay-card pay-card">
        <div className="pay-head">
          <div>
            <p className="eyebrow">The book of suns</p>
            <h2 className="font-display">Pays & odds</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close paytable">
            Close
          </button>
        </div>
        <p className="muted">
          {LINES} lines, left to right. Your bet covers every line. Ashwing substitutes for every
          symbol except the Eclipse Gate and the Heart. Lows pay on four and five only. Characters
          pay from three.
        </p>
        <ul className="pay-list">
          {ORDER.map((id) => (
            <li key={id}>
              <img src={symbolSrc(id, 0)} alt="" />
              <div>
                <strong>{NAMES[id]}</strong>
                <span>
                  {id === "scatter"
                    ? "3 anywhere opens the Wheel of Suns. 4 adds 4× bet. 5 adds 15×."
                    : id === "relic"
                      ? "3 anywhere opens the Relic Hunt. Two hearts pay nothing. The house is rude."
                      : [3, 4, 5]
                          .map((count) => {
                            const units = payFor(id, count as 3 | 4 | 5);
                            return units ? `${count}× ${units}` : null;
                          })
                          .filter(Boolean)
                          .join("   ·   ") + " line-bets"}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="pay-notes">
          <p>
            <strong>Ashwing Storm, 1 in {STORM_ODDS}.</strong> Expanding reel, wild rain, a line
            multiplier, or twin suns. If the storm would pay under 2× your bet, more wilds are
            forced in until it does.
          </p>
          <p>
            <strong>Wheel of Suns</strong> is uncommon. Most slices are small multipliers. Mini,
            Minor, Major, and Grand sit on the wheel and grow a little with every bet. Grand is a
            rumor.
          </p>
          <p>
            <strong>Relic Hunt</strong> lets you open three seals or until a lock. Play money only.
            The vault keeps an edge. A high score lives on this device.
          </p>
          <p className="fine">Symbols in this book: {SYMBOLS.length}. Lines never pay scatters or hearts.</p>
        </div>
      </div>
    </div>
  );
}
