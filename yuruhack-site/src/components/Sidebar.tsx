import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Sparkles, Puzzle, Code2, Home } from "lucide-react";
import { COMMON_PAGES, WEB_PAGES, EXTRA_PAGES, HOME } from "@/lib/routes";
import type { PageDef } from "@/lib/routes";
import { getAllProgress } from "@/lib/storage";

type Props = {
  currentPath: string;
  onNavigate?: () => void;
};

export function Sidebar({ currentPath, onNavigate }: Props) {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [openCommon, setOpenCommon] = useState(true);
  const [openWeb, setOpenWeb] = useState(true);
  const [openExtra, setOpenExtra] = useState(false);

  useEffect(() => {
    setProgress(getAllProgress());
    const refresh = () => setProgress(getAllProgress());
    window.addEventListener("progress-updated", refresh);
    window.addEventListener("progress-cleared", refresh);
    return () => {
      window.removeEventListener("progress-updated", refresh);
      window.removeEventListener("progress-cleared", refresh);
    };
  }, []);

  // Auto-open parent section of current page
  useEffect(() => {
    if (currentPath.startsWith("/common")) setOpenCommon(true);
    if (currentPath.startsWith("/web")) setOpenWeb(true);
    if (currentPath.startsWith("/extra")) setOpenExtra(true);
  }, [currentPath]);

  const countProgress = (pages: PageDef[]) => {
    const withId = pages.filter((p) => p.progressId);
    const done = withId.filter((p) => progress[p.progressId!]).length;
    return { done, total: withId.length };
  };

  return (
    <nav aria-label="教材ナビゲーション" className="flex flex-col gap-0.5 p-3 pb-16">
      <a
        href={`#${HOME.path}`}
        onClick={onNavigate}
        className={[
          "group mb-3 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition",
          currentPath === "/"
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground hover:bg-secondary",
        ].join(" ")}
      >
        <Home size={15} />
        トップ
      </a>

      <div className="mb-2 px-3 text-[0.72rem] uppercase tracking-wider text-muted-foreground">
        事前講座（4/26）
      </div>

      <Section
        label="共通モジュール"
        icon={<Puzzle size={14} />}
        open={openCommon}
        onToggle={() => setOpenCommon((v) => !v)}
        progress={countProgress(COMMON_PAGES)}
      >
        {COMMON_PAGES.map((p, i) => (
          <NavItem
            key={p.path}
            page={p}
            index={i + 1}
            active={currentPath === p.path}
            done={!!(p.progressId && progress[p.progressId])}
            onNavigate={onNavigate}
          />
        ))}
      </Section>

      <Section
        label="Web班"
        icon={<Code2 size={14} />}
        open={openWeb}
        onToggle={() => setOpenWeb((v) => !v)}
        progress={countProgress(WEB_PAGES)}
      >
        {WEB_PAGES.map((p, i) => (
          <NavItem
            key={p.path}
            page={p}
            index={i + 1}
            active={currentPath === p.path}
            done={!!(p.progressId && progress[p.progressId])}
            onNavigate={onNavigate}
          />
        ))}
      </Section>

      <Section
        label="おまけ（発展）"
        icon={<Sparkles size={14} />}
        open={openExtra}
        onToggle={() => setOpenExtra((v) => !v)}
        progress={{ done: 0, total: 0 }}
      >
        {EXTRA_PAGES.map((p, i) => (
          <NavItem
            key={p.path}
            page={p}
            index={i + 1}
            active={currentPath === p.path}
            done={false}
            onNavigate={onNavigate}
          />
        ))}
      </Section>

      <div className="mt-6 px-3 text-[0.72rem] uppercase tracking-wider text-muted-foreground/70">
        ハッカソン本番（4/29）
      </div>
      <div className="mx-3 mt-2 rounded-md border border-dashed border-border bg-muted/30 px-3 py-3 text-xs text-muted-foreground">
        本番コンテンツは後日 <code className="text-[0.9em]">/hackathon/</code>{" "}
        配下に追加予定です。
      </div>
    </nav>
  );
}

function Section({
  label,
  icon,
  open,
  onToggle,
  progress,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  progress: { done: number; total: number };
  children: React.ReactNode;
}) {
  const complete = progress.total > 0 && progress.done === progress.total;
  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
      >
        <span className="text-muted-foreground">{icon}</span>
        <span className="flex-1 text-left">{label}</span>
        {progress.total > 0 && (
          <span
            className={[
              "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.7rem] tabular-nums",
              complete
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                : "bg-muted text-muted-foreground",
            ].join(" ")}
          >
            {complete && <CheckCircle2 size={10} />}
            {progress.done}/{progress.total}
          </span>
        )}
        {open ? (
          <ChevronDown size={14} className="text-muted-foreground" />
        ) : (
          <ChevronRight size={14} className="text-muted-foreground" />
        )}
      </button>
      {open && <div className="mt-0.5 ml-2 border-l border-border pl-2">{children}</div>}
    </div>
  );
}

function NavItem({
  page,
  index,
  active,
  done,
  onNavigate,
}: {
  page: PageDef;
  index: number;
  active: boolean;
  done: boolean;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={`#${page.path}`}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={[
        "group flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[0.88rem] transition",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground/80 hover:bg-secondary hover:text-foreground",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.68rem] tabular-nums",
          done
            ? "bg-emerald-600 text-white"
            : active
            ? "bg-primary/20 text-primary"
            : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        {done ? <CheckCircle2 size={11} /> : index}
      </span>
      <span className="flex-1 truncate">{page.title}</span>
    </a>
  );
}
