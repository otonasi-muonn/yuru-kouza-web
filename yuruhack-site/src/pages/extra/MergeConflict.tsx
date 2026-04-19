import { useState } from "react";
import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";
import { CopyBlock } from "@/components/CopyBlock";
import { GitMerge, CheckCircle2 } from "lucide-react";

/**
 * おまけ: マージコンフリクト入門
 *
 * 『真ん中で奪い合いになった行』の実例を React で可視化。
 * クリックで『自分の版を採用』『相手の版を採用』『両方残す』の3モードを切り替え。
 */

const CONFLICTED = `# 👋 こんにちは
<<<<<<< HEAD
## 自己紹介
- 好きなこと: ゲームを作ること
=======
## 自己紹介
- 好きなこと: 音楽を作ること
>>>>>>> origin/main
`;

const RESOLVED_MINE = `# 👋 こんにちは
## 自己紹介
- 好きなこと: ゲームを作ること
`;

const RESOLVED_THEIRS = `# 👋 こんにちは
## 自己紹介
- 好きなこと: 音楽を作ること
`;

const RESOLVED_BOTH = `# 👋 こんにちは
## 自己紹介
- 好きなこと: ゲームを作ること、音楽を作ること
`;

type Mode = "raw" | "mine" | "theirs" | "both";

export function MergeConflict() {
  const [mode, setMode] = useState<Mode>("raw");
  const text = {
    raw: CONFLICTED,
    mine: RESOLVED_MINE,
    theirs: RESOLVED_THEIRS,
    both: RESOLVED_BOTH,
  }[mode];
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>マージコンフリクト入門</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          <strong>マージコンフリクト</strong>は『同じ行を 2 人が違うように書いたので、Git が機械的に合体できない状態』。
          一見パニックになりますが、<strong>『どちらを残すか / 両方残すか』を人間が決めて書き直すだけ</strong>です。
          コミットは失敗していないので、ゆっくり直して大丈夫。
        </p>
      </Callout>

      <h2>コンフリクトが発生する仕組み</h2>
      <FadeIn>
        <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
          <Flow n={1} title="同じ地点から分かれる" body="2 人とも、同じコミットからブランチを切る。" />
          <Flow n={2} title="同じ行を編集" body="A さんは『ゲーム』、B さんは『音楽』と書く。" />
          <Flow n={3} title="合体しようとして衝突" body="Git は『機械的に決められない』と両方残す。" />
        </div>
      </FadeIn>

      <h2>実際の画面（インタラクティブ）</h2>

      <div className="not-prose my-4 flex flex-wrap gap-2">
        <ModeBtn cur={mode} my="raw" setMode={setMode}>衝突した状態</ModeBtn>
        <ModeBtn cur={mode} my="mine" setMode={setMode}>自分の版を採用</ModeBtn>
        <ModeBtn cur={mode} my="theirs" setMode={setMode}>相手の版を採用</ModeBtn>
        <ModeBtn cur={mode} my="both" setMode={setMode}>両方残す</ModeBtn>
      </div>

      <pre className="my-4 overflow-auto rounded-md border border-border bg-muted/40 p-4 text-sm">
{text}</pre>

      {mode === "raw" && (
        <Callout variant="warn" title="この記号は何？">
          <ul className="!mt-2">
            <li><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> — ここから下が<strong>『自分の版』</strong></li>
            <li><code>=======</code> — 自分と相手の境界線</li>
            <li><code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/main</code> — ここまでが<strong>『相手の版』</strong></li>
          </ul>
          <p className="text-xs">
            これらの行と不要な側を消して、好きな形に書き直せばOK。
          </p>
        </Callout>
      )}

      <h2>解決手順（VSCode 編）</h2>
      <ol>
        <li>
          VSCode で <code>README.md</code> を開くと、衝突箇所の上に小さく
          <strong>『Accept Current Change』『Accept Incoming Change』『Accept Both』『Compare Changes』</strong>
          のボタンが出る。
        </li>
        <li>
          使いたい方を押すか、手で編集して記号（<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> 等）を全部消す。
        </li>
        <li>保存。</li>
        <li>ソース管理タブに戻って、<strong>ステージング → コミット</strong>。</li>
        <li>
          コミットメッセージは自動で『Merge branch ...』が入るが、自分で書いても OK。
        </li>
        <li>プッシュ。</li>
      </ol>

      <h2>コマンド派の解決</h2>
      <CopyBlock
        code={`# 1. 衝突ファイルを開いて手編集する
code README.md

# 2. 完成したら追加
git add README.md

# 3. マージコミット
git commit      # エディタが開くのでそのまま保存

# 4. Push
git push`}
        filename="Terminal"
        lang="bash"
      />

      <Callout variant="tip" title="コンフリクトを避ける習慣">
        <ul className="!mt-2">
          <li>作業前に <code>git pull</code>（最新を取り込んでから始める）</li>
          <li>同じファイルを同時に触らない（役割分担）</li>
          <li>小さくコミット・早めに Push → 差分が小さくなる</li>
          <li>チームで『ブランチ運用』を決める → <a href="#/extra/git-deep">Git 詳細</a> で</li>
        </ul>
      </Callout>

      <div className="not-prose mt-8 flex items-center gap-3 rounded-md border border-primary/40 bg-primary/5 p-4">
        <GitMerge size={18} className="shrink-0 text-primary" />
        <div className="text-sm">
          <strong>結論:</strong>{" "}
          コンフリクトは『壊れた』ではなく『人間に判断を仰いでいる』サイン。
          落ち着いて、残したい内容を書き直すだけ。
        </div>
      </div>
    </div>
  );
}

function Flow({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="relative rounded-md border border-border bg-card p-4">
      <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {n}
      </div>
      <div className="font-semibold text-[0.95rem]">{title}</div>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
    </div>
  );
}

function ModeBtn({
  cur,
  my,
  setMode,
  children,
}: {
  cur: Mode;
  my: Mode;
  setMode: (m: Mode) => void;
  children: React.ReactNode;
}) {
  const active = cur === my;
  return (
    <button
      type="button"
      onClick={() => setMode(my)}
      className={
        "inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm transition-colors " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:bg-muted/50")
      }
    >
      {active && <CheckCircle2 size={12} />}
      {children}
    </button>
  );
}
