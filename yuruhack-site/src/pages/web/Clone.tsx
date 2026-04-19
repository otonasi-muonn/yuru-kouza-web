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

      <Callout variant="info" title="Clone（クローン）とは">
        「GitHub 上にあるリポジトリ」を「自分のPC」にまるごとコピーしてくる操作。
        以降、PC 側でファイルを編集し、GitHub に送り返す（Push する）という流れになります。
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
