import { useMemo, useState } from "react";
import { Callout } from "@/components/Callout";
import { Folder, FolderOpen, FileText, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/Animated";
import { Quiz } from "@/components/Quiz";

/**
 * おまけ: ファイル・フォルダ・パス入門
 *
 * 架空のフォルダツリーをクリックで展開し、
 * 『今いる位置』から『相対パス』と『絶対パス』がライブ計算されるビジュアル。
 */
export function PathBasics() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>ファイル・フォルダ・パス入門</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          プログラミングで一番見落とされる前提は『どこに・どうつながって・ファイルが置かれているか』という<strong>空間感覚</strong>です。
          パスが分かれば、画像が表示されない/コマンドが『そんなファイルない』と怒る事故の9割は自分で解決できるようになります。
        </p>
      </Callout>

      <h2>📁 ファイルとフォルダ</h2>
      <p>
        <strong>ファイル</strong>はデータの一片（文章・画像・動画・コード）。
        <strong>フォルダ</strong>（ディレクトリ）はそれらをしまう箱で、箱の中に箱も入れられます。
        この入れ子構造を <strong>ツリー（木）</strong> と呼びます。
      </p>

      <h2>📍 今いる場所 → 目的地の書き方</h2>
      <p>
        ファイルへの道案内を文字で書いたものが <strong>パス</strong> です。書き方は2種類:
      </p>
      <ul>
        <li>
          <strong>絶対パス</strong> — ルート（<code>/</code> や <code>C:\</code>）から全部書く。どこにいても同じ場所を指せる。
        </li>
        <li>
          <strong>相対パス</strong> — <strong>今いる場所を起点に</strong>『ここから右に1つ、下に2つ』のような書き方。ファイルを移動すると指す先が変わる。
        </li>
      </ul>

      <Callout variant="tip" title="記号3つだけ覚える">
        <ul className="!mt-2">
          <li>
            <code>.</code> — 今いるフォルダ（current）
          </li>
          <li>
            <code>..</code> — 一つ上のフォルダ（parent）
          </li>
          <li>
            <code>~</code> — ホームディレクトリ（Mac: <code>/Users/you</code>、Windows Git Bash: <code>/c/Users/you</code>）
          </li>
        </ul>
      </Callout>

      <h2>🧭 クリックして体感しよう</h2>
      <p>
        下のツリーの <strong>丸</strong> をクリックすると『今いる場所』が切り替わります。
        <strong>四角（ファイル）</strong> をクリックすると、その位置を目指すパスがリアルタイムで更新されます。
      </p>

      <PathExplorer />

      <h2>⚠️ 初学者が踏みやすい地雷</h2>
      <ul>
        <li>
          <strong>日本語・全角スペース入りのパス</strong> —
          古いツールが急に壊れることがある。プロジェクト用フォルダは英数字とハイフンで。
        </li>
        <li>
          <strong>大文字小文字</strong> — Mac/Linux は <code>Readme.md</code> と{" "}
          <code>README.md</code> を区別する。Windows は区別しないが、GitHub に Push するとバレる。
        </li>
        <li>
          <strong>拡張子が見えない Windows</strong> — 既定では <code>.md</code> が非表示。
          エクスプローラのオプションから表示ONにしておく。
        </li>
        <li>
          <strong>OneDrive / iCloud Drive の中で作業</strong> —
          裏側の同期と Git がぶつかって <code>.git</code> 破壊事故が起きやすい。
          プロジェクトは <code>~/yuruhack</code> のような同期外の場所へ。
        </li>
        <li>
          <strong>パス区切りの <code>\</code> と <code>/</code></strong> —
          Windows は <code>\</code>、Mac/Linux は <code>/</code>。Web の URL は常に <code>/</code>。
          Git Bash や VSCode のターミナルは <code>/</code> で通じることが多い。
        </li>
      </ul>

      <h2>🏷️ 拡張子の意味</h2>
      <div className="not-prose my-5 grid gap-2 sm:grid-cols-2">
        <ExtRow ext=".html" role="Webページ（HTML）" tool="ブラウザで開く" />
        <ExtRow ext=".css" role="見た目の設定" tool="HTML から読み込む" />
        <ExtRow ext=".js" role="JavaScript（動き）" tool="HTML から読み込む" />
        <ExtRow ext=".md" role="Markdown（README など）" tool="GitHub/VSCode でプレビュー" />
        <ExtRow ext=".png / .jpg" role="画像" tool="HTML の <img> や Markdown で貼る" />
        <ExtRow ext=".gitignore" role="Git に無視させたいものリスト" tool="プロジェクトルートに置く" />
      </div>

      <h2>✅ 小テスト</h2>
      <Quiz
        question="いま `~/yuruhack/src/` にいる。`~/yuruhack/README.md` を指す相対パスは？"
        choices={[
          { label: "README.md", hint: "それだと `~/yuruhack/src/README.md` を指すことになります" },
          { label: "./README.md", hint: "それも src/ の中を指します" },
          { label: "../README.md", correct: true, hint: "正解！ `..` で一つ上の yuruhack/ に戻ってから README.md を指せます" },
          { label: "/README.md", hint: "それはシステム最上位の README.md。多分存在しません" },
        ]}
        explain="`..` は『一つ上のフォルダ』。src/ の一つ上が yuruhack/ なので、`../README.md` で指せる。"
      />

      <Quiz
        question="HTML の `<img src='./images/cat.png'>` が表示されない。最も怪しい原因は？"
        choices={[
          { label: "PC のメモリ不足" },
          { label: "ブラウザが画像を嫌っている" },
          {
            label: "HTML ファイルと images/ フォルダの位置関係がズレている",
            correct: true,
            hint: "正解。HTML の隣に images/ が無いと ./images/ は届かない",
          },
          { label: "画像が大きすぎる", hint: "それで『表示されない』はほぼない。むしろ遅いだけ" },
        ]}
        explain="相対パスは『HTML ファイルの位置から見てどこか』で決まる。images/ を別階層に置いたらパスもそれに合わせる。"
      />

      <h2>🔗 関連</h2>
      <ul>
        <li>
          パスを実際に <code>cd</code> で歩くには「
          <a href="#/extra/terminal-basics">ターミナル入門</a>
          」へ。
        </li>
        <li>
          画像を README に埋め込む作法は「
          <a href="#/extra/image-handling">画像をリポジトリに入れる作法</a>
          」に。
        </li>
      </ul>
    </div>
  );
}

