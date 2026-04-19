import { useEffect, useState } from "react";
import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";
import { HelpCircle, FileX, GitCommit, Users, History } from "lucide-react";

/**
 * おまけ: バージョン管理のありがたみ
 *
 * 『なんで Git を使うの？』に学生目線で答える章。
 * 『ファイルを最終版_最終_本当の最終.docx みたいにしがち事件』を
 * ランダムに生成するシミュレータ付き。
 */

const FAKE_NAMES = [
  "卒論.docx",
  "卒論_改.docx",
  "卒論_改2.docx",
  "卒論_最終.docx",
  "卒論_本当の最終.docx",
  "卒論_最終_これで決定.docx",
  "卒論_最終_教授フィードバック反映.docx",
  "卒論_最終_本当にこれ.docx",
  "卒論_FINAL_v2.docx",
  "卒論_FINAL_v2_本当にこれ.docx",
  "卒論_提出用.docx",
  "卒論_提出用_直前修正.docx",
];

export function VcsMotivation() {
  const [files, setFiles] = useState<string[]>(FAKE_NAMES.slice(0, 4));
  const [idx, setIdx] = useState(4);

  useEffect(() => {
    if (idx >= FAKE_NAMES.length) return;
    const t = setInterval(() => {
      setFiles((prev) => [...prev, FAKE_NAMES[idx]]);
      setIdx((i) => i + 1);
    }, 900);
    return () => clearInterval(t);
  }, [idx]);

  const reset = () => {
    setFiles(FAKE_NAMES.slice(0, 4));
    setIdx(4);
  };

  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>なぜ Git を使うの？（VCS のありがたみ）</h1>

      <Callout variant="info" title="素朴な疑問">
        <p className="!mt-0">
          <strong>『Ctrl+S で保存するだけじゃダメなの？』</strong>
          <strong>『Google ドライブで十分じゃない？』</strong> —
          とても健全な問い。答えを先にいうと、『チームで・履歴を残しながら・気軽に戻せる』
          の全部が揃う道具が Git なんです。
        </p>
      </Callout>

      <h2>Git なしで起きがちな事件</h2>
      <FadeIn>
        <div className="not-prose my-5 rounded-md border border-amber-500/40 bg-amber-500/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-300">
            <FileX size={16} /> フォルダの中身シミュレータ
          </div>
          <ul className="grid gap-1 text-sm font-mono">
            {files.map((f, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-amber-900 dark:text-amber-200"
                style={{
                  animation: "fadeUp .5s ease both",
                  animationDelay: `${Math.min(i, 10) * 0.04}s`,
                }}
              >
                <span className="inline-block w-4 text-amber-600">📄</span> {f}
              </li>
            ))}
          </ul>
          {idx >= FAKE_NAMES.length && (
            <button
              type="button"
              onClick={reset}
              className="mt-4 rounded-md border border-amber-500/60 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-900 hover:bg-amber-500/20 dark:text-amber-200"
            >
              もう一度見る
            </button>
          )}
          <p className="mt-3 text-xs text-amber-900/80 dark:text-amber-300/80">
            …実話、ありませんか？
          </p>
        </div>
      </FadeIn>

      <h2>Git が解決してくれること</h2>
      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <Benefit
          icon={<History size={18} className="text-primary" />}
          title="いつでも過去に戻れる"
          body="『5 日前の動いていた状態に戻したい』が 1 コマンドで実現。ファイル名に日付を付けて保存する必要なし。"
        />
        <Benefit
          icon={<GitCommit size={18} className="text-primary" />}
          title="誰がいつ何を変えたか追える"
          body="変更ごとにメッセージが付くので、後から読んでも意図がわかる。『犯人探し』ではなく『学び』として使える。"
        />
        <Benefit
          icon={<Users size={18} className="text-primary" />}
          title="複数人で同じコードを触れる"
          body="別々の機能を同時並行で作って、後で自動マージ。ぶつかれば教えてくれる（マージコンフリクト）。"
        />
        <Benefit
          icon={<HelpCircle size={18} className="text-primary" />}
          title="『試しにやってみる』が怖くない"
          body="ブランチを切って実験、失敗したら捨てるだけ。本番に影響しない。"
        />
      </div>

      <h2>Google ドライブとの違い</h2>
      <div className="not-prose my-5 overflow-hidden rounded-md border border-border text-sm">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold"></th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Google ドライブ</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">Git + GitHub</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-3 py-2 font-medium">履歴</td>
              <td className="px-3 py-2 text-muted-foreground">あるが個別ファイル単位、粒度が荒い</td>
              <td className="px-3 py-2 text-muted-foreground">プロジェクト全体・コミット単位・メッセージ付き</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">同時編集</td>
              <td className="px-3 py-2 text-muted-foreground">リアルタイムで強い</td>
              <td className="px-3 py-2 text-muted-foreground">非同期で分岐→合流。コードに向く</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">レビュー</td>
              <td className="px-3 py-2 text-muted-foreground">コメント機能のみ</td>
              <td className="px-3 py-2 text-muted-foreground">PR で差分に対してコメント・承認制</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">大量ファイル</td>
              <td className="px-3 py-2 text-muted-foreground">同期が遅くなる</td>
              <td className="px-3 py-2 text-muted-foreground">.gitignore で除外。軽い</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">向いているもの</td>
              <td className="px-3 py-2 text-muted-foreground">ドキュメント・資料・共有</td>
              <td className="px-3 py-2 text-muted-foreground">ソースコード・構成ファイル</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout variant="tip" title="Git が向かない場面もある">
        <p className="!mt-0">
          動画や大きなバイナリファイルは苦手。LFS（Large File Storage）など別の仕組みが要ります。
          『コード中心のプロジェクトに最強』と覚えれば十分。
        </p>
      </Callout>

      <h2>ざっくり歴史の話</h2>
      <ul>
        <li>Linux カーネル（巨大ソフト）の開発のために 2005 年に Linus Torvalds が作った</li>
        <li>『分散型（みんなが履歴を全部持つ）』が当時の新しさ</li>
        <li>GitHub が 2008 年に出て、Web で扱いやすくなり一気に世界標準に</li>
      </ul>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Benefit({
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
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <div className="font-semibold text-[0.95rem]">{title}</div>
      </div>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
