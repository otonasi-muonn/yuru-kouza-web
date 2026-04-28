import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";

const SIMPLE = `# ハッシュから始まる行はコメント
name: たろう
age: 20
likes:
  - コーヒー
  - 読書
  - インディーゲーム
`;

const NESTED = `team:
  name: ゆるはっか班
  members:
    - name: たろう
      role: フロント
    - name: はなこ
      role: デザイン
`;

const PAGES_YML = `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - uses: actions/deploy-pages@v4
`;

export function YamlBasics() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>YAML 入門</h1>

      <Callout variant="info" title="このページの位置づけ">
        <p className="!mt-0">
          <strong>YAML（ヤムル）</strong> は GitHub Actions のワークフローや、
          多くの設定ファイルで使われるフォーマットです。
          <a href="#/hackathon/deploy" className="text-primary">本番の自動デプロイ</a>
          で貼り付ける <code>deploy.yml</code> もこの YAML です。
          「中身がなんとなく読める」状態を目指します。
        </p>
      </Callout>

      <h2>YAML ってどんなもの？</h2>
      <p>
        <strong>キーと値を「:」で書き並べる</strong>だけのシンプルな書式です。
        プログラムを書く感覚というより、<strong>「箇条書きで構造を表すメモ」</strong>に近いです。
      </p>

      <CopyBlock
        code={SIMPLE}
        lang="yaml"
        filename="example.yml"
        highlightPlaceholders={false}
      />

      <ul>
        <li><code>name: たろう</code> → 「name というキーに、たろう という値」</li>
        <li><code>age: 20</code> → 数値もそのまま書ける</li>
        <li><code>- コーヒー</code> のように <strong>ハイフン+スペース</strong> でリストを表す</li>
      </ul>

      <h2>入れ子（ネスト）はインデントで表す</h2>
      <p>
        グループ化したいときは、<strong>半角スペース2つ</strong>のインデントで入れ子にします。
        ここがYAMLで一番重要なルール。
      </p>

      <CopyBlock
        code={NESTED}
        lang="yaml"
        filename="team.yml"
        highlightPlaceholders={false}
      />

      <Callout variant="warn" title="Tab文字は使わないで">
        <p className="!mt-0">
          インデントには <strong>必ず半角スペース</strong>を使います。
          Tab文字を混ぜると <code>could not find expected ':'</code> 等の
          わかりにくいエラーで動かなくなります。
        </p>
        <p>
          VSCode で <code>.yml</code> を編集するときは、エディタ右下の
          「Spaces: 2」表示になっていれば OK。
        </p>
      </Callout>

      <h2>本番で使う deploy.yml を読んでみる</h2>
      <p>
        本番の <a href="#/hackathon/deploy" className="text-primary">公開ガイド</a>{" "}
        で配布している YAML の中身は、こうなっています。
      </p>

      <CopyBlock
        code={PAGES_YML}
        lang="yaml"
        filename=".github/workflows/deploy.yml"
        highlightPlaceholders={false}
      />

      <h3>パートごとに読む</h3>
      <ul>
        <li>
          <code>name:</code> — ワークフローの名前。Actions のタブに表示される
        </li>
        <li>
          <code>on: push:</code> — どんなときに動くか。
          <code>branches: [main]</code> なので「main に push されたら動く」
        </li>
        <li>
          <code>permissions:</code> — このワークフローに与える権限
        </li>
        <li>
          <code>jobs:</code> — 実際の作業内容。
          <code>steps:</code> の中に上から順番に実行する手順を書く
        </li>
        <li>
          <code>uses: actions/checkout@v4</code> — 「公式の checkout アクションの v4 を使う」
          という意味。<strong>誰かが作った便利な部品</strong>を取り込んでる
        </li>
      </ul>

      <h2>つまずきポイントまとめ</h2>

      <Callout variant="danger" title="エラーになりがちな書き方">
        <ul className="!mt-2">
          <li>
            <strong>インデントがそろっていない</strong> — 同じ階層は同じ深さ
          </li>
          <li>
            <strong>「:」のあとにスペースがない</strong> — <code>name:たろう</code> は NG、
            <code>name: たろう</code> が OK
          </li>
          <li>
            <strong>リストの「-」のあとにスペースがない</strong> — <code>-コーヒー</code> は NG、
            <code>- コーヒー</code> が OK
          </li>
          <li>
            <strong>クォートが必要なケース</strong> — <code>:</code> や <code>#</code> を含む
            文字列は <code>"..."</code> で囲むと安全
          </li>
        </ul>
      </Callout>

      <Callout variant="tip" title="迷ったら YAML Linter">
        <p className="!mt-0">
          ブラウザで使える <a href="https://www.yamllint.com/" target="_blank" rel="noreferrer" className="text-primary">YAML Lint</a>{" "}
          にコピペすると、構文エラーの場所を教えてくれます。
          push する前に通しておくと事故が減ります。
        </p>
      </Callout>

      <h2>もっと知りたい</h2>
      <ul>
        <li>
          <a href="#/extra/github-actions" className="text-primary">GitHub Actions（CI/CDの入口）</a> — YAMLで動くワークフローの全体像
        </li>
        <li>
          <a href="#/hackathon/deploy" className="text-primary">本番: Pages公開＆自動デプロイ</a> — 実際にコピペして使うYAML
        </li>
      </ul>
    </div>
  );
}
