type Bus = "master" | "music" | "sfx";

function noiseBuffer(ctx: AudioContext, seconds: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    brown = (brown + 0.02 * white) / 1.02;
    data[i] = brown * 3.4;
  }
  return buffer;
}

class CasinoAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private sfx: GainNode | null = null;
  private musicGain = 0.18;
  private sfxGain = 0.85;
  private muted = false;
  private started = false;
  private tickTimer = 0;

  unlock() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx({ latencyHint: "interactive" });
      this.master = this.ctx.createGain();
      this.music = this.ctx.createGain();
      this.sfx = this.ctx.createGain();
      this.music.connect(this.master);
      this.sfx.connect(this.master);
      this.master.connect(this.ctx.destination);
      this.applyGains();
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    if (!this.started) {
      this.started = true;
      this.startPad();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.applyGains();
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") void this.ctx.resume();
  }

  private applyGains() {
    const now = this.ctx?.currentTime ?? 0;
    const master = this.muted ? 0 : 1;
    this.master?.gain.setTargetAtTime(master, now, 0.03);
    this.music?.gain.setTargetAtTime(this.musicGain, now, 0.03);
    this.sfx?.gain.setTargetAtTime(this.sfxGain, now, 0.02);
  }

  private bus(which: Bus) {
    if (which === "music") return this.music;
    if (which === "sfx") return this.sfx;
    return this.master;
  }

  private tone(
    freq: number,
    dur: number,
    type: OscillatorType,
    gain: number,
    which: Bus = "sfx",
    delay = 0,
  ) {
    const ctx = this.ctx;
    const dest = this.bus(which);
    if (!ctx || !dest) return;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    amp.gain.setValueAtTime(0.0001, t);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t + 0.012);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(amp);
    amp.connect(dest);
    osc.start(t);
    osc.stop(t + dur + 0.02);
    osc.onended = () => {
      osc.disconnect();
      amp.disconnect();
    };
  }

  private noiseHit(dur: number, gain: number, freq = 180) {
    const ctx = this.ctx;
    if (!ctx || !this.sfx) return;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(ctx, 0.4);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = freq;
    filter.Q.value = 0.7;
    const amp = ctx.createGain();
    const t = ctx.currentTime;
    amp.gain.setValueAtTime(gain, t);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter);
    filter.connect(amp);
    amp.connect(this.sfx);
    src.start(t);
    src.stop(t + dur);
    src.onended = () => {
      src.disconnect();
      filter.disconnect();
      amp.disconnect();
    };
  }

  private startPad() {
    const ctx = this.ctx;
    if (!ctx || !this.music) return;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(ctx, 2);
    src.loop = true;
    const amp = ctx.createGain();
    amp.gain.value = 0.22;
    src.connect(filter);
    filter.connect(amp);
    amp.connect(this.music);
    src.start();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.tone(110, 8, "sine", 0.04, "music");
    window.setInterval(() => {
      if (!this.started || this.muted) return;
      const notes = [220, 277, 330, 415];
      const note = notes[Math.floor(Math.random() * notes.length)]!;
      this.tone(note, 1.4, "sine", 0.03, "music");
      this.tone(note * 2, 0.8, "triangle", 0.012, "music", 0.02);
    }, 2400);
  }

  click() {
    this.tone(620, 0.06, "square", 0.03);
  }

  spin() {
    this.noiseHit(0.18, 0.12, 240);
    this.tone(180, 0.12, "sawtooth", 0.04);
    window.clearInterval(this.tickTimer);
    this.tickTimer = window.setInterval(() => {
      this.tone(900 + Math.random() * 400, 0.03, "square", 0.015);
    }, 90);
  }

  stopSpin() {
    window.clearInterval(this.tickTimer);
  }

  reelStop(index: number) {
    this.noiseHit(0.08, 0.08, 120 + index * 30);
    this.tone(140 - index * 8, 0.09, "sine", 0.05);
  }

  storm() {
    this.tone(196, 0.4, "sawtooth", 0.05);
    this.tone(392, 0.5, "triangle", 0.04, "sfx", 0.08);
    this.tone(784, 0.35, "sine", 0.03, "sfx", 0.16);
    this.noiseHit(0.4, 0.1, 600);
  }

  win(tier: "tickle" | "win" | "big" | "mega" | "ultra") {
    const sets: Record<typeof tier, number[]> = {
      tickle: [523, 659],
      win: [523, 659, 784],
      big: [392, 523, 659, 784],
      mega: [349, 440, 523, 698, 880],
      ultra: [261, 329, 392, 523, 659, 784, 1046],
    };
    sets[tier].forEach((freq, i) => {
      this.tone(freq, 0.22 + i * 0.02, "triangle", tier === "ultra" ? 0.07 : 0.05, "sfx", i * 0.07);
      this.tone(freq * 2, 0.12, "sine", 0.02, "sfx", i * 0.07);
    });
    if (tier === "mega" || tier === "ultra") this.noiseHit(0.25, 0.08, 90);
  }

  jackpot() {
    [261, 329, 392, 523, 659, 784, 1046, 1318].forEach((freq, i) => {
      this.tone(freq, 0.4, "triangle", 0.06, "sfx", i * 0.09);
    });
    this.noiseHit(0.5, 0.12, 70);
  }

  wheelTick() {
    this.tone(700 + Math.random() * 200, 0.04, "square", 0.02);
  }

  pick() {
    this.tone(480, 0.08, "triangle", 0.05);
    this.tone(720, 0.1, "sine", 0.03, "sfx", 0.04);
  }

  lock() {
    this.tone(140, 0.3, "sawtooth", 0.05);
    this.noiseHit(0.2, 0.08, 100);
  }
}

export const audio = new CasinoAudio();
