import { Callout, StepMeta } from "@/components/Callout";
import { ProgressCheck } from "@/components/ProgressCheck";
import { PageNav } from "@/components/NextLink";
import { FadeIn } from "@/components/Animated";

export function GithubAccount() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-primary">共通モジュール · 1/3</div>
      <h1>GitHubアカウント作成</h1>

      <StepMeta
        goal="GitHub のアカウントを作り、メール認証・二段階認証まで完了させる"
        time="約 10 分"
      />

      <Callout variant="info" title="この作業は何？">
        <p className="!mt-0">
          GitHub は『プログラムのコードをクラウドに置かせてくれるサービス』です。
          4/29 の本番で作る Web サイトも、最終的にここへ置いて世界に公開します。
          まずは <strong>自分専用の置き場を持つ権利</strong> を取りに行く、と考えてください。
        </p>
        <p>
          Git と GitHub の違いが不安な人は、先に「
          <a href="#/extra/glossary">用語集ページ</a>
          」をのぞくと理解が早いです。
        </p>
      </Callout>

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
          <Callout variant="tip" title="パスワードマネージャがあると超楽">
            <p className="!mt-0">
              1Password / Bitwarden / ブラウザ内蔵のパスワードマネージャでランダム生成 → 保存 にすれば、
              覚える手間も使い回しのリスクも消えます。
            </p>
          </Callout>
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
              <li>
                後から変更も可能ですが、古い URL へのリンクが切れる副作用があります。就活アカウントとして使うつもりなら一発で決める気持ちで。
              </li>
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

      <h2 id="two-factor">🔐 2FA（二段階認証）を有効化する</h2>
      <p>
        GitHub は 2023 年末以降、コードを書く全員に 2FA を事実上強制しています。
        サインアップ直後〜数日以内に『2FA を有効化してください』のバナーが必ず出るので、<strong>今のうちに済ませておく</strong> ほうが後々ラクです。
      </p>

      <FadeIn>
        <ol>
          <li>
            スマホに <strong>Authenticator アプリ</strong> を入れます（Google Authenticator / Microsoft Authenticator / Authy などどれでも可）。
          </li>
          <li>
            GitHub 右上のアイコン → <code>Settings</code> → 左の <code>Password and authentication</code>。
          </li>
          <li>
            <code>Enable two-factor authentication</code> を押すと QR コードが出ます。
            スマホのアプリで QR を読み取ると、6桁のコードが30秒ごとに生成されるようになります。
          </li>
          <li>
            画面に出た 6 桁を入力して認証完了。
          </li>
          <li>
            続けて <strong>リカバリコード</strong>（10個の暗号）が出ます。
            これは <strong>スマホを失くした時の唯一の合鍵</strong> なので、<strong>必ずダウンロードして安全な場所に保管</strong> してください。PC のメモ帳 → クラウドの自分宛メモ、くらいで十分です。
          </li>
        </ol>
      </FadeIn>

      <Callout variant="warn" title="リカバリコードを無くすと最悪アカウントごと消える">
        <p className="!mt-0">
          2FA を有効化してスマホ紛失 → リカバリコードも無し、となるとサポートに懇願するしか復旧手段がありません。
          コードは今すぐスクショ or 印刷、クラウドメモに貼っておきましょう。
        </p>
      </Callout>

      <h2 id="email-privacy">📧 メールアドレスを非公開にしておく（推奨）</h2>
      <p>
        コミットにはデフォルトで登録したメールアドレスが刻印されます。
        個人のメールを公開したくない人は、<strong>noreply メール</strong> に切り替えておきましょう。
      </p>
      <ol>
        <li>
          <code>Settings</code> → 左の <code>Emails</code>。
        </li>
        <li>
          <code>Keep my email addresses private</code> にチェック。
        </li>
        <li>
          表示される <code>&lt;ID&gt;+&lt;ユーザー名&gt;@users.noreply.github.com</code> が今後コミットで使われます。
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
        <li>
          <strong>2FA の QR が読み取れない</strong> → QR コード下の『Setup key』を手動でアプリに入力しても同じことができる。
        </li>
      </ul>

      <ProgressCheck
        id="common-01-github-account"
        label="GitHub アカウントを作成し、2FA まで有効化した"
      />

      <PageNav current="/common/01-github-account" />
    </div>
  );
}