/* ===== 拡張子テーブル行 ===== */
function ExtRow({ ext, role, tool }: { ext: string; role: string; tool: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2">
      <code className="font-mono text-sm font-semibold text-primary">{ext}</code>
      <div className="min-w-0 flex-1 text-right text-xs text-muted-foreground">
        <div className="font-medium text-foreground">{role}</div>
        <div>{tool}</div>
      </div>
    </div>
  );
}

/* ===== インタラクティブツリー ===== */
type TreeNode = {
  name: string;
  kind: "dir" | "file";
  children?: TreeNode[];
};

const SAMPLE_TREE: TreeNode = {
  name: "~",
  kind: "dir",
  children: [
    {
      name: "yuruhack",
      kind: "dir",
      children: [
        { name: "README.md", kind: "file" },
        {
          name: "src",
          kind: "dir",
          children: [
            { name: "index.html", kind: "file" },
            { name: "style.css", kind: "file" },
          ],
        },
        {
          name: "images",
          kind: "dir",
          children: [
            { name: "avatar.png", kind: "file" },
            { name: "banner.jpg", kind: "file" },
          ],
        },
      ],
    },
    {
      name: "Downloads",
      kind: "dir",
      children: [{ name: "画像.zip", kind: "file" }],
    },
  ],
};

