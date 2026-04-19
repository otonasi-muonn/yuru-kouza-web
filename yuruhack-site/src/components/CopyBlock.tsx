import { useEffect, useRef, useState } from "react";
import { Check, Copy, FileText } from "lucide-react";

type Props = {
  code: string;
  lang?: string;
  filename?: string;
  /** optional decorations: wrap `<...>` style placeholders with styling */
  highlightPlaceholders?: boolean;
};

export function CopyBlock({
  code,
  lang = "markdown",
  filename,
  highlightPlaceholders = true,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const textRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    setFailed(false);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        return;
      }
    } catch {
      /* fall through */
    }
    // fallback: execCommand
    try {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
    } catch {
      setFailed(true);
      // select the pre for manual copy
      if (textRef.current) {
        const range = document.createRange();
        range.selectNodeContents(textRef.current);
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  };

  const rendered = highlightPlaceholders
    ? renderWithPlaceholders(code)
    : code;

  return (
    <div className="my-6 rounded-md border border-border overflow-hidden shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
          <FileText size={14} className="shrink-0" />
          <span className="truncate font-mono text-[0.82rem]">
            {filename ?? lang}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "コピーしました" : "コードをコピー"}
          className={[
            "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition border",
            copied
              ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              : "border-border bg-background hover:bg-secondary",
          ].join(" ")}
        >
          {copied ? (
            <>
              <Check size={13} /> コピー済み
            </>
          ) : (
            <>
              <Copy size={13} /> コピー
            </>
          )}
        </button>
      </div>
      <pre
        ref={textRef}
        className="overflow-x-auto bg-[hsl(var(--code-bg))] px-4 py-3.5 text-[0.86rem] leading-relaxed"
      >
        <code>{rendered}</code>
      </pre>
      {failed && (
        <div className="border-t border-border bg-amber-500/10 px-3 py-2 text-xs text-amber-900 dark:text-amber-300">
          自動コピーに失敗しました。枠内を選択して <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>C</kbd> でコピーしてください。
        </div>
      )}
    </div>
  );
}

function renderWithPlaceholders(code: string) {
  const re = /(<[^<>\n]{1,60}>)/g;
  const parts = code.split(re);
  return parts.map((part, i) => {
    if (re.test(part) && part.startsWith("<") && part.endsWith(">")) {
      // Only highlight ones that look like Japanese-content placeholders, not HTML tags
      const inner = part.slice(1, -1);
      const isLikelyTag = /^\/?[a-zA-Z][a-zA-Z0-9]*(\s|>|$)/.test(inner);
      if (!isLikelyTag) {
        return (
          <span key={i} className="placeholder-token">
            {part}
          </span>
        );
      }
    }
    // reset regex state
    re.lastIndex = 0;
    return <span key={i}>{part}</span>;
  });
}
