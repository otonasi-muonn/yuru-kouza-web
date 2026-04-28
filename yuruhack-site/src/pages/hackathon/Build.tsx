import {
  ArrowRight,
  ArrowLeft,
  FolderTree,
  Bot,
  AlertTriangle,
  Users,
  GitMerge,
} from "lucide-react";
import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";
import { FadeIn } from "@/components/Animated";

const HTML_STARTER = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>＜サイトのタイトル＞</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header class="hero">
      <h1>＜サイトのタイトル＞</h1>
      <p class="lead">＜キャッチコピー / 1〜2行の説明＞</p>
    </header>

    <main>
      <!-- ↓ 担当: ＜名前＞ -->
      <section id="section-1" class="card">
        <h2>＜セクション1のタイトル＞</h2>
        <p>＜内容＞</p>
      </section>

      <!-- ↓ 担当: ＜名前＞ -->
      <section id="section-2" class="card">
        <h2>＜セクション2のタイトル＞</h2>
        <p>＜内容＞</p>
      </section>

      <!-- ↓ 担当: ＜名前＞ -->
      <section id="section-3" class="card">
        <h2>＜セクション3のタイトル＞</h2>
        <p>＜内容＞</p>
      </section>
    </main>

    <footer>
      <small>© 2026 ＜チーム名＞</small>
    </footer>
  </body>
</html>
`;

const CSS_STARTER = `/* チーム共有のベース変数。色を変えるならここだけ */
:root {
  --bg: #fff8ee;
  --fg: #222;
  --accent: #e25b1a;
  --muted: #6b7280;
  --card: #ffffff;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: "Hiragino Sans", "Noto Sans JP", system-ui, sans-serif;
  background: var(--bg);
  color: var(--fg);
  line-height: 1.7;
}

