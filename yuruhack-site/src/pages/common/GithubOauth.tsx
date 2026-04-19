import { Callout, StepMeta } from "@/components/Callout";
import { ProgressCheck } from "@/components/ProgressCheck";
import { OSTabs } from "@/components/OSTabs";
import { PageNav } from "@/components/NextLink";

export function GithubOauth() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-primary">共通モジュール · 3/3</div>
      <h1>GitHub OAuth連携</h1>

      <StepMeta
        goal="VSCode から GitHub にログインし、リポジトリ操作を許可する"
        time="約 5 分"
        prev={{ path: "/common/02-vscode-extensions", label: "VSCode 推奨拡張" }}
      />

      <Callout variant="tip" title="SSH は今日は使いません">
        「SSH キーを作って…」という手順はよく紹介されますが、今日は
        <strong>OAuth（ブラウザ経由の認証）</strong>{" "}
        で一本化します。挫折の主な原因を回避するためです。
        SSH に興味がある方は、発展コンテンツの{" "}
        <a href="#/extra/ssh">SSH 接続</a> を後で覗いてみてください。
      </Callout>

      <h2>手順</h2>
      <ol>
        <li>
          VSCode の左下にある <strong>アカウントアイコン</strong>（人型のマーク）をクリック。
        </li>
        <li>
          メニューから <strong>「GitHub でサインイン」</strong> を選択。
        </li>
        <li>
          自動でブラウザが開き、GitHub のサインイン画面が表示されます。
          <ul>
            <li>ログインしていない場合はログイン。</li>
            <li>
              「Authorize Visual Studio Code」という承認画面が出たら、下の
              <strong> Authorize </strong>ボタンを押す。
            </li>
          </ul>
        </li>
        <li>
          ブラウザから VSCode に戻るよう案内されます。
          <OSTabs
            windows={
              <p className="text-sm">
                「このサイトは Visual Studio Code を開こうとしています」のダイアログで
                <strong> 許可</strong> → VSCode の画面に自動で戻ります。
              </p>
            }
            mac={
              <p className="text-sm">
                「"Visual Studio Code.app" を開きますか？」のダイアログで
                <strong> 開く</strong> → VSCode の画面に自動で戻ります。
              </p>
            }
          />
        </li>
        <li>
          VSCode 左下のアカウントアイコンに、GitHub のユーザー名が表示されていれば完了。
        </li>
      </ol>

      <h2>よくあるつまずき</h2>
      <ul>
        <li>
          <strong>ブラウザから VSCode に戻ってこない</strong> →{" "}
          VSCode を一度閉じて再起動し、もう一度「GitHub でサインイン」。
          それでもダメなら <kbd>Ctrl/Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> →{" "}
          <code>Sign in to GitHub</code> で手動実行。
        </li>
        <li>
          <strong>別のアカウントでログインしてしまった</strong> →{" "}
          VSCode 左下アカウント → サインアウト →
          ブラウザ側でも{" "}
          <a
            href="https://github.com/settings/applications"
            target="_blank"
            rel="noreferrer"
          >
            Authorized OAuth Apps
          </a>{" "}
          から VSCode の認可を取り消し、やり直し。
        </li>
        <li>
          <strong>二段階認証の画面で止まる</strong> →{" "}
          GitHub の二段階認証を有効にしている場合、
          Authenticator アプリのコード、もしくは SMS コードを入力します。
        </li>
      </ul>

      <Callout variant="info" title="ここまでで共通モジュール終了">
        お疲れさまでした。ここから先は <strong>Web 班</strong>{" "}
        専用のコンテンツです。いよいよ「自分のリポジトリ」を作ります。
      </Callout>

      <ProgressCheck
        id="common-03-github-oauth"
        label="VSCode から GitHub にサインインできた"
      />

      <PageNav current="/common/03-github-oauth" />
    </div>
  );
}
