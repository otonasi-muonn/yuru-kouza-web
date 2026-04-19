import { Callout, StepMeta } from "@/components/Callout";
import { ProgressCheck } from "@/components/ProgressCheck";
import { PageNav } from "@/components/NextLink";
import { Star, AlertTriangle } from "lucide-react";

export function CreateRepository() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-primary">Web班 · 1/5</div>
      <h1>リポジトリ作成</h1>

      <StepMeta
        goal="自分のユーザー名と同じ名前の「特殊リポジトリ」を GitHub 上に作る"
        time="約 8 分"
        prev={{ path: "/common/03-github-oauth", label: "GitHub OAuth 連携" }}
      />

      <Callout variant="danger" title="最重要ポイント: 特殊リポジトリ">
        <p className="!mt-0">
          GitHub には、<strong>ユーザー名と完全に同じ名前のリポジトリ</strong>{" "}
          を作ると、そのリポジトリの <code>README.md</code> が{" "}
          <strong>プロフィールページのトップに表示される</strong> という隠し機能があります。
        </p>
        <p>
          たとえばユーザー名が <code>taro-dev</code> なら、リポジトリ名も{" "}
          <code>taro-dev</code>。一致していないとこの機能は働きません。
        </p>
      </Callout>

      <h2>手順</h2>
      <ol>
        <li>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            github.com
          </a>{" "}
          にログイン。右上の <strong>「+」アイコン</strong> →{" "}
          <strong>「New repository」</strong>。
        </li>
        <li>
          <strong>Repository name</strong> に、自分のユーザー名と{" "}
          <strong>完全一致</strong> する名前を入力。
          <div className="not-prose my-3 rounded-md border border-amber-500/50 bg-amber-50 p-4 dark:bg-amber-500/10">
            <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-amber-900 dark:text-amber-300">
              <AlertTriangle size={16} /> 一致させるチェックリスト
            </div>
            <ul className="space-y-1 text-sm text-amber-900 dark:text-amber-200">
              <li>✅ スペルが同じ</li>
              <li>✅ ハイフン・アンダースコアの位置が同じ</li>
              <li>
                ⚠️ 大文字小文字も揃えると安心（GitHub は大小区別しませんが、視認性のため）
              </li>
            </ul>
            <p className="mt-3 text-xs text-amber-900/90 dark:text-amber-300/90">
              入力中に「<em>✨ You found a secret! ✨</em>」のような緑のヒントが表示されたら、正しくマッチしています。
            </p>
          </div>
        </li>
        <li>
          <strong>Description（説明）</strong> は空欄でも OK。
          「自己紹介リポジトリ」等と書いてもよいでしょう。
        </li>
        <li>
          <strong>Public</strong> を選択（必須）。
          <Callout variant="warn" title="Private にすると表示されません">
            特殊リポジトリの README 表示機能は、<strong>Public リポジトリのみ</strong>が対象です。
            Private にしてしまった場合は、作り直すか、Settings から Public に変更してください。
          </Callout>
        </li>
        <li>
          <strong>「Add a README file」</strong> にチェック（必須）。
          <ul>
            <li>
              これを忘れると、Clone したフォルダの中身が空になります。
            </li>
          </ul>
        </li>
        <li>
          <strong>「Add .gitignore」「Choose a license」</strong> は今回は不要。スルー。
        </li>
        <li>
          下の <strong>「Create repository」</strong> ボタンをクリック。
        </li>
      </ol>

      <Callout variant="tip" title="作った直後に確認">
        <p className="!mt-0">
          リポジトリができたら、ブラウザのアドレスバーで URL を確認:
        </p>
        <p>
          <code>https://github.com/&lt;ユーザー名&gt;/&lt;ユーザー名&gt;</code>
        </p>
        <p>
          そして{" "}
          <code>https://github.com/&lt;ユーザー名&gt;</code>{" "}
          （自分のプロフィールページ）を開くと、
          <strong>デフォルトの README がもう表示されているはず</strong>です。
          この時点で「特殊リポジトリが効いている」ことが確認できます。
        </p>
      </Callout>

      <h2>よくあるつまずき</h2>
      <ul>
        <li>
          <strong>リポジトリ名とユーザー名が一致していない</strong> →{" "}
          Settings → Rename から変更できる。
          または一度 Delete して作り直す。
        </li>
        <li>
          <strong>Private で作ってしまった</strong> → Settings 最下部「Change visibility」→ Public に変更。
        </li>
        <li>
          <strong>README にチェックを入れ忘れた</strong> →{" "}
          リポジトリ画面で「README を追加する」リンクから作成するか、
          Delete して作り直す。
        </li>
        <li>
          <strong>プロフィール画面で README が見えない</strong> →{" "}
          3 点セット（<strong>名前一致・Public・README 存在</strong>）のどれかが崩れていないか確認。
        </li>
      </ul>

      <div className="not-prose mt-8 flex items-center gap-2 rounded-md border border-primary/40 bg-primary/5 p-4">
        <Star size={18} className="text-primary" />
        <div className="text-sm">
          ここまでできると、残りは「中身を書いて GitHub に送る」だけです。
        </div>
      </div>

      <ProgressCheck
        id="web-01-repo"
        label="ユーザー名と同名の Public リポジトリを作り、README も含めて作成できた"
      />

      <PageNav current="/web/01-create-repository" />
    </div>
  );
}
