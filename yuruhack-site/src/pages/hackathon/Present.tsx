import {
  ArrowLeft,
  Link2,
  Eye,
  Star,
  PartyPopper,
  Bookmark,
} from "lucide-react";
import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";

const README_TEMPLATE = `# ＜サイトのタイトル＞

ゆるハッカソン 2026/04/29 でチーム制作したWebサイトです。

🌐 公開URL: https://＜代表者のユーザー名＞.github.io/＜リポジトリ名＞/

## 使った技術
- HTML
- CSS
- GitHub Pages（自動デプロイ）

## メンバー
- ＜名前1＞ — ＜担当＞
- ＜名前2＞ — ＜担当＞
- ＜名前3＞ — ＜担当＞

## こだわり
- ＜デザイン面のこだわり＞
- ＜実装面で工夫した点＞
`;

export function HackathonPresent() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        ハッカソン本番 · 18:00〜18:30
      </div>
      <h1>発表＆クロージング</h1>

      <Callout variant="info" title="この時間のゴール">
        <p className="!mt-0">
          各チームが <strong>「作ったサイトのURLとこだわり」を紹介</strong>する時間。
          チームで作り上げたものを世界に出した瞬間を、みんなで分かち合います。
        </p>
      </Callout>

      <h2 id="format">🎤 発表のかんたんルール</h2>
      <ul>
        <li>1チーム <strong>2〜4分</strong> 目安（チーム数で当日調整）</li>
        <li>チームの誰かが画面共有して、できたサイトを実際に見せる</li>
        <li>何ができていないかは気にしない。<strong>「動いてる部分」を見せれば勝ち</strong></li>
        <li>1人ずつ「自分が担当したところ」を一言ずつ話すスタイルもおすすめ</li>
      </ul>

      <h2 id="show-three">👀 発表で見せる3つだけ</h2>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
        <ShowCard
          n={1}
          icon={<Link2 size={20} />}
          title="① URL"
          desc="まず公開URLを口頭でも画面でも見せる。チャットにも貼ると親切"
          color="#0ea5e9"
        />
        <ShowCard
          n={2}
          icon={<Eye size={20} />}
          title="② 実際の画面"
          desc="ブラウザで開いた状態。少しスクロールして全体を見せる"
          color="#16a34a"
        />
        <ShowCard
          n={3}
          icon={<Star size={20} />}
          title="③ こだわりポイント1つ"
          desc="「ここの色を5回変えました」「AIに〇〇って聞いたら…」など、ひとことで"
          color="#f59e0b"
        />
      </div>

      <Callout variant="tip" title="チームで決めておくと当日ラク">
        <p className="!mt-0">
          発表直前に「誰が話す？」とならないよう、
          17:30ごろにチームで以下を一言ずつ決めておくとスムーズです。
        </p>
        <ul className="!mt-2">
          <li>誰が画面を出す？</li>
          <li>サイトのテーマを30秒で説明する役は？</li>
          <li>「ここ見てほしい！」を1人1つずつ</li>
          <li>大変だったところ・ハマったところ（共感されます）</li>
        </ul>
      </Callout>

      <h2 id="share">📋 URL共有テンプレ</h2>
      <p>
        発表のときにチャットへ貼るとそのまま使えます。
      </p>
      <CopyBlock
        code={`🎉 ＜チーム名＞のサイト、公開できました！

🌐 URL: https://＜代表者のユーザー名＞.github.io/＜リポジトリ名＞/
📦 リポジトリ: https://github.com/＜代表者のユーザー名＞/＜リポジトリ名＞

テーマ: ＜サイトのテーマ＞
こだわりポイント: ＜1〜2行で＞
メンバー: ＜名前を並べる＞
`}
        lang="text"
        filename="チャット投稿用テンプレ"
        highlightPlaceholders={false}
      />

      <h2 id="aftercare">🌱 終わったあとも残るために</h2>
      <p>
        せっかく作ったサイト、明日以降も「自分の名刺」として使えます。
        最後にこれだけやっておくと、後から見返したときに嬉しいです。
      </p>

      <h3>1. README にスクショ・URL・メンバーを書いておく</h3>
      <p>
        リポジトリのトップページ（README.md）に、サイトのURL・チームメンバー・担当を書くと、
        他の人がリポジトリを見たときに「これは何？誰が作った？」が伝わります。
      </p>
      <CopyBlock
        code={README_TEMPLATE}
        lang="markdown"
        filename="README.md"
      />

      <h3>2. プロフィールにピン留め</h3>
      <p>
        GitHubの自分のプロフィールページで、「Customize your pins」から作ったリポジトリをピン留めしておくと、
        プロフィールを見た人にすぐ気づいてもらえます。
      </p>

      <h3>3. SNSや就活で使う</h3>
      <p>
        XやLinkedInのプロフィール欄、エントリーシートのURL欄など、
        「自己紹介ページ」が必要なところで使えます。
        OGPまで設定済みなら、シェアした時にちゃんとサムネイルが出るので映えます。
        （詳しくは <a href="#/hackathon/improve" className="text-primary">改良アイディア集 Lv.4</a> へ）
      </p>

      <h2 id="closing">🎊 おつかれさまでした！</h2>

      <Callout variant="tip" title="今日やったことの振り返り">
        <p className="!mt-0">
          1日で、こんなことができるようになりました 👇
        </p>
        <ul>
          <li>HTML/CSS でチームでウェブサイトを作る</li>
          <li>1つのリポジトリを複数人で共有して開発する</li>
          <li>GitHub Pages に push で自動デプロイされる仕組みを動かす</li>
          <li>AIにコードを書かせて、チームの作品に取り込む</li>
        </ul>
        <p>
          この4つができれば、もう「Web作れるチーム」です。
        </p>
      </Callout>

      <h2 id="next">🚀 これから何ができる？</h2>
      <ul>
        <li>
          <strong>もっとページを増やす</strong> —{" "}
          <code>about.html</code> <code>works.html</code> など追加して、リンクで繋ぐ
        </li>
        <li>
          <strong>JavaScript を勉強する</strong> —{" "}
          <a href="#/extra/javascript-basics" className="text-primary">JavaScript基礎</a>{" "}
          ページから始められます
        </li>
        <li>
          <strong>独自ドメインを取る</strong> — <code>username.io</code> のようなアドレスにできます
        </li>
        <li>
          <strong>友達のサイトを見にいく</strong> — お互いのリポジトリで Star を付け合うのも嬉しい
        </li>
      </ul>

      <div className="not-prose mt-10 rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 text-center">
        <PartyPopper size={32} className="mx-auto mb-3 text-primary" />
        <h3 className="m-0 text-xl font-bold">
          公開、おめでとうございます！
        </h3>
        <p className="m-0 mt-2 text-sm text-muted-foreground">
          18:45 からは懇親会。ゆっくりおしゃべりしましょう 🍵
        </p>
      </div>

      <NavFooter />
    </div>
  );
}

function ShowCard({
  n,
  icon,
  title,
  desc,
  color,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div
      className="rounded-md border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className="rounded-md p-1.5"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {icon}
        </div>
        <div className="text-sm font-bold">{title}</div>
      </div>
      <p className="m-0 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      <div className="sr-only">{n}</div>
    </div>
  );
}

function NavFooter() {
  return (
    <div className="not-prose mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      <a
        href="#/hackathon/improve"
        className="group flex flex-col items-start rounded-md border border-border bg-card px-4 py-3 transition hover:border-primary/60 hover:bg-secondary/60"
      >
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowLeft size={12} /> 前へ
        </span>
        <span className="mt-0.5 font-medium group-hover:text-primary">
          改良アイディア集
        </span>
      </a>
      <a
        href="#/hackathon/"
        className="group flex flex-col items-end rounded-md border border-border bg-card px-4 py-3 transition hover:border-primary/60 hover:bg-secondary/60 sm:col-start-2"
      >
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Bookmark size={12} /> 戻る
        </span>
        <span className="mt-0.5 font-medium group-hover:text-primary">
          本番ホーム
        </span>
      </a>
    </div>
  );
}

