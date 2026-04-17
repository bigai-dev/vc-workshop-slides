import type { Slide } from "@/data/workshop";
import { splitPromptChunks } from "@/lib/slideDeck";

/**
 * @param visibleBullets  Controls progressive reveal on multi-step slides:
 *   - bullet slides: how many bullets to render
 *   - raw slides with data-f fragments: how many fragments to render
 *   - prompt slides with paragraph/line breaks: how many chunks to render
 *   The newest item gets a fade-in animation. Omit to show everything at once
 *   (used in thumb previews and presenter "peek-ahead").
 */
export function SlideView({
  slide,
  variant = "full",
  visibleBullets,
}: {
  slide: Slide;
  variant?: "full" | "thumb";
  visibleBullets?: number;
}) {
  const isThumb = variant === "thumb";

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center bg-neutral-950 text-white overflow-hidden ${
        isThumb ? "rounded-lg border border-neutral-800" : ""
      }`}
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Brand logo in the upper-left of every slide. Hidden on thumbs to
          keep the tiny previews readable. */}
      {!isThumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/logo.png"
          alt="AIM.BIG"
          className="absolute top-6 left-6 h-10 w-auto pointer-events-none select-none z-10"
        />
      )}
      <div className={`${isThumb ? "p-3" : "p-16"} w-full max-w-6xl relative z-0`}>
        {slide.kind === "title" && <TitleSlide slide={slide} isThumb={isThumb} />}
        {slide.kind === "bullets" && (
          <BulletsSlide
            slide={slide}
            isThumb={isThumb}
            visibleBullets={visibleBullets}
          />
        )}
        {slide.kind === "prompt" && (
          <PromptSlide
            slide={slide}
            isThumb={isThumb}
            visibleBullets={visibleBullets}
          />
        )}
        {slide.kind === "raw" && (
          <RawSlide
            slide={slide}
            isThumb={isThumb}
            visibleFragments={visibleBullets}
          />
        )}
      </div>
    </div>
  );
}

function TitleSlide({
  slide,
  isThumb,
}: {
  slide: Extract<Slide, { kind: "title" }>;
  isThumb: boolean;
}) {
  return (
    <div className="text-center">
      {slide.emoji && (
        <div className={`${isThumb ? "text-2xl mb-1" : "text-9xl mb-6"} leading-none`}>
          {slide.emoji}
        </div>
      )}
      <h1
        className={`${
          isThumb ? "text-sm" : "text-7xl"
        } font-bold tracking-tight leading-tight`}
      >
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p
          className={`${
            isThumb ? "text-[10px] mt-1" : "text-3xl mt-6"
          } text-neutral-200 leading-snug`}
        >
          {slide.subtitle}
        </p>
      )}
    </div>
  );
}

function BulletsSlide({
  slide,
  isThumb,
  visibleBullets,
}: {
  slide: Extract<Slide, { kind: "bullets" }>;
  isThumb: boolean;
  visibleBullets?: number;
}) {
  // When visibleBullets is set, only show that many; the newest one animates in.
  const bullets =
    visibleBullets !== undefined
      ? slide.bullets.slice(0, visibleBullets)
      : slide.bullets;

  return (
    <div>
      {/* Injected once — keeps the animation def out of inline styles */}
      <style>{`@keyframes sfIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <h2
        className={`${
          isThumb ? "text-sm mb-1.5" : "text-6xl mb-12"
        } font-bold tracking-tight leading-tight`}
      >
        {slide.title}
      </h2>
      <ul className={isThumb ? "space-y-0.5" : "space-y-6"}>
        {bullets.map((b, i) => {
          const isNewest =
            !isThumb &&
            visibleBullets !== undefined &&
            i === visibleBullets - 1;
          return (
            <li
              key={i}
              className={`${
                isThumb ? "text-[10px] gap-1.5" : "text-3xl gap-4"
              } text-white leading-snug flex`}
              style={isNewest ? { animation: "sfIn 0.35s ease-out" } : undefined}
            >
              <span className="text-neutral-400 shrink-0">›</span>
              <span className={isThumb ? "truncate" : ""}>{b}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PromptSlide({
  slide,
  isThumb,
  visibleBullets,
}: {
  slide: Extract<Slide, { kind: "prompt" }>;
  isThumb: boolean;
  visibleBullets?: number;
}) {
  const chunks = splitPromptChunks(slide.code);
  const hasMultipleChunks = chunks.length > 1;

  // Thumbs and single-chunk prompts always show everything.
  // For multi-chunk prompts in presenter mode, visibleBullets controls how many chunks render.
  const revealing = !isThumb && hasMultipleChunks && visibleBullets !== undefined;
  const visible = revealing ? chunks.slice(0, visibleBullets) : chunks;

  // Scale font size based on the FULL prompt length so the box doesn't
  // jump size as chunks reveal.
  const len = slide.code.length;
  const fullSize =
    len < 100 ? "text-4xl" : len < 200 ? "text-3xl" : len < 350 ? "text-2xl" : "text-xl";
  const fullPad = len < 200 ? "p-10" : "p-8";

  return (
    <div className="text-center flex flex-col h-full justify-center">
      <style>{`@keyframes sfIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
      {slide.label && (
        <p
          className={`${
            isThumb ? "text-[9px] mb-1.5" : "text-lg mb-6"
          } uppercase tracking-[0.2em] text-orange-400`}
        >
          {slide.label}
        </p>
      )}
      {visible.length > 0 && (
        <div
          className={`${
            isThumb ? "text-[10px] p-2" : `${fullSize} ${fullPad}`
          } font-mono bg-neutral-900 border border-neutral-800 ${
            isThumb ? "rounded" : "rounded-2xl"
          } text-left leading-relaxed overflow-hidden`}
        >
          {visible.map((chunk, i) => {
            const isNewest = revealing && i === visible.length - 1;
            return (
              <div
                key={i}
                className={`whitespace-pre-wrap break-words ${
                  i > 0 ? (isThumb ? "mt-1.5" : "mt-5") : ""
                }`}
                style={isNewest ? { animation: "sfIn 0.4s ease-out" } : undefined}
              >
                {chunk}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RawSlide({
  slide,
  isThumb,
  visibleFragments,
}: {
  slide: Extract<Slide, { kind: "raw" }>;
  isThumb: boolean;
  visibleFragments?: number;
}) {
  // When a raw slide has data-f="N" attributes on its children,
  // hide fragments beyond the visible count and animate the newest one.
  let fragStyle = "";
  if (!isThumb && visibleFragments !== undefined && slide.fragments) {
    const hidden: string[] = [];
    for (let f = visibleFragments + 1; f <= slide.fragments; f++) {
      hidden.push(`.raw-frag [data-f="${f}"]`);
    }
    if (hidden.length > 0) {
      fragStyle += hidden.join(",") + `{opacity:0;transform:translateY(16px)}`;
    }
    fragStyle += `.raw-frag [data-f="${visibleFragments}"]{animation:sfIn 0.4s ease-out}`;
  }

  return (
    <div>
      {fragStyle && <style>{fragStyle}</style>}
      {slide.title && (
        <h2
          className={`${
            isThumb ? "text-sm mb-1.5" : "text-6xl mb-10"
          } font-bold tracking-tight`}
        >
          {slide.title}
        </h2>
      )}
      <div
        className={`${isThumb ? "text-[10px]" : "text-2xl"} leading-snug ${slide.fragments ? "raw-frag" : ""}`}
        dangerouslySetInnerHTML={{ __html: slide.html }}
      />
    </div>
  );
}
