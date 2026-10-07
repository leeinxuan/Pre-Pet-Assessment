"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { dogAssets } from "../../../data/species/dog/assets";
import { SceneMediaPlaceholder } from "./scenario-ui";

const dogShibaAsset = (fileName: string) => `${dogAssets.life.shibaRoot}/${fileName}`;
const arrivalVideoSource = dogShibaAsset("arrival-transition.mp4");
const busyCareTransitionSource = dogAssets.life.busyCareTransition;

export function ArrivalTransitionVideo({ onContinue, species = "dog" }: { onContinue: () => void; species?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedArrivalVideo = useRef(false);
  const startTimeoutRef = useRef<number | null>(null);
  const endTimeoutRef = useRef<number | null>(null);
  const onContinueRef = useRef(onContinue);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);

  useEffect(() => {
    onContinueRef.current = onContinue;
  }, [onContinue]);

  const showFinalFrame = useCallback(() => {
    if (hasFinishedArrivalVideo.current) return;
    hasFinishedArrivalVideo.current = true;
    if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
    videoRef.current?.pause();
    endTimeoutRef.current = window.setTimeout(() => onContinueRef.current(), 1000);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      video.pause();
      video.currentTime = 0;
      startTimeoutRef.current = window.setTimeout(showFinalFrame, 180);
      return () => {
        if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
      };
    }

    startTimeoutRef.current = window.setTimeout(() => {
      if (video.paused || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) setNeedsManualPlay(true);
    }, 8000);

    video.load();
    const playAttempt = video.play();
    playAttempt?.catch(() => {
      console.warn("接回家過場影片無法自動播放，已略過至飼養生活。");
      setNeedsManualPlay(true);
    });

    return () => {
      if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
      if (endTimeoutRef.current !== null) window.clearTimeout(endTimeoutRef.current);
    };
  }, [showFinalFrame]);

  function handlePlaying() {
    if (startTimeoutRef.current !== null) {
      window.clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
    setNeedsManualPlay(false);
  }

  function startVideoManually() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
  }

  function handleArrivalEnded() {
    showFinalFrame();
  }

  function handleVideoError() {
    showFinalFrame();
  }

  const animalLabel = species === "cat" ? "貓咪" : species === "rabbit" ? "兔子" : species === "bird" ? "鸚鵡" : species === "hamster" ? "倉鼠" : "犬";

  if (species === "hamster") return <section className="arrival-video-screen arrival-video-screen--placeholder" aria-label="接回家過場"><SceneMediaPlaceholder title="接回家" /><button type="button" className="primary" onClick={onContinue}>繼續生活旅程 →</button></section>;

  return (
    <section className="arrival-video-screen" aria-label="接回家影片過場">
      <video
        ref={videoRef}
        src={arrivalVideoSource}
        autoPlay
        playsInline
        preload="auto"
        aria-label={`${animalLabel}搭乘外出籠抵達新家的過場動畫`}
        onPlaying={handlePlaying}
        onEnded={handleArrivalEnded}
        onError={() => {
          console.warn("接回家過場影片載入失敗，已略過至飼養生活。");
          handleVideoError();
        }}
      />
      {needsManualPlay && <button type="button" className="primary arrival-video-play" onClick={startVideoManually}>播放影片</button>}
    </section>
  );
}

export function TimePassTransition({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const hasFinished = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setNeedsManualPlay(true));
  }, []);

  function finish() {
    if (hasFinished.current) return;
    hasFinished.current = true;
    onComplete();
  }

  function playManually() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
  }

  return (
    <section className="time-pass-transition" aria-label="時間流逝過場動畫">
      <video ref={videoRef} src={dogShibaAsset("time-passes-aging.mp4")} autoPlay playsInline preload="metadata" aria-label="時間流逝過場動畫" onEnded={finish} onError={() => setNeedsManualPlay(true)} />
      {needsManualPlay && <button type="button" className="time-pass-play" onClick={playManually}>播放影片</button>}
    </section>
  );
}

export function BusyCareTransition({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(onComplete);
  }, [onComplete]);

  return (
    <section className="arrival-video-screen busy-care-transition" aria-label="疲憊忙碌的日子過場影片">
      <video
        ref={videoRef}
        src={busyCareTransitionSource}
        autoPlay
        playsInline
        preload="auto"
        onEnded={onComplete}
        onError={onComplete}
      />
    </section>
  );
}

