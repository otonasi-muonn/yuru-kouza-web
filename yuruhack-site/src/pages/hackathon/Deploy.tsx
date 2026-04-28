import {
  ArrowRight,
  ArrowLeft,
  Globe,
  Settings,
  GitBranch,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";

const DEPLOY_YML = `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
`;

export function HackathonDeploy() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        ハッカソン本番 · 開発タイム中の任意のタイミングで
      </div>
      <h1>Pages 公開＆自動デプロイ</h1>

      <Callout variant="info" title="このページのゴール">
        <p className="!mt-0">
          自分のリポジトリの中身を、世界中からアクセスできる
          <strong> https://&lt;ユーザー名&gt;.github.io/&lt;リポジトリ名&gt;/ </strong>
          に公開する。さらに、<strong>main へ push したら自動で更新</strong>される状態にする。
        </p>
      </Callout>

      <h2 id="two-ways">📡 公開方法は2通り</h2>
      <p>
        どちらか1つでOK。今日は <strong>「自動デプロイ」をおすすめ</strong>します。
        改良するたびに自動で公開されるので、何度も手で操作しなくて済みます。
      </p>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <MethodCard
          icon={<GitBranch size={18} />}
          title="A. 手動公開（最小手順）"
          desc="Settings → Pages で main ブランチを指定するだけ"
          recommend={false}
        />
        <MethodCard
          icon={<Zap size={18} />}
          title="B. 自動デプロイ（おすすめ）"
          desc="ワークフローを1ファイル置いて push のたび自動公開"
          recommend
        />
      </div>

      <h2 id="auto">⚡ B. 自動デプロイの手順（おすすめ）</h2>
      <p>3ステップで終わります。</p>

      <h3>ステップ 1: ワークフローファイルを作成</h3>
      <p>
        リポジトリの中に、以下のパスでファイルを作ってください
        （VSCode で「新しいファイル」を <code>.github/workflows/deploy.yml</code> という名前で作るだけ）。
      </p>
      <CopyBlock
        code={DEPLOY_YML}
        lang="yaml"
        filename=".github/workflows/deploy.yml"
        highlightPlaceholders={false}
      />

      <Callout variant="tip" title="フォルダ名のドットを忘れずに">
        <p className="!mt-0">
          <code>.github</code> は <strong>頭にドット</strong>が必要です。
          このドットを忘れると Actions が動きません。
        </p>
      </Callout>

      <h3>ステップ 2: Settings → Pages を切り替える</h3>
      <ol>
        <li>GitHub のリポジトリページを開く</li>
        <li>上部メニューの <strong>Settings</strong> をクリック</li>
        <li>左メニューから <strong>Pages</strong> を選択</li>
        <li>
          <strong>「Build and deployment」セクションの Source を
          「GitHub Actions」に変更</strong>（「Deploy from a branch」ではなくこちら！）
        </li>
      </ol>

      <Callout variant="warn" title="ここがハマりポイント">
        <p className="!mt-0">
          Source が <strong>「Deploy from a branch」のままだと、ワークフローを置いても公開されません</strong>。
          必ず <strong>「GitHub Actions」</strong>に切り替えてください。
        </p>
      </Callout>

      <h3>ステップ 3: Commit & Push</h3>
      <p>
        <code>deploy.yml</code> を Commit & Push したら準備完了。
        以後は <strong>main に push するたび、自動でサイトが更新</strong>されます。
      </p>

      <h2 id="confirm">✅ 公開できたか確認する</h2>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
        <ConfirmStep
          n={1}
          icon={<Settings size={18} />}
          title="Actions タブを見る"
          desc="リポジトリ上部の「Actions」タブを開く。 緑のチェックが付けば成功"
        />
        <ConfirmStep
          n={2}
          icon={<Globe size={18} />}
          title="Pages タブで URL 確認"
          desc="Settings → Pages の上部に出る「Your site is live at ...」のURLを開く"
        />
        <ConfirmStep
          n={3}
          icon={<CheckCircle2 size={18} />}
          title="ブラウザで開く"
          desc="表示されればおめでとう！URLをコピーしておきましょう"
        />
      </div>

      <h2 id="manual">🛠️ A. 手動で公開する場合</h2>
      <p>
        Actions を使わず最短で済ませたいときの手順。改良ごとに手で更新ボタンを押す必要があります。
      </p>
      <ol>
        <li>Settings → Pages を開く</li>
        <li>Source を「Deploy from a branch」にする</li>
        <li>Branch を <code>main</code> ／ Folder を <code>/ (root)</code> にして Save</li>
        <li>数十秒〜数分待つと公開URLが表示される</li>
      </ol>
      <p className="text-sm text-muted-foreground">
        詳しい背景は <a href="#/extra/github-pages" className="text-primary">「GitHub Pages」</a> ページに。
      </p>

      <h2 id="trouble">🆘 うまく公開できないとき</h2>

      <Callout variant="danger" title="404 が表示される / ページが真っ白">
        <ul className="!mt-2">
          <li>
            <strong><code>index.html</code></strong>{" "}
            がリポジトリの <strong>一番上の階層</strong> にある？
            （<code>src/</code> や <code>portfolio/</code> の中だと表示されません）
          </li>
          <li>
            ファイル名が <code>Index.html</code> や <code>index.HTML</code> になっていない？
            （大文字小文字も区別されます）
          </li>
          <li>
            Actions タブで <strong>赤い ✗ </strong>になっていない？
            なっていれば失敗ログを開いて、エラー文をAIに貼って質問。
          </li>
          <li>
            Settings → Pages の Source が <strong>「GitHub Actions」</strong>になっている？
            （「Deploy from a branch」のままだと自動デプロイが動きません）
          </li>
        </ul>
      </Callout>

      <Callout variant="warn" title="CSS が当たらない / 画像が表示されない">
        <p className="!mt-0">
          <strong>パスを「絶対パス」ではなく「相対パス」で書く</strong>のが鉄則です。
        </p>
        <ul>
          <li>
            ❌ NG: <code>&lt;link href="/style.css"&gt;</code>
            （プロジェクトサイトでは404になります）
          </li>
          <li>
            ✅ OK: <code>&lt;link href="style.css"&gt;</code>{" "}
            または <code>&lt;link href="./style.css"&gt;</code>
          </li>
        </ul>
      </Callout>

      <h2 id="ci">🤔 ワークフローって何してるの？（おまけ）</h2>
      <p>
        貼り付けた YAML がやってるのはざっくり以下です。
        詳しく知りたい人は <a href="#/extra/github-actions" className="text-primary">「GitHub Actions」</a> ページへ。
      </p>
      <ul>
        <li><code>on: push</code> → main ブランチに push されたら起動</li>
        <li><code>permissions</code> → Pages を更新できる権限を付与</li>
        <li><code>actions/checkout</code> → リポジトリの中身をワークフローに持ってくる</li>
        <li><code>actions/upload-pages-artifact</code> → 公開する中身（<code>path: .</code> でリポジトリ全体）をまとめる</li>
        <li><code>actions/deploy-pages</code> → GitHub Pages に反映</li>
      </ul>

      <Callout variant="tip" title="サブフォルダのみ公開したいとき">
        <p className="!mt-0">
          もし <code>src/</code> の中だけ公開したいなら、
          YAML の <code>path: .</code> を <strong><code>path: src</code></strong> に変えてください。
        </p>
      </Callout>

      <NavFooter />
    </div>
  );
}

