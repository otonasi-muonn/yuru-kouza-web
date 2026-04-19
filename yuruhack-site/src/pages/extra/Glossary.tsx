import { useMemo, useState } from "react";
import { Callout } from "@/components/Callout";
import { Search, Monitor, Cloud, ArrowLeftRight, Users } from "lucide-react";
import { FadeIn } from "@/components/Animated";

/**
 * おまけ: Git と GitHub の違い／用語集
 *
 * 冒頭で『Git = 手元の道具、GitHub = クラウドの置き場』をアニメ付き図解で示し、
 * 用語辞書はインクリメンタル検索付き。
 */
export function Glossary() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>Git と GitHub の違い／用語集</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          『Git』と『GitHub』を混同したまま作業すると、必ずどこかで詰まります。
          まず <strong>2つがどう違うか</strong> を整理し、
          今日の教材で出てくる用語を<strong>1行辞書</strong> にしておきます。
          ページ下部の検索で絞り込めます。
        </p>
      </Callout>

      <h2>🔀 Git と GitHub は別物</h2>
      <p>
        <strong>Git</strong> は『ファイルの履歴を管理するソフト』。
        <strong>GitHub</strong> は『Git のファイルをクラウドに置かせてくれる会社/サービス』。
        似た名前で紛らわしいですが、Word と OneDrive くらい違います。
      </p>

      <GitVsGithubDiagram />

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <CompareCard
          title="Git"
          icon={<Monitor size={18} />}
          color="#2563eb"
          points={[
            "2005 年にリーナス・トーバルズが作った",
            "手元の PC で動くコマンド（＋GUI）",
            "ファイル変更の履歴を記録する道具",
            "ネットが無くても動く",
            "GitHub 以外にも GitLab・Bitbucket で使える",
          ]}
        />
        <CompareCard
          title="GitHub"
          icon={<Cloud size={18} />}
          color="#9333ea"
          points={[
            "2008 年創業、現在は Microsoft 傘下",
            "Git リポジトリを預かるクラウドサービス",
            "Web UI で履歴を見たり、PR でレビューできる",
            "Issues / Actions / Pages などの付加機能",
            "Git が無くても最小限の編集はブラウザ上で可能",
          ]}
        />
      </div>

      <Callout variant="tip" title="一言比喩">
        <ul className="!mt-2">
          <li>
            <strong>Git</strong> = 写真を撮るカメラ（手元の道具）
          </li>
          <li>
            <strong>GitHub</strong> = 写真を預けて共有するクラウドアルバム
          </li>
          <li>
            <strong>コミット</strong> = カメラで撮った1枚の写真
          </li>
          <li>
            <strong>プッシュ</strong> = アルバムにアップロードする操作
          </li>
        </ul>
      </Callout>

      <h2>🧭 本編で出てくる登場人物</h2>
      <p>
        下の検索欄に言葉を入れると、その用語の定義が絞り込まれます。
        サイドバー的に使ってください。
      </p>

      <GlossarySearch />

      <h2>よくある混同</h2>
      <ul>
        <li>
          <strong>『GitHub にコミットする』？</strong> — 技術的には『Git でコミットを作り、GitHub に Push する』の2段階。
          ただし会話では『GitHub にコミット』と言ってしまう人も多い。意味は通じるので目くじら立てない。
        </li>
        <li>
          <strong>GitHub アカウント = Google アカウント？</strong> — 別物。GitHub に Google アカウントでサインインする選択肢は存在しない（OAuth の方向が逆）。
        </li>
        <li>
          <strong>ローカルとリモート</strong> — 『ローカル』＝自分の PC、『リモート』＝GitHub（や他のサーバ）を指すことが多い。Push/Pull はこの2つの間で起きる。
        </li>
      </ul>

      <h2>🔗 関連</h2>
      <ul>
        <li>
          コミットや分岐の見え方は「
          <a href="#/extra/git-deep">Git インタラクティブ解説</a>
          」で。
        </li>
        <li>
          コマンドで触ってみるなら「
          <a href="#/extra/terminal-basics">ターミナル入門</a>
          」へ。
        </li>
      </ul>
    </div>
  );
}

