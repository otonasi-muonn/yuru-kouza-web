import { useState, useMemo } from "react";
import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";
import { AlertTriangle, Search, CheckCircle2 } from "lucide-react";

/**
 * おまけ: エラーメッセージの読み方
 *
 * 学生が本番でつまずく『赤い文字』をスクリーンショット風に並べ、
 * クリックで『何が悪いか』『直し方』を展開する辞書兼解説。
 */

type ErrEntry = {
  id: string;
  cat: "git" | "npm" | "node" | "browser" | "vscode";
  sample: string;
  cause: string;
  fix: string;
  detail?: string;
};

const ENTRIES: ErrEntry[] = [
  {
    id: "git-upstream",
    cat: "git",
    sample: "fatal: The current branch main has no upstream branch.",
    cause:
      "ローカルの main ブランチがまだ GitHub 側の『どのブランチに送るか』を知らない状態。",
    fix: "案内に出ている `git push --set-upstream origin main` をそのまま実行、または VSCode の『Publish Branch』を押す。",
    detail:
      "初回 push だけ毎回これが出ます。1度紐付ければ以降は git push だけで済みます。",
  },
  {
    id: "git-nothing",
    cat: "git",
    sample: "nothing to commit, working tree clean",
    cause: "変更が一つもない（保存し忘れ）か、すべてすでにコミット済み。",
    fix: "ファイルをちゃんと保存したか確認（タブの ● 印）。保存済みなのに出るなら、もうすべて GitHub 側と一致しています。",
  },
  {
    id: "git-not-a-repo",
    cat: "git",
    sample: "fatal: not a git repository (or any of the parent directories): .git",
    cause: "コマンドを実行したフォルダが『Git の管理下にない』。",
    fix: "`cd` で Clone したフォルダに移動するか、VSCode で『フォルダを開く』からリポジトリのフォルダを開く。",
  },
  {
    id: "git-conflict",
    cat: "git",
    sample: "CONFLICT (content): Merge conflict in README.md",
    cause:
      "自分と他人（またはブラウザで編集した自分）が同じ行を変えていて、Git が自動で合体できない。",
    fix: "README.md を開くと `<<<<<<<` と `>>>>>>>` で囲われた部分がある。両方の内容を見て、残したい形に編集 → 記号を消して保存 → ステージ → コミット。",
    detail: "詳しくは『マージコンフリクト入門』ページで。",
  },
  {
    id: "git-auth",
    cat: "git",
    sample: "remote: Support for password authentication was removed on August 13, 2021.",
    cause: "GitHub はパスワード直打ちの認証を廃止済み。今は OAuth または Personal Access Token が必要。",
    fix: "VSCode の『GitHub でサインイン』を使う（このサイトでの推奨）。CLI 派なら Personal Access Token を作って使う。",
  },
  {
    id: "npm-enoent",
    cat: "npm",
    sample: "npm ERR! code ENOENT npm ERR! enoent ENOENT: no such file or directory, open '/..../package.json'",
    cause: "`npm install` を叩いた場所に package.json がない。フォルダを間違えた可能性大。",
    fix: "`ls` や VSCode のエクスプローラで package.json が見えるフォルダに `cd` してから再実行。",
  },
  {
    id: "npm-eaccess",
    cat: "npm",
    sample: "EACCES: permission denied",
    cause:
      "システム領域に書き込もうとして権限がない（macOS / Linux で `sudo npm i -g` を推奨しないのはこれが理由）。",
    fix: "nvm や Volta 経由で Node を入れ直すと EACCES が出なくなる。Windows は管理者権限で PowerShell を再起動。",
  },
  {
    id: "node-modulenotfound",
    cat: "node",
    sample: "Error: Cannot find module 'react'",
    cause: "依存パッケージがインストールされていない。",
    fix: "`npm install` を実行。それでもダメなら `node_modules` を削除してやり直す。",
  },
  {
    id: "browser-mixed",
    cat: "browser",
    sample: "Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure image 'http://...'",
    cause: "HTTPS のページから http:// の画像を読み込もうとしたので、ブラウザがブロック。",
    fix: "画像 URL を https:// に変える、または画像をリポジトリ内に置いて相対パスにする。",
  },
  {
    id: "browser-cors",
    cat: "browser",
    sample: "Access to fetch at '...' has been blocked by CORS policy",
    cause: "別ドメインの API を呼ぼうとしたがサーバー側が許可していない。",
    fix: "API 側の仕様書を確認。学習中ならプロキシを挟むか、サーバーを自分で立てるのが確実。",
  },
  {
    id: "vscode-file-locked",
    cat: "vscode",
    sample: "EPERM: operation not permitted, rename '...'",
    cause:
      "別のプロセス（ウイルス対策ソフトや OneDrive 同期）がファイルを掴んでいる。",
    fix: "そのファイルを使っていそうなアプリを閉じる。OneDrive / iCloud 同期配下なら作業フォルダを別の場所に移す。",
  },
];

