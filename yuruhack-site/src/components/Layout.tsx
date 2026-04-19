import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { ProgressReset } from "./ProgressReset";
import { findPage } from "@/lib/routes";

type Props = {
  currentPath: string;
  children: React.ReactNode;
};

export function Layout({ currentPath, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const page = findPage(currentPath);

  useEffect(() => {
    // Close mobile nav on route change
    setMobileOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="ナビゲーションメニュー"
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:text-foreground hover:bg-secondary lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <a href="#/" className="flex items-center gap-2.5 no-underline">
            <LogoMark />
            <div className="flex flex-col leading-tight">
              <span className="text-[0.95rem] font-bold tracking-tight">
                ゆるハッカソン
              </span>
              <span className="text-[0.65rem] text-muted-foreground">
                事前講座 · Web班
              </span>
            </div>
          </a>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground md:inline">
              {page ? page.title : ""}
            </span>
            <ProgressReset compact />
            <ThemeToggle />
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:text-foreground hover:bg-secondary"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        {/* Sidebar - desktop */}
        <aside
          aria-label="サイドバー"
          className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[280px] shrink-0 overflow-y-auto border-r border-border lg:block"
        >
          <Sidebar currentPath={currentPath} />
        </aside>

        {/* Sidebar - mobile drawer */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 top-14 z-20 bg-foreground/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <aside
              aria-label="サイドバー"
              className="fixed inset-x-0 top-14 z-20 h-[calc(100vh-3.5rem)] w-full max-w-[320px] overflow-y-auto border-r border-border bg-background shadow-xl lg:hidden"
            >
              <Sidebar
                currentPath={currentPath}
                onNavigate={() => setMobileOpen(false)}
              />
            </aside>
          </>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[760px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10 prose">
            {children}
          </div>
          <footer className="border-t border-border bg-muted/20 py-6 text-center text-xs text-muted-foreground">
            <div className="mx-auto max-w-[760px] px-4">
              <p>
                このサイトは <strong>GitHub Pages</strong>{" "}
                で公開されています（ドッグフーディング）。4/29 の Web 班で作るものは、このサイトと同じ仕組みで動きます。
              </p>
              <p className="mt-2">
                © 2026 ゆるハッカソン運営 · 事前講座教材 v1
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

function LogoMark() {
  return (
    <div className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[hsl(25_85%_55%)] to-[hsl(44_95%_55%)] text-white shadow-sm">
      <span className="font-black tracking-tighter text-[0.95rem]">ゆ</span>
    </div>
  );
}
