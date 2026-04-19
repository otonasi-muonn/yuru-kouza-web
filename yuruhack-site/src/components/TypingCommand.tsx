import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Copy, Check } from "lucide-react";

/**
 * ターミナル風の『タイピング再生』ウィジェット。
 *
 * 各 step は: { cmd: 打つコマンド, out: 実行後に出る文字列 }
 * 「▶ 再生」を押すと、1文字ずつ打たれる → 出力がフェードイン、を順に繰り返す。
 * 「やり直す」で最初から。
 */
export type Step = {
  cmd: string;
  out?: string;
  note?: string;
};

export function TypingCommand({
  prompt = "$",
  steps,
  speed = 28,
  autoPlay = false,
}: {
  prompt?: string;
  steps: Step[];
  speed?: number; // ms per char
  autoPlay?: boolean;
}) {
  const [playing, setPlaying] = useState(autoPlay);
  const [stepIdx, setStepIdx] = useState(0);
  const [typed, setTyped] = useState(""); // 現在の step で現在までに打ち終わった文字列
  const [showOut, setShowOut] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [copied, setCopied] = useState(false);

  // 全履歴（表示済みの step たち）
  const history = steps.slice(0, stepIdx);

  useEffect(() => {
    if (!playing) return;
    const current = steps[stepIdx];
    if (!current) return;
    if (typed.length < current.cmd.length) {
      timerRef.current = window.setTimeout(() => {
        setTyped(current.cmd.slice(0, typed.length + 1));
      }, speed);
    } else if (!showOut) {
      timerRef.current = window.setTimeout(() => {
        setShowOut(true);
      }, 180);
    } else {
      // 次へ
      timerRef.current = window.setTimeout(() => {
        setStepIdx((i) => i + 1);
        setTyped("");
        setShowOut(false);
        if (stepIdx + 1 >= steps.length) setPlaying(false);
      }, current.out ? 420 : 260);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [playing, typed, showOut, stepIdx, steps, speed]);

  const reset = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setPlaying(false);
    setStepIdx(0);
    setTyped("");
    setShowOut(false);
  };

  const toggle = () => {
    if (stepIdx >= steps.length) {
      reset();
      // 次フレームで再生開始
      window.setTimeout(() => setPlaying(true), 0);
    } else {
      setPlaying((p) => !p);
    }
  };

  const copyAll = async () => {
    const all = steps.map((s) => s.cmd).join("\n");
    try {
      await navigator.clipboard.writeText(all);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  const done = stepIdx >= steps.length;

  return (
    <div className="not-prose my-5 overflow-hidden rounded-md border border-border bg-[hsl(222_18%_12%)] text-sm shadow-sm">
      {/* ヘッダ */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-white/5 px-3 py-1.5 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <span className="ml-2 text-white/60">terminal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={copyAll}
            className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-white/80 hover:bg-white/10"
            aria-label="コマンドをコピー"
          >
            {copied ? <Check size={10} /> : <Copy size={10} />}
            {copied ? "コピーしました" : "コピー"}
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-white/80 hover:bg-white/10"
            aria-label="やり直す"
          >
            <RotateCcw size={10} /> やり直す
          </button>
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1 rounded border border-white/10 bg-primary/90 px-2 py-0.5 font-medium !text-primary-foreground hover:bg-primary"
            aria-label={playing ? "一時停止" : "再生"}
          >
            <Play size={10} /> {playing ? "停止" : done ? "もう一度" : "再生"}
          </button>
        </div>
      </div>

      {/* 本体 */}
      <div
        className="max-h-80 overflow-y-auto p-3 font-mono text-[0.85rem] leading-relaxed text-white/90"
        aria-live="polite"
      >
        {history.map((s, i) => (
          <CmdLine key={`h-${i}`} prompt={prompt} cmd={s.cmd} out={s.out} note={s.note} />
        ))}
        {stepIdx < steps.length && (
          <CmdLine
            prompt={prompt}
            cmd={typed}
            caret={playing}
            out={showOut ? steps[stepIdx].out : undefined}
            note={showOut ? steps[stepIdx].note : undefined}
          />
        )}
      </div>
    </div>
  );
}

function CmdLine({
  prompt,
  cmd,
  out,
  note,
  caret,
}: {
  prompt: string;
  cmd: string;
  out?: string;
  note?: string;
  caret?: boolean;
}) {
  return (
    <div className="mb-1.5">
      <div className="flex items-start gap-2 whitespace-pre-wrap break-words">
        <span className="select-none text-emerald-400/90">{prompt}</span>
        <span className="min-w-0 flex-1 text-white/95">
          {cmd}
          {caret && (
            <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-white/80 align-middle" />
          )}
        </span>
      </div>
      {out && (
        <pre className="mt-0.5 whitespace-pre-wrap break-words pl-5 text-white/70">
          {out}
        </pre>
      )}
      {note && (
        <div className="mt-0.5 pl-5 text-[0.72rem] italic text-amber-300/80">
          ↳ {note}
        </div>
      )}
    </div>
  );
}
