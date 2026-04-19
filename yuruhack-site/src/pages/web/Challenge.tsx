import { Callout, StepMeta } from "@/components/Callout";
import { ProgressCheck } from "@/components/ProgressCheck";
import { CopyBlock } from "@/components/CopyBlock";
import { PageNav } from "@/components/NextLink";
import { Sparkles } from "lucide-react";

const BADGE_EXAMPLE = `![GitHub followers](https://img.shields.io/github/followers/<ユーザー名>?label=Follow&style=social)
`;

const STATS_EXAMPLE = `![My GitHub stats](https://github-readme-stats.vercel.app/api?username=<ユーザー名>&show_icons=true&theme=default)
`;

const IMAGE_EXAMPLE = `![プロフィール画像](./images/avatar.png)
`;

const DECO_SAMPLE = `# 🎨 自己紹介

## わたしの3行

> 「とりあえず作ってみる」が信条。
> 最近の興味は **Web アプリ** と *ゲーム AI*。
> 好きな言語: \`TypeScript\`、\`Python\`

## 好きなもの（上位 3 つ）

1. **コーヒー** — 一日の始まりに欠かせない
2. **音ゲー** — リズム感を鍛えたい
3. **猫** — 画面の横にいてほしい

## リンク

- GitHub: [<ユーザー名>](https://github.com/<ユーザー名>)
- Web: [https://example.com](https://example.com)
`;

export function Challenge() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-primary">Web班 · 5/5</div>
      <h1>ミニチャレンジ（装飾・画像）</h1>

      <StepMeta
        goal="README にもう一手間加えて、自分らしい見た目にする"
        time="約 15〜20 分"
        prev={{ path: "/web/04-commit-push", label: "Commit & Push" }}
      />

      <Callout variant="tip" title="完走おめでとう！ここからは自由時間">
        <p className="!mt-0">
          ここまで来られた人は、基本はクリアです。
          ここからは「自分の色」を出して README を育てていきましょう。
          物足りなければ <a href="#/extra/html-css-basics">HTML/CSS 基礎</a> に進むのもアリ。
        </p>
      </Callout>

      <h2>装飾アイデア（ちょっと凝った見た目）</h2>
      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <IdeaCard
          title="見出しに絵文字"
          body="見出しの冒頭に 🎮 や 🌸 を添えるだけで、視覚的にぐっと親しみやすくなります。"
        />
        <IdeaCard
          title="引用（>）を使う"
          body="好きな言葉や自己紹介を引用ブロックで書くと、目立ちます。"
        />
        <IdeaCard
          title="太字と斜体の使い分け"
          body="**太字** は強調、*斜体* はニュアンスの違う言葉に。使いすぎ注意。"
        />
        <IdeaCard
          title="番号付きリスト"
          body="順位やステップは 1. 2. 3. の番号付きリストが読みやすい。"
        />
      </div>

      <h3>貼り付けて遊べるサンプル</h3>
      <CopyBlock code={DECO_SAMPLE} filename="README.md （装飾サンプル）" />

      <h2>画像を入れる</h2>
      <p>
        README に画像を入れる方法は 2 種類あります。
      </p>

      <h3>方法A: リポジトリに画像ファイルを置く</h3>
      <ol>
        <li>
          VSCode のエクスプローラで右クリック → <strong>「新しいフォルダー」</strong> →{" "}
          <code>images</code> という名前のフォルダを作る。
        </li>
        <li>
          好きな画像ファイル（例: <code>avatar.png</code>）をその中にドラッグ＆ドロップで追加。
        </li>
        <li>
          README に以下のように書くと画像が表示されます。
        </li>
      </ol>
      <CopyBlock code={IMAGE_EXAMPLE} filename="README.md（相対パスで画像参照）" />

      <h3>方法B: 外部URLを貼る</h3>
      <p>
        すでに Web 上にある画像なら、URL をそのまま書くだけでもOK。
      </p>
      <CopyBlock
        code={`![ねこ](https://placekitten.com/400/240)
`}
        filename="README.md（URL から読み込む）"
      />

      <h2>GitHub のバッジ・統計</h2>
      <p>
        README でよく見る「緑のバッジ」や「スコア風パネル」もコピペで付けられます。
      </p>
      <CopyBlock code={BADGE_EXAMPLE} filename="フォロワー数バッジ" />
      <CopyBlock code={STATS_EXAMPLE} filename="GitHub Stats カード" />
      <p className="text-sm text-muted-foreground">
        どちらも URL 中の <code>&lt;ユーザー名&gt;</code> を自分のものに書き換えてから保存・コミット・プッシュ。
      </p>

      <h2>絵文字の使い方</h2>
      <p>
        README では <code>:wave:</code> のようなコロン記法で絵文字を書けます。
        そのまま 👋 のような絵文字を貼ってもOK。
      </p>
      <p>
        使える絵文字の一覧は{" "}
        <a href="https://emoji-cheat-sheet.com/" target="_blank" rel="noreferrer">
          emoji-cheat-sheet.com
        </a>{" "}
        が参考になります。
      </p>

      <Callout variant="warn" title="装飾したら、必ずコミット→プッシュ">
        <p className="!mt-0">
          VSCode で保存しただけでは GitHub には反映されません。
          <a href="#/web/04-commit-push"> Commit & Push </a>
          の手順をもう一度繰り返して、プロフィール画面で確認しましょう。
        </p>
      </Callout>

      <h2>よくあるつまずき</h2>
      <ul>
        <li>
          <strong>画像のパスが違って表示されない</strong> →{" "}
          <code>./images/avatar.png</code> のように、<code>./</code> から書くのが分かりやすい。
          大文字小文字も厳密に。
        </li>
        <li>
          <strong>画像ファイルをコミットし忘れている</strong> →{" "}
          ソース管理タブに画像が表示されているか確認。ステージング →
          コミット → プッシュまでやって初めて GitHub 側に届きます。
        </li>
        <li>
          <strong>バッジの数字が 0 のまま</strong> →{" "}
          GitHub Stats や Shields.io は数分〜数時間のキャッシュがかかります。
          焦らず時間を置いて再読込。
        </li>
      </ul>

      <div className="not-prose mt-8 rounded-lg border border-accent/40 bg-accent/10 p-5">
        <div className="mb-2 flex items-center gap-2 font-semibold">
          <Sparkles size={16} className="text-accent-foreground" />
          ここまでやってさらに時間がある人へ
        </div>
        <p className="text-sm">
          「おまけ（発展）」セクションは 4/29 本番で使う内容の先取りです。
          気になるものから覗いてみてください。
        </p>
      </div>

      <ProgressCheck
        id="web-05-challenge"
        label="README を装飾または画像追加してコミット・プッシュした"
      />

      <PageNav current="/web/05-challenge" />
    </div>
  );
}

function IdeaCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="font-semibold text-[0.95rem]">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
