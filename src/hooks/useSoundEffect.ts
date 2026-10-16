import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'pablo-portfolio:sound';

type AudioContextCtor = typeof AudioContext;

function getAudioContextCtor(): AudioContextCtor | undefined {
  if (typeof window === 'undefined') return undefined;
  return (
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext
  );
}

function readPreference(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

interface Options {
  /** Minimum gap between clicks, in ms. */
  minInterval?: number;
  /** Peak gain, 0–1. */
  volume?: number;
}

/**
 * A soft, very short "tick" synthesized with the Web Audio API — no audio file.
 *
 * Browsers only allow audio after a user gesture, so the AudioContext is
 * created on the first click / tap / key press. Until then `play()` is silent.
 * The on/off preference is remembered in localStorage.
 */
export function useSoundEffect({ minInterval = 140, volume = 0.05 }: Options = {}) {
  const contextRef = useRef<AudioContext | null>(null);
  const lastPlayedRef = useRef(0);
  const [enabled, setEnabled] = useState(readPreference);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const unlock = () => {
      const Ctor = getAudioContextCtor();
      if (!Ctor) return;
      if (!contextRef.current) contextRef.current = new Ctor();
      if (contextRef.current.state === 'suspended') void contextRef.current.resume();
    };

    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    events.forEach((name) => window.addEventListener(name, unlock, { passive: true }));

    return () => {
      events.forEach((name) => window.removeEventListener(name, unlock));
      void contextRef.current?.close();
      contextRef.current = null;
    };
  }, []);

  const play = useCallback(() => {
    if (!enabledRef.current) return;
    const context = contextRef.current;
    if (!context || context.state !== 'running') return;

    const now = performance.now();
    if (now - lastPlayedRef.current < minInterval) return;
    lastPlayedRef.current = now;

    const t = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(1900, t);
    oscillator.frequency.exponentialRampToValueAtTime(1100, t + 0.04);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(t);
    oscillator.stop(t + 0.07);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  }, [minInterval, volume]);

  const toggle = useCallback(() => {
    setEnabled((previous) => {
      const next = !previous;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
      } catch {
        /* storage unavailable (private mode) — preference just won't persist */
      }
      return next;
    });
  }, []);

  return { play, enabled, toggle };
}
