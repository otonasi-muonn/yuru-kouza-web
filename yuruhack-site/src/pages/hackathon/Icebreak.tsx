import {
  ArrowRight,
  ArrowLeft,
  Smile,
  Mic2,
  Heart,
  Clock,
  Users,
} from "lucide-react";
import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";

type Activity = {
  letter: string;
  title: string;
  tagline: string;
  duration: string;
  participants: string;
  icon: React.ReactNode;
  color: string;
  rules: string[];
  flow: string[];
  tip: string;
};

const ACTIVITIES: Activity[] = [
  {
    letter: "A",
    title: "2つの真実と1つの嘘",
    tagline: "「ふつうのアイスブレイク」を確実に当てたいときの定番",
    duration: "30〜40分",
    participants: "4〜6人グループ × 複数",
    icon: <Smile size={20} />,
    color: "#0ea5e9",
    rules: [
      "各自、自分に関する「ホント2つ・ウソ1つ」の3エピソードを考える",
      "1つずつ発表 → 他のメンバーが「どれがウソ？」を当てる",
      "全員1周したら、種明かし＆理由を共有",
    ],
    flow: [
      "5分: 各自で3エピソードを書き出す（紙 or メモ）",
      "20分: 1人ずつ発表＆当てっこ（1人3〜4分目安）",
      "5分: 一番騙された嘘ベスト1を決めて全体共有",
    ],
    tip: "「平凡そうな嘘」のほうが当てづらく盛り上がります。「実は富士山に登ったことがない」みたいに地味めがコツ。",
  },
  {
    letter: "B",
    title: "もし1億円もらえたら作るWebサービスLT",
    tagline: "今日のアイディアソンへの助走になる、Webらしいアイスブレイク",
    duration: "30〜40分",
    participants: "全体 or 4〜6人グループ",
    icon: <Mic2 size={20} />,
    color: "#f59e0b",
    rules: [
      "もし1億円の予算と無限のエンジニアがいたら、自分が作りたい/欲しいWebサービスを発表",
      "1人60〜90秒のショートプレゼン（LT形式）",
      "技術的に実現可能かは一切問わない。ぶっ飛んでてOK",
    ],
    flow: [
      "5分: 各自でアイディアを1つ決める（書き出さなくてもOK）",
      "25分: 順番に発表（1人60〜90秒、拍手のみで進行）",
      "5分: 一番ワクワクしたサービスに「いいね」を投票",
    ],
    tip: "「真面目な事業計画」じゃなく「ドラえもんのひみつ道具」感覚でOK。発表者の趣味が見えるので、午後のアイディアソンが進めやすくなります。",
  },
  {
    letter: "C",
    title: "ホームページ思い出語り",
    tagline: "Web制作のモチベが自然に上がる、しっとり系",
    duration: "30〜40分",
    participants: "4〜6人グループ × 複数",
    icon: <Heart size={20} />,
    color: "#ec4899",
    rules: [
      "「子どもの頃に見たホームページ／作ったホームページ／忘れられないサイト」を1つずつ語る",
      "Flash・個人サイト・ブログ・ファンサイト…なんでもOK",
      "もし覚えていれば、当時の見た目をジェスチャーや言葉で再現",
    ],
    flow: [
      "5分: 各自で「これ語りたい」サイトを1つ決める",
      "25分: 1人ずつ発表（1人3〜4分）",
      "5分: みんなの話の中で「これ今日のポートフォリオで再現したい」要素をメモ",
    ],
    tip: "「インターネットアーカイブ（archive.org）」で当時のサイトを探して画面共有すると神。検索すれば結構残っています。",
  },
];

export function HackathonIcebreak() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        ハッカソン本番 · 10:20〜11:00
      </div>
      <h1>アイスブレイク</h1>

      <Callout variant="info" title="このページの使い方">
        <p className="!mt-0">
          下に <strong>3 種類</strong> のアイスブレイクを載せています。
          当日の <strong>運営が空気を見て1つを選択</strong>します。
          時間が押してたら短く、余裕があれば長く調整してください。
        </p>
      </Callout>

      <h2 id="goal">🎯 アイスブレイクの目的</h2>
      <ul>
        <li>初対面の人ともしゃべれる空気を作る</li>
        <li>このあとのアイディアソン・開発タイムで「困ったら隣に聞ける」関係性を作る</li>
        <li>頭をやわらかくして、午後の制作に向けて発想モードに切り替える</li>
      </ul>

      <h2 id="activities">🎲 候補アクティビティ（3つから選ぶ）</h2>

      {ACTIVITIES.map((a, i) => (
        <FadeIn key={a.letter} delay={i * 80}>
          <ActivityCard activity={a} />
        </FadeIn>
      ))}

      <h2 id="commontips">💡 どれを選んでも気をつけたいこと</h2>
      <Callout variant="tip" title="進行のコツ">
        <ul className="!mt-2">
          <li><strong>沈黙は怖くない</strong>。考える時間を5秒は待つ。早く回しすぎないこと</li>
          <li><strong>「パスもOK」を最初に宣言</strong>。話したくない人を無理に引っ張り出さない</li>
          <li><strong>時間が押したらバッサリ短縮</strong>。アイディアソンの時間を削るより、こっちを切る</li>
        </ul>
      </Callout>

      <NavFooter />
    </div>
  );
}

function ActivityCard({ activity: a }: { activity: Activity }) {
  return (
    <div
      className="not-prose my-6 overflow-hidden rounded-lg border bg-card shadow-sm"
      style={{ borderLeft: `4px solid ${a.color}` }}
    >
      <div className="border-b border-border px-5 py-4">
        <div className="mb-2 flex items-center gap-2">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
            style={{ backgroundColor: a.color }}
          >
            {a.letter}
          </span>
          <span
            className="rounded-md p-1"
            style={{ backgroundColor: `${a.color}1a`, color: a.color }}
          >
            {a.icon}
          </span>
          <h3 className="m-0 text-lg font-bold">{a.title}</h3>
        </div>
        <p className="m-0 text-sm text-muted-foreground">{a.tagline}</p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {a.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users size={12} /> {a.participants}
          </span>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            ルール
          </div>
          <ul className="ml-4 list-disc space-y-1 text-sm">
            {a.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            進行の目安
          </div>
          <ol className="ml-4 list-decimal space-y-1 text-sm">
            {a.flow.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ol>
        </div>
      </div>

      <div
        className="border-t border-border px-5 py-3 text-sm"
        style={{ backgroundColor: `${a.color}0d` }}
      >
        <span className="font-semibold" style={{ color: a.color }}>
          盛り上げのコツ:
        </span>{" "}
        {a.tip}
      </div>
    </div>
  );
}

function NavFooter() {
  return (
    <div className="not-prose mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      <a
        href="#/hackathon/"
        className="group flex flex-col items-start rounded-md border border-border bg-card px-4 py-3 transition hover:border-primary/60 hover:bg-secondary/60"
      >
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowLeft size={12} /> 本番ホーム
        </span>
        <span className="mt-0.5 font-medium group-hover:text-primary">
          タイムテーブルに戻る
        </span>
      </a>
      <a
        href="#/hackathon/ideathon"
        className="group flex flex-col items-end rounded-md border border-primary/40 bg-primary/5 px-4 py-3 transition hover:border-primary hover:bg-primary/10 sm:col-start-2"
      >
        <span className="flex items-center gap-1 text-xs text-primary/80">
          次へ <ArrowRight size={12} />
        </span>
        <span className="mt-0.5 font-medium text-primary">
          アイディアソン（11:00〜）
        </span>
      </a>
    </div>
  );
}

