import { Callout, StepMeta } from "@/components/Callout";
import { ProgressCheck } from "@/components/ProgressCheck";
import { OSTabs } from "@/components/OSTabs";
import { PageNav } from "@/components/NextLink";

export function VSCodeExtensions() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-primary">共通モジュール · 2/3</div>
      <h1>VSCode推奨拡張</h1>

      <StepMeta
        goal="VSCode を日本語化し、Markdown を書きやすくする拡張を入れる"
        time="約 8 分"
        prev={{ path: "/common/01-github-account", label: "GitHub アカウント作成" }}
      />

      <Callout variant="info" title="この作業は何？">
        <p className="!mt-0">
          <strong>拡張機能</strong> は、VSCode に後付けできる便利機能のこと（ブラウザの拡張と同じ発想）。
          今日入れるのは『日本語化』と『Markdown のプレビュー』の2〜3個だけ。
          これで以降のページの『〜を開く』『〜のボタンを押す』が全部日本語で追えるようになります。
        </p>
      </Callout>

      <Callout variant="tip" title="VSCode の画面マップ（最低限）">
        <ul className="!mt-2">
          <li>
            <strong>左端の縦アイコン列</strong> — エクスプローラ / 検索 / ソース管理 / 拡張機能 / デバッグ
          </li>
          <li>
            <strong>下の黒いエリア</strong> — ターミナル（<kbd>Ctrl</kbd>+<kbd>`</kbd> で開閉）
          </li>
          <li>
            <strong>上の検索バー風の窓</strong> — <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> で出る『コマンドパレット』。困ったらここに入れる
          </li>
          <li>
            <strong>左下の歯車</strong> — 設定・アカウント
          </li>
        </ul>
      </Callout>

      <Callout variant="info" title="前提">
        このサイトでは VSCode が既にインストールされていることを前提にしています。
        まだの方は{" "}
        <a
          href="https://code.visualstudio.com/"
          target="_blank"
          rel="noreferrer"
        >
          公式サイト
        </a>{" "}
        からダウンロードしてください（無料）。
      </Callout>

      <h2>インストールする拡張（最小限）</h2>
      <p>
        今日扱う範囲では、以下 3 つだけ入れれば十分です。
      </p>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <ExtCard
          name="Japanese Language Pack"
          publisher="Microsoft"
          why="メニューや設定画面が日本語化されます。以降の説明がグッと追いやすくなります。"
          id="MS-CEINTL.vscode-language-pack-ja"
        />
        <ExtCard
          name="Markdown All in One"
          publisher="Yu Zhang"
          why="プレビュー、目次生成、表のフォーマットなど Markdown 編集が快適になります。"
          id="yzhang.markdown-all-in-one"
        />
        <ExtCard
          name="GitLens"
          publisher="GitKraken"
          why="（任意）ファイルの変更履歴をその場で見られる。余裕があれば。"
          id="eamodio.gitlens"
          optional
        />
      </div>

      <h2>拡張機能のインストール手順</h2>

      <OSTabs
        windows={
          <ol>
            <li>
              VSCode 左端のサイドバーから「拡張機能」アイコン（四角が4つ並んだマーク）をクリック。
              ショートカットは <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>。
            </li>
            <li>
              上部の検索ボックスに拡張名を入力（例: <code>Japanese Language Pack</code>）。
            </li>
            <li>
              検索結果から目的の拡張をクリックし、<strong>Install</strong> ボタンを押す。
            </li>
            <li>
              日本語パックの場合、右下に「表示言語を変更して再起動しますか？」のダイアログが出るので「Restart」。
            </li>
          </ol>
        }
        mac={
          <ol>
            <li>
              VSCode 左端のサイドバーから「拡張機能」アイコン（四角が4つ並んだマーク）をクリック。
              ショートカットは <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>。
            </li>
            <li>
              上部の検索ボックスに拡張名を入力（例: <code>Japanese Language Pack</code>）。
            </li>
            <li>
              検索結果から目的の拡張をクリックし、<strong>Install</strong> ボタンを押す。
            </li>
            <li>
              日本語パックの場合、右下に「表示言語を変更して再起動しますか？」のダイアログが出るので「Restart」。
            </li>
          </ol>
        }
      />

      <Callout variant="tip" title="拡張 ID で検索すると確実">
        検索結果に似た名前の拡張が並ぶことがあります。上のカードに書いた{" "}
        <strong>拡張 ID</strong>（例: <code>MS-CEINTL.vscode-language-pack-ja</code>）を検索欄に貼れば、公式のものだけがヒットします。
      </Callout>

      <h2>よくあるつまずき</h2>
      <ul>
        <li>
          <strong>似た名前の拡張が複数ある</strong> →{" "}
          拡張カードの左上にある <strong>発行元（publisher）</strong>{" "}
          を確認。Microsoft や公式オーガニゼーションを選ぶ。
        </li>
        <li>
          <strong>日本語化が反映されない</strong> → VSCode を一度閉じて再起動。
          それでもダメなら <kbd>Ctrl/Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> →{" "}
          <code>Configure Display Language</code> →{" "}
          <code>日本語 (ja)</code> を選択。
        </li>
        <li>
          <strong>拡張機能タブが見当たらない</strong> →{" "}
          画面を広げるか、メニュー <code>表示 → 拡張機能</code> から開ける。
        </li>
        <li>
          <strong>インストールで無限ぐるぐる</strong> — 会場や学校の Wi-Fi のプロキシ/ファイアウォール（<code>marketplace.visualstudio.com</code> をブロック）が原因のことがあります。
          スマホのテザリング等、別回線で試すのも手。
        </li>
      </ul>

      <Callout variant="tip" title="さらに沼りたい人へ">
        Live Server・Prettier・Error Lens など『入れたら確実に快適になる』拡張の紹介ページをおまけに用意しました。
        今日は読まなくて OK、4/29 本番までに覗いておくと差がつきます → 「
        <a href="#/extra/vscode-plus">VSCode 推奨拡張（拡充版）</a>
        」
      </Callout>

      <ProgressCheck
        id="common-02-vscode-extensions"
        label="推奨拡張をインストールし、VSCode の画面が日本語になった"
      />

      <PageNav current="/common/02-vscode-extensions" />
    </div>
  );
}

function ExtCard({
  name,
  publisher,
  why,
  id,
  optional,
}: {
  name: string;
  publisher: string;
  why: string;
  id: string;
  optional?: boolean;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <div className="font-semibold">{name}</div>
        {optional && (
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[0.65rem] text-muted-foreground">
            任意
          </span>
        )}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">
        発行元: {publisher}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{why}</p>
      <code className="mt-2 block truncate rounded bg-muted px-2 py-1 font-mono text-[0.75rem]">
        {id}
      </code>
    </div>
  );
}
