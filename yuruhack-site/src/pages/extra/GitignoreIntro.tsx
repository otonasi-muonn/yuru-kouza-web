import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";
import { FadeIn } from "@/components/Animated";
import { ShieldAlert, EyeOff } from "lucide-react";

const BASIC = `# OS / エディタが作る隠しファイル
.DS_Store
Thumbs.db
.vscode/

# ログ・一時ファイル
*.log
*.tmp

# node_modules は絶対にアップしない
node_modules/

# 環境変数・秘密情報
.env
.env.local
secrets.json

# ビルド成果物
dist/
build/
`;

const NODE_EXAMPLE = `# Node.js プロジェクトなら
node_modules/
npm-debug.log*
yarn-debug.log*
.env*

# ビルド
dist/
build/
.parcel-cache/
`;

export function GitignoreIntro() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>.gitignore 入門</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          <strong>.gitignore</strong> は『Git に追跡させたくないファイル』を書くリストです。
          一言でいえば <strong>『アップしない物リスト』</strong>。
          これを書き忘れると、秘密のパスワード・10 万ファイルの <code>node_modules</code> などをうっかり世界に公開する事故が起きます。
        </p>
      </Callout>

      <FadeIn>
        <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
          <Role
            icon={<ShieldAlert size={18} className="text-red-500" />}
            title="秘密情報を守る"
            body=".env などの API キー・パスワードを誤爆しない"
          />
          <Role
            icon={<EyeOff size={18} className="text-amber-500" />}
            title="余計なノイズを隠す"
            body=".DS_Store / Thumbs.db / *.log などの PC ごみ"
          />
          <Role
            icon={<ShieldAlert size={18} className="text-emerald-500" />}
            title="巨大ファイルを入れない"
            body="node_modules / build 成果物 / 動画"
          />
        </div>
      </FadeIn>

      <h2>基本の書き方</h2>
      <ul>
        <li>ファイル名 1 行 1 個で書く</li>
        <li><code>*</code> はワイルドカード（<code>*.log</code> = log で終わる全部）</li>
        <li>末尾 <code>/</code> はフォルダ指定</li>
        <li><code>#</code> から始まる行はコメント</li>
        <li>先頭 <code>!</code> で『この中でも例外的に含める』</li>
      </ul>

      <h2>どのプロジェクトにも効く最低限セット</h2>
      <CopyBlock code={BASIC} filename=".gitignore" />

      <h2>Node.js / 今日の Web 班の例</h2>
      <CopyBlock code={NODE_EXAMPLE} filename=".gitignore（Node 向け）" />

      <Callout variant="warn" title="既にコミットしてしまったファイルは .gitignore だけでは消えない">
        <p className="!mt-0">
          .gitignore は『<strong>これから</strong>追跡しない』だけ。
          すでに Git に記録された <code>.env</code> を消すには:
        </p>
        <ol className="!my-2">
          <li><code>git rm --cached .env</code> で追跡だけ解除（ファイルは残る）</li>
          <li>.gitignore に <code>.env</code> を追加</li>
          <li>コミット → Push</li>
        </ol>
        <p className="text-xs text-muted-foreground">
          ※ 過去のコミットには残っているので、秘密鍵を誤爆した場合は <strong>キーを即ローテーション</strong>（作り直し）するのが正解です。
        </p>
      </Callout>

      <h2>GitHub が用意してくれるテンプレ</h2>
      <p>
        リポジトリ作成時の『.gitignore』セレクタや、{" "}
        <a href="https://github.com/github/gitignore" target="_blank" rel="noreferrer">
          github/gitignore
        </a>{" "}
        リポジトリに、Node / Python / Unity / Go など言語別のテンプレが用意されています。
        まずはこれをコピーして、自分のプロジェクト独自のものを足すのが楽です。
      </p>

      <Callout variant="tip" title="チームで開発するなら">
        <ul className="!mt-2">
          <li><strong>OS 依存のファイル</strong>（.DS_Store / Thumbs.db）は全員の .gitignore に入れておくと平和</li>
          <li>個人の VSCode 設定を入れたい人は .gitignore に <code>.vscode/</code> を入れて各自管理</li>
          <li><code>.gitignore</code> 自体はコミットする（みんなで共有するもの）</li>
        </ul>
      </Callout>
    </div>
  );
}

function Role({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="mb-2">{icon}</div>
      <div className="font-semibold text-[0.95rem]">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
