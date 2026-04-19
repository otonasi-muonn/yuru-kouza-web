import { Callout, StepMeta } from "@/components/Callout";
import { ProgressCheck } from "@/components/ProgressCheck";
import { PageNav } from "@/components/NextLink";

export function GithubAccount() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-primary">共通モジュール · 1/3</div>
      <h1>GitHubアカウント作成</h1>

      <StepMeta
        goal="GitHub のアカウントを作り、メール認証まで完了させる"
        time="約 10 分"
      />

      <Callout variant="tip" title="すでにアカウントをお持ちの方へ">
        既に GitHub アカウントを持っている場合、この章は<strong>スキップしてOK</strong>です。
        次のステップ「VSCode 推奨拡張」に進んでください。
      </Callout>

      <h2>手順</h2>
      <ol>
        <li>
          <a href="https://github.com/signup" target="_blank" rel="noreferrer">
            github.com/signup
          </a>{" "}
          をブラウザで開きます。
        </li>
        <li>
          <strong>メールアドレス</strong> を入力して「Continue」をクリック。
          普段使っているメールアドレスで大丈夫です。
        </li>
        <li>
          <strong>パスワード</strong> を入力。GitHub は強めのパスワードを要求します（15文字以上、または 8文字以上＋数字＋小文字）。
        </li>
        <li>
          <strong>ユーザー名（Username）</strong> を決めます。
          <Callout variant="warn" title="ユーザー名は今後ずっと使います">
            <ul>
              <li>
                プロフィール URL（<code>https://github.com/&lt;ユーザー名&gt;</code>）や、このあと作る「特殊リポジトリ」の名前にも使われます。
              </li>
              <li>
                「<code>test1234</code>」「<code>aaa</code>」などの使い捨て名は避け、あとでも名乗りやすい名前にしましょう。
              </li>
              <li>使える文字: 英数字とハイフン（先頭・末尾はハイフン不可）</li>
            </ul>
          </Callout>
        </li>
        <li>
          「人間ですか？」のパズル認証を通します。
        </li>
        <li>
          登録したメールアドレス宛に <strong>認証コード</strong> が届きます。
          メール内の 8 桁のコードを画面に入力。
        </li>
        <li>
          プランの選択画面が出たら、<strong>「Free」</strong> で OK。
        </li>
        <li>
          アンケート画面はスキップ可能です（右上「Skip personalization」）。
        </li>
      </ol>

      <h2>よくあるつまずき</h2>
      <ul>
        <li>
          <strong>認証メールが届かない</strong> → 迷惑メールフォルダを確認。
          それでも無ければ、メールアドレスのタイプミスを疑って最初からやり直す。
        </li>
        <li>
          <strong>パスワードが弱いと言われる</strong> →{" "}
          <code>Yuruhack-2026!</code> のように、大文字・数字・記号を混ぜて 10 文字以上にする。
        </li>
        <li>
          <strong>ユーザー名が既に使われている</strong> → 末尾に数字やハイフン区切りで単語を足す（例: <code>taro-dev</code>）。
        </li>
        <li>
          <strong>パズル認証を何度やっても通らない</strong> →
          ブラウザの広告ブロッカーや翻訳拡張をオフにして再挑戦。
        </li>
      </ul>

      <ProgressCheck
        id="common-01-github-account"
        label="GitHub アカウントを作成し、ログインできる状態にした"
      />

      <PageNav current="/common/01-github-account" />
    </div>
  );
}