function PathExplorer() {
  // 初期: ~/yuruhack/src にいて、~/yuruhack/images/avatar.png を指す
  const [cwdPath, setCwdPath] = useState<string[]>(["yuruhack", "src"]);
  const [targetPath, setTargetPath] = useState<string[]>([
    "yuruhack",
    "images",
    "avatar.png",
  ]);

  const abs = useMemo(() => ["~", ...targetPath].join("/"), [targetPath]);
  const rel = useMemo(() => computeRelative(cwdPath, targetPath), [cwdPath, targetPath]);

  return (
    <div className="not-prose my-5 overflow-hidden rounded-md border border-border bg-card">
      <div className="grid gap-0 md:grid-cols-[1fr_minmax(260px,320px)]">
        {/* ツリー */}
        <div className="overflow-auto border-b border-border md:border-b-0 md:border-r">
          <div className="p-3">
            <TreeView
              node={SAMPLE_TREE}
              path={[]}
              cwdPath={cwdPath}
              targetPath={targetPath}
              onCwd={setCwdPath}
              onTarget={setTargetPath}
            />
          </div>
          <div className="border-t border-border bg-muted/30 px-3 py-2 text-[0.7rem] text-muted-foreground">
            🟠 丸＝『今いる場所』。📄 四角＝『行きたい先』。クリックで切替。
          </div>
        </div>

        {/* 出力 */}
        <div className="space-y-3 bg-muted/20 p-4">
          <FadeIn>
            <div>
              <div className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                今いる場所（cwd）
              </div>
              <code className="block rounded bg-background px-2 py-1.5 font-mono text-xs">
                ~/{cwdPath.join("/") || ""}
              </code>
            </div>
          </FadeIn>
          <FadeIn delay={60}>
            <div>
              <div className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                行きたい先
              </div>
              <code className="block rounded bg-background px-2 py-1.5 font-mono text-xs">
                ~/{targetPath.join("/")}
              </code>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div>
              <div className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                相対パス
              </div>
              <code className="block rounded bg-emerald-50 px-2 py-1.5 font-mono text-xs dark:bg-emerald-950/40">
                {rel}
              </code>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">
                HTML や Markdown で画像を埋め込むなら、普段はこっちを使う。
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={180}>
            <div>
              <div className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-400">
                絶対パス
              </div>
              <code className="block rounded bg-sky-50 px-2 py-1.5 font-mono text-xs dark:bg-sky-950/40">
                {abs}
              </code>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">
                どこからでも同じ場所を指せるが、PCが変わると成立しない。共有するコードには使わない。
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function TreeView({
  node,
  path,
  cwdPath,
  targetPath,
  onCwd,
  onTarget,
  depth = 0,
}: {
  node: TreeNode;
  path: string[];
  cwdPath: string[];
  targetPath: string[];
  onCwd: (p: string[]) => void;
  onTarget: (p: string[]) => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(true);
  const isDir = node.kind === "dir";
  const isRoot = depth === 0;
  const fullPath = isRoot ? [] : [...path, node.name];
  const isCwd = samePath(fullPath, cwdPath);
  const isTarget = samePath(fullPath, targetPath);

  return (
    <div style={{ paddingLeft: depth === 0 ? 0 : 14 }}>
      <div className="flex items-center gap-1.5 py-0.5">
        {isDir ? (
          <>
            <button
              className="flex items-center gap-1 rounded px-1 py-0.5 hover:bg-secondary"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "閉じる" : "開く"}
            >
              <ChevronRight
                size={12}
                style={{
                  transform: open ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
              {open ? <FolderOpen size={14} className="text-amber-500" /> : <Folder size={14} className="text-amber-500" />}
              <span className="text-sm">{node.name}</span>
            </button>
            {!isRoot && (
              <CwdDot active={isCwd} onClick={() => onCwd(fullPath)} />
            )}
          </>
        ) : (
          <>
            <FileText size={14} className="ml-[14px] text-muted-foreground" />
            <button
              className={`rounded px-1 py-0.5 text-sm transition ${
                isTarget
                  ? "bg-emerald-500/20 font-semibold text-emerald-800 dark:text-emerald-300"
                  : "hover:bg-secondary"
              }`}
              onClick={() => onTarget(fullPath)}
            >
              {node.name}
            </button>
          </>
        )}
      </div>
      {isDir && open && node.children && (
        <div>
          {node.children.map((c) => (
            <TreeView
              key={c.name}
              node={c}
              path={fullPath}
              cwdPath={cwdPath}
              targetPath={targetPath}
              onCwd={onCwd}
              onTarget={onTarget}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CwdDot({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="ここにいることにする"
      title="ここにいることにする"
      className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border transition"
      style={{
        borderColor: active ? "hsl(18 75% 48%)" : "hsl(30 15% 80%)",
        backgroundColor: active ? "hsl(18 75% 48%)" : "transparent",
      }}
    >
      <span
        className="block h-2 w-2 rounded-full"
        style={{ backgroundColor: active ? "white" : "hsl(30 15% 80%)" }}
      />
    </button>
  );
}

function samePath(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => x === b[i]);
}

function computeRelative(from: string[], to: string[]): string {
  // 共通プレフィックスを探す
  let common = 0;
  while (common < from.length && common < to.length && from[common] === to[common]) {
    common++;
  }
  const up = from.length - common;
  const down = to.slice(common);
  if (up === 0 && down.length === 0) return ".";
  const parts: string[] = [];
  for (let i = 0; i < up; i++) parts.push("..");
  parts.push(...down);
  // 先頭を ./ にするかは好み。ここでは up=0 の時だけ ./ を付ける。
  if (up === 0) return "./" + parts.join("/");
  return parts.join("/");
}
