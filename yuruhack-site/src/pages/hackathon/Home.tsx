import {
  ArrowRight,
  Rocket,
  Snowflake,
  Lightbulb,
  Code2,
  Globe,
  Sparkles,
  Mic,
  Clock,
  Coffee,
  Users,
  CheckCircle2,
  PartyPopper,
} from "lucide-react";
import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";

type ScheduleItem = {
  time: string;
  title: string;
  detail?: string;
  link?: { href: string; label: string };
  icon: React.ReactNode;
  accent?: boolean;
};

const SCHEDULE: ScheduleItem[] = [
  {
    time: "09:45",
    title: "集合",
    detail: "PCの起動・GitHubログイン確認",
    icon: <Users size={15} />,
  },
  {
    time: "10:00",
    title: "開会式",
    detail: "今日のゴールとルールの共有",
    icon: <Rocket size={15} />,
  },
  {
    time: "10:20",
    title: "アイスブレイク",
    detail: "メンバー同士、最初のひとことを交わす時間",
    link: { href: "#/hackathon/icebreak", label: "アイスブレイク素材" },
    icon: <Snowflake size={15} />,
  },
  {
    time: "11:00",
    title: "アイディアソン（チーム）",
    detail: "チームで作るWebサイトのテーマ・役割分担を決める",
    link: { href: "#/hackathon/ideathon", label: "ワークシート" },
    icon: <Lightbulb size={15} />,
  },
  {
    time: "12:00",
    title: "お昼ご飯",
    detail: "1時間の休憩。午後に備えて充電",
    icon: <Coffee size={15} />,
  },
  {
    time: "13:00",
    title: "チーム開発タイム",
    detail: "HTML/CSSで分担しながらサイト制作 → GitHub Pages公開 → 改良",
    link: { href: "#/hackathon/build", label: "チーム開発ガイド" },
    icon: <Code2 size={15} />,
    accent: true,
  },
  {
    time: "18:00",
    title: "発表／総評",
    detail: "完成サイトのお披露目とお互いの感想",
    link: { href: "#/hackathon/present", label: "発表ガイド" },
    icon: <Mic size={15} />,
  },
  {
    time: "18:30",
    title: "閉会式",
    detail: "今日の振り返り",
    icon: <CheckCircle2 size={15} />,
  },
  {
    time: "18:45",
    title: "懇親会",
    detail: "おつかれさま！リラックスタイム",
    icon: <PartyPopper size={15} />,
  },
  {
    time: "19:30",
    title: "解散",
    icon: <Clock size={15} />,
  },
];

