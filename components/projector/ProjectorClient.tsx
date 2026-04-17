"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@/data/workshop";
import { SlideView } from "@/components/slides/SlideView";
import { useCockpitSync, usePresenterSync } from "@/lib/presenterSync";
import {
  buildSteps,
  getDeckForSession,
  getNextNavigableSession,
  getPrevNavigableSession,
} from "@/lib/slideDeck";

type FsStatus = "idle" | "entering" | "active" | "error";

export function ProjectorClient({
  session,
  initialAt,
}: {
  session: Session;
  initialAt: string | null;
}) {
  const router = useRouter();
  const deck = useMemo(() => getDeckForSession(session), [session]);
  const steps = useMemo(() => buildSteps(deck), [deck]);

  // See PresenterClient: initialAt comes from server searchParams, not window.location,
  // because during route transitions window.location hasn't updated yet when the new
  // client component renders.
  const initialIndex = initialAt === "last" ? steps.length - 1 : 0;

  const { index, next, prev, setIndex } = usePresenterSync(
    String(session.id),
    "projector",
    steps.length,
    initialIndex
  );

  useEffect(() => {
    if (initialAt !== null && typeof window !== "undefined") {
      window.history.replaceState({}, "", `/projector/${session.id}`);
    }
  }, [initialAt, session.id]);

  // Initialize from the live DOM so a session-change remount mid-fullscreen
  // doesn't flash an "Enter fullscreen" button while we actually ARE fullscreen.
  const [fsStatus, setFsStatus] = useState<FsStatus>(() => {
    if (typeof document === "undefined") return "idle";
    return document.fullscreenElement ? "active" : "idle";
  });
  const [fsError, setFsError] = useState<string | null>(null);

  // Session nav: projector can also initiate session changes via arrow keys on
  // the boundary step. The change is broadcast on the cockpit channel so the
  // presenter follows.
  const nextSession = useMemo(
    () => getNextNavigableSession(session.id),
    [session.id]
  );
  const prevSession = useMemo(
    () => getPrevNavigableSession(session.id),
    [session.id]
  );

  // Follow session changes from the cockpit channel
  const { changeSession } = useCockpitSync(
    useCallback(
      (newSessionId: number, startAt?: "first" | "last") => {
        if (newSessionId !== session.id) {
          const query = startAt === "last" ? "?at=last" : "";
          router.push(`/projector/${newSessionId}${query}`);
        }
      },
      [session.id, router]
    )
  );

  const goToNextSession = useCallback(() => {
    if (!nextSession) return;
    changeSession(nextSession.id);
    router.push(`/projector/${nextSession.id}`);
  }, [nextSession, changeSession, router]);

  const goToPrevSession = useCallback(() => {
    if (!prevSession) return;
    changeSession(prevSession.id, "last");
    router.push(`/projector/${prevSession.id}?at=last`);
  }, [prevSession, changeSession, router]);

  const smartNext = useCallback(() => {
    if (index >= steps.length - 1) {
      goToNextSession();
    } else {
      next();
    }
  }, [index, steps.length, next, goToNextSession]);

  const smartPrev = useCallback(() => {
    if (index === 0) {
      goToPrevSession();
    } else {
      prev();
    }
  }, [index, prev, goToPrevSession]);

  const toggleFullscreen = useCallback(async () => {
    setFsError(null);
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (err) {
        setFsError(err instanceof Error ? err.message : "Exit failed");
      }
      return;
    }
    setFsStatus("entering");
    try {
      await document.documentElement.requestFullscreen();
      // status will flip to "active" via fullscreenchange listener
    } catch (err) {
      setFsStatus("error");
      setFsError(
        err instanceof Error
          ? err.message
          : "Fullscreen blocked — try pressing F11 in the browser instead"
      );
    }
  }, []);

  // Track real fullscreen state
  useEffect(() => {
    const onChange = () => {
      if (document.fullscreenElement) {
        setFsStatus("active");
        setFsError(null);
      } else {
        setFsStatus("idle");
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        if (e.shiftKey) {
          goToNextSession();
        } else {
          smartNext();
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        if (e.shiftKey) {
          goToPrevSession();
        } else {
          smartPrev();
        }
      } else if (e.key === "]") {
        e.preventDefault();
        goToNextSession();
      } else if (e.key === "[") {
        e.preventDefault();
        goToPrevSession();
      } else if (e.key === "Home") {
        e.preventDefault();
        setIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIndex(steps.length - 1);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    smartNext,
    smartPrev,
    setIndex,
    steps.length,
    toggleFullscreen,
    goToNextSession,
    goToPrevSession,
  ]);

  // Derive the current slide + fragment state from the flat step index
  const currentStep = steps[index] ?? steps[0];
  const currentSlide = deck[currentStep.slideIndex];
  const isActive = fsStatus === "active";

  return (
    <div className="fixed inset-0 bg-neutral-950">
      <SlideView
        slide={currentSlide}
        variant="full"
        visibleBullets={currentStep.visibleBullets}
      />

      {/* Fullscreen toggle — ALWAYS visible (label changes by state) */}
      <button
        onClick={toggleFullscreen}
        className={`fixed top-4 right-4 flex items-center gap-2 rounded-lg backdrop-blur border px-3 py-2 text-xs font-semibold shadow-lg transition-colors ${
          isActive
            ? "bg-neutral-950/40 border-neutral-800 text-neutral-500 hover:text-neutral-300"
            : "bg-neutral-900/80 border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white"
        }`}
        aria-label={isActive ? "Exit fullscreen" : "Enter fullscreen"}
      >
        <span className="text-base leading-none">{isActive ? "⛷" : "⛶"}</span>
        <span>{isActive ? "Exit" : "Fullscreen"}</span>
        <kbd
          className={`ml-1 rounded px-1.5 py-0.5 text-[10px] ${
            isActive ? "bg-neutral-800 text-neutral-500" : "bg-neutral-700 text-neutral-300"
          }`}
        >
          F
        </kbd>
      </button>

      {/* Error toast if fullscreen request was rejected */}
      {fsError && !isActive && (
        <div className="fixed top-20 right-4 max-w-sm rounded-lg bg-red-950/90 backdrop-blur border border-red-700 px-4 py-3 text-xs text-red-100 shadow-lg">
          <div className="font-semibold mb-1">Fullscreen blocked</div>
          <div className="text-red-200 leading-snug">{fsError}</div>
          <div className="text-red-300 mt-2 text-[10px]">
            Try pressing <kbd className="rounded bg-red-900 px-1">F11</kbd> (browser fullscreen)
          </div>
        </div>
      )}

      {/* Slide counter */}
      <div className="fixed bottom-4 right-4 text-[10px] font-mono tabular-nums text-neutral-600">
        {currentStep.slideIndex + 1} / {deck.length}
      </div>
    </div>
  );
}
