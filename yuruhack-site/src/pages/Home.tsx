import {
  ArrowRight,
  Rocket,
  Clock,
  Globe,
  MousePointerClick,
  Laptop,
  RefreshCcw,
  CheckCircle2,
} from "lucide-react";
import { Callout } from "@/components/Callout";

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="not-prose mb-10 rounded-lg border border-border bg-gradient-to-br from-primary/5 via-background to-accent/10 p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[0.72rem] font-medium text-primary">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          2026/04/26（日）開催 · Web班
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          ゆるハッカソン<br />
          <span className="text-primary">事前講座</span> Web班 教材サイト
        </h1>
        <p className="mt-4 max-w-[640px] text-base text-muted-foreground">
          今日の終わりには、自分の GitHub プロフィール画面に、
          自分で書いた自己紹介 README が表示された状態を目指します。
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="#/common/01-github-account"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium !text-primary-foreground no-underline shadow-sm transition hover:bg-primary/90"
          >
            <Rocket size={15} /> スタート → 共通モジュール <ArrowRight size={14} />
          </a>
          <a
            href="#/web/01-create-repository"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium !text-foreground no-underline transition hover:bg-secondary"
          >
            Web班から見る
          </a>
        </div>
      </section>

      <h2 id="goal">🎯 今日のゴール</h2>
      <Callout variant="tip" title="成功の定義">
        <p className="!mt-0">
          <strong>
            https://github.com/＜自分のユーザー名＞ を開くと、
            自己紹介 README が表示されている
          </strong>
        </p>
        <p>
          そこまで辿り着ければ、4/29 のハッカソン本番に必要な足場（リポジトリ・コミット・プッシュ）は全部できるようになっています。
        </p>
      </Callout>

      <h2 id="flow">🗓 4/26 と 4/29 の関係</h2>
      <p>
        この講座は「4/29 本番で躓かないための土台作り」です。
        本番で扱う HTML/CSS やデプロイの話は、今日は深掘りしません。
      </p>

      <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
        <StageCard
          date="4/26（日）"
          phase="土台作り"
          color="primary"
          points={[
            "GitHub アカウント",
            "VSCode + GitHub 連携",
            "リポジトリ作成・README 公開",
          ]}
        />
        <StageCard
          date="4/29（水・祝）"
          phase="制作（本番）"
          color="accent"
          points={[
            "チームでアイディアソン",
            "HTML / CSS で Web サイト制作",
            "GitHub Pages で公開",
          ]}
        />
      </div>

      <h2 id="dogfooding">🐕 このサイト自体が「完成見本」です</h2>
      <Callout variant="info" title="ドッグフーディング">
        <p className="!mt-0">
          <strong>このサイトも GitHub Pages で動いています。</strong>{" "}
          4/29 の Web 班で作るものは、ここと同じ仕組み（GitHub リポジトリ → Push → 自動公開）で動きます。
        </p>
        <p>
          つまり、今日練習する <code>リポジトリ</code> <code>コミット</code>{" "}
          <code>プッシュ</code> は、4/29 本番で「自分の作品を世界に公開する」ことに直結します。
        </p>
      </Callout>

      <h2 id="how-to-use">🧭 サイトの使い方</h2>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <FeatureCard
          icon={<MousePointerClick size={18} />}
          title="進捗チェック"
          desc="各ステップの末尾のチェックボタンを押すと、進んだ場所が保存されます。後で再開するときに便利です。"
        />
        <FeatureCard
          icon={<Laptop size={18} />}
          title="OS 切替"
          desc="Windows / Mac で操作が違う箇所にはタブがあります。一度選べば、他のページでも同じ OS が表示されます。"
        />
        <FeatureCard
          icon={<Globe size={18} />}
          title="スマホ対応"
          desc="スマホで手順を見ながら、PC で作業できます。画面サイズに合わせてレイアウトが切り替わります。"
        />
        <FeatureCard
          icon={<RefreshCcw size={18} />}
          title="進捗リセット"
          desc="画面右上のボタンから、全進捗をリセットできます。表示がおかしくなったときの復旧手段として使ってください。"
        />
      </div>

      <Callout variant="warn" title="メンターとの歩調合わせ">
        先に進みすぎず、各セクションの区切りで周りを見渡してください。
        困った人の画面をのぞいて助け合うのも、ハッカソンらしい時間です。
      </Callout>

      <h2 id="schedule">⏰ タイムスケジュール（目安）</h2>
      <div className="not-prose my-5 overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-[30%] border-b border-border px-3 py-2 text-left font-semibold">
                時間
              </th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">
                内容
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <ScheduleRow time="13:00" content="開場・受付" />
            <ScheduleRow time="13:15" content="オリエンテーション（このページ）" />
            <ScheduleRow time="13:30" content="共通モジュール：アカウント・VSCode・OAuth" />
            <ScheduleRow time="14:30" content="Web 班：リポジトリ作成 → README 公開" />
            <ScheduleRow time="16:00" content="ミニチャレンジ・成果共有" />
            <ScheduleRow time="16:45" content="クロージング・4/29 の案内" />
          </tbody>
        </table>
      </div>

      <div className="not-prose mt-10 flex flex-col items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-md bg-primary/15 p-2 text-primary">
            <Clock size={18} />
          </div>
          <div>
            <h3 className="font-semibold">準備はOKですか？</h3>
            <p className="text-sm text-muted-foreground">
              最初のステップ「GitHub アカウント作成」から始めましょう。
            </p>
          </div>
        </div>
        <a
          href="#/common/01-github-account"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium !text-primary-foreground no-underline shadow-sm transition hover:bg-primary/90"
        >
          スタート <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

function StageCard({
  date,
  phase,
  color,
  points,
}: {
  date: string;
  phase: string;
  color: "primary" | "accent";
  points: string[];
}) {
  const barClass =
    color === "primary"
      ? "bg-primary text-primary-foreground"
      : "bg-accent text-accent-foreground";
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className={`${barClass} px-4 py-2 text-xs font-bold tracking-wide`}>
        {date} · {phase}
      </div>
      <ul className="divide-y divide-border">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 px-4 py-2.5 text-sm">
            <CheckCircle2
              size={14}
              className="mt-0.5 shrink-0 text-muted-foreground"
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="mb-2 inline-flex rounded-md bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <div className="font-semibold text-[0.95rem]">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function ScheduleRow({ time, content }: { time: string; content: string }) {
  return (
    <tr>
      <td className="px-3 py-2.5 font-mono text-[0.85rem] text-muted-foreground">
        {time}
      </td>
      <td className="px-3 py-2.5">{content}</td>
    </tr>
  );
}
