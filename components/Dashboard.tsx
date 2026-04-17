"use client";

import { useEffect, useMemo, useState } from "react";
import { SESSIONS, PRE_WORKSHOP_CHECKLIST } from "@/data/workshop";
import { SessionCard } from "./SessionCard";

export function Dashboard() {
  const [day, setDay] = useState<1 | 2>(1);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      return new Set(JSON.parse(localStorage.getItem("checklist") ?? "[]"));
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem("checklist", JSON.stringify([...checked]));
  }, [checked]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "d" || e.key === "D") setDay((d) => (d === 1 ? 2 : 1));
      if (e.key === "c" || e.key === "C") setShowChecklist((v) => !v);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const daySessions = useMemo(() => SESSIONS.filter((s) => s.day === day), [day]);

  const toggle = (item: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="pt-8 max-w-4xl mx-auto px-6">
        <header className="mb-6 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Workshop Cockpit</h1>
            <p className="text-base text-neutral-500">Vibe Coding Workshop · 18-19 April 2026</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowChecklist(true)}
              className="text-xs px-3 py-1.5 rounded border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 bg-white"
            >
              Checklist (C)
            </button>
            <div className="flex rounded-lg border border-neutral-300 overflow-hidden bg-white">
              {[1, 2].map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d as 1 | 2)}
                  className={`px-4 py-1.5 text-sm font-medium ${
                    day === d ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Day {d}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="space-y-3">
          {daySessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>

        <footer className="mt-12 text-center text-[11px] text-neutral-500">
          Keys: <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">D</kbd> switch day ·{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">C</kbd> checklist
        </footer>
      </div>

      {showChecklist && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm flex items-start justify-end"
          onClick={() => setShowChecklist(false)}
        >
          <div
            className="w-full max-w-md h-full bg-white border-l border-neutral-200 p-6 overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900">Pre-Workshop Checklist</h2>
              <button onClick={() => setShowChecklist(false)} className="text-neutral-500 hover:text-neutral-900">✕</button>
            </div>
            <ul className="space-y-2">
              {PRE_WORKSHOP_CHECKLIST.map((item) => {
                const done = checked.has(item);
                return (
                  <li key={item}>
                    <button
                      onClick={() => toggle(item)}
                      className={`w-full text-left flex items-start gap-3 p-2 rounded hover:bg-neutral-100 ${
                        done ? "opacity-50 line-through" : ""
                      }`}
                    >
                      <span className={`mt-0.5 h-4 w-4 rounded border shrink-0 ${done ? "bg-emerald-500 border-emerald-500" : "border-neutral-400 bg-white"}`}>
                        {done && <span className="block text-white text-[10px] leading-4 text-center">✓</span>}
                      </span>
                      <span className="text-sm text-neutral-800">{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
