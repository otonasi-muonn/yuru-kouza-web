import { Callout } from "@/components/Callout";

export function CssFrameworks() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>CSS フレームワーク紹介</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          CSS を一から書くのは楽しい反面、時間がかかります。
          「最初からそれっぽい見た目にしたい」人向けに、
          覚えておくと便利な CSS フレームワークを紹介します。
        </p>
      </Callout>

      <h2>選び方のざっくり指針</h2>
      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <FrameworkCard
          name="MVP.css"
          tone="classless"
          tagline="HTML を書くだけで整う"
          body="CSS のクラス指定を書かなくても、h1 や table が自動で整います。「デザインは考えたくない、中身に集中したい」派に。"
          url="https://andybrewer.github.io/mvp/"
        />
        <FrameworkCard
          name="Water.css"
          tone="classless"
          tagline="シンプル＆軽量"
          body="MVP.css と似たコンセプト。読み物系の小さなサイトによく合います。"
          url="https://watercss.kognise.dev/"
        />
        <FrameworkCard
          name="Bootstrap"
          tone="utility"
          tagline="定番"
          body="「この部品を貼れば動く」パーツ集。クラスを当てるスタイル。昔から定番で資料が豊富。"
          url="https://getbootstrap.com/"
        />
        <FrameworkCard
          name="Tailwind CSS"
          tone="utility"
          tagline="細かく当てる"
          body="小さなクラス（text-xl, p-4 等）を大量に組み合わせる。慣れると超速。最近の新しいプロジェクトの主流。"
          url="https://tailwindcss.com/"
        />
        <FrameworkCard
          name="Pico.css"
          tone="classless"
          tagline="最小限でおしゃれ"
          body="シンプルだけど美しく仕上がる。ブログやポートフォリオ向け。"
          url="https://picocss.com/"
        />
        <FrameworkCard
          name="DaisyUI"
          tone="component"
          tagline="Tailwind の上"
          body="Tailwind のうえに「ボタン」「カード」などのセットを乗せたもの。Tailwind に慣れたらこちらも。"
          url="https://daisyui.com/"
        />
      </div>

      <h2>使い方の例: MVP.css</h2>
      <p>
        HTML の <code>&lt;head&gt;</code> に 1 行書くだけで、
        見出しや表の見た目が整います:
      </p>
      <pre className="overflow-x-auto rounded-md border border-border bg-[hsl(var(--code-bg))] p-4 text-sm">
        <code>{`<link rel="stylesheet" href="https://unpkg.com/mvp.css">`}</code>
      </pre>

      <h2>どれを選ぶべき？</h2>
      <ul>
        <li>
          <strong>初めて</strong> → MVP.css / Pico.css（クラスを覚えずに済む）
        </li>
        <li>
          <strong>チーム開発・部品が欲しい</strong> → Bootstrap
        </li>
        <li>
          <strong>細かく作り込みたい</strong> → Tailwind CSS
        </li>
      </ul>

      <Callout variant="tip" title="4/29に向けて">
        時間の限られたハッカソンでは <strong>classless</strong>{" "}
        （MVP.css など）を選ぶとスピードが出ます。
        凝った見た目に拘りたいチームは Bootstrap / Tailwind も検討を。
      </Callout>
    </div>
  );
}

function FrameworkCard({
  name,
  tone,
  tagline,
  body,
  url,
}: {
  name: string;
  tone: "classless" | "utility" | "component";
  tagline: string;
  body: string;
  url: string;
}) {
  const toneLabel = {
    classless: "クラス不要",
    utility: "ユーティリティ",
    component: "コンポーネント",
  }[tone];
  const toneClass = {
    classless: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    utility: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    component: "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300",
  }[tone];
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <div className="font-semibold">{name}</div>
        <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-medium ${toneClass}`}>
          {toneLabel}
        </span>
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">{tagline}</div>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm text-primary underline underline-offset-2"
      >
        {url.replace(/^https?:\/\//, "")}
      </a>
    </div>
  );
}
