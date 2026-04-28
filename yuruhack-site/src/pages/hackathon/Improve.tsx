import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layout as LayoutIcon,
  Wand2,
  Globe2,
  Bot,
} from "lucide-react";
import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";

type Idea = {
  title: string;
  desc: string;
  prompt: string;
};

type Level = {
  num: number;
  label: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  ideas: Idea[];
};

const LEVELS: Level[] = [
  {
    num: 1,
    label: "見た目を整える",
    tagline: "コピペ多めでOK。1個ごとに見た目が変わる楽しさを味わうレベル",
    icon: <Wand2 size={18} />,
    color: "#0ea5e9",
    ideas: [
      {
        title: "Webフォントを使う",
        desc: "Google Fonts から好きな日本語フォントを <head> に貼って body の font-family を変える",
        prompt: `style.css の body の font-family を Google Fonts の「Zen Kaku Gothic New」に変えるコードを教えて。
HTML 側の <head> に追加する <link> タグも教えてください。`,
      },
      {
        title: "ホバーで色が変わるリンク",
        desc: "リンクにマウスを乗せたら色が変わる、下線のアニメーションが出る等",
        prompt: `次のCSSに、リンク (<a>) のホバーアニメーションを追加してください。
色が滑らかに変わって、下線がアニメーションする感じで。

（ここにstyle.cssを貼る）`,
      },
      {
        title: "セクションに絵文字アイコン",
        desc: "<h2>📚 好きなもの</h2> のように見出しに絵文字を1つ足すだけで一気にポップに",
        prompt: `次のHTMLの <h2> 見出しすべてに、内容に合った絵文字を先頭に付けてください。
（ここにindex.htmlを貼る）`,
      },
      {
        title: "ボタン風のリンク",
        desc: "SNSリンクをただの文字ではなく、押せる感じのボタンにする",
        prompt: `index.html のリンクを、横並びの「ボタン風」に整えるCSSを書いてください。
角丸・余白・ホバー時の浮き上がりを入れて。`,
      },
    ],
  },
  {
    num: 2,
    label: "構造を強化",
    tagline: "スマホでも崩れない・ナビがある「ちゃんとしたサイト」感",
    icon: <LayoutIcon size={18} />,
    color: "#16a34a",
    ideas: [
      {
        title: "スマホ対応（レスポンシブ）",
        desc: "幅が狭い画面でもレイアウトが崩れないようにする。@media クエリ1つでだいたいなんとかなる",
        prompt: `次のCSSに、画面幅が 480px 以下のときの調整を追加してください。
余白を減らす・フォントを少し小さくする・横並びを縦並びにする等。

（ここにstyle.cssを貼る）`,
      },
      {
        title: "ナビゲーションを付ける",
        desc: "ページ上部に「自己紹介 / 好きなもの / 連絡先」のリンクを置いて、押すとそのセクションに飛ぶ",
        prompt: `次のHTMLに、ページ内アンカーで飛べるナビゲーションメニューをヘッダーに追加してください。
各セクションに id を付ける必要があれば付けて。

（ここにindex.htmlを貼る）`,
      },
      {
        title: "セクションに番号や区切り線",
        desc: "セクションごとに「01 / 02 / 03」と番号を振ったり、波線で区切ったり",
        prompt: `次のCSSで、各 <section> の上に「セクション番号 + 区切り線」のデザインを足してください。`,
      },
      {
        title: "プロフィール画像を入れる",
        desc: "アイコン画像や似顔絵を入れる。images/ フォルダを作って <img> で読み込み",
        prompt: `index.html の Hero セクション（h1の上）に、丸い枠で切り抜かれたプロフィール画像 (icon.png) を表示するHTMLとCSSを書いてください。`,
      },
    ],
  },
  {
    num: 3,
    label: "動きをつける",
    tagline: "JSや凝ったCSSでちょっとリッチに。難易度上がるけどAIが助けてくれる",
    icon: <Sparkles size={18} />,
    color: "#9333ea",
    ideas: [
      {
        title: "スクロールでフェードイン",
        desc: "下にスクロールするとセクションが「ふわっ」と現れる",
        prompt: `次のHTMLに、各 <section> がスクロールしてきたらフェードイン+スライドアップで現れるようにする最小のJSとCSSを追加してください。
ライブラリは使わず、IntersectionObserver で実装してください。`,
      },
      {
        title: "ダークモード切替",
        desc: "右上に切替ボタンを置いて、押すと黒背景に切り替わる",
        prompt: `次のHTML/CSSにダークモード切替ボタンを追加してください。
- ボタンを押すと body に「dark」クラスが付く
- 「dark」クラスがあるときの色を CSS 変数で上書き
- 選択は localStorage に保存して、次回開いた時も維持

（ここにindex.htmlとstyle.cssを貼る）`,
      },
      {
        title: "簡単なお問い合わせフォーム",
        desc: "name と message を入れて送れるフォーム（送信先は formspree などの無料サービス）",
        prompt: `formspree.io を使った最小のお問い合わせフォーム（名前・メッセージ）のHTMLを書いてください。
formspree のアカウントは作る前提で、送信先URLはプレースホルダーで構いません。`,
      },
      {
        title: "タイピング風アニメーション",
        desc: "h1のキャッチコピーが「カタカタ」と打たれていくアニメーション",
        prompt: `index.html の <h1> のテキストを、ページ読み込み時にタイピング風アニメーションで表示する最小のCSS+JSを書いてください。
ライブラリは使わずに。`,
      },
    ],
  },
  {
    num: 4,
    label: "公開を磨く",
    tagline: "見られる側面を整える。SNSシェアで映える、ちゃんとしたサイト感",
    icon: <Globe2 size={18} />,
    color: "#dc2626",
    ideas: [
      {
        title: "OGP（SNSシェア時の画像・タイトル）",
        desc: "URLをXやLINEに貼ったとき、ちゃんとサムネイルとタイトルが表示されるようにする",
        prompt: `次のHTMLの <head> に、OGP（Open Graph Protocol）タグを追加してください。
- og:title, og:description, og:image, og:url, og:type
- Twitter Card 用の twitter:card meta も追加
- 画像URLはとりあえず「https://example.com/og.png」で構いません`,
      },
      {
        title: "favicon（タブの小さなアイコン）",
        desc: "ブラウザタブに表示される小さなアイコンを設定。絵文字を画像化するサービスも便利",
        prompt: `絵文字 1 文字をfaviconにする方法と、HTMLに記述する <link> タグを教えてください。
（外部サービスを使うなら推奨も含めて）`,
      },
      {
        title: "ページタイトルとmeta description",
        desc: "Google検索で出てきたときのタイトルと説明文を設定する",
        prompt: `次のHTMLの <head> を、検索結果に出やすいタイトルと description に整えてください。
私のサイトは「自己紹介ポートフォリオ」で、内容は（...）です。`,
      },
      {
        title: "READMEを充実させる",
        desc: "リポジトリのREADMEに、サイトのスクリーンショットと公開URLを書いておく",
        prompt: `自己紹介ポートフォリオサイトの README.md のテンプレを書いてください。
- サイトのスクショ（画像）
- 公開URLへのリンク
- 使った技術（HTML/CSS）
- このサイトを作った経緯（短く）`,
      },
    ],
  },
];

