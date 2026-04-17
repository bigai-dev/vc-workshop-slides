"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SyncMsg =
  | { type: "goto"; index: number }
  | { type: "hello" }
  | { type: "state"; index: number }
  | { type: "ping" };

export type CockpitMsg = {
  type: "session-change";
  sessionId: number;
  startAt?: "first" | "last";
};

type Role = "presenter" | "projector";

export function usePresenterSync(
  sessionId: string,
  role: Role,
  deckLength: number,
  initialIndex = 0
) {
  const [index, setIndexState] = useState(() =>
    Math.max(0, Math.min(deckLength - 1, initialIndex))
  );
  const [peerAlive, setPeerAlive] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const lastPingRef = useRef<number>(0);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const clamp = useCallback(
    (n: number) => Math.max(0, Math.min(deckLength - 1, n)),
    [deckLength]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const channel = new BroadcastChannel(`workshop-present-${sessionId}`);
    channelRef.current = channel;

    channel.onmessage = (e: MessageEvent<SyncMsg>) => {
      const msg = e.data;
      if (msg.type === "goto") {
        setIndexState(clamp(msg.index));
      } else if (msg.type === "hello" && role === "presenter") {
        channel.postMessage({ type: "state", index: indexRef.current } satisfies SyncMsg);
      } else if (msg.type === "state" && role === "projector") {
        setIndexState(clamp(msg.index));
      } else if (msg.type === "ping" && role === "presenter") {
        lastPingRef.current = Date.now();
        setPeerAlive(true);
      }
    };

    if (role === "projector") {
      channel.postMessage({ type: "hello" } satisfies SyncMsg);
    }

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [sessionId, role, clamp]);

  useEffect(() => {
    if (role !== "projector") return;
    const id = setInterval(() => {
      channelRef.current?.postMessage({ type: "ping" } satisfies SyncMsg);
    }, 2000);
    return () => clearInterval(id);
  }, [role]);

  useEffect(() => {
    if (role !== "presenter") return;
    const id = setInterval(() => {
      setPeerAlive(Date.now() - lastPingRef.current < 5000);
    }, 1000);
    return () => clearInterval(id);
  }, [role]);

  const setIndex = useCallback(
    (n: number) => {
      const clamped = clamp(n);
      setIndexState(clamped);
      channelRef.current?.postMessage({ type: "goto", index: clamped } satisfies SyncMsg);
    },
    [clamp]
  );

  const next = useCallback(() => {
    setIndex(indexRef.current + 1);
  }, [setIndex]);

  const prev = useCallback(() => {
    setIndex(indexRef.current - 1);
  }, [setIndex]);

  return { index, setIndex, next, prev, peerAlive };
}

/**
 * Global cockpit channel — session-level events shared between ALL presenter
 * and projector windows (regardless of which session they're currently showing).
 * Used so that when the presenter jumps to the next session, the projector
 * window follows automatically.
 */
export function useCockpitSync(
  onSessionChange: (sessionId: number, startAt?: "first" | "last") => void
) {
  const onChangeRef = useRef(onSessionChange);
  useEffect(() => {
    onChangeRef.current = onSessionChange;
  }, [onSessionChange]);

  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const channel = new BroadcastChannel("workshop-cockpit");
    channelRef.current = channel;
    channel.onmessage = (e: MessageEvent<CockpitMsg>) => {
      if (e.data.type === "session-change") {
        onChangeRef.current(e.data.sessionId, e.data.startAt);
      }
    };
    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  const changeSession = useCallback(
    (sessionId: number, startAt?: "first" | "last") => {
      channelRef.current?.postMessage({
        type: "session-change",
        sessionId,
        startAt,
      } satisfies CockpitMsg);
    },
    []
  );

  return { changeSession };
}
