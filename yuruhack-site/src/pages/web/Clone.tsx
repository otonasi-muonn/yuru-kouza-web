import { Callout, StepMeta } from "@/components/Callout";
import { ProgressCheck } from "@/components/ProgressCheck";
import { OSTabs } from "@/components/OSTabs";
import { PageNav } from "@/components/NextLink";

export function Clone() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-primary">Web班 · 2/5</div>
      <h1>Cloneする</h1>

      <StepMeta
        goal="さっき作ったリポジトリを自分のPCにコピーしてきて、VSCode で開く"
        time="約 7 分"
        prev={{ path: "/web/01-create-repository", label: "リポジトリ作成" }}
      />

      <Callout variant="info" title="この作業は何？">
        <p className="!mt-0">
          <strong>Clone（クローン）</strong>は『GitHub 上にあるリポジトリ』を『自分のPC』にまるごとコピーしてくる操作です。
          これをやる理由は単純で、<strong>PCのエディタで快適に書きたいから</strong>。
          ブラウザ上の編集画面は応急処置向きで、長く書くと疲れます。
        </p>
        <p>
          以降の流れはこうです:
        </p>
        <ol className="!my-2">
          <li>PC にコピー（今ここ）</li>
          <li>VSCode で <code>README.md</code> を編集</li>
          <li>GitHub に送り返す（Push）</li>
        </ol>
        <p className="text-xs text-muted-foreground">
          ※ 「Clone」と「Download ZIP」は別物。Clone なら Git の履歴も一緒にコピーされ、
          以降の Push もそのまま繋がります。ZIP は履歴なしのコピーなので、戻せません。
        </p>
      </Callout>

      <Callout variant="tip" title="VSCode の『ワークスペース』って何？">
        <p className="!mt-0">
          VSCode は『いま開いているフォルダ』を基準にあらゆる操作をします。
          Clone 後に VSCode が切り替わるフォルダが、そのプロジェクトの<strong>作業領域（ワークスペース）</strong>です。
        </p>
        <ul>
          <li>左のエクスプローラに並ぶファイル = そのフォルダの中身</li>
          <li>ターミナルを開くと、最初からそのフォルダにいる（cd 不要）</li>
          <li>Git の操作（コミット・プッシュ）もこのフォルダに対して効く</li>
        </ul>
        <p className="text-xs text-muted-foreground">
          ターミナル/パスに不安がある人は先に「
          <a href="#/extra/terminal-basics">ターミナル入門</a>」「
          <a href="#/extra/path-basics">パス入門</a>」をどうぞ。
        </p>
      </Callout>

      <Callout variant="info" title="前提: Git は入っていますか？">
        <p className="!mt-0">
          VSCode のソース管理機能は、PC に <strong>Git 本体</strong> が入っている前提で動きます。
          左側のソース管理に「Git がインストールされていません」と出たら、
          <a href="https://git-scm.com/" target="_blank" rel="noreferrer">公式サイト</a> から Git を入れて VSCode を再起動してください。
        </p>
      </Callout>

      <h2>手順</h2>
      <ol>
        <li>
          VSCode を開いた状態で、コマンドパレットを開きます。
          <OSTabs
            windows={
              <p>
                <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>
              </p>
            }
            mac={
              <p>
                <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>
              </p>
            }
          />
        </li>
        <li>
          検索欄に <code>Git: Clone</code> と入力 → Enter。
        </li>
        <li>
          <strong>「Clone from GitHub」</strong> を選択。OAuth 連携が済んでいれば、
          自分のリポジトリ一覧が表示されます。
        </li>
        <li>
          一覧から、さっき作った <strong>自分のユーザー名と同じ名前のリポジトリ</strong>{" "}
          を選択。
        </li>
        <li>
          保存先フォルダを選ぶダイアログが開きます。
          <Callout variant="warn" title="保存先フォルダの注意">
            <ul>
              <li>
                <strong>日本語・スペースを含まないパス</strong>を選んでください。
                （例: <code>C:\dev</code>、<code>~/projects</code> など）
              </li>
              <li>
                Desktop でも動きますが、後で「どこに置いたか忘れる」事故が多いです。
                練習用のフォルダを作ることをおすすめします。
              </li>
              <li>
                🚫 <strong>OneDrive / iCloud Drive / Dropbox の同期フォルダは避けてください。</strong>
                Git の内部ファイル（<code>.git/</code>）がクラウドと喧嘩して、
                『コミットしたはずなのに消えた』という事故が起きます。
              </li>
            </ul>

            <OSTabs
              windows={
                <p className="text-sm">
                  例: <code>C:\Users\&lt;username&gt;\dev\</code>{" "}
                  の下に Clone するのが分かりやすいです。
                </p>
              }
              mac={
                <p className="text-sm">
                  例: <code>/Users/&lt;username&gt;/dev/</code>{" "}
                  の下に Clone するのが分かりやすいです。
                </p>
              }
            />
          </Callout>
        </li>
        <li>
          右下に「リポジトリの複製が完了しました」と出たら、
          <strong>「開く」</strong> を押して VSCode をそのフォルダに切り替え。
          <div className="mt-2 text-sm text-amber-600 dark:text-amber-400">
            ⚠️ 「開く」を押し忘れた場合は、メニューの <strong>ファイル → フォルダーを開く</strong> から、さっき Clone したフォルダを開き直せば続行できます。
          </div>
        </li>
        <li>
          最初の 1 回だけ「このフォルダ内のファイルの作成者を信頼しますか？」と聞かれます。
          自分で作ったリポジトリなので <strong>「はい、作成者を信頼します」</strong> を選択。
        </li>
      </ol>

      <h2>確認: 中身を見てみる</h2>
      <p>
        VSCode 左側のエクスプローラに <code>README.md</code> というファイルが見えれば成功です。
        このファイルをこれから書き換えていきます。
      </p>

      <h2>よくあるつまずき</h2>
      <ul>
        <li>
          <strong>Clone 先が分からなくなった</strong> → VSCode のタイトルバーに
          表示されているフォルダ名を確認。エクスプローラで右クリック →
          「エクスプローラーで表示（Windows）」/「Finder で表示（Mac）」で実体が見られる。
        </li>
        <li>
          <strong>リポジトリ一覧が出ない</strong> → OAuth 認証が切れている可能性。
          コマンドパレットから <code>Sign out of GitHub</code> → もう一度{" "}
          <code>Sign in to GitHub</code>。
        </li>
        <li>
          <strong>「Clone from URL」しか選べない</strong> → HTTPS の URL
          （<code>https://github.com/&lt;ユーザー名&gt;/&lt;ユーザー名&gt;.git</code>）
          を貼り付けても OK。<strong>SSH URL（git@...）は使わない</strong>。
        </li>
      </ul>

      <ProgressCheck
        id="web-02-clone"
        label="VSCode でリポジトリを Clone し、README.md が見える状態になった"
      />

      <PageNav current="/web/02-clone" />
    </div>
  );
}