export function HackathonHome() {
  return (
    <div>
      {/* Hero */}
      <section className="not-prose mb-10 rounded-lg border border-border bg-gradient-to-br from-accent/10 via-background to-primary/10 p-6 sm:p-8">
        <FadeIn>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[0.72rem] font-medium text-accent-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            2026/04/29（水・祝）開催 · Web班 本番
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            ゆるハッカソン<br />
            <span className="text-primary">本番ガイド</span>
          </h1>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="mt-4 max-w-[640px] text-base text-muted-foreground">
            今日の終わりには、<strong>チームで作ったWebサイトが世界中からアクセスできる
            URL</strong> として公開されている状態を目指します。
            このページは「困ったら開く」資料置き場として使ってください。
          </p>
        </FadeIn>
        <FadeIn delay={180}>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="#/hackathon/build"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium !text-primary-foreground no-underline shadow-sm transition hover:bg-primary/90 hover:-translate-y-0.5"
            >
              <Code2 size={15} /> チーム開発ガイドを見る <ArrowRight size={14} />
            </a>
            <a
              href="#/hackathon/ideathon"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium !text-foreground no-underline transition hover:bg-secondary"
            >
              <Lightbulb size={14} /> アイディアソン
            </a>
            <a
              href="#/hackathon/deploy"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium !text-foreground no-underline transition hover:bg-secondary"
            >
              <Globe size={14} /> 公開ガイド
            </a>
          </div>
        </FadeIn>
      </section>

      <h2 id="goal">🎯 今日のゴール</h2>
      <Callout variant="tip" title="成功の定義">
        <p className="!mt-0">
          <strong>
            https://&lt;チーム代表のユーザー名&gt;.github.io/&lt;リポジトリ名&gt;/ を開くと、
            チームで作ったWebサイトが表示される
          </strong>
        </p>
        <p>
          そこまで辿り着いたら勝ち。残った時間はチームで「もっと良くする」磨きの時間。
          AIに聞くのも完全OK。むしろ積極的に使ってください。
        </p>
      </Callout>

      <h2 id="theme">🎨 今日のお題</h2>
      <p>
        Web班の本番は <strong>チーム開発</strong>です。
        テーマは午前のアイディアソンでチーム内で相談して決めます
        （自己紹介サイト・ファンサイト・架空の店のサイト・診断ツール…なんでもOK）。
      </p>
      <p>
        1つのリポジトリをチームで共有し、HTML / CSS で分担しながら1つのサイトを作って GitHub Pages で公開します。
      </p>

      <Callout variant="info" title="このサイトの使い方">
        <p className="!mt-0">
          ここは <strong>困ったときに開く資料置き場</strong>です。
          「最初から最後まで読み通す」必要はありません。
          チームで詰まったタイミングで、関係ありそうなページだけパッと開いてください。
        </p>
      </Callout>

      <h2 id="schedule">⏰ 今日のタイムテーブル</h2>
      <p>各時間帯のリンクから、その時間で必要な資料に飛べます。</p>

      <div className="not-prose my-6 overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-[15%] border-b border-border px-3 py-2 text-left font-semibold">
                時間
              </th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">
                内容
              </th>
              <th className="hidden w-[28%] border-b border-border px-3 py-2 text-left font-semibold sm:table-cell">
                資料
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SCHEDULE.map((row) => (
              <tr
                key={row.time}
                className={
                  row.accent
                    ? "bg-primary/5 transition hover:bg-primary/10"
                    : "transition hover:bg-secondary/40"
                }
              >
                <td className="px-3 py-2.5 align-top font-mono text-[0.85rem] text-muted-foreground">
                  {row.time}
                </td>
                <td className="px-3 py-2.5 align-top">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="text-muted-foreground">{row.icon}</span>
                    {row.title}
                  </div>
                  {row.detail && (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {row.detail}
                    </div>
                  )}
                </td>
                <td className="hidden px-3 py-2.5 align-top sm:table-cell">
                  {row.link ? (
                    <a
                      href={row.link.href}
                      className="inline-flex items-center gap-1 text-xs text-primary underline-offset-2 hover:underline"
                    >
                      {row.link.label} <ArrowRight size={11} />
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground/60">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="hub">🧭 ページ早見表</h2>
      <p>困ったときは、ここから飛んでください。</p>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <HubCard
          href="#/hackathon/icebreak"
          icon={<Snowflake size={18} />}
          title="アイスブレイク"
          desc="3つのアクティビティから当日選びます"
          color="#0ea5e9"
        />
        <HubCard
          href="#/hackathon/ideathon"
          icon={<Lightbulb size={18} />}
          title="アイディアソン（チーム）"
          desc="チームでテーマと役割を決めるワークシート"
          color="#f59e0b"
        />
        <HubCard
          href="#/hackathon/build"
          icon={<Code2 size={18} />}
          title="チーム開発スタート"
          desc="共同編集・コンフリクト回避・スターター"
          color="#16a34a"
        />
        <HubCard
          href="#/hackathon/deploy"
          icon={<Globe size={18} />}
          title="Pages公開＆自動デプロイ"
          desc="deploy.yml をコピペして自動公開"
          color="#9333ea"
        />
        <HubCard
          href="#/hackathon/improve"
          icon={<Sparkles size={18} />}
          title="改良アイディア集"
          desc="レベル別の磨き上げネタ。AIプロンプトテンプレ付き"
          color="#ec4899"
        />
        <HubCard
          href="#/hackathon/present"
          icon={<Mic size={18} />}
          title="発表＆クロージング"
          desc="見せる3つ・URL共有テンプレ"
          color="#dc2626"
        />
      </div>

      <h2 id="rules">📜 今日のゆるルール</h2>
      <ul>
        <li>
          <strong>AI利用は完全OK</strong>。ChatGPT / Claude にコードを書いてもらうのも、
          エラーを聞くのも自由です。出てきたコードは「動いた / 動かなかった」だけでもOKなので、まず貼って試してみる。
        </li>
        <li>
          <strong>完璧を目指さない</strong>。チームで動くサイトが公開できればまず勝ち。装飾は後からいくらでも足せます。
        </li>
        <li>
          <strong>チーム内でこまめに声をかける</strong>。
          「今ここを触ってる」「もうpushした」を一言伝えるだけでコンフリクトが激減します。
        </li>
        <li>
          <strong>困ったら隣を・メンターを頼る</strong>。資料はあくまで補助。人に聞いた方が早いこともたくさんあります。
        </li>
      </ul>

      <Callout variant="info" title="4/26の事前講座を覚えてますか？">
        <p className="!mt-0">
          リポジトリ作成・コミット・プッシュは
          <a href="#/web/01-create-repository" className="text-primary">
            事前講座のWeb班ページ
          </a>
          で全部練習済みです。当日詰まったら、その手順をもう一度なぞればOK。
        </p>
      </Callout>

      <FadeIn>
        <div className="not-prose mt-10 flex flex-col items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-md bg-primary/15 p-2 text-primary">
              <Rocket size={18} />
            </div>
            <div>
              <h3 className="font-semibold">準備はOK？</h3>
              <p className="text-sm text-muted-foreground">
                まずはアイスブレイクで肩の力を抜きましょう。
              </p>
            </div>
          </div>
          <a
            href="#/hackathon/icebreak"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium !text-primary-foreground no-underline shadow-sm transition hover:bg-primary/90 hover:-translate-y-0.5"
          >
            アイスブレイクへ <ArrowRight size={14} />
          </a>
        </div>
      </FadeIn>
    </div>
  );
}

function HubCard({
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
        <ArrowRight
          size={14}
          className="ml-auto opacity-0 transition group-hover:opacity-60"
        />
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </a>
  );
}