/* ===== 比較カード ===== */
function CompareCard({
  title,
  icon,
  color,
  points,
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
  points: string[];
}) {
  return (
    <div
      className="rounded-md border bg-card p-4"
      style={{ borderTopColor: color, borderTopWidth: 4 }}
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className="rounded-md p-1.5"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {icon}
        </div>
        <div className="text-lg font-bold" style={{ color }}>
          {title}
        </div>
      </div>
      <ul className="space-y-1 text-sm">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span
              className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ===== 動的な関係図 ===== */
function GitVsGithubDiagram() {
  const [phase, setPhase] = useState<"idle" | "push" | "pull">("idle");

  return (
    <FadeIn>
      <div className="not-prose my-5 rounded-md border border-border bg-gradient-to-br from-sky-50 to-purple-50 p-6 dark:from-sky-950/30 dark:to-purple-950/30">
        <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          {/* 左: 手元の PC */}
          <div className="rounded-lg border-2 border-sky-500/50 bg-white/70 p-4 text-center shadow-sm dark:bg-black/30">
            <Monitor size={28} className="mx-auto mb-2 text-sky-600" />
            <div className="font-semibold text-sky-700 dark:text-sky-300">
              あなたの PC（ローカル）
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Git が動いている<br />
              実ファイルと <code className="text-[0.7rem]">.git/</code> フォルダ
            </div>
          </div>

          {/* 中央: 矢印 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex items-center gap-1 rounded-full border border-sky-300 bg-white px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm transition ${
                phase === "push" ? "scale-110 bg-sky-100" : ""
              } dark:bg-black/40 dark:text-sky-300`}
            >
              git push →
            </div>
            <ArrowLeftRight size={16} className="text-muted-foreground" />
            <div
              className={`flex items-center gap-1 rounded-full border border-purple-300 bg-white px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm transition ${
                phase === "pull" ? "scale-110 bg-purple-100" : ""
              } dark:bg-black/40 dark:text-purple-300`}
            >
              ← git pull
            </div>
          </div>

          {/* 右: GitHub */}
          <div className="rounded-lg border-2 border-purple-500/50 bg-white/70 p-4 text-center shadow-sm dark:bg-black/30">
            <Cloud size={28} className="mx-auto mb-2 text-purple-600" />
            <div className="font-semibold text-purple-700 dark:text-purple-300">
              GitHub（リモート）
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              あなたのリポジトリのコピー<br />
              世界中のチームメンバーと共有
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            onClick={() => setPhase("push")}
            className="rounded border border-sky-300 bg-white px-3 py-1 font-semibold text-sky-700 transition hover:bg-sky-50 dark:bg-black/20 dark:text-sky-300"
          >
            push（送る）を光らせる
          </button>
          <button
            onClick={() => setPhase("pull")}
            className="rounded border border-purple-300 bg-white px-3 py-1 font-semibold text-purple-700 transition hover:bg-purple-50 dark:bg-black/20 dark:text-purple-300"
          >
            pull（受け取る）を光らせる
          </button>
          <button
            onClick={() => setPhase("idle")}
            className="rounded border border-border bg-white px-3 py-1 transition hover:bg-secondary dark:bg-black/20"
          >
            リセット
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <Users size={14} /> 他のメンバーも同じ GitHub リポジトリを Pull して最新状態を取れる
        </div>
      </div>
    </FadeIn>
  );
}

/* ===== 用語集 ===== */
type GlossaryEntry = {
  term: string;
  short: string;
  long: string;
  tags: string[];
};

const GLOSSARY: GlossaryEntry[] = [
  {
    term: "リポジトリ（Repository / repo）",
    short: "1つのプロジェクトの箱",
    long: "ソースコード・履歴・設定を一まとめにした単位。GitHub 上でも手元でも同じ名前で扱う。",
    tags: ["基本", "Git", "GitHub"],
  },
  {
    term: "コミット（Commit）",
    short: "『ある時点の状態』のスナップショット",
    long: "ファイルの変更を記録する最小単位。メッセージを添えて保存する。親コミットが1つ（マージなら2つ）。",
    tags: ["基本", "Git"],
  },
  {
    term: "ブランチ（Branch）",
    short: "コミットの連なりに付いた『しおり』",
    long: "平行して作業できる系列を作るための仕組み。main は既定のブランチ。feature/xxx が慣習。",
    tags: ["基本", "Git"],
  },
  {
    term: "main / master",
    short: "既定のブランチ名",
    long: "昔は master と呼ばれていたが、近年は main が主流。どちらも単なるブランチ名。",
    tags: ["基本", "Git"],
  },
  {
    term: "HEAD",
    short: "今いるコミットを指す印",
    long: "ブランチの先端を指していることが多い。detached HEAD はコミット直指しの状態。",
    tags: ["発展", "Git"],
  },
  {
    term: "リモート（Remote）",
    short: "遠くの Git 置き場",
    long: "普段は GitHub 上の自分のリポジトリ。既定名は `origin`。`git remote -v` で確認可能。",
    tags: ["基本", "Git"],
  },
  {
    term: "クローン（Clone）",
    short: "リモートのコピーを手元に作る操作",
    long: "`git clone <URL>` で実行。履歴（`.git/`）ごと丸ごと落ちてくる。",
    tags: ["基本", "Git"],
  },
  {
    term: "プッシュ（Push）",
    short: "手元のコミットをリモートに送る",
    long: "`git push` で実行。送った瞬間に GitHub ページが更新される。",
    tags: ["基本", "Git", "GitHub"],
  },
  {
    term: "プル（Pull）",
    short: "リモートの更新を手元に取り込む",
    long: "`git pull` は `fetch`（取ってくる）＋ `merge`（合流）の2段階を一発でやる。",
    tags: ["基本", "Git"],
  },
  {
    term: "フェッチ（Fetch）",
    short: "リモートの更新を取ってくるだけ",
    long: "手元の作業ブランチは変えず、リモート追跡ブランチだけを更新する。",
    tags: ["発展", "Git"],
  },
  {
    term: "マージ（Merge）",
    short: "2つのブランチを合流させる",
    long: "マージコミットが1つできる（親が2つ）。履歴がそのまま残るのが長所。",
    tags: ["基本", "Git"],
  },
  {
    term: "リベース（Rebase）",
    short: "履歴を直線に書き換える合流",
    long: "一見きれいだが履歴を上書きするので、共有ブランチでは使わないのが鉄則。",
    tags: ["発展", "Git"],
  },
  {
    term: "プルリクエスト（PR）",
    short: "『この変更を取り込んでいい？』の提案",
    long: "GitHub の機能。レビューと議論を経て main/develop にマージされる。",
    tags: ["基本", "GitHub"],
  },
  {
    term: "Issue（課題チケット）",
    short: "やることやバグを登録する場所",
    long: "GitHub の機能。PR と関連付けて進行管理できる。`#1` で番号参照。",
    tags: ["GitHub"],
  },
  {
    term: "GitHub Pages",
    short: "無料の静的サイトホスティング",
    long: "リポジトリを Web サイトとして公開できる。4/29 ハッカソンで使用。",
    tags: ["GitHub", "公開"],
  },
  {
    term: "GitHub Actions",
    short: "Push 時に自動で走る仕掛け",
    long: "テスト・ビルド・デプロイなどを YAML で書いて自動化する。このサイトも Actions で公開中。",
    tags: ["GitHub", "自動化"],
  },
  {
    term: ".gitignore",
    short: "Git に無視させたいファイルリスト",
    long: "`node_modules/` や `.env` など、コミットしたくないものを書く。プロジェクトルートに置く。",
    tags: ["Git"],
  },
  {
    term: "README",
    short: "そのリポジトリの顔",
    long: "通常 `README.md`。GitHub で開いた時に自動で表示される。自己紹介リポジトリではプロフィールそのもの。",
    tags: ["基本", "GitHub"],
  },
  {
    term: "Markdown（.md）",
    short: "プレーンテキストの装飾ルール",
    long: "`#` で見出し、`**太字**`、`[リンク](URL)` など。HTML にコンパイルされて表示される。",
    tags: ["基本"],
  },
  {
    term: "OAuth",
    short: "別サービスに『許可証』を渡す仕組み",
    long: "VSCode から GitHub にアクセスする時に使う。パスワードを直接渡さずに済む。",
    tags: ["認証"],
  },
  {
    term: "PAT（Personal Access Token）",
    short: "使い切りパスワードの長いやつ",
    long: "OAuth が使えない環境で認証する時の代替手段。Settings → Developer settings で発行。",
    tags: ["発展", "認証"],
  },
  {
    term: "SSH 鍵",
    short: "公開鍵認証用のペア",
    long: "OAuth/PAT の代わりに使える。秘密鍵は公開しない、公開鍵は GitHub に登録する。",
    tags: ["発展", "認証"],
  },
  {
    term: "フォーク（Fork）",
    short: "他人のリポジトリの自分コピー",
    long: "GitHub 上で複製し、自由にいじれる。PR を投げて本家への取り込みを提案できる。",
    tags: ["GitHub"],
  },
  {
    term: "スター（Star）",
    short: "『いいね』のブックマーク",
    long: "後で見返す & 作者への応援に使える。プロジェクトの人気指標にも。",
    tags: ["GitHub"],
  },
];

function GlossarySearch() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return GLOSSARY;
    return GLOSSARY.filter(
      (g) =>
        g.term.toLowerCase().includes(qq) ||
        g.short.toLowerCase().includes(qq) ||
        g.long.toLowerCase().includes(qq) ||
        g.tags.some((t) => t.toLowerCase().includes(qq)),
    );
  }, [q]);

  return (
    <div className="not-prose my-5">
      <label className="mb-2 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-primary/40">
        <Search size={14} className="text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="用語・タグを検索（例: ブランチ / 認証 / Pages）"
          className="w-full bg-transparent text-sm outline-none"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="text-xs text-muted-foreground hover:underline"
            aria-label="クリア"
          >
            クリア
          </button>
        )}
      </label>
      <div className="text-xs text-muted-foreground">
        {filtered.length} / {GLOSSARY.length} 件
      </div>
      <ul className="mt-2 grid gap-2">
        {filtered.map((g) => (
          <li
            key={g.term}
            className="rounded-md border border-border bg-card p-3 transition hover:border-primary/40"
          >
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold">{g.term}</span>
              <span className="text-xs text-muted-foreground">{g.short}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {g.long}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {g.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-muted px-1.5 py-0.5 text-[0.65rem] text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
            一致する用語がありません。別のキーワードで検索してみてください。
          </li>
        )}
      </ul>
    </div>
  );
}