const CAT_LABELS: Record<ErrEntry["cat"], string> = {
  git: "Git",
  npm: "npm",
  node: "Node",
  browser: "ブラウザ",
  vscode: "VSCode / OS",
};

export function ErrorMessages() {
  const [q, setQ] = useState("");
  const [catFilter, setCatFilter] = useState<string | "all">("all");
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ENTRIES.filter((e) => {
      if (catFilter !== "all" && e.cat !== catFilter) return false;
      if (!needle) return true;
      return (
        e.sample.toLowerCase().includes(needle) ||
        e.cause.toLowerCase().includes(needle) ||
        e.fix.toLowerCase().includes(needle)
      );
    });
  }, [q, catFilter]);

  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>エラーメッセージの読み方</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          プログラミングで挫折する一番の原因は『英語の赤い文字』。
          実はエラーメッセージは<strong>1行目に原因、2〜3行目に場所</strong>が書いてあることがほとんどで、
          慣れれば Google 検索のクエリとしてそのまま貼るだけで 8 割の問題が解決します。
        </p>
      </Callout>

      <h2>エラーを読む 3 ステップ</h2>
      <FadeIn>
        <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
          <StepBlock
            n={1}
            title="止まる"
            body="真っ赤な文字を見るとブラウザを閉じたくなりますが、まず深呼吸。コピペする準備。"
          />
          <StepBlock
            n={2}
            title="読む"
            body="英語でも1行目は『何が』どうした、2〜3行目に『どこで』と書いてある。上 3 行だけでOK。"
          />
          <StepBlock
            n={3}
            title="検索"
            body="そのままダブルクォートで括って検索 → 同じエラーに遭遇した人の Stack Overflow がヒットします。"
          />
        </div>
      </FadeIn>

      <Callout variant="tip" title="ChatGPT / Claude に貼るのも有効">
        <p className="!mt-0">
          AI に『このエラーの意味を日本語で教えて』と投げるのも今や立派な一次対応です。
          ただし <strong>生成された解決策を鵜呑みにせず</strong>、
          試す前に『なぜそれで直るか』を一言で説明してもらうと学習になります。
        </p>
      </Callout>

      <h2>よく出るエラー辞典</h2>

      <div className="not-prose my-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="キーワードで絞り込み（例: ENOENT, CORS, branch）"
            className="w-full rounded-md border border-border bg-background px-8 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value as typeof catFilter)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="all">すべて</option>
          {Object.entries(CAT_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="not-prose space-y-3">
        {results.map((e) => {
          const opened = open === e.id;
          return (
            <div
              key={e.id}
              className="overflow-hidden rounded-md border border-border bg-card transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => setOpen(opened ? null : e.id)}
                className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted/30"
              >
                <AlertTriangle
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-500"
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-medium">
                      {CAT_LABELS[e.cat]}
                    </span>
                  </div>
                  <div className="font-mono text-[0.82rem] break-words">
                    {e.sample}
                  </div>
                </div>
              </button>
              {opened && (
                <div className="border-t border-border bg-background px-4 py-3 text-sm">
                  <div className="mb-2">
                    <strong className="text-muted-foreground">原因:</strong>{" "}
                    {e.cause}
                  </div>
                  <div className="mb-2 flex items-start gap-2">
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    <div>
                      <strong className="text-muted-foreground">直し方:</strong>{" "}
                      {e.fix}
                    </div>
                  </div>
                  {e.detail && (
                    <div className="text-xs text-muted-foreground">
                      {e.detail}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {results.length === 0 && (
          <div className="rounded-md border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
            該当するエラーが見つかりませんでした。キーワードを変えてお試しください。
          </div>
        )}
      </div>

      <h2>落ち着くためのチェックリスト</h2>
      <ol>
        <li>保存したか（タブに ● が残っていないか）</li>
        <li>同じフォルダで実行しているか（<code>pwd</code> で確認）</li>
        <li>タイプミスがないか（<code>readme.md</code> と <code>README.md</code> は別物）</li>
        <li>ネットワークは通っているか（プロキシ/VPN/テザリング）</li>
        <li>最後に『再起動』。VSCode / ターミナル / PC の順で</li>
      </ol>
    </div>
  );
}

function StepBlock({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <div className="relative rounded-md border border-border bg-card p-4">
      <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {n}
      </div>
      <div className="font-semibold text-[0.95rem]">{title}</div>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
    </div>
  );
}
