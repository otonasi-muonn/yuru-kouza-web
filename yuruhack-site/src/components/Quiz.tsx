import { useState } from "react";
import { Check, X, HelpCircle } from "lucide-react";

/**
 * 4択クイズ。正解/不正解で色が変わり、解説が開く。
 * 本編で『作業資料化』にならないように、節の終わりに軽く挟む想定。
 */
export type QuizChoice = {
  label: string;
  correct?: boolean;
  hint?: string; // 解答後に出る個別コメント
};

export function Quiz({
  question,
  choices,
  explain,
}: {
  question: string;
  choices: QuizChoice[];
  explain?: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const ans = picked !== null ? choices[picked] : null;
  const isCorrect = !!ans?.correct;

  return (
    <div className="not-prose my-5 rounded-md border border-border bg-card p-4">
      <div className="mb-3 flex items-start gap-2 text-sm font-semibold">
        <HelpCircle size={16} className="mt-0.5 shrink-0 text-primary" />
        <span>{question}</span>
      </div>
      <ul className="space-y-1.5">
        {choices.map((c, i) => {
          const isThis = picked === i;
          const show = picked !== null;
          const state =
            !show
              ? "base"
              : c.correct
              ? "right"
              : isThis
              ? "wrong"
              : "dim";
          const classBase =
            "w-full rounded-md border px-3 py-2 text-left text-sm transition";
          const classMap: Record<string, string> = {
            base: "border-border bg-background hover:bg-secondary",
            right: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
            wrong: "border-red-500 bg-red-50 dark:bg-red-950/40",
            dim: "border-border bg-muted/40 opacity-60",
          };
          return (
            <li key={i}>
              <button
                type="button"
                className={`${classBase} ${classMap[state]}`}
                onClick={() => setPicked(i)}
                disabled={picked !== null}
                aria-pressed={isThis}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  <span className="flex-1">{c.label}</span>
                  {show && c.correct && (
                    <Check size={14} className="mt-0.5 text-emerald-600" />
                  )}
                  {show && !c.correct && isThis && (
                    <X size={14} className="mt-0.5 text-red-600" />
                  )}
                </div>
                {show && isThis && c.hint && (
                  <div className="mt-1 pl-6 text-xs text-muted-foreground">
                    {c.hint}
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {picked !== null && (
        <div
          className={`mt-3 rounded-md border-l-4 px-3 py-2 text-sm ${
            isCorrect
              ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
              : "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
          }`}
        >
          <div className="mb-1 font-semibold">
            {isCorrect ? "🎉 正解！" : "😅 惜しい…"}
          </div>
          {explain && <p className="!mt-0">{explain}</p>}
          <button
            type="button"
            onClick={() => setPicked(null)}
            className="mt-2 text-xs underline hover:no-underline"
          >
            もう一度
          </button>
        </div>
      )}
    </div>
  );
}
