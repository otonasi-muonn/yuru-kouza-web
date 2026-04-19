import {
  ArrowRight,
  Rocket,
  Clock,
  Globe,
  MousePointerClick,
  Laptop,
  RefreshCcw,
  CheckCircle2,
  GitBranch,
  UserPlus,
  FilePlus2,
  Upload,
  BookOpen,
  Search,
  Bot,
  LifeBuoy,
} from "lucide-react";
import { Callout } from "@/components/Callout";
import { StoryFlow } from "@/components/StoryFlow";
import { FadeIn } from "@/components/Animated";

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="not-prose mb-10 rounded-lg border border-border bg-gradient-to-br from-primary/5 via-background to-accent/10 p-6 sm:p-8">
        <FadeIn>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[0.72rem] font-medium text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            2026/04/26（日）開催 · Web班
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            ゆるハッカソン<br />
            <span className="text-primary">事前講座</span> Web班 教材サイト
          </h1>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="mt-4 max-w-[640px] text-base text-muted-foreground">
            今日の終わりには、自分の GitHub プロフィール画面に、
            自分で書いた自己紹介 README が表示された状態を目指します。
          </p>
        </FadeIn>
        <FadeIn delay={180}>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="#/common/01-github-account"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium !text-primary-foreground no-underline shadow-sm transition hover:bg-primary/90 hover:-translate-y-0.5"
            >
              <Rocket size={15} /> スタート → 共通モジュール <ArrowRight size={14} />
            </a>
            <a
              href="#/web/01-create-repository"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium !text-foreground no-underline transition hover:bg-secondary"
            >
              Web班から見る
            </a>
            <a
              href="#/extra/glossary"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium !text-foreground no-underline transition hover:bg-secondary"
            >
              <BookOpen size={14} /> 用語集
            </a>
          </div>
        </FadeIn>
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

      <h2 id="overview">🎞 今日の流れ（4コマ）</h2>
      <p>全体を4コマで言うと、こうなります。順番に光っていくのでなんとなくで眺めてください。</p>

      <StoryFlow
        stages={[
          {
            label: "STEP 1",
            title: "アカウント作る",
            desc: "GitHub にサインアップ → VSCode を日本語化 → OAuth で連携",
            icon: <UserPlus size={18} />,
            color: "#0ea5e9",
          },
          {
            label: "STEP 2",
            title: "箱を用意する",
            desc: "自己紹介用リポジトリを作成 → 手元に Clone して開く",
            icon: <GitBranch size={18} />,
            color: "#16a34a",
          },
          {
            label: "STEP 3",
            title: "中身を書く",
            desc: "README.md を Markdown で編集。見出し・箇条書き・リンク",
            icon: <FilePlus2 size={18} />,
            color: "#d97706",
          },
          {
            label: "STEP 4",
            title: "世界に公開",
            desc: "Commit して Push → GitHub に反映 → プロフィール表示",
            icon: <Upload size={18} />,
            color: "#9333ea",
          },
        ]}
      />

      <h2 id="git-vs-github">🔀 まず混同しやすい2つを整理</h2>
      <p>
        <strong>Git</strong> は自分の PC で動く『履歴管理ソフト』、
        <strong>GitHub</strong> はその履歴をクラウドに置いてくれる『サービス』。
        似た名前で紛らわしいので、最初に違いを押さえると後が楽です。
        詳しい絵解きと用語辞書は「
        <a href="#/extra/glossary">Git と GitHub の違い／用語集</a>」ページへ。
      </p>

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

      <h2 id="troubleshoot">🆘 困ったら（今日の避難所）</h2>
      <p>
        手順通りやってるのに動かない、エラーが怖い、用語が意味不明…そんなときの駆け込み寺です。
      </p>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
        <HelpLink
          href="#/extra/error-reading"
          icon={<Search size={18} />}
          title="エラーメッセージの読み方"
          desc="赤い文字に怯まない。『最初と最後の1行』だけで原因の半分は当てられる"
          color="#dc2626"
        />
        <HelpLink
          href="#/extra/ai-tools"
          icon={<Bot size={18} />}
          title="ChatGPT / Claude 活用"
          desc="AI に質問するときの貼り方テンプレ。嘘を見抜くチェック方法"
          color="#7c3aed"
        />
        <HelpLink
          href="#/extra/glossary"
          icon={<BookOpen size={18} />}
          title="用語集（Git vs GitHub）"
          desc="コミット・リポジトリ・リモート・Push/Pull など、1行辞書"
          color="#0891b2"
        />
      </div>

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

      <Callout variant="tip" title="チェックポイント">
        <ul className="!mt-2">
          <li>14:30 までに OAuth 連携完了（共通3つが終わっている）</li>
          <li>15:30 までに Push してプロフィール表示確認</li>
          <li>以降は自由時間。装飾チャレンジ or おまけページへ</li>
        </ul>
      </Callout>

      <FadeIn>
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
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium !text-primary-foreground no-underline shadow-sm transition hover:bg-primary/90 hover:-translate-y-0.5"
          >
            スタート <ArrowRight size={14} />
          </a>
        </div>
      </FadeIn>
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
    <div className="overflow-hidden rounded-md border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-md">
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
    <div className="rounded-md border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <div className="mb-2 inline-flex rounded-md bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <div className="font-semibold text-[0.95rem]">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function HelpLink({
  href,
  icon,
  title,
  desc,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-md border border-border bg-card p-4 !text-foreground no-underline transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className="rounded-md p-1.5"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {icon}
        </div>
        <div className="font-semibold">{title}</div>
        <LifeBuoy
          size={12}
          className="ml-auto opacity-0 transition group-hover:opacity-60"
        />
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </a>
  );
}

function ScheduleRow({ time, content }: { time: string; content: string }) {
  return (
    <tr className="transition hover:bg-secondary/40">
      <td className="px-3 py-2.5 font-mono text-[0.85rem] text-muted-foreground">
        {time}
      </td>
      <td className="px-3 py-2.5">{content}</td>
    </tr>
  );
}
