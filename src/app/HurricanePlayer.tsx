"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { hurricaneTracks, HurricaneTrack } from "./hurricane-tracks";
import HurricaneArt from "./HurricaneArt";

function formatTime(s: number): string {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function HurricanePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const currentTrack: HurricaneTrack | null =
    currentIndex !== null ? hurricaneTracks[currentIndex] : null;

  const play = useCallback(
    (index: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (index === currentIndex) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.play();
          setIsPlaying(true);
        }
        return;
      }

      setCurrentIndex(index);
      audio.src = `/music-hd/${encodeURIComponent(hurricaneTracks[index].file)}`;
      audio.load();
      audio.play();
      setIsPlaying(true);
    },
    [currentIndex, isPlaying]
  );

  const prev = useCallback(() => {
    if (currentIndex === null) return;
    const prevIdx = currentIndex === 0 ? hurricaneTracks.length - 1 : currentIndex - 1;
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentIndex(prevIdx);
    audio.src = `/music-hd/${encodeURIComponent(hurricaneTracks[prevIdx].file)}`;
    audio.load();
    audio.play();
    setIsPlaying(true);
  }, [currentIndex]);

  const next = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex + 1) % hurricaneTracks.length;
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentIndex(nextIdx);
    audio.src = `/music-hd/${encodeURIComponent(hurricaneTracks[nextIdx].file)}`;
    audio.load();
    audio.play();
    setIsPlaying(true);
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => {
      if (currentIndex !== null) {
        const nextIdx = (currentIndex + 1) % hurricaneTracks.length;
        setCurrentIndex(nextIdx);
        audio.src = `/music-hd/${encodeURIComponent(hurricaneTracks[nextIdx].file)}`;
        audio.load();
        audio.play();
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <audio ref={audioRef} preload="none" />

      {/* Album Art */}
      <div className="flex flex-col items-center mb-8">
        <HurricaneArt />
      </div>

      {/* Now Playing + Controls */}
      {currentTrack && (
        <div
          className="rounded-xl p-4 mb-6"
          style={{ background: "var(--card-bg)" }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-1"
            style={{ color: "#F66733" }}
          >
            Now Playing
          </p>
          <p className="font-semibold text-lg">{currentTrack.title}</p>
          {currentTrack.note && (
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {currentTrack.note}
            </p>
          )}

          {/* Progress bar */}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-xs tabular-nums" style={{ color: "var(--muted)" }}>
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={seek}
              className="flex-1 hurricane-range"
            />
            <span className="text-xs tabular-nums" style={{ color: "var(--muted)" }}>
              {formatTime(duration)}
            </span>
          </div>

          {/* Transport controls */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={prev}
              className="p-2 rounded-full transition-colors hover:bg-white/10"
              aria-label="Previous"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            <button
              onClick={() => currentIndex !== null && play(currentIndex)}
              className="p-3 rounded-full transition-colors"
              style={{ background: "#F66733" }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6zm8-14v14h4V5z" />
                </svg>
              ) : (
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full transition-colors hover:bg-white/10"
              aria-label="Next"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 mt-3 justify-center">
            <svg
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "var(--muted)" }}
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24"
            />
          </div>
        </div>
      )}

      {/* Track list */}
      <div className="rounded-xl overflow-hidden" style={{ background: "var(--card-bg)" }}>
        <div className="px-4 py-3 border-b border-white/5">
          <p className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            {hurricaneTracks.length} Tracks
          </p>
        </div>
        <ul>
          {hurricaneTracks.map((track, i) => {
            const isActive = i === currentIndex;
            return (
              <li key={track.file}>
                <button
                  onClick={() => play(i)}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 transition-colors hover:bg-white/5"
                  style={isActive ? { background: "rgba(246,103,51,0.15)" } : {}}
                >
                  <span
                    className="w-8 text-center text-sm tabular-nums"
                    style={{ color: isActive ? "#F66733" : "var(--muted)" }}
                  >
                    {isActive && isPlaying ? (
                      <span className="inline-flex gap-0.5 items-end h-4">
                        <span className="w-0.5 animate-pulse" style={{ height: "60%", background: "#F66733" }} />
                        <span className="w-0.5 animate-pulse" style={{ height: "100%", background: "#F66733", animationDelay: "0.15s" }} />
                        <span className="w-0.5 animate-pulse" style={{ height: "40%", background: "#F66733", animationDelay: "0.3s" }} />
                      </span>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium truncate"
                      style={isActive ? { color: "#F66733" } : {}}
                    >
                      {track.title}
                    </p>
                    {track.note && (
                      <p className="text-xs truncate" style={{ color: "var(--muted)" }}>
                        {track.note}
                      </p>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