function MethodCard({
  icon,
  title,
  desc,
  recommend,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  recommend: boolean;
}) {
  return (
    <div
      className={[
        "rounded-md border bg-card p-4 transition",
        recommend
          ? "border-primary/50 ring-1 ring-primary/20"
          : "border-border",
      ].join(" ")}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className={[
            "rounded-md p-1.5",
            recommend ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {icon}
        </div>
        <div className="font-semibold">{title}</div>
        {recommend && (
          <span className="ml-auto rounded-full bg-primary/15 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-primary">
            推奨
          </span>
        )}
      </div>
      <p className="m-0 text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function ConfirmStep({
  n,
  icon,
  title,
  desc,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {n}
        </span>
        <span className="text-muted-foreground">{icon}</span>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <p className="m-0 text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function NavFooter() {
  return (
    <div className="not-prose mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      <a
        href="#/hackathon/build"
        className="group flex flex-col items-start rounded-md border border-border bg-card px-4 py-3 transition hover:border-primary/60 hover:bg-secondary/60"
      >
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowLeft size={12} /> 前へ
        </span>
        <span className="mt-0.5 font-medium group-hover:text-primary">
          制作スタート
        </span>
      </a>
      <a
        href="#/hackathon/improve"
        className="group flex flex-col items-end rounded-md border border-primary/40 bg-primary/5 px-4 py-3 transition hover:border-primary hover:bg-primary/10 sm:col-start-2"
      >
        <span className="flex items-center gap-1 text-xs text-primary/80">
          次へ <ArrowRight size={12} />
        </span>
        <span className="mt-0.5 font-medium text-primary">
          改良アイディア集
        </span>
      </a>
    </div>
  );
}

