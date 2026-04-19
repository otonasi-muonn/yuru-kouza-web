import { Callout, StepMeta } from "@/components/Callout";
import { ProgressCheck } from "@/components/ProgressCheck";
import { CopyBlock } from "@/components/CopyBlock";
import { OSTabs } from "@/components/OSTabs";
import { PageNav } from "@/components/NextLink";

const TEMPLATE = `# 👋 こんにちは、<あなたの名前> です

## 自己紹介
- 所属: <学科・学年>
- 好きなこと: <例: ゲーム、アニメ、プログラミング>
- 今回の目標: <例: GitHubを使えるようになる>

## これから作りたいもの
<自由に書いてください>
`;

export function MarkdownEdit() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-primary">Web班 · 3/5</div>
      <h1>READMEを書く</h1>

      <StepMeta
        goal="自己紹介テンプレを貼り付けて、自分の言葉で書き換える"
        time="約 10 分"
        prev={{ path: "/web/02-clone", label: "Clone する" }}
      />

      <Callout variant="info" title="この作業は何？">
        <p className="!mt-0">
          Clone したフォルダにある <code>README.md</code>{" "}
          を書き換えて、『自分はこういう人間です』と自己紹介します。
          このファイルはあとで GitHub に送り返すと、<strong>プロフィールのトップに載ります</strong>。
        </p>
      </Callout>

      <Callout variant="info" title="Markdown（マークダウン）とは">
        <p className="!mt-0">
          プレーンテキストに少しの記号を足して、見出しやリストを表現する書き方です。
          <code>#</code> で見出し、<code>-</code> で箇条書き、<code>**強調**</code> で太字など。
          GitHub では <code>.md</code> ファイルが自動で見た目整形されます。
        </p>
        <p>
          <code>.md</code> は『マークダウン形式のテキストファイル』の拡張子。
          中身はただのテキストなので、メモ帳でも開けます（ただし整形は見えない）。
          GitHub 上や VSCode のプレビューで見ると、見出しや箇条書きが『整った見た目』で表示されます。
        </p>
      </Callout>

      <h2>手順</h2>
      <ol>
        <li>
          VSCode のエクスプローラから <code>README.md</code> をクリックして開く。
        </li>
        <li>
          エディタ内の既存の内容を全選択して削除。
          <OSTabs
            windows={
              <p>
                <kbd>Ctrl</kbd> + <kbd>A</kbd> で全選択 → <kbd>Delete</kbd>
              </p>
            }
            mac={
              <p>
                <kbd>Cmd</kbd> + <kbd>A</kbd> で全選択 → <kbd>Delete</kbd>
              </p>
            }
          />
        </li>
        <li>
          下のテンプレを <strong>「コピー」ボタン</strong> で取得 → VSCode のエディタに貼り付け。
        </li>
      </ol>

      <CopyBlock code={TEMPLATE} filename="README.md" lang="markdown" />

      <Callout variant="tip" title="黄色いタグは「書き換える目印」">
        テンプレ内の <span className="placeholder-token">&lt;あなたの名前&gt;</span> や
        <span className="placeholder-token">&lt;学科・学年&gt;</span>{" "}
        のように山カッコで囲まれた部分は「書き換えてね」の意味です。
        山カッコごと消して、自分の情報に置き換えてください。
      </Callout>

      <h2>書き換える</h2>
      <ol>
        <li>
          <code>&lt;あなたの名前&gt;</code> → 例: <code>たろう</code>
        </li>
        <li>
          <code>&lt;学科・学年&gt;</code> → 例: <code>情報系学部 2年</code>
        </li>
        <li>
          他のプレースホルダーも自分の言葉に置き換える。
        </li>
        <li>
          書き換えたら <strong>保存</strong>。
          <OSTabs
            windows={
              <p>
                <kbd>Ctrl</kbd> + <kbd>S</kbd>
              </p>
            }
            mac={
              <p>
                <kbd>Cmd</kbd> + <kbd>S</kbd>
              </p>
            }
          />
        </li>
      </ol>

      <h2>プレビューで見た目を確認</h2>
      <p>
        Markdown All in One を入れていれば、プレビューが使えます。
      </p>
      <OSTabs
        windows={
          <p>
            <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> で
            プレビューが別タブで開きます。
          </p>
        }
        mac={
          <p>
            <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> で
            プレビューが別タブで開きます。
          </p>
        }
      />

      <h2>Markdown チートシート（最低限）</h2>
      <div className="not-prose my-5 overflow-hidden rounded-md border border-border text-sm">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">
                書き方
              </th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">
                表示
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <CheatRow src={`# 見出し1`} dst={<span className="text-xl font-bold">見出し1</span>} />
            <CheatRow src={`## 見出し2`} dst={<span className="text-lg font-bold">見出し2</span>} />
            <CheatRow src={`**強調**`} dst={<strong>強調</strong>} />
            <CheatRow src={`*斜体*`} dst={<em>斜体</em>} />
            <CheatRow src={`- 箇条書き`} dst={<span>• 箇条書き</span>} />
            <CheatRow src={`[リンク](URL)`} dst={<span className="text-primary underline">リンク</span>} />
            <CheatRow src={`\`コード\``} dst={<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">コード</code>} />
          </tbody>
        </table>
      </div>

      <h2>よくあるつまずき</h2>
      <ul>
        <li>
          <strong>保存を忘れる</strong> → VSCode のタブに{" "}
          <strong>●（白丸）</strong>が付いていたら未保存。
          保存するとバツ印になります。
        </li>
        <li>
          <strong>見出しが正しく表示されない</strong> →{" "}
          <code>#</code> の<strong>後ろに半角スペース</strong>が必要です。
          <code># 見出し</code>（OK）／<code>#見出し</code>（NG）
        </li>
        <li>
          <strong>プレースホルダーを山カッコごと残してしまう</strong> →{" "}
          <code>&lt;</code> と <code>&gt;</code> まで含めて削除してから書き換える。
        </li>
        <li>
          <strong>日本語入力のまま <code>#</code> や バッククォートが全角になる</strong> →{" "}
          <code>＃</code>（全角）や <code>｀</code>（全角）は Markdown 記号として認識されません。
          必ず <strong>半角（英数字モード）</strong>で書くこと。
          VSCode の右下に IME の状態が表示されるので、あやしい時は確認。
        </li>
        <li>
          <strong>見出しが『1 行目から #』じゃない</strong> → 見出しの前には空行、
          <code>#</code> の前の空白もなしに。先頭行にそのまま <code># タイトル</code> と書く。
        </li>
      </ul>

      <Callout variant="tip" title="もっと知りたい人へ">
        <p className="!mt-0">
          表・チェックボックス・引用・コードブロックなど、Markdown の発展記法は{" "}
          <a href="#/extra/markdown-advanced">Markdown 発展</a>{" "}
          にまとめてあります。README をもっと『映える』ものにしたい人はぜひ。
        </p>
      </Callout>

      <ProgressCheck
        id="web-03-markdown-edit"
        label="README.md を書き換えて保存した"
      />

      <PageNav current="/web/03-markdown-edit" />
    </div>
  );
}

function CheatRow({ src, dst }: { src: string; dst: React.ReactNode }) {
  return (
    <tr>
      <td className="px-3 py-2 font-mono text-[0.82rem]">{src}</td>
      <td className="px-3 py-2">{dst}</td>
    </tr>
  );
}
