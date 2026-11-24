import type { SoundId } from '../types';

/**
 * Mesin suara suasana berbasis Web Audio API.
 * Semua suara disintesis langsung di perangkat (tanpa file audio, tanpa unduhan).
 */

type PlayableSound = Exclude<SoundId, 'off'>;
type Cleanup = () => void;
type SoundBuilder = (ctx: AudioContext, out: AudioNode) => Cleanup;

export interface AmbientEngine {
  play: (sound: PlayableSound) => void;
  stop: () => void;
  dispose: () => void;
}

const NOISE_SECONDS = 4;
const FADE_IN_SECONDS = 1.2;
const FADE_OUT_SECONDS = 0.6;
/** Volume dibatasi supaya suara tidak mengejutkan atau terdengar sampai luar ruangan. */
const MASTER_VOLUME = 0.6;

function createNoiseBuffer(ctx: AudioContext, kind: 'white' | 'brown'): AudioBuffer {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * NOISE_SECONDS, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;

  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    if (kind === 'white') {
      data[i] = white;
    } else {
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  }
  return buffer;
}

function startNoise(ctx: AudioContext, kind: 'white' | 'brown'): AudioBufferSourceNode {
  const source = ctx.createBufferSource();
  source.buffer = createNoiseBuffer(ctx, kind);
  source.loop = true;
  source.start();
  return source;
}

function createFilter(ctx: AudioContext, type: BiquadFilterType, frequency: number): BiquadFilterNode {
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = frequency;
  return filter;
}

function createGain(ctx: AudioContext, value: number): GainNode {
  const gain = ctx.createGain();
  gain.gain.value = value;
  return gain;
}

const buildRain: SoundBuilder = (ctx, out) => {
  const noise = startNoise(ctx, 'white');
  const highpass = createFilter(ctx, 'highpass', 900);
  const lowpass = createFilter(ctx, 'lowpass', 7000);
  const gain = createGain(ctx, 0.22);

  noise.connect(highpass).connect(lowpass).connect(gain).connect(out);

  return () => {
    noise.stop();
    [noise, highpass, lowpass, gain].forEach((node) => node.disconnect());
  };
};

const buildWaves: SoundBuilder = (ctx, out) => {
  const noise = startNoise(ctx, 'brown');
  const lowpass = createFilter(ctx, 'lowpass', 650);
  const swell = createGain(ctx, 0.45);

  // LFO lambat membuat volume naik-turun seperti ombak datang dan pergi.
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.11;
  const depth = createGain(ctx, 0.35);
  lfo.connect(depth).connect(swell.gain);
  lfo.start();

  noise.connect(lowpass).connect(swell).connect(out);

  return () => {
    noise.stop();
    lfo.stop();
    [noise, lowpass, swell, lfo, depth].forEach((node) => node.disconnect());
  };
};

function playChirp(ctx: AudioContext, out: AudioNode, offsetSeconds: number): void {
  const start = ctx.currentTime + offsetSeconds;
  const base = 2200 + Math.random() * 1400;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(base, start);
  osc.frequency.exponentialRampToValueAtTime(base * 1.5, start + 0.09);
  osc.frequency.exponentialRampToValueAtTime(base * 1.1, start + 0.18);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.05, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);

  osc.connect(gain).connect(out);
  osc.start(start);
  osc.stop(start + 0.25);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

const buildForest: SoundBuilder = (ctx, out) => {
  const wind = startNoise(ctx, 'brown');
  const lowpass = createFilter(ctx, 'lowpass', 380);
  const gain = createGain(ctx, 0.18);
  wind.connect(lowpass).connect(gain).connect(out);

  let timer = 0;
  const scheduleChirps = () => {
    playChirp(ctx, out, 0);
    playChirp(ctx, out, 0.28);
    timer = window.setTimeout(scheduleChirps, 2200 + Math.random() * 4500);
  };
  timer = window.setTimeout(scheduleChirps, 900);

  return () => {
    window.clearTimeout(timer);
    wind.stop();
    [wind, lowpass, gain].forEach((node) => node.disconnect());
  };
};

const BUILDERS: Record<PlayableSound, SoundBuilder> = {
  rain: buildRain,
  waves: buildWaves,
  forest: buildForest,
};

export function createAmbientEngine(): AmbientEngine {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let cleanup: Cleanup | null = null;
  let stopTimer = 0;

  const ensureContext = (): { ctx: AudioContext; master: GainNode } => {
    if (!ctx || !master) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new Ctor();
      master = ctx.createGain();
      master.connect(ctx.destination);
    }
    return { ctx, master };
  };

  const releaseCurrent = () => {
    window.clearTimeout(stopTimer);
    cleanup?.();
    cleanup = null;
  };

  return {
    play(sound) {
      const audio = ensureContext();
      releaseCurrent();
      void audio.ctx.resume();

      cleanup = BUILDERS[sound](audio.ctx, audio.master);
      const now = audio.ctx.currentTime;
      audio.master.gain.cancelScheduledValues(now);
      audio.master.gain.setValueAtTime(0, now);
      audio.master.gain.linearRampToValueAtTime(MASTER_VOLUME, now + FADE_IN_SECONDS);
    },

    stop() {
      if (!ctx || !master || !cleanup) return;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + FADE_OUT_SECONDS);
      stopTimer = window.setTimeout(releaseCurrent, FADE_OUT_SECONDS * 1000);
    },

    dispose() {
      releaseCurrent();
      void ctx?.close();
      ctx = null;
      master = null;
    },
  };
}
