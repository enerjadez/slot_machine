import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Plus, i as Repeat, n as Volume2, o as Minus, s as Info, t as VolumeX } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CjRM8HGs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SYMBOLS = [
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
	"relic"
];
var NAMES = {
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
	relic: "Heart"
};
var BETS = [
	20,
	40,
	100,
	200,
	500
];
var START_CREDITS = 2e3;
var REFILL_CREDITS = 2e3;
var LINE_ROWS = [
	[
		1,
		1,
		1,
		1,
		1
	],
	[
		0,
		0,
		0,
		0,
		0
	],
	[
		2,
		2,
		2,
		2,
		2
	],
	[
		0,
		1,
		2,
		1,
		0
	],
	[
		2,
		1,
		0,
		1,
		2
	],
	[
		0,
		0,
		1,
		0,
		0
	],
	[
		2,
		2,
		1,
		2,
		2
	],
	[
		1,
		0,
		0,
		0,
		1
	],
	[
		1,
		2,
		2,
		2,
		1
	],
	[
		0,
		1,
		1,
		1,
		0
	],
	[
		2,
		1,
		1,
		1,
		2
	],
	[
		1,
		0,
		1,
		2,
		1
	],
	[
		1,
		2,
		1,
		0,
		1
	],
	[
		0,
		1,
		0,
		1,
		0
	],
	[
		2,
		1,
		2,
		1,
		2
	],
	[
		1,
		1,
		0,
		1,
		1
	],
	[
		1,
		1,
		2,
		1,
		1
	],
	[
		0,
		1,
		2,
		2,
		1
	],
	[
		2,
		1,
		0,
		0,
		1
	],
	[
		0,
		2,
		1,
		2,
		0
	]
];
/** Line pays for 3 / 4 / 5 of a kind, in line-bet units (total bet / 20). Lows pay from 4. */
var PAY = {
	coin: [
		0,
		10,
		30
	],
	gem: [
		0,
		14,
		40
	],
	crystal: [
		0,
		18,
		56
	],
	rune: [
		0,
		24,
		74
	],
	lyra: [
		12,
		40,
		130
	],
	kael: [
		16,
		56,
		180
	],
	nyx: [
		26,
		88,
		270
	],
	sol: [
		40,
		130,
		400
	],
	wild: [
		18,
		70,
		480
	]
};
var REEL_WEIGHTS = [
	[
		22,
		16,
		12,
		8,
		4,
		2,
		1,
		1,
		2,
		2,
		1
	],
	[
		18,
		14,
		11,
		8,
		5,
		3,
		2,
		1,
		2,
		2,
		2
	],
	[
		16,
		12,
		10,
		8,
		5,
		3,
		2,
		1,
		3,
		2,
		2
	],
	[
		18,
		14,
		11,
		8,
		5,
		3,
		2,
		1,
		2,
		2,
		2
	],
	[
		22,
		16,
		12,
		8,
		4,
		2,
		1,
		1,
		2,
		2,
		1
	]
];
var JACKPOT_MULT = {
	mini: 8,
	minor: 20,
	major: 60,
	grand: 200
};
function freshPots(bet = 40) {
	return {
		mini: JACKPOT_MULT.mini * bet,
		minor: JACKPOT_MULT.minor * bet,
		major: JACKPOT_MULT.major * bet,
		grand: JACKPOT_MULT.grand * bet
	};
}
var JACKPOT_SEED = freshPots(40);
var WHEEL = [
	{
		label: "5×",
		kind: "mult",
		mult: 5,
		weight: 20,
		tone: "gold"
	},
	{
		label: "8×",
		kind: "mult",
		mult: 8,
		weight: 18,
		tone: "ink"
	},
	{
		label: "MINI",
		kind: "pot",
		pot: "mini",
		weight: 8,
		tone: "ember"
	},
	{
		label: "10×",
		kind: "mult",
		mult: 10,
		weight: 16,
		tone: "gold"
	},
	{
		label: "12×",
		kind: "mult",
		mult: 12,
		weight: 12,
		tone: "ink"
	},
	{
		label: "15×",
		kind: "mult",
		mult: 15,
		weight: 8,
		tone: "gold"
	},
	{
		label: "MINOR",
		kind: "pot",
		pot: "minor",
		weight: 4,
		tone: "ember"
	},
	{
		label: "6×",
		kind: "mult",
		mult: 6,
		weight: 16,
		tone: "ink"
	},
	{
		label: "MAJOR",
		kind: "pot",
		pot: "major",
		weight: 2,
		tone: "ember"
	},
	{
		label: "20×",
		kind: "mult",
		mult: 20,
		weight: 5,
		tone: "gold"
	},
	{
		label: "RESPIN",
		kind: "respin",
		weight: 3,
		tone: "star"
	},
	{
		label: "GRAND",
		kind: "pot",
		pot: "grand",
		weight: 1,
		tone: "ember"
	}
];
var SPECIAL = /* @__PURE__ */ new Set(["scatter", "relic"]);
function mulberry32(seed) {
	let s = seed >>> 0;
	return () => {
		s = s + 1831565813 | 0;
		let t = Math.imul(s ^ s >>> 15, 1 | s);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function shuffle(list, rng) {
	const arr = list.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		const tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
	return arr;
}
function expandStrip(weights, seed) {
	const bag = [];
	SYMBOLS.forEach((id, i) => {
		for (let n = 0; n < (weights[i] ?? 0); n++) bag.push(id);
	});
	return shuffle(bag, mulberry32(seed));
}
var STRIPS = REEL_WEIGHTS.map((w, i) => expandStrip(w, 9e3 + i * 17));
function contribute(jp, bet) {
	return {
		mini: jp.mini + bet * .012,
		minor: jp.minor + bet * .006,
		major: jp.major + bet * .003,
		grand: jp.grand + bet * .0012
	};
}
function rollWindow(reel, rng) {
	const strip = STRIPS[reel];
	const stop = Math.floor(rng() * strip.length);
	return [
		0,
		1,
		2
	].map((offset) => strip[(stop + offset) % strip.length]);
}
function countSym(grid, id) {
	let n = 0;
	for (const reel of grid) for (const s of reel) if (s === id) n++;
	return n;
}
function cloneGrid(grid) {
	return grid.map((col) => col.slice());
}
function scoreLine(syms) {
	let target = null;
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
	return {
		symbol: target ?? "wild",
		count
	};
}
function evaluate(grid, bet, multiplier) {
	const lineBet = bet / 20;
	const wins = [];
	let total = 0;
	LINE_ROWS.forEach((rows, index) => {
		const hit = scoreLine(rows.map((row, reel) => grid[reel][row]));
		if (!hit) return;
		const table = PAY[hit.symbol];
		if (!table) return;
		const units = table[hit.count - 3] ?? 0;
		if (!units) return;
		const amount = Math.round(units * lineBet * multiplier);
		if (amount <= 0) return;
		total += amount;
		wins.push({
			index,
			rows,
			symbol: hit.symbol,
			count: hit.count,
			amount
		});
	});
	wins.sort((a, b) => b.amount - a.amount);
	return {
		wins,
		total
	};
}
function pickWeighted(items, rng) {
	const sum = items.reduce((n, item) => n + item.weight, 0);
	let roll = rng() * sum;
	for (const item of items) {
		roll -= item.weight;
		if (roll <= 0) return item;
	}
	return items[items.length - 1];
}
var FEATURE_TABLE = [
	{
		kind: "expand",
		weight: 46
	},
	{
		kind: "rain",
		weight: 30
	},
	{
		kind: "multi",
		weight: 18
	},
	{
		kind: "twin",
		weight: 6
	}
];
function inject(grid, reel, row, injected) {
	const cell = grid[reel][row];
	if (SPECIAL.has(cell) || cell === "wild") return;
	grid[reel][row] = "wild";
	injected.push({
		reel,
		row
	});
}
function buildFeature(grid, rng) {
	const kind = pickWeighted(FEATURE_TABLE, rng).kind;
	const injected = [];
	let multiplier = 1;
	let title = "ASHWING STORM";
	let detail = "Wilds tear through the glass.";
	const reelOrder = shuffle([
		0,
		1,
		2,
		3,
		4
	], rng);
	if (kind === "expand" || kind === "twin") {
		const n = kind === "twin" ? 2 : 1;
		for (const reel of reelOrder.slice(0, n)) for (let row = 0; row < 3; row++) inject(grid, reel, row, injected);
		if (kind === "twin") {
			multiplier = 2;
			title = "TWIN SUNS";
			detail = "Two reels ignite. Line wins pay ×2.";
		} else {
			title = "ASHWING REEL";
			detail = "A whole reel turns to wild fire.";
		}
	} else if (kind === "rain") {
		const spots = [];
		for (let reel = 0; reel < 5; reel++) for (let row = 0; row < 3; row++) {
			const cell = grid[reel][row];
			if (!SPECIAL.has(cell) && cell !== "wild") spots.push({
				reel,
				row
			});
		}
		for (const spot of shuffle(spots, rng).slice(0, 4)) inject(grid, spot.reel, spot.row, injected);
		title = "WILD RAIN";
		detail = "Feathers of the phoenix stick to the reels.";
	} else {
		multiplier = rng() < .8 ? 2 : 3;
		const spots = [];
		for (let reel = 0; reel < 5; reel++) for (let row = 0; row < 3; row++) {
			const cell = grid[reel][row];
			if (!SPECIAL.has(cell) && cell !== "wild") spots.push({
				reel,
				row
			});
		}
		for (const spot of shuffle(spots, rng).slice(0, 2)) inject(grid, spot.reel, spot.row, injected);
		title = "SOLAR MULTIPLIER";
		detail = `Ashwing brands the spin. Line wins pay ×${multiplier}.`;
	}
	return {
		kind,
		multiplier,
		injected,
		title,
		detail
	};
}
function makeHunt(rng) {
	const deck = [
		{
			type: "pay",
			mult: 3
		},
		{
			type: "pay",
			mult: 4
		},
		{
			type: "pay",
			mult: 5
		},
		{
			type: "pay",
			mult: 6
		},
		{
			type: "pay",
			mult: 8
		},
		{
			type: "pay",
			mult: 10
		},
		{
			type: "pay",
			mult: 14
		},
		{
			type: "pot",
			pot: "mini"
		},
		{ type: "double" },
		{ type: "lock" },
		{ type: "lock" },
		{ type: "lock" }
	];
	const roll = rng();
	const payIndex = deck.findIndex((seal) => seal.type === "pay" && seal.mult >= 10);
	if (payIndex >= 0 && roll < .004) deck[payIndex] = {
		type: "pot",
		pot: "grand"
	};
	else if (payIndex >= 0 && roll < .02) deck[payIndex] = {
		type: "pot",
		pot: "major"
	};
	else if (payIndex >= 0 && roll < .08) deck[payIndex] = {
		type: "pot",
		pot: "minor"
	};
	return shuffle(deck, rng);
}
function potValue(pot, jp, bet) {
	return Math.max(Math.round(jp[pot]), Math.round(JACKPOT_MULT[pot] * bet));
}
function rollWheelIndex(rng, allowRespin = true) {
	return pickWeighted(WHEEL.map((slice, index) => ({
		slice,
		index
	})).filter((item) => allowRespin || item.slice.kind !== "respin").map((item) => ({
		...item,
		weight: item.slice.weight
	})), rng).index;
}
function awardWheel(index, bet, jp) {
	const slice = WHEEL[index] ?? WHEEL[0];
	if (slice.kind === "respin") return {
		amount: 0,
		jackpots: jp,
		respin: true,
		label: slice.label
	};
	if (slice.kind === "mult") return {
		amount: Math.round(bet * (slice.mult ?? 0)),
		jackpots: jp,
		respin: false,
		label: slice.label
	};
	const pot = slice.pot ?? "mini";
	return {
		amount: potValue(pot, jp, bet),
		jackpots: {
			...jp,
			[pot]: JACKPOT_MULT[pot] * bet
		},
		respin: false,
		label: slice.label
	};
}
function sealAward(seal, bet, jp, creditMult) {
	if (seal.type === "lock") return {
		amount: 0,
		jackpots: jp,
		nextMult: creditMult,
		lock: true,
		text: "LOCK"
	};
	if (seal.type === "double") return {
		amount: 0,
		jackpots: jp,
		nextMult: Math.min(4, creditMult * 2),
		lock: false,
		text: "×2 CREDITS"
	};
	if (seal.type === "pot") return {
		amount: potValue(seal.pot, jp, bet),
		jackpots: {
			...jp,
			[seal.pot]: JACKPOT_MULT[seal.pot] * bet
		},
		nextMult: creditMult,
		lock: false,
		text: seal.pot.toUpperCase()
	};
	return {
		amount: Math.round(bet * seal.mult * creditMult),
		jackpots: jp,
		nextMult: creditMult,
		lock: false,
		text: `${seal.mult}×`
	};
}
function rollSpin(bet, rng) {
	const natural = [
		0,
		1,
		2,
		3,
		4
	].map((reel) => rollWindow(reel, rng));
	const final = cloneGrid(natural);
	const feature = rng() < 1 / 20 ? buildFeature(final, rng) : null;
	const multiplier = feature?.multiplier ?? 1;
	let evaluated = evaluate(final, bet, multiplier);
	let stormBless = 0;
	if (feature) {
		let guard = 0;
		while (evaluated.total < bet * 2 && guard < 5) {
			const spots = [];
			for (let reel = 0; reel < 5; reel++) for (let row = 0; row < 3; row++) {
				const cell = final[reel][row];
				if (!SPECIAL.has(cell) && cell !== "wild") spots.push({
					reel,
					row
				});
			}
			if (!spots.length) break;
			const spot = spots[Math.floor(rng() * spots.length)];
			inject(final, spot.reel, spot.row, feature.injected);
			evaluated = evaluate(final, bet, multiplier);
			guard++;
		}
		if (evaluated.total < bet * 2) stormBless = Math.round(bet * 2 - evaluated.total);
	}
	const { wins, total } = evaluated;
	const scatter = countSym(natural, "scatter");
	const relic = countSym(natural, "relic");
	let scatterPay = 0;
	if (scatter === 4) scatterPay = Math.round(bet * 4);
	if (scatter >= 5) scatterPay = Math.round(bet * 15);
	const anticipate = (() => {
		let n = 0;
		for (let reel = 0; reel < 3; reel++) for (const s of natural[reel]) if (s === "scatter" || s === "relic") n++;
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
		hunt: relic >= 3 ? makeHunt(rng) : null
	};
}
function decoySymbol(reel, rng = Math.random) {
	const strip = STRIPS[reel] ?? STRIPS[0];
	return strip[Math.floor(rng() * strip.length)];
}
function payFor(symbol, count) {
	const table = PAY[symbol];
	if (!table) return 0;
	return table[count - 3] ?? 0;
}
function noiseBuffer(ctx, seconds) {
	const length = Math.floor(ctx.sampleRate * seconds);
	const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
	const data = buffer.getChannelData(0);
	let brown = 0;
	for (let i = 0; i < length; i++) {
		const white = Math.random() * 2 - 1;
		brown = (brown + .02 * white) / 1.02;
		data[i] = brown * 3.4;
	}
	return buffer;
}
var CasinoAudio = class {
	ctx = null;
	master = null;
	music = null;
	sfx = null;
	musicGain = .18;
	sfxGain = .85;
	muted = false;
	started = false;
	tickTimer = 0;
	unlock() {
		if (!this.ctx) {
			const Ctx = window.AudioContext || window.webkitAudioContext;
			this.ctx = new Ctx({ latencyHint: "interactive" });
			this.master = this.ctx.createGain();
			this.music = this.ctx.createGain();
			this.sfx = this.ctx.createGain();
			this.music.connect(this.master);
			this.sfx.connect(this.master);
			this.master.connect(this.ctx.destination);
			this.applyGains();
		}
		if (this.ctx.state === "suspended") this.ctx.resume();
		if (!this.started) {
			this.started = true;
			this.startPad();
		}
	}
	setMuted(muted) {
		this.muted = muted;
		this.applyGains();
	}
	resume() {
		if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
	}
	applyGains() {
		const now = this.ctx?.currentTime ?? 0;
		const master = this.muted ? 0 : 1;
		this.master?.gain.setTargetAtTime(master, now, .03);
		this.music?.gain.setTargetAtTime(this.musicGain, now, .03);
		this.sfx?.gain.setTargetAtTime(this.sfxGain, now, .02);
	}
	bus(which) {
		if (which === "music") return this.music;
		if (which === "sfx") return this.sfx;
		return this.master;
	}
	tone(freq, dur, type, gain, which = "sfx", delay = 0) {
		const ctx = this.ctx;
		const dest = this.bus(which);
		if (!ctx || !dest) return;
		const t = ctx.currentTime + delay;
		const osc = ctx.createOscillator();
		const amp = ctx.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, t);
		amp.gain.setValueAtTime(1e-4, t);
		amp.gain.exponentialRampToValueAtTime(Math.max(2e-4, gain), t + .012);
		amp.gain.exponentialRampToValueAtTime(1e-4, t + dur);
		osc.connect(amp);
		amp.connect(dest);
		osc.start(t);
		osc.stop(t + dur + .02);
		osc.onended = () => {
			osc.disconnect();
			amp.disconnect();
		};
	}
	noiseHit(dur, gain, freq = 180) {
		const ctx = this.ctx;
		if (!ctx || !this.sfx) return;
		const src = ctx.createBufferSource();
		src.buffer = noiseBuffer(ctx, .4);
		const filter = ctx.createBiquadFilter();
		filter.type = "bandpass";
		filter.frequency.value = freq;
		filter.Q.value = .7;
		const amp = ctx.createGain();
		const t = ctx.currentTime;
		amp.gain.setValueAtTime(gain, t);
		amp.gain.exponentialRampToValueAtTime(1e-4, t + dur);
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
	startPad() {
		const ctx = this.ctx;
		if (!ctx || !this.music) return;
		const filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 420;
		const src = ctx.createBufferSource();
		src.buffer = noiseBuffer(ctx, 2);
		src.loop = true;
		const amp = ctx.createGain();
		amp.gain.value = .22;
		src.connect(filter);
		filter.connect(amp);
		amp.connect(this.music);
		src.start();
		const lfo = ctx.createOscillator();
		const lfoGain = ctx.createGain();
		lfo.frequency.value = .07;
		lfoGain.gain.value = 180;
		lfo.connect(lfoGain);
		lfoGain.connect(filter.frequency);
		lfo.start();
		this.tone(110, 8, "sine", .04, "music");
		window.setInterval(() => {
			if (!this.started || this.muted) return;
			const notes = [
				220,
				277,
				330,
				415
			];
			const note = notes[Math.floor(Math.random() * notes.length)];
			this.tone(note, 1.4, "sine", .03, "music");
			this.tone(note * 2, .8, "triangle", .012, "music", .02);
		}, 2400);
	}
	click() {
		this.tone(620, .06, "square", .03);
	}
	spin() {
		this.noiseHit(.18, .12, 240);
		this.tone(180, .12, "sawtooth", .04);
		window.clearInterval(this.tickTimer);
		this.tickTimer = window.setInterval(() => {
			this.tone(900 + Math.random() * 400, .03, "square", .015);
		}, 90);
	}
	stopSpin() {
		window.clearInterval(this.tickTimer);
	}
	reelStop(index) {
		this.noiseHit(.08, .08, 120 + index * 30);
		this.tone(140 - index * 8, .09, "sine", .05);
	}
	storm() {
		this.tone(196, .4, "sawtooth", .05);
		this.tone(392, .5, "triangle", .04, "sfx", .08);
		this.tone(784, .35, "sine", .03, "sfx", .16);
		this.noiseHit(.4, .1, 600);
	}
	win(tier) {
		({
			tickle: [523, 659],
			win: [
				523,
				659,
				784
			],
			big: [
				392,
				523,
				659,
				784
			],
			mega: [
				349,
				440,
				523,
				698,
				880
			],
			ultra: [
				261,
				329,
				392,
				523,
				659,
				784,
				1046
			]
		})[tier].forEach((freq, i) => {
			this.tone(freq, .22 + i * .02, "triangle", tier === "ultra" ? .07 : .05, "sfx", i * .07);
			this.tone(freq * 2, .12, "sine", .02, "sfx", i * .07);
		});
		if (tier === "mega" || tier === "ultra") this.noiseHit(.25, .08, 90);
	}
	jackpot() {
		[
			261,
			329,
			392,
			523,
			659,
			784,
			1046,
			1318
		].forEach((freq, i) => {
			this.tone(freq, .4, "triangle", .06, "sfx", i * .09);
		});
		this.noiseHit(.5, .12, 70);
	}
	wheelTick() {
		this.tone(700 + Math.random() * 200, .04, "square", .02);
	}
	pick() {
		this.tone(480, .08, "triangle", .05);
		this.tone(720, .1, "sine", .03, "sfx", .04);
	}
	lock() {
		this.tone(140, .3, "sawtooth", .05);
		this.noiseHit(.2, .08, 100);
	}
};
var audio = new CasinoAudio();
var emptyStats = () => ({
	spins: 0,
	wagered: 0,
	won: 0,
	storms: 0,
	wheels: 0,
	hunts: 0,
	biggest: 0
});
var KEY = "vault-of-nine-suns-v1";
function defaultSave() {
	return {
		version: 1,
		credits: START_CREDITS,
		bet: 40,
		jackpots: { ...JACKPOT_SEED },
		stats: emptyStats(),
		mute: false,
		shake: true
	};
}
function loadSave() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return defaultSave();
		const parsed = JSON.parse(raw);
		if (parsed.version !== 1) return defaultSave();
		const bet = BETS.includes(parsed.bet) ? parsed.bet : 40;
		return {
			...defaultSave(),
			...parsed,
			bet,
			jackpots: {
				...JACKPOT_SEED,
				...parsed.jackpots
			},
			stats: {
				...emptyStats(),
				...parsed.stats
			}
		};
	} catch {
		return defaultSave();
	}
}
function writeSave(save) {
	try {
		localStorage.setItem(KEY, JSON.stringify(save));
	} catch {}
}
var STILL = {
	coin: "/game/symbols/sym-1.png",
	gem: "/game/symbols/sym-2.png",
	crystal: "/game/symbols/sym-3.png",
	rune: "/game/symbols/sym-4.png",
	lyra: "/game/symbols/sym-5.png",
	kael: "/game/symbols/sym-6.png",
	nyx: "/game/symbols/sym-7.png",
	sol: "/game/symbols/sym-8.png"
};
var WILD_FRAMES = [
	"/game/wild/wing-1.png",
	"/game/wild/wing-2.png",
	"/game/wild/wing-3.png",
	"/game/wild/wing-4.png"
];
function symbolSrc(id, frame = 0) {
	if (id === "wild") return WILD_FRAMES[frame % WILD_FRAMES.length] ?? WILD_FRAMES[0];
	if (id === "scatter") return "/game/scatter.png";
	if (id === "relic") return "/game/relic.png";
	return STILL[id];
}
function Reel({ reel, symbols, spinToken, delay, duration, cell, frame, hotRows, slamRows, spinning, onStop }) {
	const trackRef = (0, import_react.useRef)(null);
	const symbolsRef = (0, import_react.useRef)(symbols);
	const cellRef = (0, import_react.useRef)(cell);
	const onStopRef = (0, import_react.useRef)(onStop);
	symbolsRef.current = symbols;
	cellRef.current = cell;
	onStopRef.current = onStop;
	(0, import_react.useEffect)(() => {
		if (!spinToken) return;
		const size = cellRef.current;
		const track = trackRef.current;
		if (!track || size < 8) return;
		let dead = false;
		const result = symbolsRef.current;
		const decoys = Array.from({ length: 16 }, () => decoySymbol(reel));
		const strip = [
			decoySymbol(reel),
			...result,
			...decoys
		];
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
		const tick = (now) => {
			if (dead) return;
			if (now < t0) {
				raf = requestAnimationFrame(tick);
				return;
			}
			const t = Math.min(1, (now - t0) / duration);
			const eased = 1 - Math.pow(1 - t, 3);
			let y = start + (end - start) * eased;
			if (t > .86) {
				const u = (t - .86) / .14;
				y += Math.sin(u * Math.PI) * size * .07;
			}
			track.style.transform = `translateY(${y}px)`;
			track.style.filter = t < .72 ? "blur(5px)" : t < .9 ? "blur(1.5px)" : "none";
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
	}, [
		spinToken,
		delay,
		duration,
		reel
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "reel",
		"aria-hidden": spinning,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: trackRef,
			className: "reel-track",
			style: { display: spinning ? "block" : "none" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "reel-rest",
			style: { display: spinning ? "none" : "flex" },
			children: symbols.map((id, row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `symbol-cell${hotRows[row] ? " is-hot" : ""}${slamRows[row] ? " is-slam" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: symbolSrc(id, frame),
					alt: NAMES[id],
					draggable: false
				})
			}, `${reel}-${row}-${id}`))
		})]
	});
}
var POOL = 220;
function FxCanvas({ fxRef, heat }) {
	const canvasRef = (0, import_react.useRef)(null);
	const heatRef = (0, import_react.useRef)(heat);
	heatRef.current = heat;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		const particles = Array.from({ length: POOL }, () => ({
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			life: 0,
			max: 1,
			size: 2,
			color: "#f0c14b",
			grav: 0,
			spin: 0,
			vr: 0,
			alive: false
		}));
		const colors = () => {
			const css = getComputedStyle(parent);
			return {
				gold: css.getPropertyValue("--color-gold").trim() || "#f0c14b",
				ember: css.getPropertyValue("--color-ember").trim() || "#ff4d6d",
				star: css.getPropertyValue("--color-star").trim() || "#7ee7ff",
				parchment: css.getPropertyValue("--color-parchment").trim() || "#f6edd8"
			};
		};
		const trauma = { current: 0 };
		const spawn = (kind) => {
			const palette = colors();
			const rect = canvas.getBoundingClientRect();
			const cx = rect.width * .5;
			const cy = rect.height * .46;
			const count = kind === "jackpot" ? 140 : kind === "mega" ? 100 : kind === "storm" ? 80 : kind === "big" ? 60 : 28;
			let made = 0;
			for (const p of particles) {
				if (p.alive || made >= count) continue;
				const angle = Math.random() * Math.PI * 2;
				const speed = 80 + Math.random() * (kind === "jackpot" ? 620 : 380);
				p.alive = true;
				p.x = cx + (Math.random() - .5) * 40;
				p.y = cy;
				p.vx = Math.cos(angle) * speed;
				p.vy = Math.sin(angle) * speed - 80;
				p.life = 0;
				p.max = .7 + Math.random() * .9;
				p.size = 2 + Math.random() * (kind === "jackpot" ? 7 : 4);
				p.grav = 280 + Math.random() * 200;
				p.spin = Math.random() * 6;
				p.vr = Math.random() * 6 - 3;
				const roll = Math.random();
				p.color = roll < .5 ? palette.gold : roll < .8 ? palette.ember : roll < .93 ? palette.star : palette.parchment;
				made++;
			}
		};
		fxRef.current = {
			burst: spawn,
			kick: (amount) => {
				trauma.current = Math.min(1, trauma.current + amount);
			},
			trauma
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
		const frame = (now) => {
			const dt = Math.min(.033, (now - last) / 1e3);
			last = now;
			const rect = parent.getBoundingClientRect();
			ctx.clearRect(0, 0, rect.width, rect.height);
			ambient += dt;
			const palette = colors();
			if (ambient > .08) {
				ambient = 0;
				const moteCount = 1 + Math.floor(heatRef.current / 40);
				let made = 0;
				for (const p of particles) {
					if (p.alive || made >= moteCount) continue;
					p.alive = true;
					p.x = Math.random() * rect.width;
					p.y = rect.height + 6;
					p.vx = (Math.random() - .5) * 20;
					p.vy = -30 - Math.random() * 50 - heatRef.current * .4;
					p.life = 0;
					p.max = 2.4 + Math.random();
					p.size = 1.2 + Math.random() * 2;
					p.grav = -8;
					p.spin = 0;
					p.vr = 0;
					p.color = Math.random() > .7 ? palette.ember : palette.gold;
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
				ctx.fillRect(-p.size, -p.size * .6, p.size * 2, p.size * 1.2);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "fx-layer",
		"aria-hidden": true
	});
}
var SLICE = 360 / WHEEL.length;
function toneColor(tone) {
	if (tone === "gold") return "var(--color-gold-deep)";
	if (tone === "ember") return "var(--color-ember)";
	if (tone === "star") return "var(--color-star)";
	return "var(--color-ink)";
}
function WheelOverlay({ index, spinKey, reduce, onArm, onDone }) {
	const [angle, setAngle] = (0, import_react.useState)(0);
	const angleRef = (0, import_react.useRef)(0);
	const onDoneRef = (0, import_react.useRef)(onDone);
	onDoneRef.current = onDone;
	(0, import_react.useEffect)(() => {
		if (spinKey < 1) return;
		let dead = false;
		const turns = reduce ? 1 : 6;
		const startAngle = angleRef.current;
		const delta = turns * 360 - index * SLICE - startAngle % 360;
		const finalAngle = startAngle + (delta <= 180 ? delta + 360 : delta);
		const t0 = performance.now();
		const dur = reduce ? 450 : 5200;
		let raf = 0;
		let lastSlice = -1;
		const tick = (now) => {
			if (dead) return;
			const t = Math.min(1, (now - t0) / dur);
			const eased = 1 - Math.pow(1 - t, 3);
			const next = startAngle + (finalAngle - startAngle) * eased;
			angleRef.current = next;
			setAngle(next);
			const sliceNow = Math.floor((360 - (next % 360 + 360) % 360) / SLICE % WHEEL.length);
			if (sliceNow !== lastSlice) {
				lastSlice = sliceNow;
				if (t < .94) audio.wheelTick();
			}
			if (t < 1) raf = requestAnimationFrame(tick);
			else onDoneRef.current();
		};
		raf = requestAnimationFrame(tick);
		return () => {
			dead = true;
			cancelAnimationFrame(raf);
		};
	}, [
		spinKey,
		index,
		reduce
	]);
	const gradient = `conic-gradient(from -${SLICE / 2}deg, ${WHEEL.map((slice, i) => {
		return `${toneColor(slice.tone)} ${i * SLICE}deg ${(i + 1) * SLICE}deg`;
	}).join(", ")})`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overlay",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Wheel of Suns",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overlay-card wheel-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Eclipse Gate"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display",
					children: "Wheel of Suns"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: "Three gates. One spin. Jackpots live on the ember slices."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wheel-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wheel-pointer",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wheel",
							style: {
								background: gradient,
								transform: `rotate(${angle}deg)`
							},
							children: WHEEL.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { transform: `rotate(${i * SLICE}deg) translateY(-42%)` },
								children: item.label
							}, `${item.label}-${i}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wheel-hub font-display",
							children: "SUN"
						})
					]
				}),
				spinKey < 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "spin-btn",
					onClick: () => {
						audio.unlock();
						audio.click();
						onArm();
					},
					children: "Spin the sun"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wheel-note",
					children: "Listen for the click. The pointer is the judge."
				})
			]
		})
	});
}
function HuntOverlay({ opened, labels, locked, picksLeft, onPick, onClose }) {
	const finished = locked || picksLeft <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overlay",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Relic Hunt",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overlay-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Heart of the Vault"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display",
					children: "Relic Hunt"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted",
					children: [
						"Open up to ",
						3,
						" seals. A lock ends the hunt. You keep what you already touched."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hunt-grid",
					children: Array.from({ length: 12 }, (_, index) => {
						const isOpen = opened.includes(index);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `seal${isOpen ? " is-open" : ""}${labels[index] === "LOCK" ? " is-lock" : ""}`,
							disabled: isOpen || finished,
							onClick: () => onPick(index),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isOpen ? labels[index] : "SEAL" })
						}, index);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hunt-status",
					children: finished ? "The vault exhales." : `${picksLeft} picks left`
				}),
				finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "spin-btn",
					onClick: onClose,
					children: "Take the haul"
				}) : null
			]
		})
	});
}
var ORDER = [
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
	"relic"
];
function Paytable({ onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overlay",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Paytable",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overlay-card pay-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pay-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "The book of suns"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display",
						children: "Pays & odds"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "icon-btn",
						onClick: onClose,
						"aria-label": "Close paytable",
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted",
					children: [20, " lines, left to right. Your bet covers every line. Ashwing substitutes for every symbol except the Eclipse Gate and the Heart. Lows pay on four and five only. Characters pay from three."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "pay-list",
					children: ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: symbolSrc(id, 0),
						alt: ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: NAMES[id] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: id === "scatter" ? "3 anywhere opens the Wheel of Suns. 4 adds 4× bet. 5 adds 15×." : id === "relic" ? "3 anywhere opens the Relic Hunt. Two hearts pay nothing. The house is rude." : [
						3,
						4,
						5
					].map((count) => {
						const units = payFor(id, count);
						return units ? `${count}× ${units}` : null;
					}).filter(Boolean).join("   ·   ") + " line-bets" })] })] }, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pay-notes",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							"Ashwing Storm, 1 in ",
							20,
							"."
						] }), " Expanding reel, wild rain, a line multiplier, or twin suns. If the storm would pay under 2× your bet, more wilds are forced in until it does."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Wheel of Suns" }), " is uncommon. Most slices are small multipliers. Mini, Minor, Major, and Grand sit on the wheel and grow a little with every bet. Grand is a rumor."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Relic Hunt" }), " lets you open three seals or until a lock. Play money only. The vault keeps an edge. A high score lives on this device."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "fine",
							children: [
								"Symbols in this book: ",
								SYMBOLS.length,
								". Lines never pay scatters or hearts."
							]
						})
					]
				})
			]
		})
	});
}
var INTRO = [
	[
		"lyra",
		"coin",
		"crystal"
	],
	[
		"gem",
		"sol",
		"rune"
	],
	[
		"kael",
		"wild",
		"gem"
	],
	[
		"rune",
		"nyx",
		"coin"
	],
	[
		"crystal",
		"sol",
		"lyra"
	]
];
var FACES = [
	"lyra",
	"kael",
	"nyx",
	"sol"
];
function tierOf(win, bet) {
	const x = win / Math.max(1, bet);
	if (x <= 0) return "none";
	if (x < 2) return "tickle";
	if (x < 8) return "win";
	if (x < 20) return "big";
	if (x < 50) return "mega";
	return "ultra";
}
function bannerFor(tier) {
	if (tier === "tickle") return "SPARK";
	if (tier === "win") return "WIN";
	if (tier === "big") return "BIG WIN";
	if (tier === "mega") return "MEGA WIN";
	if (tier === "ultra") return "SUN BURST";
	return "";
}
function quoteFor(kind) {
	const list = {
		idle: [
			"The marble is warm.",
			"Nyx is counting eclipses.",
			"Kael wants heat.",
			"Lyra taps the glass."
		],
		lose: [
			"The house blinked.",
			"Sol looks away.",
			"Dry marble. Again."
		],
		win: [
			"Lyra laughs in gold.",
			"Kael grunts approval.",
			"The rune answered."
		],
		storm: [
			"Ashwing opens.",
			"Feathers in the reels.",
			"The wild door swings."
		],
		jackpot: [
			"The vault bows.",
			"Nine suns, one payout.",
			"Sol finally looks."
		]
	}[kind];
	return list[Math.floor(Math.random() * list.length)] ?? list[0];
}
function fmt(n) {
	return Math.round(n).toLocaleString("en-US");
}
function freshModel() {
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
		shownWin: 0
	};
}
function SlotMachine() {
	const [model, setModel] = (0, import_react.useState)(freshModel);
	const modelRef = (0, import_react.useRef)(model);
	modelRef.current = model;
	const fxRef = (0, import_react.useRef)(null);
	const shellRef = (0, import_react.useRef)(null);
	const reelsRef = (0, import_react.useRef)(null);
	const [cell, setCell] = (0, import_react.useState)(0);
	const [frame, setFrame] = (0, import_react.useState)(0);
	const stopped = (0, import_react.useRef)([
		false,
		false,
		false,
		false,
		false
	]);
	const tallyToken = (0, import_react.useRef)(0);
	const paidWheel = (0, import_react.useRef)(0);
	const [announce, setAnnounce] = (0, import_react.useState)("Vault of Nine Suns. Tap to play.");
	(0, import_react.useEffect)(() => {
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
			reduce
		}));
		audio.setMuted(save.mute);
		const onVis = () => {
			if (document.visibilityState === "visible") audio.resume();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, []);
	(0, import_react.useEffect)(() => {
		if (model.phase === "boot") return;
		writeSave({
			version: 1,
			credits: model.credits,
			bet: model.bet,
			jackpots: model.jackpots,
			stats: model.stats,
			mute: model.mute,
			shake: model.shake
		});
	}, [
		model.phase,
		model.credits,
		model.bet,
		model.jackpots,
		model.stats,
		model.mute,
		model.shake
	]);
	(0, import_react.useEffect)(() => {
		const el = reelsRef.current;
		if (!el) return;
		const measure = () => setCell(el.clientHeight / 3);
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		if (model.reduce) return;
		const id = window.setInterval(() => setFrame((value) => (value + 1) % 4), 160);
		return () => window.clearInterval(id);
	}, [model.reduce]);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = performance.now();
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			const trauma = fxRef.current?.trauma;
			if (trauma) trauma.current = Math.max(0, trauma.current - dt * 1.45);
			const mag = modelRef.current.shake && !modelRef.current.reduce ? (trauma?.current ?? 0) ** 2 : 0;
			const el = shellRef.current;
			if (el) {
				if (mag > .002) {
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
	const patch = (0, import_react.useCallback)((recipe) => {
		setModel((prev) => recipe(prev));
	}, []);
	const goIdle = (0, import_react.useCallback)((credits) => {
		patch((prev) => ({
			...prev,
			phase: credits < BETS[0] ? "broke" : "idle",
			banner: credits < BETS[0] ? "VAULT DRY" : prev.banner,
			auto: credits < BETS[0] ? false : prev.auto
		}));
	}, [patch]);
	const openWheel = (0, import_react.useCallback)((index) => {
		paidWheel.current = 0;
		patch((prev) => ({
			...prev,
			phase: "wheel",
			wheelIndex: index,
			wheelRun: 0,
			wheelRespun: false,
			quote: quoteFor("jackpot")
		}));
	}, [patch]);
	const afterBonus = (0, import_react.useCallback)(() => {
		const cur = modelRef.current;
		if (cur.outcome?.wheelIndex !== null && cur.outcome?.wheelIndex !== void 0 && cur.phase === "hunt") {
			openWheel(cur.outcome.wheelIndex);
			return;
		}
		goIdle(cur.credits);
	}, [goIdle, openWheel]);
	const finishTally = (0, import_react.useCallback)((amount, startCredits) => {
		const cur = modelRef.current;
		const outcome = cur.outcome;
		const credits = startCredits + amount;
		const tier = tierOf(amount, cur.bet);
		const stats = {
			...cur.stats,
			won: cur.stats.won + amount,
			biggest: Math.max(cur.stats.biggest, amount),
			storms: cur.stats.storms + (outcome?.feature ? 1 : 0)
		};
		patch((prev) => ({
			...prev,
			credits,
			stats,
			shownWin: amount,
			heat: Math.min(100, prev.heat + (amount > 0 ? 18 : -12) + (outcome?.feature ? 22 : 0)),
			quote: amount > prev.bet * 8 ? quoteFor("win") : amount > 0 ? quoteFor("win") : quoteFor("lose")
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
					stats: {
						...prev.stats,
						hunts: prev.stats.hunts + 1
					},
					quote: "Three hearts. The seals are warm."
				}));
				return;
			}
			if (latest.outcome?.wheelIndex !== null && latest.outcome?.wheelIndex !== void 0) {
				patch((prev) => ({
					...prev,
					stats: {
						...prev.stats,
						wheels: prev.stats.wheels + 1
					}
				}));
				openWheel(latest.outcome.wheelIndex);
				return;
			}
			goIdle(modelRef.current.credits);
			if (tier === "none") patch((prev) => ({
				...prev,
				banner: ""
			}));
		}, 240);
	}, [
		goIdle,
		openWheel,
		patch
	]);
	const runTally = (0, import_react.useCallback)((amount) => {
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
			sub: amount > 0 ? `${fmt(amount)} credits` : "The line stayed dark."
		}));
		if (amount > 0 && tier !== "none") {
			const sound = tier === "ultra" || tier === "mega" ? "ultra" : tier === "tickle" ? "tickle" : tier;
			audio.win(sound);
			fxRef.current?.burst(tier === "ultra" ? "jackpot" : tier === "mega" ? "mega" : tier === "big" ? "big" : "win");
			fxRef.current?.kick(tier === "ultra" ? .85 : tier === "mega" ? .6 : tier === "big" ? .4 : .18);
		}
		setAnnounce(amount > 0 ? `Win ${fmt(amount)}` : "No win");
		const t0 = performance.now();
		const step = (now) => {
			if (tallyToken.current !== token) return;
			const t = Math.min(1, (now - t0) / dur);
			const eased = 1 - Math.pow(1 - t, 2);
			const wins = modelRef.current.outcome?.lineWins.length ?? 0;
			patch((prev) => ({
				...prev,
				shownWin: Math.round(amount * eased),
				credits: startCredits + Math.round(amount * eased),
				activeLine: wins ? Math.min(wins - 1, Math.floor(eased * wins)) : 0
			}));
			if (t < 1) requestAnimationFrame(step);
			else finishTally(amount, startCredits);
		};
		requestAnimationFrame(step);
	}, [finishTally, patch]);
	const beginStorm = (0, import_react.useCallback)((outcome) => {
		audio.storm();
		fxRef.current?.burst("storm");
		fxRef.current?.kick(.62);
		setAnnounce(outcome.feature?.title ?? "Ashwing Storm");
		patch((prev) => ({
			...prev,
			phase: "storm",
			grid: outcome.final,
			banner: outcome.feature?.title ?? "ASHWING STORM",
			sub: outcome.feature?.detail ?? "",
			quote: quoteFor("storm"),
			heat: Math.min(100, prev.heat + 30)
		}));
		window.setTimeout(() => {
			runTally(outcome.lineWin + outcome.scatterPay + outcome.stormBless);
		}, modelRef.current.reduce ? 280 : 1250);
	}, [patch, runTally]);
	const onStop = (0, import_react.useCallback)((reel) => {
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
			patch((prev) => ({
				...prev,
				grid: outcome.final
			}));
			runTally(outcome.lineWin + outcome.scatterPay + outcome.stormBless);
		}
	}, [
		beginStorm,
		patch,
		runTally
	]);
	const spin = (0, import_react.useCallback)(() => {
		const cur = modelRef.current;
		if (cur.phase !== "idle" || cell < 8) return;
		audio.unlock();
		let bet = cur.bet;
		if (cur.credits < bet) {
			const lower = [...BETS].reverse().find((value) => value <= cur.credits);
			if (!lower) {
				patch((prev) => ({
					...prev,
					phase: "broke",
					auto: false,
					banner: "VAULT DRY"
				}));
				return;
			}
			bet = lower;
		}
		const outcome = rollSpin(bet, Math.random);
		const jackpots = contribute(cur.jackpots, bet);
		stopped.current = [
			false,
			false,
			false,
			false,
			false
		];
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
				wagered: prev.stats.wagered + bet
			}
		}));
	}, [cell, patch]);
	(0, import_react.useEffect)(() => {
		if (!model.auto || model.phase !== "idle") return;
		const id = window.setTimeout(() => spin(), 480);
		return () => window.clearTimeout(id);
	}, [
		model.auto,
		model.phase,
		model.spinId,
		spin
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.code !== "Space" && event.code !== "Enter") return;
			const tag = event.target?.tagName;
			if (tag === "BUTTON" || tag === "INPUT") return;
			if (modelRef.current.phase === "boot") {
				event.preventDefault();
				audio.unlock();
				patch((prev) => ({
					...prev,
					phase: "idle"
				}));
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
	const pickSeal = (index) => {
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
			fxRef.current?.kick(.9);
		} else if (award.amount > cur.bet * 8) fxRef.current?.burst("big");
		const nextCount = cur.huntOpen.filter((i) => deck[i]?.type !== "lock").length + (award.lock ? 0 : 1);
		const locked = award.lock || nextCount >= 3;
		const gained = award.amount + consolation;
		setAnnounce(award.lock ? "Lock. The hunt ends." : `Seal reveals ${award.text}`);
		patch((prev) => ({
			...prev,
			credits: prev.credits + gained,
			jackpots: award.jackpots,
			huntMult: award.nextMult,
			huntOpen: [...prev.huntOpen, index],
			huntLabels: {
				...prev.huntLabels,
				[index]: award.lock && first ? "LOCK · 2×" : award.text
			},
			huntLocked: locked,
			shownWin: prev.shownWin + gained,
			stats: {
				...prev.stats,
				won: prev.stats.won + gained,
				biggest: Math.max(prev.stats.biggest, gained)
			},
			quote: award.lock ? "The seal bites shut." : quoteFor("win")
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
				sub: "The sun refuses to sit."
			}));
			return;
		}
		if (award.amount > 0) {
			if (award.label === "GRAND" || award.label === "MAJOR" || award.label === "MINOR" || award.label === "MINI") {
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
				biggest: Math.max(prev.stats.biggest, award.amount)
			}
		}));
		window.setTimeout(() => goIdle(modelRef.current.credits), 700);
	};
	const hotRow = (reel) => {
		const rows = [
			false,
			false,
			false
		];
		if (model.phase !== "tally" || !model.outcome) return rows;
		const win = model.outcome.lineWins[model.activeLine];
		if (!win || reel >= win.count) return rows;
		const row = win.rows[reel];
		if (row !== void 0) rows[row] = true;
		return rows;
	};
	const slamRow = (reel) => {
		const rows = [
			false,
			false,
			false
		];
		if (model.phase !== "storm" || !model.outcome?.feature) return rows;
		for (const spot of model.outcome.feature.injected) if (spot.reel === reel) rows[spot.row] = true;
		return rows;
	};
	const durations = model.outcome?.anticipate ? [
		980,
		1200,
		1500,
		2200,
		3100
	] : [
		880,
		1100,
		1340,
		1600,
		1900
	];
	const cheering = model.phase === "storm" || model.phase === "tally" && model.shownWin > model.bet;
	const lineLabel = (() => {
		const win = model.phase === "tally" ? model.outcome?.lineWins[model.activeLine] : void 0;
		if (!win) return model.sub;
		return `Line ${win.index + 1} · ${NAMES[win.symbol]} ×${win.count} · ${fmt(win.amount)}`;
	})();
	const boot = () => {
		audio.unlock();
		audio.click();
		patch((prev) => ({
			...prev,
			phase: "idle",
			quote: quoteFor("idle")
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `stage${model.reduce ? " reduce-motion" : ""}${cheering ? " is-cheering" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "temple",
				src: "/game/temple.jpg",
				alt: ""
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FxCanvas, {
				fxRef,
				heat: model.heat
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sr-only",
				"aria-live": "polite",
				children: announce
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "topbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Celestial casino"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display",
						children: "Vault of Nine Suns"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pots",
					"aria-label": "Jackpots",
					children: [
						"grand",
						"major",
						"minor",
						"mini"
					].map((pot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `pot pot-${pot}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pot }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fmt(Math.max(model.jackpots[pot], JACKPOT_MULT[pot] * model.bet)) })]
					}, pot))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "playfield",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: `host host-left${cheering ? " is-hot" : ""}`,
						src: "/game/hosts/host-2.png",
						alt: "Lyra, the comet dancer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: shellRef,
						className: "machine",
						"data-heat": model.heat > 60 ? "high" : model.heat > 30 ? "warm" : "cool",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "marquee",
								"aria-hidden": true,
								children: Array.from({ length: 18 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { animationDelay: `${i * .12}s` } }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "faces",
								"aria-hidden": true,
								children: FACES.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: symbolSrc(id, frame),
									alt: "",
									className: cheering ? "is-hot" : ""
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "quote",
								children: model.quote
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "heat",
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${model.heat}%` } })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reel-window",
								ref: reelsRef,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "reels",
										children: model.grid.map((symbols, reel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reel, {
											reel,
											symbols,
											spinToken: model.phase === "spinning" ? model.spinId : 0,
											delay: 0,
											duration: durations[reel] ?? 1400,
											cell,
											frame,
											hotRows: hotRow(reel),
											slamRows: slamRow(reel),
											spinning: model.phase === "spinning",
											onStop: () => onStop(reel)
										}, reel))
									}),
									model.phase === "tally" && model.outcome?.lineWins[model.activeLine] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "payline",
										viewBox: "0 0 100 60",
										preserveAspectRatio: "none",
										"aria-hidden": true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: LINE_ROWS[model.outcome.lineWins[model.activeLine].index].map((row, reel) => `${reel * 20 + 10},${row * 20 + 10}`).join(" ") })
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "glass",
										"aria-hidden": true
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `banner${model.banner ? " is-on" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-display",
									children: model.banner || "ASHWING STORM · 1 IN 20"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: model.banner ? lineLabel : `${fmt(model.credits)} in the vault` })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "meters",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Win" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fmt(model.shownWin) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Credits" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fmt(model.credits) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Bet · ",
										20,
										" lines"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fmt(model.bet) })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "controls",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "icon-btn",
										"aria-label": "Lower bet",
										disabled: model.phase !== "idle",
										onClick: () => {
											audio.click();
											const index = BETS.indexOf(model.bet);
											const next = BETS[Math.max(0, index - 1)] ?? BETS[0];
											patch((prev) => ({
												...prev,
												bet: next
											}));
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: `spin-btn${model.auto ? " is-auto" : ""}`,
										onClick: () => {
											if (model.phase === "boot") boot();
											else if (model.auto && model.phase === "idle") patch((prev) => ({
												...prev,
												auto: false
											}));
											else spin();
										},
										disabled: model.phase === "spinning" || model.phase === "storm" || model.phase === "tally" || model.phase === "idle" && cell < 8,
										children: model.phase === "spinning" || model.phase === "storm" ? "LIVE" : "SPIN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "icon-btn",
										"aria-label": "Raise bet",
										disabled: model.phase !== "idle",
										onClick: () => {
											audio.click();
											const index = BETS.indexOf(model.bet);
											const next = BETS[Math.min(BETS.length - 1, index + 1)] ?? BETS[BETS.length - 1];
											patch((prev) => ({
												...prev,
												bet: next
											}));
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: `icon-btn${model.auto ? " is-on" : ""}`,
										"aria-label": model.auto ? "Stop auto spin" : "Auto spin",
										"aria-pressed": model.auto,
										onClick: () => {
											audio.unlock();
											audio.click();
											patch((prev) => ({
												...prev,
												auto: !prev.auto
											}));
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "icon-btn",
										"aria-label": model.mute ? "Unmute" : "Mute",
										onClick: () => {
											audio.unlock();
											patch((prev) => {
												audio.setMuted(!prev.mute);
												return {
													...prev,
													mute: !prev.mute
												};
											});
										},
										children: model.mute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "icon-btn",
										"aria-label": "Paytable",
										onClick: () => {
											audio.click();
											patch((prev) => ({
												...prev,
												paytable: true
											}));
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "fine-print",
								children: [
									"Play money. Storm 1 in ",
									20,
									". Biggest haul ",
									fmt(model.stats.biggest),
									". Spins ",
									model.stats.spins,
									"."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: `host host-right${cheering ? " is-hot" : ""}`,
						src: "/game/hosts/host-1.png",
						alt: "Kael, the forge king"
					})
				]
			}),
			model.phase === "boot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overlay boot-overlay",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overlay-card boot-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Tap to wake the temple"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display",
							children: "Open the vault"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "muted",
							children: [
								"Lyra deals. Kael keeps the heat. Nyx watches the eclipse. Sol pays only when the sun decides. Ashwing storms the reels about once every ",
								20,
								" spins, and those wilds are the lenient door. Everything else belongs to the house."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "spin-btn",
							onClick: boot,
							children: "Enter"
						})
					]
				})
			}) : null,
			model.phase === "broke" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overlay",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overlay-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Credits spent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display",
							children: "The vault is dry"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: "The edge is real. Take a house marker if you want another night."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "spin-btn",
							onClick: () => {
								audio.click();
								patch((prev) => ({
									...prev,
									credits: prev.credits + REFILL_CREDITS,
									phase: "idle",
									banner: "MARKER",
									sub: `+${fmt(REFILL_CREDITS)}`,
									quote: "The house lends. It always collects."
								}));
							},
							children: ["Take ", fmt(REFILL_CREDITS)]
						})
					]
				})
			}) : null,
			model.phase === "wheel" && model.wheelIndex !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WheelOverlay, {
				index: model.wheelIndex,
				spinKey: model.wheelRun,
				reduce: model.reduce,
				onArm: () => patch((prev) => ({
					...prev,
					wheelRun: Math.max(1, prev.wheelRun + (prev.wheelRun === 0 ? 1 : 0))
				})),
				onDone: onWheelDone
			}) : null,
			model.phase === "hunt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HuntOverlay, {
				opened: model.huntOpen,
				labels: model.huntLabels,
				locked: model.huntLocked,
				picksLeft: Math.max(0, 3 - model.huntOpen.filter((i) => model.outcome?.hunt?.[i]?.type !== "lock").length),
				onPick: pickSeal,
				onClose: afterBonus
			}) : null,
			model.paytable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paytable, { onClose: () => patch((prev) => ({
				...prev,
				paytable: false
			})) }) : null
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotMachine, {});
}
//#endregion
export { Home as component };
