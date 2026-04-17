"use client";

import { useState } from "react";
import type { FrictionItem, Session } from "@/data/workshop";

export function NotesPanel({
  session,
  slideNotes,
}: {
  session: Session;
  slideNotes?: string[];
}) {
  const [showPrep, setShowPrep] = useState(false);
  const sayItems = session.frictionPrevention.filter((f) => f.type === "say");
  const doItems = session.frictionPrevention.filter((f) => f.type === "do");
  const prepItems = session.frictionPrevention.filter((f) => f.type === "prepare");

  return (
    <div className="h-full overflow-y-auto px-5 py-4 text-neutral-900">
      {/* SLIDE NOTES — the primary content, changes with each slide */}
      {slideNotes && slideNotes.length > 0 && (
        <section className="mb-5">
          <SectionHeader color="blue" label="THIS SLIDE" note="Talking points" />
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 px-4 py-3">
            <ul className="space-y-2">
              {slideNotes.map((note, i) => (
                <li
                  key={i}
                  className="text-[15px] text-blue-950 leading-snug flex gap-2.5"
                >
                  <span className="text-blue-500 shrink-0 mt-0.5">▸</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* SAY — verbatim scripts, largest and most prominent */}
      {sayItems.length > 0 && (
        <section className="mb-5">
          <SectionHeader color="emerald" label="SAY" note="Read these out loud" />
          <div className="space-y-2.5">
            {sayItems.map((item, i) => (
              <SayCard key={i} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* DO — timed actions */}
      {doItems.length > 0 && (
        <section className="mb-5">
          <SectionHeader color="orange" label="DO" note="Timed actions" />
          <div className="space-y-2">
            {doItems.map((item, i) => (
              <DoCard key={i} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Facilitator notes */}
      {session.facilitatorNotes.length > 0 && (
        <section className="mb-5">
          <SectionHeader color="amber" label="KEEP IN MIND" />
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <ul className="space-y-2">
              {session.facilitatorNotes.map((n, i) => (
                <li
                  key={i}
                  className="text-[13px] text-amber-950 leading-snug flex gap-2"
                >
                  <span className="text-amber-600 shrink-0 mt-0.5">•</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* PREP — collapsed by default */}
      {prepItems.length > 0 && (
        <section>
          <button
            onClick={() => setShowPrep((v) => !v)}
            className="w-full flex items-center justify-between gap-2 py-1.5 text-[10px] font-bold tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            <span>
              {showPrep ? "▼" : "▶"} PRE-WORKSHOP PREP ({prepItems.length})
            </span>
            <span className="text-[9px] text-neutral-400 tracking-normal">
              {showPrep ? "collapse" : "expand"}
            </span>
          </button>
          {showPrep && (
            <div className="space-y-1.5 mt-2">
              {prepItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded border border-blue-200 bg-blue-50/60 px-3 py-2 text-[12px] text-blue-950 leading-snug"
                >
                  {item.text}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function SectionHeader({
  color,
  label,
  note,
}: {
  color: "blue" | "emerald" | "orange" | "amber";
  label: string;
  note?: string;
}) {
  const colorClass = {
    blue: "text-blue-700",
    emerald: "text-emerald-700",
    orange: "text-orange-600",
    amber: "text-amber-700",
  }[color];
  return (
    <div className="flex items-baseline justify-between mb-2">
      <h3 className={`text-[10px] font-bold tracking-[0.2em] ${colorClass}`}>
        {label}
      </h3>
      {note && (
        <span className="text-[9px] uppercase tracking-wider text-neutral-400">
          {note}
        </span>
      )}
    </div>
  );
}

function SayCard({ item }: { item: FrictionItem }) {
  return (
    <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50 px-4 py-3">
      <p className="text-[17px] font-semibold text-emerald-950 leading-snug">
        “{item.text.replace(/^['"]|['"]$/g, "")}”
      </p>
      {item.timing && (
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white tracking-wide">
          ⏱ {item.timing}
        </div>
      )}
    </div>
  );
}

function DoCard({ item }: { item: FrictionItem }) {
  return (
    <div className="rounded-lg border border-orange-300 bg-orange-50 px-3 py-2.5">
      <div className="flex items-start gap-2">
        {item.timing && (
          <span className="shrink-0 inline-flex items-center rounded bg-orange-600 px-1.5 py-0.5 text-[10px] font-bold text-white tracking-wide mt-0.5">
            {item.timing}
          </span>
        )}
        <p className="text-[13px] text-orange-950 leading-snug flex-1">{item.text}</p>
      </div>
    </div>
  );
}