export function HackathonImprove() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        ハッカソン本番 · 自由制作時間
      </div>
      <h1>改良アイディア集</h1>

      <Callout variant="info" title="このページの使い方">
        <p className="!mt-0">
          一度公開できたチームが「もっと良くしたい！」となったときの、磨き上げネタ集です。
          上から順にやる必要はありません。<strong>やりたいものから1つ選んで、AIに丸投げで OK。</strong>
        </p>
        <p>
          各アイディアに「コピペすれば使えるAIプロンプト」を付けてあります。
        </p>
      </Callout>

      <h2 id="how">🤖 進め方の基本パターン</h2>
      <ol>
        <li>チーム内で「やりたい改良」を1つ選ぶ（担当を決めると吉）</li>
        <li>付属のプロンプトを <strong>ChatGPT / Claude にコピペ</strong></li>
        <li>「（ここに〜を貼る）」の部分に <strong>今のコードを貼る</strong></li>
        <li>返ってきたコードを試す → うまくいかなければエラーをそのまま貼って続けて聞く</li>
        <li>動いたら Commit & Push → 数十秒後に自動デプロイで反映</li>
      </ol>

      <Callout variant="tip" title="チーム改良のコツ">
        <p className="!mt-0">
          一気に5個盛り込もうとすると、どこが壊れたかわからなくなります。
          <strong>1個変える → 公開URLで確認 → コミット</strong> のリズムが安全。
          複数人が同時に違う改良を入れるなら、<strong>触る場所を口頭で宣言してから</strong>始めるとぶつかりません。
        </p>
      </Callout>

      {LEVELS.map((lv) => (
        <LevelSection key={lv.num} level={lv} />
      ))}

      <h2 id="ai-resources">📚 AIまわりの参考</h2>
      <ul>
        <li>
          <a href="#/extra/ai-tools" className="text-primary">「AIツールの使い方」</a> — 質問テンプレと「嘘を見抜く」コツ
        </li>
        <li>
          <a href="#/extra/error-reading" className="text-primary">「エラーメッセージの読み方」</a> — 動かないときに最初に見る場所
        </li>
        <li>
          <a href="#/extra/dev-tools" className="text-primary">「DevTools 入門」</a> — 「ここの色だけ変えたい」を自分で探す
        </li>
        <li>
          <a href="#/extra/css-frameworks" className="text-primary">「CSSフレームワーク」</a> — 一気に「ちゃんとしたサイト感」を出したいとき
        </li>
      </ul>

      <NavFooter />
    </div>
  );
}

