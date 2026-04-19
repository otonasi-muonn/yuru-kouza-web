import { useState } from "react";
import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";
import { Image as ImageIcon } from "lucide-react";

/**
 * おまけ: 画像の扱い
 * ファイル形式の違い、サイズ感、相対パスの罠、OGP、altテキストまで。
 */

const FORMAT_ROWS = [
  {
    fmt: "PNG",
    ex: ".png",
    pros: "透過OK、無劣化。アイコン・スクショに最適",
    cons: "写真だと重くなりがち",
    size: "小〜中",
  },
  {
    fmt: "JPEG",
    ex: ".jpg / .jpeg",
    pros: "写真に最適。圧縮率高い",
    cons: "透過なし、編集で劣化が蓄積",
    size: "小〜中",
  },
  {
    fmt: "WebP",
    ex: ".webp",
    pros: "PNG/JPEG のいいとこ取り。軽い",
    cons: "古いツールだと対応が弱いことも",
    size: "小",
  },
  {
    fmt: "SVG",
    ex: ".svg",
    pros: "ベクター（拡大しても綺麗）。ロゴ向き",
    cons: "写真には向かない",
    size: "極小",
  },
  {
    fmt: "GIF",
    ex: ".gif",
    pros: "動く画像。短い動画の代替",
    cons: "色数・画質が弱い、ファイルは重い",
    size: "中〜大",
  },
];

export function ImageHandling() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>画像の扱い</h1>

      <Callout variant="info" title="このページについて">
        『画像が表示されない』『リポジトリが巨大になった』『ぼやけて見える』
        — このあたりの事故は、形式・サイズ・パスの基本を知ると一気に減ります。
      </Callout>

      <h2>📐 形式の早見表</h2>
      <div className="not-prose my-5 overflow-hidden rounded-md border border-border text-sm">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">形式</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">拡張子</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">得意</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">苦手</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">サイズ感</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {FORMAT_ROWS.map((r) => (
              <tr key={r.fmt}>
                <td className="px-3 py-2 font-semibold">{r.fmt}</td>
                <td className="px-3 py-2 font-mono text-[0.82rem]">{r.ex}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.pros}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.cons}</td>
                <td className="px-3 py-2">{r.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout variant="tip" title="迷ったら">
        <ul className="!mt-2">
          <li>📸 写真 → JPEG（品質 80〜85%）</li>
          <li>🖼️ スクショ・図・UI → PNG</li>
          <li>✨ ロゴ・アイコン → SVG</li>
          <li>⚡ Web で配るなら WebP に統一するのも手</li>
        </ul>
      </Callout>

      <h2>📏 サイズ感（解像度）</h2>
      <FadeIn>
        <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
          <SizeCard label="アバター / ロゴ" size="256×256" hint="表示サイズの 2 倍で用意すれば Retina 対応" />
          <SizeCard label="README ヘッダ" size="1280×300" hint="横長バナー。3MB 未満推奨" />
          <SizeCard label="スクリーンショット" size="1920×1080" hint="そのまま貼らず、1000px 以下に縮小" />
        </div>
      </FadeIn>

      <Callout variant="warn" title="『4K そのまま置く』はやらない">
        <p className="!mt-0">
          スマホで撮った写真は 4000×3000 = 数 MB あるのが普通。
          README 用に 800〜1200px の横幅に縮めてから置きましょう。
          <strong>リポジトリに一度入れた巨大ファイルは Git の履歴に残り続ける</strong>
          ので、後から消しても容量は減りません。
        </p>
      </Callout>

      <h2>🖼️ 縮小の方法</h2>
      <ul>
        <li>
          <strong>オンライン</strong>:{" "}
          <a href="https://squoosh.app/" target="_blank" rel="noreferrer">
            Squoosh
          </a>（Google 製、ブラウザだけで完結）
        </li>
        <li>
          <strong>macOS のプレビュー</strong>: ツール → サイズを調整。
        </li>
        <li>
          <strong>Windows のペイント</strong>: ファイル → サイズ変更。
        </li>
        <li>
          <strong>コマンド派</strong>: <code>sips</code>（macOS）や{" "}
          <code>ffmpeg</code> / ImageMagick。
        </li>
      </ul>

      <h2>🛤️ パスの罠</h2>
      <div className="not-prose my-5 space-y-3">
        <PathCase
          bad="![avatar](/images/avatar.png)"
          good="![avatar](./images/avatar.png)"
          why="先頭スラッシュは『サイトのルート』を指すので、ローカル README では別物を指してしまう。"
        />
        <PathCase
          bad="![avatar](Images/Avatar.PNG)"
          good="![avatar](images/avatar.png)"
          why="大文字小文字が揃っていない。GitHub や Linux サーバー上では大小で別ファイル扱い。"
        />
        <PathCase
          bad="![avatar](C:\\Users\\me\\avatar.png)"
          good="![avatar](./images/avatar.png)"
          why="PC のフルパスを書いても、GitHub 側からは見えない。必ず相対パスで。"
        />
      </div>

      <h2>📝 alt テキスト（代替テキスト）</h2>
      <p>
        <code>![ここが alt](./foo.png)</code> の<strong>ここが alt</strong>{" "}
        に、画像の説明を日本語で書きます。
        画像が表示されない時・スクリーンリーダーで読み上げる時の『代わりの文章』になります。
        アクセシビリティの話は{" "}
        <a href="#/extra/accessibility-intro">アクセシビリティ入門</a> に。
      </p>

      <Callout variant="info" title="OGP 画像（Twitter カード）">
        <p className="!mt-0">
          自作サイトを SNS に貼ると出る『サムネ付きカード』は、
          HTML の <code>&lt;meta property="og:image" ... /&gt;</code>{" "}
          で指定した画像が使われます。
          推奨サイズは <strong>1200×630</strong>、2MB 以下。
        </p>
      </Callout>
    </div>
  );
}

function SizeCard({ label, size, hint }: { label: string; size: string; hint: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-4 text-center">
      <ImageIcon size={18} className="mx-auto mb-2 text-primary" />
      <div className="font-semibold text-[0.95rem]">{label}</div>
      <div className="my-1 font-mono text-lg">{size}</div>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function PathCase({ bad, good, why }: { bad: string; good: string; why: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="rounded-md border border-red-500/30 bg-red-500/5 p-3 font-mono text-[0.82rem]">
          ❌ {bad}
        </div>
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 font-mono text-[0.82rem]">
          ✅ {good}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="w-full border-t border-border bg-muted/30 px-4 py-2 text-left text-xs text-muted-foreground hover:bg-muted/50"
      >
        {show ? "▼ 理由を閉じる" : "▶︎ なぜダメなのか？"}
      </button>
      {show && (
        <div className="border-t border-border bg-background px-4 py-3 text-sm text-muted-foreground">
          {why}
        </div>
      )}
    </div>
  );
}
