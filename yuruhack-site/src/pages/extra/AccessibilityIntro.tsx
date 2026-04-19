import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";
import { Eye, Keyboard, Volume2, Contrast } from "lucide-react";
import { CopyBlock } from "@/components/CopyBlock";

const ALT_GOOD = `<img src="avatar.png" alt="笑顔のたろうのアバター">
<button aria-label="メニューを開く">
  <svg><!-- ハンバーガーアイコン --></svg>
</button>`;

const HEADINGS = `<h1>ページのタイトル</h1>
  <h2>大きなセクション</h2>
    <h3>サブセクション</h3>
  <h2>次の大きなセクション</h2>`;

export function AccessibilityIntro() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>アクセシビリティ入門（a11y）</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          <strong>アクセシビリティ（a11y）</strong>は『誰でも使えるように作る』という発想。
          視覚や運動機能に制約がある人、年配の人、スマホ片手の忙しい人、
          電車の中で音を出せない人 — <strong>全員が『困りうる誰か』</strong>です。
          最低限の配慮で大半の困りごとは防げます。
        </p>
      </Callout>

      <h2>誰のため？</h2>
      <FadeIn>
        <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
          <Persona
            icon={<Eye size={18} className="text-primary" />}
            label="スクリーンリーダー利用者"
            body="視覚障害のある方が使う読み上げソフト。HTML の構造どおりに読み上げます。"
          />
          <Persona
            icon={<Keyboard size={18} className="text-primary" />}
            label="キーボードだけで操作する人"
            body="マウスが使いづらい人・開発者（効率派）は Tab キーで遷移します。"
          />
          <Persona
            icon={<Volume2 size={18} className="text-primary" />}
            label="音を出せない環境の人"
            body="電車・図書館・夜中。動画には字幕（キャプション）が必要。"
          />
          <Persona
            icon={<Contrast size={18} className="text-primary" />}
            label="色覚多様性・低視力の人"
            body="赤緑が判別しづらい人もいる。色『だけ』で意味を伝えない。"
          />
        </div>
      </FadeIn>

      <h2>最低限の 5 原則</h2>

      <h3>1) 画像に alt を付ける</h3>
      <p>
        画像の意味を、文字でも伝える。写真が表示されない時の代替にもなる。
      </p>
      <CopyBlock code={ALT_GOOD} filename="alt / aria-label の例" />
      <p className="text-sm text-muted-foreground">
        純粋な装飾画像（意味のないライン等）は <code>alt=""</code> と<strong>空にする</strong>のが正解。
        読み上げから除外される。
      </p>

      <h3>2) 見出しの階層を守る</h3>
      <p>
        h1 → h2 → h3 の順に。スキップしない（h1 → h3 はダメ）。
        読み上げソフトは『目次』として見出しを辿るので、階層が崩れると迷子になります。
      </p>
      <CopyBlock code={HEADINGS} filename="良い見出し構造" />

      <h3>3) コントラストを確保する</h3>
      <p>
        文字と背景の明度差は <strong>4.5:1 以上</strong>（普通テキスト）。
        薄いグレー on 白・オレンジ on オレンジ（今日のサイトでやりかけた事故）はNG。
      </p>
      <p className="text-sm text-muted-foreground">
        チェックツール:{" "}
        <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noreferrer">
          WebAIM Contrast Checker
        </a>
      </p>

      <h3>4) キーボードで操作できる</h3>
      <ul>
        <li><kbd>Tab</kbd> で順に移動、<kbd>Enter</kbd>/<kbd>Space</kbd> で決定</li>
        <li>今フォーカスしている要素に<strong>見える枠（focus ring）</strong>を出す — 消さない</li>
        <li>クリックできる要素は <code>&lt;button&gt;</code> か <code>&lt;a&gt;</code> を使う（div に onClick は a11y で罠）</li>
      </ul>

      <h3>5) 意味を色『だけ』に頼らない</h3>
      <ul>
        <li>エラーを赤字だけで示さず、❌ マークや『エラー: 』のラベルも添える</li>
        <li>グラフは色＋形（線種）で区別</li>
      </ul>

      <Callout variant="tip" title="減らない努力と、目に見える効果">
        アクセシビリティは『対応したからといってすぐ売上が伸びる』類ではないですが、
        以下の効果があります。
        <ul>
          <li>🔍 SEO（検索エンジン）に強くなる（同じ原理で構造を読むため）</li>
          <li>📱 スマホ・タブレット・車の中・屋外でも使いやすくなる</li>
          <li>🦾 年をとった自分も助かる</li>
        </ul>
      </Callout>

      <h2>自動チェックの入口</h2>
      <ul>
        <li>
          <strong>Chrome DevTools → Lighthouse → Accessibility</strong>
          に点数が出る。まずここで 90 点を目指すと下地が整う。
        </li>
        <li>
          <strong>axe DevTools</strong>（拡張機能）はより詳細な指摘をくれる。
        </li>
      </ul>
    </div>
  );
}

function Persona({
  icon,
  label,
  body,
}: {
  icon: React.ReactNode;
  label: string;
  body: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <div className="font-semibold text-[0.95rem]">{label}</div>
      </div>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
