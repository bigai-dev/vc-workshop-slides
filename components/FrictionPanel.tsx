import type { FrictionItem } from "@/data/workshop";

const STYLES = {
  prepare: {
    border: "border-blue-300",
    bg: "bg-blue-50",
    badge: "bg-blue-600 text-white",
    text: "text-blue-950",
    label: "PREPARE",
  },
  say: {
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    badge: "bg-emerald-600 text-white",
    text: "text-emerald-950",
    label: "SAY",
  },
  do: {
    border: "border-orange-300",
    bg: "bg-orange-50",
    badge: "bg-orange-600 text-white",
    text: "text-orange-950",
    label: "DO",
  },
} as const;

export function FrictionPanel({ items, compact = false }: { items: FrictionItem[]; compact?: boolean }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const s = STYLES[item.type];
        return (
          <div key={i} className={`rounded-lg border ${s.border} ${s.bg} px-4 py-3`}>
            <div className="flex items-start gap-3">
              <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-bold tracking-wider ${s.badge}`}>
                {s.label}
              </span>
              <div className="flex-1">
                <p className={`${item.type === "say" ? "text-xl font-semibold" : "text-base"} ${s.text} leading-snug`}>
                  {item.text}
                </p>
                {item.timing && !compact && (
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-neutral-500">
                    ⏱ {item.timing}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
