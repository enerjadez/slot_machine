import { HUNT_PICKS, type Seal } from "@/game/math";

export function HuntOverlay({
  opened,
  labels,
  locked,
  picksLeft,
  onPick,
  onClose,
}: {
  opened: number[];
  labels: Record<number, string>;
  locked: boolean;
  picksLeft: number;
  onPick: (index: number) => void;
  onClose: () => void;
}) {
  const finished = locked || picksLeft <= 0;
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Relic Hunt">
      <div className="overlay-card">
        <p className="eyebrow">Heart of the Vault</p>
        <h2 className="font-display">Relic Hunt</h2>
        <p className="muted">
          Open up to {HUNT_PICKS} seals. A lock ends the hunt. You keep what you already touched.
        </p>
        <div className="hunt-grid">
          {Array.from({ length: 12 }, (_, index) => {
            const isOpen = opened.includes(index);
            return (
              <button
                key={index}
                className={`seal${isOpen ? " is-open" : ""}${labels[index] === "LOCK" ? " is-lock" : ""}`}
                disabled={isOpen || finished}
                onClick={() => onPick(index)}
              >
                <span>{isOpen ? labels[index] : "SEAL"}</span>
              </button>
            );
          })}
        </div>
        <p className="hunt-status">{finished ? "The vault exhales." : `${picksLeft} picks left`}</p>
        {finished ? (
          <button className="spin-btn" onClick={onClose}>
            Take the haul
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function sealLabel(seal: Seal, text: string) {
  return text || (seal.type === "lock" ? "LOCK" : "PRIZE");
}
