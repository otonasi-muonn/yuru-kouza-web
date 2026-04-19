import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/**
 * 4コマ漫画的フロー。ステップが順番に光っていくアニメーション。
 * Home 冒頭の「今日の流れ」向け。
 */
export type Stage = {
  label: string;
  title: string;
  desc: string;
  icon?: ReactNode;
  color: string; // hsl() や hex
};

export function StoryFlow({ stages, interval = 1600 }: { stages: Stage[]; interval?: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(stages.length - 1);
      return;
    }
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % stages.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [stages.length, interval]);

  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((s, i) => {
        const isActive = i === active;
        const done = i < active;
        return (
          <div
            key={s.label}
            className="relative rounded-lg border bg-card p-4 transition-all"
            style={{
              borderColor: isActive ? s.color : "hsl(var(--border))",
              boxShadow: isActive ? `0 0 0 2px ${s.color}30, 0 6px 20px -10px ${s.color}80` : undefined,
              transform: isActive ? "translateY(-2px)" : "translateY(0)",
              opacity: done ? 0.85 : 1,
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[0.72rem] font-bold"
                style={{
                  backgroundColor: s.color,
                  color: "white",
                }}
              >
                {i + 1}
              </span>
              <span
                className="text-[0.72rem] font-semibold uppercase tracking-wide"
                style={{ color: s.color }}
              >
                {s.label}
              </span>
            </div>
            <div className="flex items-start gap-2">
              {s.icon && (
                <div
                  className="mt-0.5 rounded-md p-1.5"
                  style={{ backgroundColor: `${s.color}1a`, color: s.color }}
                >
                  {s.icon}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="font-semibold leading-tight">{s.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </div>
            {/* 次ステップへの矢印（最後以外） */}
            {i < stages.length - 1 && (
              <ArrowRight
                size={16}
                aria-hidden
                className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 text-muted-foreground sm:block"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
