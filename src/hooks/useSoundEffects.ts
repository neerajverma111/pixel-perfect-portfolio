import { useCallback, useState, useEffect } from "react";

type SoundType = "keypress" | "hover" | "click" | "success" | "whoosh" | "achievement";

// Simple oscillator-based sound generation (no external audio files needed)
const createOscillator = (
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.1
) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
};

const soundConfigs: Record<SoundType, (ctx: AudioContext) => void> = {
  keypress: (ctx) => {
    createOscillator(ctx, 800, 0.05, "square", 0.03);
  },
  hover: (ctx) => {
    createOscillator(ctx, 600, 0.08, "sine", 0.02);
  },
  click: (ctx) => {
    createOscillator(ctx, 400, 0.1, "triangle", 0.05);
    setTimeout(() => createOscillator(ctx, 600, 0.08, "triangle", 0.03), 50);
  },
  success: (ctx) => {
    createOscillator(ctx, 523, 0.1, "sine", 0.05);
    setTimeout(() => createOscillator(ctx, 659, 0.1, "sine", 0.05), 100);
    setTimeout(() => createOscillator(ctx, 784, 0.15, "sine", 0.05), 200);
  },
  whoosh: (ctx) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.2);
  },
  achievement: (ctx) => {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => createOscillator(ctx, freq, 0.2, "sine", 0.04), i * 100);
    });
  },
};

export const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("soundMuted") === "true";
    }
    return false;
  });
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on user interaction
    const initAudio = () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      }
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
    };

    document.addEventListener("click", initAudio);
    document.addEventListener("keydown", initAudio);

    return () => {
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
    };
  }, [audioContext]);

  useEffect(() => {
    localStorage.setItem("soundMuted", String(isMuted));
  }, [isMuted]);

  const playSound = useCallback(
    (type: SoundType) => {
      if (isMuted || !audioContext) return;

      try {
        soundConfigs[type](audioContext);
      } catch (error) {
        console.warn("Sound playback failed:", error);
      }
    },
    [isMuted, audioContext]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return { playSound, isMuted, toggleMute };
};

export default useSoundEffects;
