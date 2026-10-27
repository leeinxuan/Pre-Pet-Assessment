"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getJourneyTransitionMedia, getSpeciesConfig } from "../../../data/species";
import { usePrefersReducedMotion } from "../../shared/usePrefersReducedMotion";
import { useIsMobileViewport } from "../../shared/useIsMobileViewport";

export function ArrivalTransitionVideo({ onContinue, species = "dog" }: { onContinue: () => void; species?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedArrivalVideo = useRef(false);
  const startTimeoutRef = useRef<number | null>(null);
  const endTimeoutRef = useRef<number | null>(null);
  const onContinueRef = useRef(onContinue);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobileViewport();
  const transitionMedia = getJourneyTransitionMedia(species);
  const arrivalVideoSource = isMobile === null ? undefined : (isMobile && transitionMedia.arrivalMobile) || transitionMedia.arrival;
  const sourceReady = isMobile !== null;

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
    if (!video || !sourceReady) return;
    if (prefersReducedMotion) {
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
  }, [prefersReducedMotion, showFinalFrame, sourceReady]);

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

  const animalLabel = getSpeciesConfig(species).copy.animalName;

  return (
    <section className="arrival-video-screen" aria-label="接回家影片過場">
      <video
        ref={videoRef}
        src={arrivalVideoSource}
        autoPlay={!prefersReducedMotion}
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

export function TimePassTransition({ onComplete, species = "dog" }: { onComplete: () => void; species?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const hasFinished = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobileViewport();
  const transitionMedia = getJourneyTransitionMedia(species);
  const timePassVideoSource = isMobile === null ? undefined : (isMobile && transitionMedia.timePassMobile) || transitionMedia.timePass;
  const sourceReady = isMobile !== null;

  const finish = useCallback(() => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sourceReady) return;
    if (prefersReducedMotion) {
      const timer = window.setTimeout(finish, 180);
      return () => window.clearTimeout(timer);
    }
    video.play().catch(() => setNeedsManualPlay(true));
  }, [finish, prefersReducedMotion, sourceReady]);

  function playManually() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
  }

  return (
    <section className="time-pass-transition" aria-label="時間流逝過場動畫">
      <video ref={videoRef} src={timePassVideoSource} autoPlay={!prefersReducedMotion} playsInline preload="metadata" aria-label="時間流逝過場動畫" onEnded={finish} onError={() => setNeedsManualPlay(true)} />
      {needsManualPlay && <button type="button" className="time-pass-play" onClick={playManually}>播放影片</button>}
    </section>
  );
}

export function BusyCareTransition({ onComplete, species = "dog" }: { onComplete: () => void; species?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobileViewport();
  const transitionMedia = getJourneyTransitionMedia(species);
  const busyCareTransitionSource = isMobile === null ? undefined : (isMobile && transitionMedia.busyCareMobile) || transitionMedia.busyCare;
  const sourceReady = isMobile !== null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sourceReady) return;
    if (prefersReducedMotion) {
      const timer = window.setTimeout(onComplete, 180);
      return () => window.clearTimeout(timer);
    }
    video.play().catch(onComplete);
  }, [onComplete, prefersReducedMotion, sourceReady]);

  return (
    <section className="arrival-video-screen busy-care-transition" aria-label="疲憊忙碌的日子過場影片">
      <video
        ref={videoRef}
        src={busyCareTransitionSource}
        autoPlay={!prefersReducedMotion}
        playsInline
        preload="auto"
        onEnded={onComplete}
        onError={onComplete}
      />
    </section>
  );
}