function LevelSection({ level: lv }: { level: Level }) {
  return (
    <section className="not-prose my-10">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold text-white"
          style={{ backgroundColor: lv.color }}
        >
          Lv.{lv.num}
        </span>
        <div>
          <h2 className="m-0 text-xl font-bold">
            {lv.label}
          </h2>
          <p className="m-0 text-sm text-muted-foreground">{lv.tagline}</p>
        </div>
        <span
          className="ml-auto rounded-md p-2"
          style={{ backgroundColor: `${lv.color}1a`, color: lv.color }}
        >
          {lv.icon}
        </span>
      </div>

      <div className="grid gap-4">
        {lv.ideas.map((idea) => (
          <IdeaCard key={idea.title} idea={idea} color={lv.color} />
        ))}
      </div>
    </section>
  );
}

function IdeaCard({ idea, color }: { idea: Idea; color: string }) {
  return (
    <div
      className="overflow-hidden rounded-md border bg-card shadow-sm"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="px-4 py-3">
        <div className="font-semibold">{idea.title}</div>
        <p className="m-0 mt-1 text-sm text-muted-foreground">{idea.desc}</p>
      </div>
      <div className="border-t border-border bg-muted/20">
        <div className="flex items-center gap-1.5 px-3 pt-2 text-xs text-muted-foreground">
          <Bot size={12} /> AIに貼るプロンプト
        </div>
        <CopyBlock
          code={idea.prompt}
          lang="text"
          filename="prompt.txt"
          highlightPlaceholders={false}
        />
      </div>
    </div>
  );
}

function NavFooter() {
  return (
    <div className="not-prose mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      <a
        href="#/hackathon/deploy"
        className="group flex flex-col items-start rounded-md border border-border bg-card px-4 py-3 transition hover:border-primary/60 hover:bg-secondary/60"
      >
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowLeft size={12} /> 前へ
        </span>
        <span className="mt-0.5 font-medium group-hover:text-primary">
          Pages公開＆自動デプロイ
        </span>
      </a>
      <a
        href="#/hackathon/present"
        className="group flex flex-col items-end rounded-md border border-primary/40 bg-primary/5 px-4 py-3 transition hover:border-primary hover:bg-primary/10 sm:col-start-2"
      >
        <span className="flex items-center gap-1 text-xs text-primary/80">
          18:00〜 <ArrowRight size={12} />
        </span>
        <span className="mt-0.5 font-medium text-primary">
          発表＆クロージング
        </span>
      </a>
    </div>
  );
}

