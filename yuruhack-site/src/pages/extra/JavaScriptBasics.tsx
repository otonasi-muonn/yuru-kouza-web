import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";

const JS_SAMPLE = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>カウンター</title>
  </head>
  <body>
    <h1>クリック数: <span id="count">0</span></h1>
    <button id="btn">カウント</button>

    <script>
      const countEl = document.getElementById("count");
      const btnEl = document.getElementById("btn");
      let n = 0;
      btnEl.addEventListener("click", () => {
        n += 1;
        countEl.textContent = String(n);
      });
    </script>
  </body>
</html>
`;

export function JavaScriptBasics() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>JavaScript 基礎</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          HTML が「構造」、CSS が「見た目」だとすると、
          <strong>JavaScript は「動き」</strong> を付ける言語です。
          ボタンを押したら数字が増える、フォームを検証する、アニメーションを動かす──
          全部 JavaScript の仕事です。
        </p>
      </Callout>

      <h2>変数と関数</h2>
      <CopyBlock
        code={`// 変数（後で書き換えないなら const を推奨）
const name = "たろう";
let count = 0;

// 関数
function greet(to) {
  return "こんにちは、" + to + "さん";
}

console.log(greet(name));  // → こんにちは、たろうさん
count = count + 1;
`}
        lang="javascript"
        filename="example.js"
        highlightPlaceholders={false}
      />

      <h2>DOM 操作（HTML と JavaScript をつなぐ）</h2>
      <p>
        HTML 内の要素を JavaScript から掴み、書き換える仕組みを{" "}
        <strong>DOM 操作</strong> と呼びます。
      </p>

      <h3>例: ボタンでカウントが増える</h3>
      <p>
        下のコードをコピーして、ファイル名 <code>counter.html</code>{" "}
        で保存してダブルクリックすると、ブラウザで動きます。
      </p>
      <CopyBlock
        code={JS_SAMPLE}
        lang="html"
        filename="counter.html"
        highlightPlaceholders={false}
      />

      <h3>コードの読み方</h3>
      <ul>
        <li>
          <code>document.getElementById("count")</code>:
          <code>id="count"</code> が付いた要素を掴む。
        </li>
        <li>
          <code>addEventListener("click", ...)</code>:
          「クリックされたら」コールバック関数を実行。
        </li>
        <li>
          <code>textContent</code>: 要素の中のテキストを書き換える。
        </li>
      </ul>

      <h2>次のステップ</h2>
      <ul>
        <li>
          ES Modules（<code>import</code>/<code>export</code>）
        </li>
        <li>
          Fetch API（サーバからデータを取ってくる）
        </li>
        <li>
          React / Vue などのフレームワーク
        </li>
      </ul>
      <p>
        4/29 本番の作品に動きを付けたくなったら、この辺りの順番で学ぶと迷いにくいです。
      </p>

      <Callout variant="tip" title="小さく動かす">
        最初から大きなプロジェクトを組まず、「ボタンを押したら何かが変わる」だけの
        小さいページを作って動かすのが一番の近道です。
      </Callout>
    </div>
  );
}