main, header, footer {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero */
.hero {
  text-align: center;
  padding: 80px 20px 40px;
}
.hero h1 {
  font-size: 2.4rem;
  margin: 0 0 12px;
  color: var(--accent);
}
.hero .lead {
  color: var(--muted);
  font-size: 1.05rem;
  margin: 0;
}

/* セクションのカード（共通スタイル） */
.card {
  background: var(--card);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  box-shadow: 0 4px 16px -8px rgba(0,0,0,0.1);
}
.card h2 {
  margin-top: 0;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 6px;
}

/* ↓ 各メンバー、自分のセクション専用スタイルはここに足す */
/* 例: #section-1 { ... } */
`;

const TREE = `team-site/
├── index.html        ← サイト本体（みんなで触る）
├── style.css         ← 共通スタイル（変数・共通カードはここ）
└── (任意) images/    ← 画像
    ├── icon-taro.png
    └── logo.png`;

export function HackathonBuild() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        ハッカソン本番 · 13:00〜
      </div>
      <h1>チーム開発スタート</h1>

      <Callout variant="info" title="この時間でやること">
        <p className="!mt-0">
          午前に決めたテーマ・役割をもとに、<strong>1つのリポジトリをチームで共有して
          サイトを作っていく</strong>ところまで。
          公開（GitHub Pages）は次の <a href="#/hackathon/deploy" className="text-primary">公開ガイド</a> で扱います。
        </p>
        <p>
          このページは <strong>困ったら参照する辞書</strong>として使ってください。
          上から順に読破する必要はありません。
        </p>
      </Callout>

      <h2 id="overview">🛣️ 大まかな流れ</h2>
      <ol>
        <li><strong>代表者がリポジトリを作る</strong>（「Public」「Add a README」にチェック）</li>
        <li><strong>他メンバーをコラボレーターとして招待</strong></li>
        <li><strong>全員がCloneして手元に持ってくる</strong></li>
        <li><strong>下のスターターをコピペ</strong>して <code>index.html</code> と <code>style.css</code> を作る（代表者が最初の1回でOK）</li>
        <li><strong>分担したセクションを各自が編集</strong> → こまめに pull → push</li>
        <li><strong>困ったらこのページや「おまけ」を見る／メンターを呼ぶ</strong></li>
        <li>→ <a href="#/hackathon/deploy" className="text-primary">公開ガイド</a> へ</li>
      </ol>

      <h2 id="invite">👥 1. メンバーをコラボレーター招待</h2>
      <p>
        <strong>代表者の作業</strong>。リポジトリの Settings → Collaborators から、
        他メンバーの GitHub ユーザー名を入力して招待します。
      </p>
      <ol>
        <li>リポジトリの上部メニュー <strong>Settings</strong> をクリック</li>
        <li>左メニュー <strong>Collaborators</strong> を選択（パスワード再認証が出るかも）</li>
        <li><strong>「Add people」</strong>ボタンを押し、招待したいメンバーのユーザー名を入力</li>
        <li>権限は <strong>Write</strong> でOK（編集・push できる）</li>
        <li>招待されたメンバーは GitHub の通知 or メールで届くので <strong>Accept invitation</strong> を押す</li>
      </ol>

      <Callout variant="tip" title="招待されたメンバーへ">
        <p className="!mt-0">
          通知の <strong>「Accept」を押し忘れると push できません</strong>。
          招待が届かない場合は、メールアドレスのスペル確認 or 直接URLを貼ってもらいましょう。
        </p>
      </Callout>

      <h2 id="clone">📥 2. 全員がCloneする</h2>
      <p>
        メンバー全員が、同じリポジトリを <strong>各自のPCに</strong> clone します。
        手順詳細は <a href="#/web/02-clone" className="text-primary">事前講座のCloneページ</a> を参照。
      </p>

      <h2 id="files">📝 3. スターターをコピペ（代表者が最初の1回）</h2>
      <p>
        最初の土台は代表者が1回コピペして push してしまうのがラクです。
        メンバーは <code>git pull</code> すれば自動で同じファイルが手元に来ます。
      </p>

      <h3>ファイル構成</h3>
      <CopyBlock
        code={TREE}
        lang="text"
        filename="ファイル構成"
        highlightPlaceholders={false}
      />

      <h3>index.html</h3>
      <CopyBlock code={HTML_STARTER} lang="html" filename="index.html" />

      <p className="text-sm text-muted-foreground">
        💡 <code>&lt;!-- 担当: ＜名前＞ --&gt;</code> のコメントを入れておくと、
        誰がどこを触るかが一目でわかります（HTMLコメントなのでブラウザには表示されません）。
      </p>

      <h3>style.css</h3>
      <CopyBlock
        code={CSS_STARTER}
        lang="css"
        filename="style.css"
        highlightPlaceholders={false}
      />

      <h2 id="conflict">⚠️ 4. コンフリクトを避けるコツ</h2>

      <Callout variant="warn" title="チーム開発で一番ハマるところ">
        <p className="!mt-0">
          複数人が <strong>同じファイルの同じ場所</strong>を同時に変えて push すると、
          「マージコンフリクト」が起きます。完全には避けられませんが、減らす工夫はできます。
        </p>
      </Callout>

      <FadeIn>
        <div className="not-prose my-4 grid gap-3 sm:grid-cols-2">
          <Tip
            icon={<Users size={16} />}
            title="セクションごとに担当を分ける"
            desc="HTMLは「自分の section だけ触る」ルール。CSSは :root 変数や共通スタイルだけ慎重に"
          />
          <Tip
            icon={<GitMerge size={16} />}
            title="作業前に必ず git pull"
            desc="自分が触る前に「他の人の最新変更を取り込む」のが鉄則。VSCode左下の同期ボタンでもOK"
          />
          <Tip
            icon={<FolderTree size={16} />}
            title="こまめに push する"
            desc="30分〜1時間に1回push。ためればためるほど衝突しやすくなる"
          />
          <Tip
            icon={<Users size={16} />}
            title="今触ってる場所を口頭で共有"
            desc="「これからCSSの:root触ります」の一言があるとぶつからない。Slackでも声でも"
          />
        </div>
      </FadeIn>

      <p className="text-sm text-muted-foreground">
        もしコンフリクトが起きてしまったら、
        <a href="#/extra/merge-conflict" className="text-primary">「マージコンフリクト入門」</a>
        を見ながら落ち着いて対処。VSCode の画面で「両方残す / 片方採用」をクリックで選べます。
      </p>

      <h2 id="edit">✏️ 5. 自分の担当セクションを書き換える</h2>
      <p>
        スターター内の <code>＜...＞</code> で囲った部分を、午前に決めた内容で置き換えていきます。
        VSCode の検索（<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd>）で <code>＜</code> を探すと早いです。
      </p>

      <FadeIn>
        <div className="not-prose my-4 grid gap-3 sm:grid-cols-3">
          <EditTip
            icon={<FolderTree size={16} />}
            title="文章を変える"
            desc="< > で囲った場所を書き換え。改行は <br />、強調は <strong> で囲む"
          />
          <EditTip
            icon={<FolderTree size={16} />}
            title="色を変える"
            desc="style.css 上部の :root の色コードを午前に決めたものに。ここはチームで合意してから変える"
          />
          <EditTip
            icon={<FolderTree size={16} />}
            title="セクション固有のスタイル"
            desc="自分のセクションだけの色・装飾は #section-N { } で書くと、他人と衝突しない"
          />
        </div>
      </FadeIn>

      <h2 id="commit">🚀 6. Commit & Push（こまめに）</h2>
      <p>
        書いたら（途中段階でも）変更を保存してコミット → プッシュ。
        手順は <a href="#/web/04-commit-push" className="text-primary">事前講座のCommit & Pushページ</a> と同じ。
      </p>
      <p className="text-sm text-muted-foreground">
        💡 push する前に必ず <strong>「Sync Changes」（pull）</strong>を1回挟む癖をつけると、コンフリクトが激減します。
      </p>

      <h2 id="ai">🤖 AIをガンガン使おう</h2>
      <Callout variant="tip" title="AI利用は完全フリー">
        <p className="!mt-0">
          ChatGPT / Claude にコードを書いてもらうのも、エラー画面を貼って質問するのも、ぜんぶ OK。
          むしろ <strong>「すぐ AI に聞く」が今日の正攻法</strong>です。
        </p>
        <p>
          詳しいコツは <a href="#/extra/ai-tools" className="text-primary">「AIツールの使い方」</a> ページに。
        </p>
      </Callout>

      <h3>チーム開発で便利なプロンプト</h3>
      <CopyBlock
        code={`チームで作っているサイトのHTML/CSSを共有します。
私が担当しているのは「＜セクション名＞」です。
このセクションを、＜やりたいこと＞のように書き換えるコードを教えてください。
他のセクションには影響を与えないようにお願いします。

# 現在のHTML
（ここに index.html を貼る）

# 現在のCSS
（ここに style.css を貼る）`}
        lang="text"
        filename="自分のセクションだけ手を入れたいときのプロンプト"
        highlightPlaceholders={false}
      />

      <Callout variant="warn" title="AIに頼るときの注意（軽め）">
        <p className="!mt-0">
          AI が出してくれたコードは <strong>そのまま全部置き換えず、まず読む</strong>と、
          詰まったときに自分で直せるようになります。
          特にチーム開発では「全体を書き直して」と頼むと他人の作業を消しがちなので、
          <strong>「自分の担当部分だけ」を明示する</strong>のがコツ。
        </p>
      </Callout>

      <h2 id="trouble">🆘 詰まったら</h2>
      <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
        <HelpLink
          href="#/extra/error-reading"
          icon={<AlertTriangle size={18} />}
          title="エラーメッセージの読み方"
          color="#dc2626"
        />
        <HelpLink
          href="#/extra/ai-tools"
          icon={<Bot size={18} />}
          title="AIへの聞き方テンプレ"
          color="#7c3aed"
        />
        <HelpLink
          href="#/extra/merge-conflict"
          icon={<GitMerge size={18} />}
          title="マージコンフリクト入門"
          color="#0891b2"
        />
      </div>

      <h2 id="references">📚 困ったとき開きたい既存ページ</h2>
      <ul>
        <li><a href="#/extra/html-css-basics" className="text-primary">HTML/CSS基礎</a> — タグ・セレクタの基本</li>
        <li><a href="#/extra/css-frameworks" className="text-primary">CSSフレームワーク</a> — 一気に見栄えを整えたいとき</li>
        <li><a href="#/extra/image-handling" className="text-primary">画像の扱い</a> — 写真やアイコンを入れたいとき</li>
        <li><a href="#/extra/dev-tools" className="text-primary">DevTools 入門</a> — 「ここの色だけ変えたい」を自分で探す</li>
        <li><a href="#/extra/yaml-basics" className="text-primary">YAML 入門</a> — deploy.yml が読めるようになる</li>
      </ul>

      <NavFooter />
    </div>
  );
}

function Tip({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3">
      <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
        <span className="text-amber-700 dark:text-amber-400">{icon}</span>
        {title}
      </div>
      <p className="m-0 text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function EditTip({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
        <span className="text-muted-foreground">{icon}</span>
        {title}
      </div>
      <p className="m-0 text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function HelpLink({
  href,
  icon,
  title,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  color: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-md border border-border bg-card p-4 !text-foreground no-underline transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-center gap-2">
        <div
          className="rounded-md p-1.5"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {icon}
        </div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
    </a>
  );
}

function NavFooter() {
  return (
    <div className="not-prose mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      <a
        href="#/hackathon/ideathon"
        className="group flex flex-col items-start rounded-md border border-border bg-card px-4 py-3 transition hover:border-primary/60 hover:bg-secondary/60"
      >
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowLeft size={12} /> 前へ
        </span>
        <span className="mt-0.5 font-medium group-hover:text-primary">
          アイディアソン（チーム）
        </span>
      </a>
      <a
        href="#/hackathon/deploy"
        className="group flex flex-col items-end rounded-md border border-primary/40 bg-primary/5 px-4 py-3 transition hover:border-primary hover:bg-primary/10 sm:col-start-2"
      >
        <span className="flex items-center gap-1 text-xs text-primary/80">
          次へ <ArrowRight size={12} />
        </span>
        <span className="mt-0.5 font-medium text-primary">
          Pages公開＆自動デプロイ
        </span>
      </a>
    </div>
  );
}

