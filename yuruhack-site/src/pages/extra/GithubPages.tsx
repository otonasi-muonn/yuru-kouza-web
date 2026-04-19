import { Callout } from "@/components/Callout";

export function GithubPagesPage() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>GitHub Pages（4/29の予告）</h1>

      <Callout variant="info" title="4/29 本番でやる内容の予告">
        <p className="!mt-0">
          ハッカソン本番では、チームで作った Web サイトを
          <strong> GitHub Pages </strong>で世界に公開します。
          このページではその入口だけ紹介します。
        </p>
      </Callout>

      <h2>GitHub Pages とは</h2>
      <p>
        GitHub のリポジトリの中身をそのまま <strong>静的な Web サイトとして無料で公開</strong> できるサービスです。
        サーバも契約も要らず、HTML ファイルを Push するだけで
        <code>https://&lt;ユーザー名&gt;.github.io/&lt;リポジトリ名&gt;/</code>{" "}
        のような URL で見られるようになります。
      </p>

      <h2>このサイト自体が GitHub Pages です</h2>
      <p>
        今あなたが読んでいるこの教材サイトも、GitHub Pages でホスティングされています。
        つまり 4/29 に作るものは、仕組み的にはこれと同じ土俵の上にあります。
      </p>

      <h2>基本の流れ（イメージ）</h2>
      <ol>
        <li>Public リポジトリを作る（今日と同じ手順）</li>
        <li>
          <code>index.html</code> を Push する
        </li>
        <li>
          リポジトリの <strong>Settings → Pages</strong> を開いて、
          Source を「Deploy from a branch」→ <code>main</code> に設定して保存
        </li>
        <li>
          数分待つと、表示された URL にアクセス可能に。
        </li>
      </ol>
      <p>
        静的サイトの場合、たったこれだけで公開完了します。
      </p>

      <h2>今日の「特殊リポジトリ」でも試せる</h2>
      <p>
        ユーザー名と同名のリポジトリに <code>index.html</code>{" "}
        をひとつ置いて Pages を有効にすると、
        <code>https://&lt;ユーザー名&gt;.github.io/</code>{" "}
        という「自分の公式サイト」的な URL が手に入ります。
      </p>

      <Callout variant="warn" title="注意: リポジトリの種類で URL が変わる">
        <ul>
          <li>
            ユーザーサイト:{" "}
            <code>https://&lt;ユーザー名&gt;.github.io/</code>（ユーザー名と同名リポジトリの場合）
          </li>
          <li>
            プロジェクトサイト:{" "}
            <code>https://&lt;ユーザー名&gt;.github.io/&lt;リポジトリ名&gt;/</code>
          </li>
        </ul>
      </Callout>

      <h2>4/29 本番に向けて</h2>
      <ul>
        <li>
          <a
            href="https://docs.github.com/ja/pages"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Pages 公式ドキュメント
          </a>
        </li>
        <li>
          先に <a href="#/extra/html-css-basics">HTML/CSS 基礎</a> を見ておくとスムーズ
        </li>
      </ul>
    </div>
  );
}
