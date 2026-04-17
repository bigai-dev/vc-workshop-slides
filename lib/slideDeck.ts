import { SESSIONS, type Session, type Slide } from "@/data/workshop";

/**
 * A "step" is the atomic unit of navigation. For non-bullet slides it's 1:1
 * with the slide. For bullet slides, each bullet is a separate step — the
 * audience sees them appear one by one.
 */
export type Step = {
  slideIndex: number;
  /** 0 for non-bullet slides. 1..N for bullet slides (how many bullets to show). */
  visibleBullets: number;
};

/**
 * Split a prompt's code into reveal-chunks. Paragraph-first (split on blank
 * lines); falls back to line-level if there are no paragraph breaks but
 * multiple lines. Returns at least one chunk.
 */
export function splitPromptChunks(code: string): string[] {
  const paras = code.split(/\n\n+/).map((s) => s.replace(/\s+$/, "")).filter((s) => s.length > 0);
  if (paras.length > 1) return paras;
  const lines = code.split("\n").map((s) => s.replace(/\s+$/, "")).filter((s) => s.length > 0);
  if (lines.length > 1) return lines;
  return [code];
}

export function buildSteps(deck: Slide[]): Step[] {
  const steps: Step[] = [];
  deck.forEach((slide, slideIndex) => {
    if (slide.kind === "bullets" && slide.bullets.length > 0) {
      // Step 0 = title only (no bullets visible yet)
      steps.push({ slideIndex, visibleBullets: 0 });
      for (let i = 1; i <= slide.bullets.length; i++) {
        steps.push({ slideIndex, visibleBullets: i });
      }
    } else if (slide.kind === "raw" && slide.fragments && slide.fragments > 1) {
      // Step 0 = title only (no fragments visible yet)
      steps.push({ slideIndex, visibleBullets: 0 });
      for (let i = 1; i <= slide.fragments; i++) {
        steps.push({ slideIndex, visibleBullets: i });
      }
    } else if (slide.kind === "prompt") {
      const chunks = splitPromptChunks(slide.code);
      if (chunks.length > 1) {
        // Step 0 = label only (code box hidden). 1..N = first N chunks visible.
        steps.push({ slideIndex, visibleBullets: 0 });
        for (let i = 1; i <= chunks.length; i++) {
          steps.push({ slideIndex, visibleBullets: i });
        }
      } else {
        steps.push({ slideIndex, visibleBullets: 0 });
      }
    } else {
      steps.push({ slideIndex, visibleBullets: 0 });
    }
  });
  return steps;
}

export const STUB_DECK: Slide[] = [
  {
    kind: "title",
    emoji: "📝",
    title: "No deck for this session",
    subtitle: "Use the cockpit notes panel — the friction prevention items and facilitator notes are on the right",
  },
];

export function getDeckForSession(session: Session): Slide[] {
  if (session.slideDeck && session.slideDeck.length > 0) {
    return session.slideDeck;
  }
  return STUB_DECK;
}

/**
 * Sessions you can actually "present" — breaks and lunch are excluded because
 * they have no deck. This ordered list is the source of truth for session-to-
 * session navigation in both the presenter pane and the projector window.
 */
export const NAVIGABLE_SESSIONS: Session[] = SESSIONS.filter(
  (s) => s.type === "session"
);

export function getNextNavigableSession(currentId: number): Session | null {
  const idx = NAVIGABLE_SESSIONS.findIndex((s) => s.id === currentId);
  if (idx === -1 || idx >= NAVIGABLE_SESSIONS.length - 1) return null;
  return NAVIGABLE_SESSIONS[idx + 1];
}

export function getPrevNavigableSession(currentId: number): Session | null {
  const idx = NAVIGABLE_SESSIONS.findIndex((s) => s.id === currentId);
  if (idx <= 0) return null;
  return NAVIGABLE_SESSIONS[idx - 1];
}
