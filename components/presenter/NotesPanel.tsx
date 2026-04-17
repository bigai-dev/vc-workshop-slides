"use client";

export function NotesPanel({
  slideNotes,
}: {
  slideNotes?: string[];
}) {
  if (!slideNotes || slideNotes.length === 0) return null;

  return (
    <div className="h-full overflow-y-auto px-5 py-4 text-neutral-900">
      <section>
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-blue-700">
            THIS SLIDE
          </h3>
          <span className="text-[9px] uppercase tracking-wider text-neutral-400">
            Talking points
          </span>
        </div>
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
    </div>
  );
}
