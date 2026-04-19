import { useState } from "react";
import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";

type License = {
  id: string;
  name: string;
  short: string;
  commercial: boolean;
  share: "要同条件" | "不要" | "コピーレフト";
  credit: boolean;
  patent: boolean;
  summary: string;
  when: string;
};

const LICENSES: License[] = [
  {
    id: "mit",
    name: "MIT License",
    short: "MIT",
    commercial: true,
    share: "不要",
    credit: true,
    patent: false,
    summary:
      "一番ゆるい。名前とライセンス文さえ残してくれれば商用でも自由に使って OK。迷ったらこれ。",
    when: "個人・スタートアップ・ライブラリ全般。React や Vite もこの系統。",
  },
  {
    id: "apache2",
    name: "Apache-2.0",
    short: "Apache 2.0",
    commercial: true,
    share: "不要",
    credit: true,
    patent: true,
    summary:
      "MIT に『特許の扱い』と『変更の明示』を足したビジネス向け。企業が安心して使える。",
    when: "社会基盤になるようなライブラリ。Android OS もこれ。",
  },
  {
    id: "bsd3",
    name: "BSD 3-Clause",
    short: "BSD 3",
    commercial: true,
    share: "不要",
    credit: true,
    patent: false,
    summary:
      "MIT に『著者名を広告に使わないで』を足したバージョン。研究系プロジェクトで多い。",
    when: "大学発のソフト、歴史あるライブラリ。",
  },
  {
    id: "gpl3",
    name: "GPL-3.0",
    short: "GPL v3",
    commercial: true,
    share: "要同条件",
    credit: true,
    patent: true,
    summary:
      "改造して配布する時は同じ GPL にする縛り（コピーレフト）。商用でも使えるが、組み込んだら自分のコードも公開義務。",
    when: "『自由ソフトウェアの輪を広げたい』作者が選ぶ。Linux カーネルもこれ。",
  },
  {
    id: "cc0",
    name: "CC0 (Public Domain)",
    short: "CC0",
    commercial: true,
    share: "不要",
    credit: false,
    patent: false,
    summary:
      "著作権を放棄して『好きに使って』宣言。クレジット表記すら不要。",
    when: "素材・効果音・アイコン集など、『使ってもらうこと自体が目的』の物。",
  },
  {
    id: "ccby",
    name: "CC BY 4.0",
    short: "CC BY",
    commercial: true,
    share: "不要",
    credit: true,
    patent: false,
    summary:
      "Creative Commons の基本形。クレジット表記さえすれば商用も改変もOK。コードというより作品向け。",
    when: "イラスト・写真・記事。画像素材で多い。",
  },
  {
    id: "none",
    name: "ライセンス記載なし",
    short: "なし",
    commercial: false,
    share: "コピーレフト",
    credit: false,
    patent: false,
    summary:
      "ライセンスを書かない = デフォルトで『全ての権利を著者が保持』。他人は法律上使えない。",
    when: "『公開したつもり』で実は使えない状態。公開するなら必ず何かを明示する。",
  },
];

export function LicenseIntro() {
  const [open, setOpen] = useState<string | null>("mit");
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>ライセンス入門</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          コードや素材を公開するときに添える『使っていいよ』の宣言が<strong>ライセンス</strong>です。
          書かないと法律上『全部禁止』と同じ扱い。
          迷ったら <strong>MIT</strong> を選んでおけば、ほぼ全ての初学者プロジェクトで問題ありません。
        </p>
      </Callout>

      <h2>選び方フローチャート（ざっくり）</h2>
      <FadeIn>
        <div className="not-prose my-5 rounded-md border border-border bg-card p-4">
          <ol className="space-y-2 text-sm">
            <li>
              1. 商用利用 <strong>も</strong> 改造 <strong>も</strong> 好きにどうぞ? →{" "}
              <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-primary">MIT</span>
            </li>
            <li>
              2. 上に加えて『特許リスク』も書類で縛っておきたい? →{" "}
              <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-primary">Apache-2.0</span>
            </li>
            <li>
              3. 派生した物も『必ず同じ自由ライセンス』で出してほしい? →{" "}
              <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-primary">GPL-3.0</span>
            </li>
            <li>
              4. 完全に著作権放棄していい? →{" "}
              <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-primary">CC0</span>
            </li>
            <li>
              5. コード以外の作品（画像・文章）? →{" "}
              <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-primary">CC BY 4.0</span>
            </li>
          </ol>
        </div>
      </FadeIn>

      <h2>主要ライセンス比較</h2>
      <div className="not-prose my-5 space-y-3">
        {LICENSES.map((l) => {
          const isOpen = open === l.id;
          return (
            <div key={l.id} className="overflow-hidden rounded-md border border-border bg-card">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : l.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                    {l.short}
                  </div>
                  <div className="font-semibold">{l.name}</div>
                </div>
                <div className="flex items-center gap-2 text-[0.7rem] text-muted-foreground">
                  <Flag ok={l.commercial} label="商用" />
                  <Flag ok={l.patent} label="特許" />
                  <Flag ok={l.credit} label="表記" />
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-border bg-background px-4 py-3 text-sm">
                  <p className="mb-2">{l.summary}</p>
                  <p className="text-xs text-muted-foreground">
                    <strong>どんな時に:</strong> {l.when}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    改造物の扱い: <strong>{l.share}</strong>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Callout variant="warn" title="他人のコードを使う時">
        <p className="!mt-0">
          GitHub でコピペ元を見つけた時は、必ず <code>LICENSE</code> ファイルを確認。
          書いていない = 法律上使えない（グレーゾーンではなく黒）。
          企業の業務に持ち込む時は特に厳格です。
        </p>
      </Callout>

      <Callout variant="tip" title="GitHub での付け方">
        <ol className="!my-2">
          <li>リポジトリの Add file → Create new file</li>
          <li>名前を <code>LICENSE</code> とすると右上に『Choose a license template』ボタン</li>
          <li>テンプレ選択で本文が自動で入る</li>
        </ol>
      </Callout>
    </div>
  );
}

function Flag({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 ${
        ok
          ? "bg-emerald-500/10 text-emerald-600"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {ok ? "✓" : "—"} {label}
    </span>
  );
}
