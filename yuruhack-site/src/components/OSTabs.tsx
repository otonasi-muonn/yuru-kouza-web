import { useEffect, useState } from "react";
import type { OS } from "@/lib/storage";
import { getOS, setOS } from "@/lib/storage";
import { detectOS } from "@/lib/os";

type Props = {
  windows: React.ReactNode;
  mac: React.ReactNode;
};

export function OSTabs({ windows, mac }: Props) {
  const [os, setLocalOS] = useState<OS>("windows");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = getOS();
    const initial: OS = saved ?? detectOS() ?? "windows";
    setLocalOS(initial);
    setHydrated(true);

    const onChange = (e: Event) => {
      const ce = e as CustomEvent<{ os: OS }>;
      if (ce.detail?.os) setLocalOS(ce.detail.os);
    };
    window.addEventListener("os-changed", onChange);
    return () => window.removeEventListener("os-changed", onChange);
  }, []);

  const choose = (next: OS) => {
    setLocalOS(next);
    setOS(next);
  };

  return (
    <div className="my-5 rounded-md border border-border bg-card overflow-hidden">
      <div
        role="tablist"
        aria-label="OS 切替"
        className="flex border-b border-border bg-muted/40"
      >
        <TabButton active={os === "windows"} onClick={() => choose("windows")}>
          <span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-[#0078d4]" />
          Windows
        </TabButton>
        <TabButton active={os === "mac"} onClick={() => choose("mac")}>
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-foreground/70" />
          Mac
        </TabButton>
        <div className="ml-auto px-3 py-2 text-xs text-muted-foreground">
          {hydrated ? "選択はページ間で共有されます" : ""}
        </div>
      </div>
      <div className="px-4 pt-2 pb-1">
        {os === "windows" ? windows : mac}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition",
        active
          ? "border-primary text-primary bg-background"
          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-background/50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
