"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Session } from "@/data/workshop";
import { SlideView } from "@/components/slides/SlideView";
import { NotesPanel } from "./NotesPanel";
import { Timer } from "./Timer";
import { useCockpitSync, usePresenterSync } from "@/lib/presenterSync";
import type { Step } from "@/lib/slideDeck";
import {
  buildSteps,
  getDeckForSession,
  getNextNavigableSession,
  getPrevNavigableSession,
  NAVIGABLE_SESSIONS,
} from "@/lib/slideDeck";

export function PresenterClient({
  session,
  initialAt,
}: {
  session: Session;
  initialAt: string | null;
}) {
  const router = useRouter();
  const deck = useMemo(() => getDeckForSession(session), [session]);
  const steps = useMemo(() => buildSteps(deck), [deck]);

  // initialAt comes from the server's searchParams — reading window.location
  // here doesn't work because React renders this client component before the
  // URL transition commits (so window.location.search is still empty).
  const initialIndex = initialAt === "last" ? steps.length - 1 : 0;

  const { index, next, prev, setIndex, peerAlive } = usePresenterSync(
    String(session.id),
    "presenter",
    steps.length,
    initialIndex
  );

  // Strip the hint from the URL once we've used it so a refresh doesn't
  // re-jump to the last slide unexpectedly.
  useEffect(() => {
    if (initialAt !== null && typeof window !== "undefined") {
      window.history.replaceState({}, "", `/present/${session.id}`);
    }
  }, [initialAt, session.id]);

  // Persist timer across session-change remounts. sessionStorage scopes to the
  // tab, which is exactly what we want — the timer represents "time since the
  // presenter opened the projector", and that shouldn't reset every time Jay
  // moves to the next session.
  const [startedAt, setStartedAtState] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = window.sessionStorage.getItem("workshop-started-at");
    if (!saved) return null;
    const n = Number(saved);
    return Number.isFinite(n) ? n : null;
  });
  const setStartedAt = useCallback((value: number | null) => {
    if (typeof window !== "undefined") {
      if (value === null) window.sessionStorage.removeItem("workshop-started-at");
      else window.sessionStorage.setItem("workshop-started-at", String(value));
    }
    setStartedAtState(value);
  }, []);
  const projectorRef = useRef<Window | null>(null);

  // Navigable sessions (exclude breaks/lunch — they have no slides)
  const navigable = NAVIGABLE_SESSIONS;
  const currentIdx = navigable.findIndex((s) => s.id === session.id);
  const prevSession = useMemo(
    () => getPrevNavigableSession(session.id),
    [session.id]
  );
  const nextSession = useMemo(
    () => getNextNavigableSession(session.id),
    [session.id]
  );

  // Cockpit channel — notifies projector window when we jump sessions
  const onCockpitMsg = useCallback(
    (newSessionId: number, startAt?: "first" | "last") => {
      if (newSessionId !== session.id) {
        const query = startAt === "last" ? "?at=last" : "";
        router.push(`/present/${newSessionId}${query}`);
      }
    },
    [session.id, router]
  );
  const { changeSession } = useCockpitSync(onCockpitMsg);

  const goToNextSession = useCallback(() => {
    if (!nextSession) return;
    changeSession(nextSession.id);
    router.push(`/present/${nextSession.id}`);
  }, [nextSession, changeSession, router]);

  const goToPrevSession = useCallback(() => {
    if (!prevSession) return;
    // Backward jumps land on the LAST step of the target session so repeated
    // back-clicks walk through content in reverse order, not skip every deck.
    changeSession(prevSession.id, "last");
    router.push(`/present/${prevSession.id}?at=last`);
  }, [prevSession, changeSession, router]);

  /**
   * Smart navigation — acts on steps within a session, then auto-advances to
   * the next/previous session at the boundaries. This is what the Next/Prev
   * buttons AND arrow keys wire into.
   */
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

  // Disabled at the very edges of the workshop only
  const canGoBack = index > 0 || !!prevSession;
  const canGoForward = index < steps.length - 1 || !!nextSession;

  const openProjector = useCallback(async () => {
    const url = `/projector/${session.id}`;

    // Default: open at the current screen's full dimensions. This is critical —
    // the Fullscreen API makes content fill the *window*, not the screen. If the
    // window is smaller than the screen, fullscreen only hides chrome inside a
    // small popup and LOOKS like nothing happened. Open at screen size and
    // fullscreen = true fullscreen.
    let width = window.screen.availWidth;
    let height = window.screen.availHeight;
    let left = 0;
    let top = 0;

    // Enhancement: if the Window Management API is available (Chrome 100+ on
    // localhost/HTTPS), try to place the window directly on the external display.
    // Falls back silently if permission is denied or no external display exists.
    try {
      const nav = window as Window & {
        getScreenDetails?: () => Promise<{
          screens: Array<{
            isPrimary: boolean;
            availWidth: number;
            availHeight: number;
            availLeft: number;
            availTop: number;
          }>;
        }>;
      };
      if (typeof nav.getScreenDetails === "function") {
        const details = await nav.getScreenDetails();
        const external = details.screens.find((s) => !s.isPrimary);
        if (external) {
          width = external.availWidth;
          height = external.availHeight;
          left = external.availLeft;
          top = external.availTop;
        }
      }
    } catch {
      // No Window Management permission / API — use primary screen defaults.
    }

    const features = `noopener,width=${width},height=${height},left=${left},top=${top}`;
    const win = window.open(url, `projector-${session.id}`, features);
    projectorRef.current = win;
    if (startedAt === null) setStartedAt(Date.now());
  }, [session.id, startedAt, setStartedAt]);

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
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    smartNext,
    smartPrev,
    setIndex,
    steps.length,
    goToNextSession,
    goToPrevSession,
  ]);

  // Derive the current slide + fragment state from the flat step index
  const currentStep = steps[index] ?? steps[0];
  const currentSlide = deck[currentStep.slideIndex];

  // Build a map: slideIndex → first step index (for click-to-jump on thumbnails)
  const firstStepForSlide = useMemo(() => {
    const map: Record<number, number> = {};
    steps.forEach((step, i) => {
      if (map[step.slideIndex] === undefined) map[step.slideIndex] = i;
    });
    return map;
  }, [steps]);

  // Jump to a specific slide by clicking its thumbnail
  const jumpToSlide = useCallback(
    (slideIdx: number) => {
      const stepIdx = firstStepForSlide[slideIdx];
      if (stepIdx !== undefined) setIndex(stepIdx);
    },
    [firstStepForSlide, setIndex]
  );

  // Auto-scroll the active thumbnail into view
  const stripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!stripRef.current) return;
    const active = stripRef.current.querySelector("[data-active=true]");
    if (active) {
      active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentStep.slideIndex]);

  // Slide counter: show slide number (not step number) so it matches
  // the mental model of "I'm on slide 3 of 10"
  const slideNumber = currentStep.slideIndex + 1;

  return (
    <div className="h-screen flex flex-col text-neutral-900">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 px-5 py-3 border-b border-neutral-200 bg-white flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-900 shrink-0"
          >
            ← Cockpit
          </Link>
          <div className="min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              {session.subtitle && (
                <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500">
                  {session.subtitle}
                </span>
              )}
              <h1 className="text-lg font-semibold truncate">{session.title}</h1>
              {currentIdx >= 0 && (
                <span className="text-[10px] font-mono tabular-nums text-neutral-400">
                  {currentIdx + 1}/{navigable.length}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 tabular-nums">
              {session.startTime}–{session.endTime} · {session.duration}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono tabular-nums text-neutral-500">
            {slideNumber} / {deck.length}
          </span>
          {peerAlive ? (
            <span className="text-xs text-emerald-600 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Projector connected
            </span>
          ) : (
            <button
              onClick={openProjector}
              className="text-xs font-semibold px-3 py-1.5 rounded bg-orange-500 text-white hover:bg-orange-600"
            >
              Open Projector
            </button>
          )}
          <div className="flex items-center gap-1">
            {/* Session nav */}
            <button
              onClick={goToPrevSession}
              disabled={!prevSession}
              title={
                prevSession
                  ? `Prev session: ${prevSession.title} ([ or Shift+←)`
                  : "No previous session"
              }
              className="px-2 py-1 text-xs rounded border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed bg-white text-neutral-600"
            >
              ◂◂
            </button>
            <button
              onClick={goToNextSession}
              disabled={!nextSession}
              title={
                nextSession
                  ? `Next session: ${nextSession.title} (] or Shift+→)`
                  : "No next session"
              }
              className="px-2 py-1 text-xs rounded border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed bg-white text-neutral-600"
            >
              ▸▸
            </button>
            <span className="mx-1 h-4 w-px bg-neutral-300" />
            {/* Slide nav — auto-advances past session boundaries */}
            <button
              onClick={smartPrev}
              disabled={!canGoBack}
              title={
                index === 0 && prevSession
                  ? `← Back to end of previous session`
                  : "Previous (←)"
              }
              className="px-2.5 py-1 text-xs rounded border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed bg-white"
            >
              ◀
            </button>
            <button
              onClick={smartNext}
              disabled={!canGoForward}
              title={
                index >= steps.length - 1 && nextSession
                  ? `Next → jump to ${nextSession.title}`
                  : "Next (→)"
              }
              className="px-2.5 py-1 text-xs rounded border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed bg-white"
            >
              ▶
            </button>
          </div>
        </div>
      </header>

      {/* Body: responsive 2-column grid. Notes panel widens with viewport so the
          left column gets closer to 16:9, minimizing letterbox gap around the slide. */}
      <div
        className="flex-1 min-h-0 grid gap-3 md:gap-4 p-3 md:p-4 bg-neutral-50
          grid-cols-[minmax(0,1fr)_320px]
          xl:grid-cols-[minmax(0,1fr)_400px]
          2xl:grid-cols-[minmax(0,1fr)_480px]
          [@media(min-width:1800px)]:grid-cols-[minmax(0,1fr)_560px]"
      >
        {/* Left column: current (big, 16:9) + next (small, 16:9) */}
        <div className="flex flex-col gap-3 min-h-0">
          {/* Current slide — always 16:9, inscribed in available space */}
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <div className="aspect-video w-full max-h-full rounded-xl overflow-hidden shadow-sm border border-neutral-200 bg-neutral-950">
              <SlideView
                slide={currentSlide}
                variant="full"
                visibleBullets={currentStep.visibleBullets}
              />
            </div>
          </div>
          {/* Slide thumbnail strip — horizontal scroll, click to jump */}
          <div
            ref={stripRef}
            className="flex gap-2 shrink-0 overflow-x-auto pb-1 scrollbar-thin"
          >
            {deck.map((slide, slideIdx) => {
              const isActive = slideIdx === currentStep.slideIndex;
              return (
                <button
                  key={slideIdx}
                  data-active={isActive}
                  onClick={() => jumpToSlide(slideIdx)}
                  className={`aspect-video h-16 xl:h-20 2xl:h-24 rounded overflow-hidden shrink-0 bg-neutral-950 transition-all ${
                    isActive
                      ? "ring-2 ring-orange-500 shadow-md scale-105"
                      : "border border-neutral-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <SlideView slide={slide} variant="thumb" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: notes */}
        <div className="min-h-0 rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <NotesPanel session={session} slideNotes={currentSlide.notes} />
        </div>
      </div>

      {/* Footer hint */}
      <footer className="px-5 py-2 border-t border-neutral-200 bg-white text-[11px] text-neutral-500 flex items-center gap-4 flex-wrap">
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
            ←
          </kbd>{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
            →
          </kbd>{" "}
          slide
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
            [
          </kbd>{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
            ]
          </kbd>{" "}
          or{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
            Shift+←/→
          </kbd>{" "}
          session
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
            Space
          </kbd>{" "}
          next
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
            Home
          </kbd>{" "}
          /{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
            End
          </kbd>{" "}
          jump
        </span>
      </footer>
    </div>
  );
}
