import { useMemo, useState } from "react";
import { Callout } from "@/components/Callout";
import {
  GitBranch,
  GitCommit,
  GitMerge,
  Play,
  RotateCcw,
  ChevronLeft,
  Tag,
  User,
  Clock,
} from "lucide-react";

/**
 * おまけ: Git / GitHub インタラクティブ解説
 *
 * 目的:
 *   コミット履歴・ブランチ・マージがどう視覚化されるかを、
 *   架空のリポジトリを題材に「1コミットずつ進めて」追体験できるようにする。
 *
 * 技術メモ:
 *   - 依存ゼロの SVG で描画。React の state でステップを管理。
 *   - 各コミットに lane（横方向の列）を割り当て、時系列で y を割る。
 *   - 親→子の接続は <path> で、同じ lane はまっすぐ、違う lane はベジェ曲線。
 *   - パフォーマンス: コミット数は数十程度なので素朴に O(n) で描画。
 *   - アクセシビリティ: ノードは <button>(role=graphics-symbol) で Tab 移動・Enter 選択可。
 */
export function GitDeepDive() {
  const [step, setStep] = useState(COMMITS.length); // 初期は全履歴表示
  const [selectedId, setSelectedId] = useState<string | null>("c12");

  // ブランチ別の色設定
  const branchColor = (branch: Branch) => BRANCH_META[branch].color;

  // ステップに応じて可視コミットを絞る
  const visibleCommits = useMemo(
    () => COMMITS.slice(0, step),
    [step],
  );
  const visibleIds = useMemo(
    () => new Set(visibleCommits.map((c) => c.id)),
    [visibleCommits],
  );

  const selected = COMMITS.find((c) => c.id === selectedId) ?? null;

  // SVG のサイズ
  const laneW = 80;
  const paddingX = 50;
  const laneCount = Math.max(...COMMITS.map((c) => c.lane)) + 1;
  const width = paddingX * 2 + laneW * laneCount;
  const rowH = 54;
  const paddingY = 30;
  const height = paddingY * 2 + rowH * COMMITS.length;

  const xOf = (lane: number) => paddingX + lane * laneW + laneW / 2;
  const yOf = (index: number) => paddingY + index * rowH + rowH / 2;

  const atStep = step;
  const onPrev = () => setStep((s) => Math.max(1, s - 1));
  const onNext = () => setStep((s) => Math.min(COMMITS.length, s + 1));
  const onReset = () => setStep(1);
  const onAll = () => setStep(COMMITS.length);

  // 現在のステップで選択中のコミットが見えなくなった場合、最新にフォールバック
  const selectedToShow =
    selected && visibleIds.has(selected.id)
      ? selected
      : visibleCommits[visibleCommits.length - 1] ?? null;

  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>Git / GitHub インタラクティブ解説</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          コミット履歴が『線でつながった絵』になる仕組みを、実際にクリックしながら追いかけるページです。
          <strong>main / develop / feature</strong> の3種類のブランチがどう枝分かれし、マージされるかを
          1コミットずつ再生できます。
        </p>
      </Callout>

      <h2>🌱 そもそも「コミット」って何？</h2>
      <p>
        <strong>コミット</strong>は、ある時点のプロジェクトの「スナップショット」です。
        毎回、ファイルの全状態を丸ごと保存しているわけではなく、
        <strong>前回との差分</strong> と、「親コミット」への参照だけを記録します。
        この親子関係をたどると、過去のどの時点にも戻れる仕組みです。
      </p>
      <ul>
        <li>
          通常のコミットには <strong>親が1つ</strong>（直前のコミット）
        </li>
        <li>
          ブランチを作った最初のコミットも <strong>親は1つ</strong>（分岐元の commit）
        </li>
        <li>
          <strong>マージコミット</strong>は特別で、
          親が <strong>2つ</strong> あります（合流した両方のブランチの先端）
        </li>
      </ul>

      <h2>🌿 ブランチは『ただのラベル』</h2>
      <p>
        <strong>ブランチ</strong>とは、あるコミットに貼られた「しおり」のようなものです。
        新しいコミットを作ると、ブランチのしおりが自動で最新の位置に進みます。
        だから <code>main</code> も <code>develop</code> も、実体はひもで結ばれたコミットの連なりで、
        名前は「その先端を指す印」にすぎません。
      </p>

      <div className="not-prose my-5 grid gap-2.5 sm:grid-cols-3">
        {(Object.keys(BRANCH_META) as Branch[]).map((b) => (
          <div
            key={b}
            className="flex items-center gap-3 rounded-md border border-border bg-card p-3"
            style={{ borderLeft: `4px solid ${BRANCH_META[b].color}` }}
          >
            <GitBranch size={18} style={{ color: BRANCH_META[b].color }} />
            <div>
              <div className="text-sm font-semibold">
                {BRANCH_META[b].label}
              </div>
              <div className="text-xs text-muted-foreground">
                {BRANCH_META[b].role}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>▶️ コミット履歴を1つずつ進めてみよう</h2>
      <p>
        下のグラフの <strong>「次へ」</strong> を押すと、
        コミットが1つずつ追加されていきます。丸をクリックすると、そのコミットの詳細（メッセージ・作者・親コミット）が右側に表示されます。
      </p>

      <div className="not-prose my-5 overflow-hidden rounded-md border border-border bg-card">
        {/* 操作バー */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-3 py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-1 text-xs hover:bg-secondary"
              aria-label="最初に戻る"
            >
              <RotateCcw size={12} /> 最初から
            </button>
            <button
              onClick={onPrev}
              disabled={atStep <= 1}
              className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-1 text-xs hover:bg-secondary disabled:opacity-40"
              aria-label="前のコミットへ"
            >
              <ChevronLeft size={12} /> 前へ
            </button>
            <button
              onClick={onNext}
              disabled={atStep >= COMMITS.length}
              className="inline-flex items-center gap-1 rounded border-0 !bg-primary px-2.5 py-1 text-xs font-semibold !text-primary-foreground hover:!bg-primary/90 disabled:opacity-40"
              aria-label="次のコミットへ"
            >
              <Play size={12} /> 次へ
            </button>
            <button
              onClick={onAll}
              className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-1 text-xs hover:bg-secondary"
              aria-label="全履歴表示"
            >
              全部表示
            </button>
          </div>
          <div className="font-mono text-[0.75rem] text-muted-foreground">
            {atStep} / {COMMITS.length}
          </div>
        </div>

        <div className="grid gap-0 md:grid-cols-[1fr_minmax(260px,320px)]">
          {/* SVGグラフ */}
          <div className="overflow-x-auto overflow-y-auto border-b border-border md:border-b-0 md:border-r">
            <svg
              role="img"
              aria-label="Git コミットグラフ"
              viewBox={`0 0 ${width} ${height}`}
              width={width}
              height={height}
              style={{ display: "block", minWidth: width, maxWidth: "100%" }}
            >
              {/* レーンのガイド線 */}
              {Array.from({ length: laneCount }).map((_, i) => (
                <line
                  key={`lane-${i}`}
                  x1={xOf(i)}
                  y1={paddingY - 10}
                  x2={xOf(i)}
                  y2={height - paddingY + 10}
                  stroke="hsl(30 10% 90%)"
                  strokeDasharray="2 4"
                  strokeWidth={1}
                />
              ))}

              {/* エッジ（親→子のライン） */}
              {COMMITS.filter((c) => visibleIds.has(c.id)).map((child) =>
                child.parents
                  .filter((pid) => visibleIds.has(pid))
                  .map((pid) => {
                    const parent = COMMITS.find((c) => c.id === pid)!;
                    const x1 = xOf(parent.lane);
                    const y1 = yOf(parent.index);
                    const x2 = xOf(child.lane);
                    const y2 = yOf(child.index);
                    // 同レーンなら直線、違うレーンなら曲線で
                    const strokeColor = branchColor(
                      // マージは子のブランチ色に寄せる
                      child.branch,
                    );
                    if (x1 === x2) {
                      return (
                        <line
                          key={`e-${pid}-${child.id}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={strokeColor}
                          strokeWidth={2.5}
                          strokeLinecap="round"
                        />
                      );
                    }
                    // ベジェ: 分岐 or マージの曲線
                    const midY = (y1 + y2) / 2;
                    const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
                    // 分岐元→子の場合 & マージの場合で色合い調整
                    const isMergeEdge = child.parents.length === 2 && pid === child.parents[1];
                    return (
                      <path
                        key={`e-${pid}-${child.id}`}
                        d={path}
                        fill="none"
                        stroke={isMergeEdge ? branchColor(parent.branch) : strokeColor}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeDasharray={isMergeEdge ? "0" : "0"}
                        opacity={isMergeEdge ? 0.85 : 1}
                      />
                    );
                  }),
              )}

              {/* コミットノード */}
              {COMMITS.map((c) => {
                const visible = visibleIds.has(c.id);
                const cx = xOf(c.lane);
                const cy = yOf(c.index);
                const color = branchColor(c.branch);
                const isSel = selectedToShow?.id === c.id;
                return (
                  <g
                    key={c.id}
                    style={{
                      cursor: visible ? "pointer" : "default",
                      opacity: visible ? 1 : 0.15,
                      transition: "opacity 0.3s ease",
                    }}
                    onClick={() => {
                      if (visible) setSelectedId(c.id);
                    }}
                    role="button"
                    aria-label={`コミット ${c.short}: ${c.message}`}
                  >
                    {/* 選択状態のリング */}
                    {isSel && visible && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={14}
                        fill="none"
                        stroke={color}
                        strokeWidth={2}
                        strokeOpacity={0.35}
                      />
                    )}
                    {/* コミット丸 */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={c.isMerge ? 8 : 7}
                      fill={c.isMerge ? "#ffffff" : color}
                      stroke={color}
                      strokeWidth={c.isMerge ? 3 : 2}
                    />
                    {/* メッセージ（右側に） */}
                    <text
                      x={xOf(laneCount - 1) + 30}
                      y={cy + 4}
                      fontSize={12}
                      fill="hsl(24 14% 20%)"
                      style={{ pointerEvents: "none" }}
                    >
                      <tspan fontFamily="monospace" opacity={0.6}>
                        {c.short}
                      </tspan>
                      <tspan dx={6}>{c.message}</tspan>
                    </text>
                    {/* タグ表示 */}
                    {c.tag && (
                      <g transform={`translate(${cx + 15}, ${cy - 10})`}>
                        <rect
                          x={0}
                          y={0}
                          width={c.tag.length * 7 + 12}
                          height={16}
                          rx={3}
                          fill="hsl(44 95% 60%)"
                        />
                        <text
                          x={6}
                          y={12}
                          fontSize={10}
                          fontWeight="bold"
                          fill="hsl(24 40% 20%)"
                          fontFamily="monospace"
                        >
                          🏷 {c.tag}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* レーンラベル（ヘッダ） */}
              {LANE_LABELS.map((label, i) => (
                <text
                  key={`label-${i}`}
                  x={xOf(i)}
                  y={paddingY - 14}
                  fontSize={11}
                  fontWeight="bold"
                  fill={label.color}
                  textAnchor="middle"
                >
                  {label.name}
                </text>
              ))}
            </svg>
          </div>

          {/* 詳細パネル */}
          <div className="min-w-0 bg-muted/20 p-4">
            {selectedToShow ? (
              <CommitDetail commit={selectedToShow} />
            ) : (
              <div className="text-sm text-muted-foreground">
                ノードをクリックすると、ここにコミットの詳細が表示されます。
              </div>
            )}
          </div>
        </div>
      </div>

      <Callout variant="tip" title="🌳 分岐とマージの見方">
        <ul className="!mt-2">
          <li>
            <strong>丸の縦並び</strong> = 同じブランチの時系列（下に行くほど最新）
          </li>
          <li>
            <strong>曲線で別レーンに飛ぶ</strong> = そこで <code>git branch</code> / <code>git checkout -b</code> した
          </li>
          <li>
            <strong>白い丸（中抜き）</strong> = <code>git merge</code> / Pull Request のマージコミット（親が2つ）
          </li>
          <li>
            <strong>🏷 タグ</strong> = <code>git tag v1.0.0</code> で打った不変の印。リリース管理に使う
          </li>
        </ul>
      </Callout>

      <h2>🔄 典型的な Git Flow（今回の題材）</h2>
      <p>
        上のグラフは、よくある「Git Flow」風のワークフローをなぞったものです。
        ざっくり流れを言葉にすると:
      </p>
      <ol>
        <li>
          <strong>main</strong> は「いつでも本番にデプロイできる状態」を保つ。普段は直接触らない。
        </li>
        <li>
          日々の開発は <strong>develop</strong> で進める（新機能が集まる場所）。
        </li>
        <li>
          機能ごとに <strong>feature/xxx</strong> ブランチを切り、作業が終わったら develop にマージ。
        </li>
        <li>
          区切りのよいところで develop を <strong>main にマージ</strong> して、タグ（例: <code>v1.0.0</code>）を付けてリリース。
        </li>
        <li>
          本番で緊急バグが出たら <strong>hotfix</strong> を main から直接切る（今回は c12 がそれ）。
        </li>
      </ol>

      <h2>📟 対応する Git コマンド</h2>
      <p>上のグラフで起きていることを、実際のコマンドで書くと次のようになります。</p>

      <div className="not-prose my-5 space-y-3">
        <CommandStep
          label="① develop ブランチを切る（c3）"
          cmd={`git checkout main
git pull
git checkout -b develop`}
        />
        <CommandStep
          label="② feature/login で作業して develop に合流（c4→c5→c6）"
          cmd={`git checkout develop
git checkout -b feature/login
# ... 編集してコミット ...
git add .
git commit -m "ログインフォーム実装"
git checkout develop
git merge feature/login`}
        />
        <CommandStep
          label="③ develop を main に合流してリリースタグを打つ（c11）"
          cmd={`git checkout main
git merge develop
git tag v1.0.0
git push origin main --tags`}
        />
        <CommandStep
          label="④ 本番の緊急修正を main に直接入れる（c12）"
          cmd={`git checkout main
git checkout -b hotfix/password-validation
# ... 修正してコミット ...
git checkout main
git merge hotfix/password-validation`}
        />
      </div>

      <h2>🌐 GitHub 側で起きること</h2>
      <p>
        手元で作ったブランチを <code>git push</code> すると、GitHub 側にも同じブランチができます。
        そのうえで <strong>Pull Request（PR）</strong> を作ると:
      </p>
      <ul>
        <li>コードの差分を GitHub 上で見られる（レビュー可能）</li>
        <li>コメントで議論でき、修正をそのままコミットで積み重ねられる</li>
        <li>『Merge pull request』ボタン = 手元の <code>git merge</code> と同じ結果</li>
      </ul>
      <p>
        ハッカソンでチーム開発するときは、
        <strong>feature ブランチ → PR → develop にマージ</strong> の流れを覚えておくと、
        お互いのコードを踏み潰さずに済みます。
      </p>

      <Callout variant="warn" title="よくある疑問">
        <p className="!mt-0">
          <strong>Q. コミットを消したいときは？</strong>
        </p>
        <p>
          A. <code>git revert &lt;commit&gt;</code>（取り消しコミットを新たに作る）が安全です。
          <code>git reset --hard</code> は履歴を書き換えてしまうので、共有ブランチでは絶対に使わないこと。
        </p>
        <p>
          <strong>Q. マージとリベース（rebase）の違いは？</strong>
        </p>
        <p>
          A. <strong>マージ</strong>は履歴を残したまま合流（白丸が増える）。
          <strong>リベース</strong>は履歴を『直線に書き換え』て、まるで1本道だったかのように見せる方式。
          見やすさと引き換えに歴史を上書きするため、個人ブランチにだけ使うのが鉄則です。
        </p>
      </Callout>

      <h2>🔍 自分のリポジトリで同じ絵を見るには</h2>
      <p>VSCode の拡張「Git Graph」や「GitLens」を入れると、自分のプロジェクトでも同じようなグラフが見られます。</p>
      <ul>
        <li>
          <strong>Git Graph</strong>: コマンドパレット（<kbd>Ctrl/Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>）で
          <code>Git Graph: View Git Graph</code> を実行
        </li>
        <li>
          <strong>コマンドだけでも見える</strong>: <code>git log --oneline --graph --all</code>
        </li>
      </ul>
      <p>
        詳しい拡張の紹介は「
        <a href="#/extra/vscode-plus">VSCode 推奨拡張（拡充版）</a>
        」のページにあります。
      </p>
    </div>
  );
}

/* ===== コミット詳細パネル ===== */
function CommitDetail({ commit }: { commit: CommitNode }) {
  const parentCommits = commit.parents
    .map((pid) => COMMITS.find((c) => c.id === pid))
    .filter((c): c is CommitNode => !!c);
  const childCommits = COMMITS.filter((c) => c.parents.includes(commit.id));
  const color = BRANCH_META[commit.branch].color;
  return (
    <div className="text-sm">
      <div className="mb-2 flex items-center gap-2">
        {commit.isMerge ? (
          <GitMerge size={16} style={{ color }} />
        ) : (
          <GitCommit size={16} style={{ color }} />
        )}
        <span
          className="rounded-full px-2 py-0.5 text-[0.7rem] font-bold"
          style={{
            backgroundColor: color + "20",
            color,
            border: `1px solid ${color}40`,
          }}
        >
          {BRANCH_META[commit.branch].label}
        </span>
        {commit.tag && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/30 px-2 py-0.5 text-[0.7rem] font-semibold">
            <Tag size={10} /> {commit.tag}
          </span>
        )}
      </div>
      <div className="mb-1 font-mono text-xs text-muted-foreground">
        {commit.short}
      </div>
      <div className="mb-3 text-base font-semibold leading-snug">
        {commit.message}
      </div>

      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        <User size={12} /> {commit.author}
      </div>
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock size={12} /> {commit.date}
      </div>

      {commit.description && (
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          {commit.description}
        </p>
      )}

      <div className="border-t border-border pt-2 text-xs">
        <div className="mb-1 font-semibold">親コミット（{parentCommits.length}）</div>
        {parentCommits.length === 0 ? (
          <div className="text-muted-foreground">なし（初回コミット）</div>
        ) : (
          <ul className="space-y-0.5">
            {parentCommits.map((p) => (
              <li key={p.id} className="font-mono text-[0.7rem] text-muted-foreground">
                {p.short} · {p.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-2 border-t border-border pt-2 text-xs">
        <div className="mb-1 font-semibold">子コミット（{childCommits.length}）</div>
        {childCommits.length === 0 ? (
          <div className="text-muted-foreground">なし（ブランチの先端）</div>
        ) : (
          <ul className="space-y-0.5">
            {childCommits.map((c) => (
              <li key={c.id} className="font-mono text-[0.7rem] text-muted-foreground">
                {c.short} · {c.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ===== コマンドステップカード ===== */
function CommandStep({ label, cmd }: { label: string; cmd: string }) {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="border-b border-border bg-muted/40 px-3 py-1.5 text-xs font-semibold">
        {label}
      </div>
      <pre className="m-0 overflow-x-auto bg-transparent p-3 text-xs leading-relaxed">
        <code>{cmd}</code>
      </pre>
    </div>
  );
}

/* ===== データ定義 ===== */
type Branch = "main" | "develop" | "feature-login" | "feature-cart" | "hotfix";

type CommitNode = {
  id: string;
  short: string;
  message: string;
  author: string;
  date: string;
  branch: Branch;
  parents: string[];
  lane: number;
  index: number;
  isMerge?: boolean;
  tag?: string;
  description?: string;
};

const BRANCH_META: Record<
  Branch,
  { label: string; color: string; role: string }
> = {
  main: {
    label: "main",
    color: "#2563eb", // blue
    role: "本番ブランチ。常にデプロイ可能な状態。",
  },
  develop: {
    label: "develop",
    color: "#16a34a", // green
    role: "開発ブランチ。新機能が集まる場所。",
  },
  "feature-login": {
    label: "feature/login",
    color: "#d97706", // orange
    role: "機能開発ブランチ（ログイン機能）。",
  },
  "feature-cart": {
    label: "feature/cart",
    color: "#9333ea", // purple
    role: "機能開発ブランチ（カート機能）。",
  },
  hotfix: {
    label: "hotfix",
    color: "#dc2626", // red
    role: "緊急修正用。main から直接切る。",
  },
};

const LANE_LABELS: { name: string; color: string }[] = [
  { name: "main", color: "#2563eb" },
  { name: "develop", color: "#16a34a" },
  { name: "feature/cart", color: "#9333ea" },
  { name: "feature/login", color: "#d97706" },
];

// lane 割り当て:
//   0 = main
//   1 = develop
//   2 = feature-cart（右ほど枝）
//   3 = feature-login
const COMMITS: CommitNode[] = [
  {
    id: "c1",
    short: "a0c1f11",
    message: "Initial commit: README 追加",
    author: "tanaka",
    date: "2026-04-01 10:00",
    branch: "main",
    parents: [],
    lane: 0,
    index: 0,
    description: "プロジェクトの最初のコミット。README.md を1行だけ追加した。",
  },
  {
    id: "c2",
    short: "b1d2e22",
    message: "プロジェクト雛形を配置",
    author: "tanaka",
    date: "2026-04-02 14:20",
    branch: "main",
    parents: ["c1"],
    lane: 0,
    index: 1,
  },
  {
    id: "c3",
    short: "c2e3f33",
    message: "develop ブランチ作成",
    author: "tanaka",
    date: "2026-04-03 09:10",
    branch: "develop",
    parents: ["c2"],
    lane: 1,
    index: 2,
    description:
      "`git checkout -b develop` で develop を作成。以降の開発はここで行う。",
  },
  {
    id: "c4",
    short: "d3f4044",
    message: "feature/login: 骨格",
    author: "sato",
    date: "2026-04-04 11:30",
    branch: "feature-login",
    parents: ["c3"],
    lane: 3,
    index: 3,
    description: "ログイン機能用の feature ブランチを develop から切って作業開始。",
  },
  {
    id: "c5",
    short: "e4051a5",
    message: "ログインフォーム実装",
    author: "sato",
    date: "2026-04-05 16:45",
    branch: "feature-login",
    parents: ["c4"],
    lane: 3,
    index: 4,
  },
  {
    id: "c6",
    short: "f5162b6",
    message: "Merge: feature/login → develop",
    author: "tanaka",
    date: "2026-04-06 10:00",
    branch: "develop",
    parents: ["c3", "c5"],
    lane: 1,
    index: 5,
    isMerge: true,
    description:
      "PR #1 をマージ。親は『develop の先端(c3)』と『feature/login の先端(c5)』の2つ。",
  },
  {
    id: "c7",
    short: "06273c7",
    message: "feature/cart: 設計メモ",
    author: "yamada",
    date: "2026-04-07 13:20",
    branch: "feature-cart",
    parents: ["c6"],
    lane: 2,
    index: 6,
    description: "カート機能用のブランチを develop から分岐。",
  },
  {
    id: "c8",
    short: "17384d8",
    message: "develop: 小修正（typo）",
    author: "tanaka",
    date: "2026-04-08 09:00",
    branch: "develop",
    parents: ["c6"],
    lane: 1,
    index: 7,
    description:
      "develop に直接積んだ小さな修正。並行して feature/cart が進行中なので後で合流が必要になる。",
  },
  {
    id: "c9",
    short: "28495e9",
    message: "カート機能実装",
    author: "yamada",
    date: "2026-04-09 18:20",
    branch: "feature-cart",
    parents: ["c7"],
    lane: 2,
    index: 8,
  },
  {
    id: "c10",
    short: "395a6f0",
    message: "Merge: feature/cart → develop",
    author: "tanaka",
    date: "2026-04-10 11:10",
    branch: "develop",
    parents: ["c8", "c9"],
    lane: 1,
    index: 9,
    isMerge: true,
    description:
      "PR #2 をマージ。develop の先端(c8)と feature/cart の先端(c9)を合流させた。",
  },
  {
    id: "c11",
    short: "4a6b701",
    message: "Merge: develop → main（リリース）",
    author: "tanaka",
    date: "2026-04-12 15:00",
    branch: "main",
    parents: ["c2", "c10"],
    lane: 0,
    index: 10,
    isMerge: true,
    tag: "v1.0.0",
    description:
      "develop がまとまったので main に合流し、v1.0.0 タグを打ってリリース。",
  },
  {
    id: "c12",
    short: "5b7c812",
    message: "hotfix: パスワードバリデーション修正",
    author: "tanaka",
    date: "2026-04-13 22:05",
    branch: "hotfix",
    parents: ["c11"],
    lane: 0,
    index: 11,
    description:
      "本番で発覚したバグ。main から直接 hotfix ブランチを切って修正し、そのまま main に戻した。",
  },
];
