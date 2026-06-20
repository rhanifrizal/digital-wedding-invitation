"use client";

import { Music, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/config/wedding.config";

type MusicPlayerProps = {
  shouldPlay: boolean;
};

export function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current || !shouldPlay) return;

    audioRef.current.volume = 0.35;

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, [shouldPlay]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={weddingConfig.music.src} loop preload="auto" />

      {shouldPlay ? (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="fixed right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#ead8bc] bg-[#fffaf3]/90 text-[#9c7a4d] shadow-[0_12px_35px_rgba(88,63,38,0.16)] backdrop-blur transition hover:bg-white"
        >
          {isPlaying ? (
            <Volume2 className="h-5 w-5" strokeWidth={1.8} />
          ) : (
            <VolumeX className="h-5 w-5" strokeWidth={1.8} />
          )}
        </button>
      ) : (
        <div className="hidden">
          <Music />
        </div>
      )}
    </>
  );
}