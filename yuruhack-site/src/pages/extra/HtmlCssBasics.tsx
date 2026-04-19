import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";

const HTML_BASE = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>はじめてのページ</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>こんにちは、世界</h1>
    <p>これは初めての HTML です。</p>
  </body>
</html>
`;

const CSS_BASE = `body {
  font-family: "Noto Sans JP", sans-serif;
  background: #fff8ee;
  color: #222;
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
}

h1 {
  color: #e25b1a;
  border-bottom: 2px solid #f5b13d;
  padding-bottom: 6px;
}
`;

export function HtmlCssBasics() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>HTML / CSS 基礎</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          <strong>4/29 本番の土台</strong>になる内容です。
          今日の事前講座では触れませんが、先に見ておくと当日がぐっと楽になります。
        </p>
      </Callout>

      <h2>HTML とは</h2>
      <p>
        <strong>HTML（HyperText Markup Language）</strong>{" "}
        は、Web ページの「構造」を作る言語です。
        見出し、段落、画像、リンクといった「意味」をタグで示します。
      </p>

      <h3>最小の HTML ファイル</h3>
      <CopyBlock
        code={HTML_BASE}
        lang="html"
        filename="index.html"
        highlightPlaceholders={false}
      />

      <h3>よく使うタグ</h3>
      <div className="not-prose my-4 overflow-hidden rounded-md border border-border text-sm">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">
                タグ
              </th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">
                意味
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr><td className="px-3 py-2 font-mono">&lt;h1&gt;〜&lt;h6&gt;</td><td className="px-3 py-2">見出し（大→小）</td></tr>
            <tr><td className="px-3 py-2 font-mono">&lt;p&gt;</td><td className="px-3 py-2">段落</td></tr>
            <tr><td className="px-3 py-2 font-mono">&lt;a href="..."&gt;</td><td className="px-3 py-2">リンク</td></tr>
            <tr><td className="px-3 py-2 font-mono">&lt;img src="..." alt="..." /&gt;</td><td className="px-3 py-2">画像</td></tr>
            <tr><td className="px-3 py-2 font-mono">&lt;ul&gt; / &lt;li&gt;</td><td className="px-3 py-2">箇条書き</td></tr>
            <tr><td className="px-3 py-2 font-mono">&lt;div&gt;</td><td className="px-3 py-2">意味を持たない箱（レイアウト用）</td></tr>
          </tbody>
        </table>
      </div>

      <h2>CSS とは</h2>
      <p>
        <strong>CSS（Cascading Style Sheets）</strong>{" "}
        は、HTML で作った構造に「見た目」を付ける言語です。
        色、大きさ、間隔、レイアウトなどを決めます。
      </p>

      <h3>最小の CSS ファイル</h3>
      <CopyBlock
        code={CSS_BASE}
        lang="css"
        filename="style.css"
        highlightPlaceholders={false}
      />

      <h3>CSS の書き方</h3>
      <p>
        <code>セレクタ {"{"} プロパティ: 値; {"}"}</code>{" "}
        の形が基本。
      </p>
      <ul>
        <li>
          <strong>セレクタ</strong>: どの要素に対してか（例: <code>h1</code>、<code>.button</code>、<code>#header</code>）
        </li>
        <li>
          <strong>プロパティ</strong>: 何を変えるか（例: <code>color</code>、<code>font-size</code>）
        </li>
        <li>
          <strong>値</strong>: どう変えるか（例: <code>#e25b1a</code>、<code>16px</code>）
        </li>
      </ul>

      <Callout variant="tip" title="試すいちばん早い方法">
        <p className="!mt-0">
          VSCode で <code>index.html</code> と <code>style.css</code>{" "}
          を同じフォルダに作り、<code>index.html</code> をダブルクリックするとブラウザで開けます。
        </p>
      </Callout>

      <h2>学べる場所</h2>
      <ul>
        <li>
          <a href="https://developer.mozilla.org/ja/docs/Learn" target="_blank" rel="noreferrer">
            MDN Web Docs: Web 学習エリア
          </a>
          （一番信頼できる）
        </li>
        <li>
          <a href="https://prog-8.com/" target="_blank" rel="noreferrer">
            Progate
          </a>
          （最初の一歩に向く）
        </li>
      </ul>
    </div>
  );
}
