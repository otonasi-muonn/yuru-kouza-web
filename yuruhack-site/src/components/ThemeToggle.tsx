import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getTheme, setTheme } from "@/lib/storage";

type Mode = "light" | "dark";

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const saved = getTheme() as Mode | null;
    let initial: Mode = "light";
    if (saved === "light" || saved === "dark") {
      initial = saved;
    } else if (typeof window !== "undefined" && window.matchMedia) {
      initial = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    applyMode(initial);
    setMode(initial);
  }, []);

  const toggle = () => {
    const next: Mode = mode === "light" ? "dark" : "light";
    applyMode(next);
    setMode(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === "dark" ? "ライトモードに切替" : "ダークモードに切替"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:text-foreground hover:bg-secondary"
    >
      {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function applyMode(m: Mode) {
  const root = document.documentElement;
  if (m === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}
