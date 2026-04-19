import { Callout, StepMeta } from "@/components/Callout";
import { ProgressCheck } from "@/components/ProgressCheck";
import { PageNav } from "@/components/NextLink";
import { GitBranch, Upload, PartyPopper } from "lucide-react";

export function CommitPush() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-primary">Web班 · 4/5</div>
      <h1>Commit & Push</h1>

      <StepMeta
        goal="変更した README.md を GitHub に送り、プロフィールページに表示する"
        time="約 10 分"
        prev={{ path: "/web/03-markdown-edit", label: "README を書く" }}
      />

      <Callout variant="info" title="この作業は何？">
        <p className="!mt-0">
          PC で書いた <code>README.md</code> は<strong>まだ自分のPCの中にしかいません</strong>。
          これを GitHub 側に『送りつける』ことで初めて、世界に公開されます。
          送る工程は <strong>Commit（記録）→ Push（送信）</strong> の 2 段階です。
        </p>
      </Callout>

      <Callout variant="info" title="Commit と Push の違い（ざっくり）">
        <ul>
          <li>
            <strong>Commit（コミット）</strong>: 「ここまでの変更を一塊として記録する」
            操作。履歴に名前（メッセージ）を付けて残す。PC 側で完結。
          </li>
          <li>
            <strong>Push（プッシュ）</strong>: 「その記録を GitHub 側に送る」操作。
            Push して初めてネット上の自分のリポジトリが更新されます。
          </li>
        </ul>
        <p className="text-xs text-muted-foreground">
          なぜ分かれているの？ → Commit は何回でも積めて、まとめて Push できる設計だから。
          『メモ書き』を何個も置いてから『清書して送る』イメージ。
        </p>
      </Callout>

      <Callout variant="tip" title="ブランチって何？今は『main』だけ覚えれば OK">
        <p className="!mt-0">
          リポジトリの中には <strong>ブランチ（branch）</strong>という『作業の系統』があります。
          今日は <code>main</code> という1本のブランチしかない状態で進めるので、
          <strong>『 main に向かって Push している』</strong>とだけ理解できれば十分。
        </p>
        <ul>
          <li><code>HEAD</code> — 『いま自分がいるコミット』を指す目印</li>
          <li><code>origin</code> — GitHub 側のリモートの別名（デフォルトでこの名前）</li>
          <li><code>origin/main</code> — GitHub 上の main ブランチ</li>
        </ul>
        <p className="text-xs text-muted-foreground">
          ブランチを分けたり合流させたりする話は{" "}
          <a href="#/extra/git-deep">Git 詳細</a> で。
          本番の複数人開発では必須スキルですが、今日は 1 本で十分。
        </p>
      </Callout>

      <Callout variant="tip" title="Git コマンドは覚えなくて大丈夫">
        <p className="!mt-0">
          本格的には <code>git add</code> <code>git commit</code>{" "}
          <code>git push</code> …と打つのですが、今日は
          <strong>VSCode のボタン操作だけ</strong>で完結させます。
          コマンドは 4/29 以降、必要になってから覚えればOKです。
        </p>
        <p>ただし『ボタンが裏で何をやっているか』は一言で覚えると強いです:</p>
      </Callout>

      <div className="not-prose my-5 overflow-hidden rounded-md border border-border text-sm">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">VSCode のボタン</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">裏で走るコマンド</th>
              <th className="border-b border-border px-3 py-2 text-left font-semibold">意味</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-3 py-2">「+」（ステージ）</td>
              <td className="px-3 py-2 font-mono text-[0.82rem]">git add &lt;file&gt;</td>
              <td className="px-3 py-2 text-muted-foreground">このファイルをコミットに含める</td>
            </tr>
            <tr>
              <td className="px-3 py-2">「コミット」</td>
              <td className="px-3 py-2 font-mono text-[0.82rem]">git commit -m "..."</td>
              <td className="px-3 py-2 text-muted-foreground">ステージしたものをまとめて記録</td>
            </tr>
            <tr>
              <td className="px-3 py-2">「変更の同期」/「Push」</td>
              <td className="px-3 py-2 font-mono text-[0.82rem]">git push</td>
              <td className="px-3 py-2 text-muted-foreground">記録を GitHub に送る</td>
            </tr>
            <tr>
              <td className="px-3 py-2">「変更の同期」（Pull 含む時）</td>
              <td className="px-3 py-2 font-mono text-[0.82rem]">git pull → git push</td>
              <td className="px-3 py-2 text-muted-foreground">先に受信してから送る</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
        <Step n={1} icon={<GitBranch size={18} />} title="ステージング">
          変更したファイルを「このコミットに含める」と選ぶ
        </Step>
        <Step n={2} icon={<GitBranch size={18} />} title="コミット">
          メッセージを書いて記録する
        </Step>
        <Step n={3} icon={<Upload size={18} />} title="プッシュ">
          GitHub に送る（公開される）
        </Step>
      </div>

      <h2>手順</h2>
      <ol>
        <li>
          VSCode 左端のサイドバー、<strong>「ソース管理」</strong>アイコン
          （枝分かれ のマーク）をクリック。
          変更したファイル（<code>README.md</code>）が一覧に出ます。
        </li>
        <li>
          ファイル名の右側に出ている <strong>「+」アイコン</strong>{" "}
          をクリックして <strong>ステージング</strong>。
          「Changes」から「Staged Changes」に移動します。
          <Callout variant="tip" title="全部ステージングするショートカット">
            ファイルが 1 つしか無い場合、メッセージ欄に書いて「コミット」を押すと、
            自動で「ステージしていないけど全部ステージしてコミットしますか？」と聞かれます。
            「Yes」でも進めます。
          </Callout>
        </li>
        <li>
          メッセージ欄に、変更の内容を一言で書きます。
          <div className="not-prose my-3 rounded-md border border-border bg-muted/40 p-3 text-sm">
            例: <code>update README</code> / <code>書く</code> /{" "}
            <code>自己紹介を書いた</code> など、後で見たときに自分が分かればOK。
          </div>
        </li>
        <li>
          <strong>「コミット」</strong>ボタンをクリック。
        </li>
        <li>
          コミット後、ボタンが <strong>「変更の同期」</strong>（または「Push」「プッシュ」）に変わります。押して GitHub に送信。
        </li>
        <li>
          右下に「このアクションが〇件の commit を push して…」というダイアログが出たら <strong>「OK」</strong>。
        </li>
      </ol>

      <h2>確認: プロフィール画面を見る</h2>
      <ol>
        <li>
          ブラウザで{" "}
          <code>https://github.com/&lt;自分のユーザー名&gt;</code>{" "}
          を開く。
        </li>
        <li>
          ページ中央に、<strong>自分で書いた自己紹介 README</strong>{" "}
          が表示されていれば成功！
        </li>
      </ol>

      <div className="not-prose my-8 flex items-center gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-5">
        <PartyPopper size={24} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
        <div>
          <div className="font-bold text-emerald-800 dark:text-emerald-300">
            おめでとうございます！今日のゴール達成です 🎉
          </div>
          <p className="mt-1 text-sm text-emerald-900/80 dark:text-emerald-200/80">
            ここが一番の山場。クラス全員で画面を見せ合いましょう。
          </p>
        </div>
      </div>

      <Callout variant="info" title="周りと見せ合うタイミング">
        <p className="!mt-0">
          運営が「いったん共有タイム」と呼びかけたら、
          近くの参加者と <strong>画面を見せ合って</strong> ください。
        </p>
        <ul>
          <li>他の人の書き方からヒントをもらう</li>
          <li>困っている人がいたら「一緒に見てみる」</li>
          <li>メンターに「なぜ公開されるのか」聞いてみる</li>
        </ul>
      </Callout>

      <h2>よくあるつまずき</h2>
      <ul>
        <li>
          <strong>ステージングし忘れて、空コミットになる</strong> →{" "}
          「Staged Changes」にファイルが入っているか再確認。
          何も無ければ「+」でステージする。
        </li>
        <li>
          <strong>ローカルは変わったのに GitHub に反映されない</strong> →{" "}
          Push が終わっていません。「変更の同期」ボタンを必ず押す。
        </li>
        <li>
          <strong>プロフィール画面に出てこない</strong> →{" "}
          <ul>
            <li>
              リポジトリ名 = ユーザー名（
              <a href="#/web/01-create-repository">一致チェック</a>）
            </li>
            <li>Public になっている</li>
            <li>README.md に中身がある</li>
          </ul>
          この 3 つを順番に確認。
        </li>
        <li>
          <strong>Push のときにログインを求められる</strong> →{" "}
          ブラウザが開いたら GitHub にログインし直して許可。
        </li>
        <li>
          <strong>『マージしてから push してください』と言われた</strong> →{" "}
          GitHub 側に自分以外（もしくはブラウザで編集した自分）の変更がある状態。
          「変更の同期」を押すと Pull → Push を順に走らせてくれます。
          詳しい話は{" "}
          <a href="#/extra/merge-conflict">マージコンフリクト入門</a> に。
        </li>
        <li>
          <strong>『このリポジトリにまだ origin がない』と言われる</strong> →{" "}
          Clone 経由ではなく手動でフォルダを作ったケース。
          右下のバナーから「Publish to GitHub」を選ぶと、空のリポジトリを作って紐付けてくれます。
        </li>
      </ul>

      <Callout variant="info" title="なぜバージョン管理（Git）を使うのか">
        <p className="!mt-0">
          『 Ctrl+S で保存すればいいじゃん』『Google ドライブで共有すれば？』
          という素朴な疑問は正しいです。なのに Git を使う理由は{" "}
          <a href="#/extra/vcs-motivation">VCS のありがたみ</a>{" "}
          にまとめてあるので、気になったら覗いてみてください。
        </p>
      </Callout>

      <ProgressCheck
        id="web-04-commit-push"
        label="Commit と Push が完了し、プロフィール画面に README が表示された"
      />

      <PageNav current="/web/04-commit-push" />
    </div>
  );
}

function Step({
  n,
  icon,
  title,
  children,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-md border border-border bg-card p-4">
      <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {n}
      </div>
      <div className="mb-2 text-primary">{icon}</div>
      <div className="font-semibold text-[0.95rem]">{title}</div>
      <p className="mt-1 text-xs text-muted-foreground">{children}</p>
    </div>
  );
}
