"use client";

import { useState } from "react";
import Link from "next/link";
import type { Session } from "@/data/workshop";

export function SessionCard({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);
  const isBreak = session.type !== "session";
  const hasDeck = (session.slideDeck?.length ?? 0) > 0;

  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-white transition-all ${
        isBreak ? "py-3 px-4" : "p-5"
      }`}
    >
      <div className="w-full flex items-start gap-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 text-left min-w-0"
        >
          {session.subtitle && (
            <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-500">
              {session.subtitle}
            </span>
          )}
          <h3 className={`${isBreak ? "text-lg text-neutral-500" : "text-2xl text-neutral-900"} font-semibold mt-0.5`}>
            {session.title}
          </h3>
          <p className="text-base text-neutral-500 mt-1 tabular-nums">
            {session.startTime} – {session.endTime} · {session.duration}
          </p>
        </button>
        {!isBreak && (
          <div className="flex items-center gap-2 shrink-0 mt-1">
            <Link
              href={`/present/${session.id}`}
              className={`text-xs font-semibold px-3 py-1.5 rounded border ${
                hasDeck
                  ? "border-orange-500 text-orange-700 hover:bg-orange-50"
                  : "border-neutral-300 text-neutral-500 hover:bg-neutral-50"
              }`}
            >
              {hasDeck ? "Present ▸" : "Present (stub)"}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="text-neutral-400 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-neutral-100"
              aria-label={open ? "Collapse" : "Expand"}
            >
              {open ? "▲" : "▼"}
            </button>
          </div>
        )}
      </div>

      {open && !isBreak && (
        <div className="mt-5 space-y-5 pl-6 border-l border-neutral-200 ml-1">
          {session.schedule.length > 0 && (
            <section>
              <h4 className="text-xs font-bold tracking-wider text-neutral-500 mb-2">SCHEDULE</h4>
              <div className="space-y-2">
                {session.schedule.map((row, i) => (
                  <div key={i} className="border-l-2 border-neutral-200 pl-3">
                    <div className="flex gap-3 items-baseline flex-wrap">
                      <span className="text-neutral-500 tabular-nums text-sm font-mono shrink-0">{row.time}</span>
                      <span className="text-neutral-900 font-semibold text-base">{row.activity}</span>
                    </div>
                    <p className="text-neutral-600 text-sm mt-1 leading-relaxed">{row.details}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasDeck && (
            <section>
              <h4 className="text-xs font-bold tracking-wider text-blue-600 mb-2">SLIDES ({session.slideDeck!.length})</h4>
              <ul className="space-y-1.5 text-base text-neutral-700">
                {session.slideDeck!.map((s, i) => {
                  const label =
                    ("title" in s && s.title) ||
                    ("label" in s && s.label) ||
                    "(untitled)";
                  return <li key={i}>{i + 1}. {label}</li>;
                })}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
