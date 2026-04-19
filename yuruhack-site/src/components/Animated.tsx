import { useEffect, useRef, useState, createElement, type ReactNode } from "react";

/**
 * スクロールしてきたらフェードイン＋スライドアップする小道具。
 *
 * 狙い:
 *   長い教材ページをスクロールしていくと、新しい段落が『すっ』と現れる。
 *   動きがあると、読み疲れる体感が少し和らぐ。
 *   `prefers-reduced-motion` を尊重するので、動きが苦手な人には静止状態で見える。
 */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number; // ms
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  as?: "div" | "section" | "article" | "aside" | "p" | "span" | "ul" | "ol";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // prefers-reduced-motion を尊重する
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const translate = (() => {
    if (visible) return "translate(0, 0)";
    switch (direction) {
      case "up":
        return "translate(0, 12px)";
      case "down":
        return "translate(0, -12px)";
      case "left":
        return "translate(12px, 0)";
      case "right":
        return "translate(-12px, 0)";
      default:
        return "translate(0, 0)";
    }
  })();

  return createElement(
    As,
    {
      ref,
      className,
      style: {
        opacity: visible ? 1 : 0,
        transform: translate,
        transition: `opacity 420ms ease-out ${delay}ms, transform 420ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      },
    },
    children,
  );
}

/**
 * 子要素を一定間隔でずらしてフェードインさせる。
 * 例: <Stagger gap={80}>...children...</Stagger>
 */
export function Stagger({
  children,
  gap = 80,
  className,
}: {
  children: ReactNode[];
  gap?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((c, i) => (
        <FadeIn key={i} delay={i * gap}>
          {c}
        </FadeIn>
      ))}
    </div>
  );
}
