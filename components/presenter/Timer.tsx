"use client";

import { useEffect, useState } from "react";

function format(ms: number): string {
  if (ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function Timer({ startedAt }: { startedAt: number | null }) {
  // Start with false to match the server render (which has no sessionStorage).
  // Flip to true after mount to avoid hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [, tick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => tick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const showTimer = mounted && startedAt;
  const elapsed = showTimer ? Date.now() - startedAt : 0;

  return (
    <span className="font-mono tabular-nums text-sm text-neutral-600">
      ⏱ {showTimer ? format(elapsed) : "--:--"}
    </span>
  );
}
