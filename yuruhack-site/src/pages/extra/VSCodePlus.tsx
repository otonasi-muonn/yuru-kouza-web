import { Callout } from "@/components/Callout";
import {
  Globe,
  Sparkles,
  Bug,
  GitBranch,
  Code2,
  FileType2,
  FolderTree,
  Palette,
  Languages,
  TerminalSquare,
  MousePointer2,
  Brackets,
  FileCode2,
  Eye,
  Zap,
  Boxes,
} from "lucide-react";

/**
 * おまけ: VSCode 推奨拡張（拡充版）
 * 本編 `/common/02-vscode-extensions` では最小限3つに絞ったが、
 * こちらでは「入れておくと確実に便利」な拡張をカテゴリ別に紹介する。
 *
 * ポイント:
 * - 拡張ID は `publisher.name` 形式で、検索欄にそのまま貼れる。
 * - 用途別にタグ（HTML/JS/Git/見た目…）で色分け。
 * - 入れすぎは逆効果（起動が重くなる）ので、最初は ★ の3つだけ、で十分。
 */
export function VSCodePlus() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>VSCode 推奨拡張（拡充版）</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          本編「
          <a href="#/common/02-vscode-extensions">VSCode推奨拡張</a>
          」では、今日必要な最小3つに絞って紹介しました。
          こちらは「入れておくとより快適」な拡張を、用途別に一覧化したおまけです。
          全部入れる必要はありません。<strong>迷ったら ★マーク の3つ</strong> だけ追加してみてください。
        </p>
      </Callout>

      <h2>拡張選びの鉄則</h2>
      <ul>
        <li>
          <strong>入れすぎない</strong> — 起動が遅くなる原因1位。
          使ってない拡張は「無効化」で寝かせておく。
        </li>
        <li>
          <strong>発行元（publisher）を必ず確認</strong> — 人気拡張は偽物が混ざっていることがあります。
          Microsoft / 有名OSS 作者のものを選ぶ。
        </li>
        <li>
          <strong>拡張 ID で検索</strong> — 検索欄に
          <code>@id:esbenp.prettier-vscode</code> のように貼ると、1個だけヒットします。
        </li>
      </ul>

      <h2 id="web">🌐 Web 制作（HTML/CSS/JS）</h2>
      <p>
        4/29 の本番は <strong>HTML/CSS をグループで分担して作る</strong> 形になります。
        ここに挙げた拡張は「書くのが速くなる」だけでなく、
        <strong>他の人が触ったコードを読む／壊さない</strong> ためにも効きます。
      </p>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <ExtCard
          star
          name="Live Server"
          publisher="Ritwick Dey"
          id="ritwickdey.LiveServer"
          tag="Web"
          icon={<Globe size={18} />}
          why="HTMLファイルを右クリック → 『Open with Live Server』でローカルサーバが起動。保存のたびにブラウザが自動リロードされるので、『ファイルを保存 → ブラウザ確認』の往復が一瞬に。"
          tips="左下の『Go Live』ボタンからも起動できます。既定ポートは 5500。"
        />
        <ExtCard
          star
          name="Prettier - Code formatter"
          publisher="Prettier"
          id="esbenp.prettier-vscode"
          tag="Format"
          icon={<Sparkles size={18} />}
          why="保存時にコードを整形してくれる。グループ開発では各自のインデント幅・改行ルールがバラバラだと、PRの差分が『フォーマット違いだけの行』で埋まってレビュー不能になりがち。全員が Prettier を入れておくだけで書き方が自動で揃い、本当に意味のある差分だけが残ります。"
          tips="『Editor: Format On Save』をオンにすると保存＝整形に。チームで設定ファイル (.prettierrc) を共有するとさらに揃います。"
        />
        <ExtCard
          name="Auto Rename Tag"
          publisher="Jun Han"
          id="formulahendry.auto-rename-tag"
          tag="HTML"
          icon={<FileCode2 size={18} />}
          why="<div> を <section> に書き換えると、閉じタグも自動で追従してくれる。HTMLのタイプミスが劇的に減ります。"
        />
        <ExtCard
          name="Auto Close Tag"
          publisher="Jun Han"
          id="formulahendry.auto-close-tag"
          tag="HTML"
          icon={<Brackets size={18} />}
          why="<p と書いた時点で </p> まで自動で補完。地味だが毎回効く。"
        />
        <ExtCard
          name="Path Intellisense"
          publisher="Christian Kohler"
          id="christian-kohler.path-intellisense"
          tag="補完"
          icon={<FolderTree size={18} />}
          why="<img src='...'> や @import '...' のパスを書くときに、フォルダ構造から候補を出してくれる。他の人が置いた画像・CSSのファイル名をいちいち覚えなくても補完で呼び出せるので、グループ開発での『ファイル名うろ覚え事故』を防げます。"
        />
        <ExtCard
          name="Live Preview"
          publisher="Microsoft"
          id="ms-vscode.live-server"
          tag="Web"
          icon={<Eye size={18} />}
          why="Microsoft 純正の簡易プレビュー。VSCode 内にミニブラウザを開けるので画面を並べる必要なし。Live Server と用途が被るので、どちらかでOK。"
        />
      </div>

      <h2 id="git">🐙 Git / GitHub</h2>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <ExtCard
          star
          name="GitLens — Git supercharged"
          publisher="GitKraken"
          id="eamodio.gitlens"
          tag="Git"
          icon={<GitBranch size={18} />}
          why="各行の右側に『誰がいつ・何のコミットで変更したか』が薄く表示される。グループ開発で一番効くのがこれで、『この行なんで？』と思ったときに誰に声をかければ良いかが一瞬で分かります。コンフリクトしたときの『どっちのが新しいのか』問題も減る。"
          tips="有料機能の案内が出ますが、無料機能（blameと履歴表示）だけで十分強力です。"
        />
        <ExtCard
          name="Git Graph"
          publisher="mhutchie"
          id="mhutchie.git-graph"
          tag="Git"
          icon={<GitBranch size={18} />}
          why="コミット履歴を『線でつながったグラフ』で表示する。複数人がそれぞれブランチを切って作業するグループ開発では、口頭で『今どのブランチ？』を確認するより、このグラフを見せ合ったほうが早い。どんな履歴になっているかは、おまけの『Git インタラクティブ』ページも参照。"
        />
        <ExtCard
          star
          name="GitHub Pull Requests"
          publisher="GitHub"
          id="GitHub.vscode-pull-request-github"
          tag="Git"
          icon={<GitBranch size={18} />}
          why="VSCode 内から Pull Request を作成・レビュー・コメントできる。今回の本番はグループ開発なので、PR のやりとりが作業の中心になります。ブラウザとエディタを往復せず、差分を見ながらその場でコメントを付けられるのは大きい。自分が他人のPRをレビューする側になったときにも効きます。"
          tips="初回は GitHub へのサインイン（OAuth）が必要。『GitHub アカウント作成』のページの手順で済ませておくとスムーズです。"
        />
      </div>

      <h2 id="quality">🐞 コードの品質・エラー検知</h2>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <ExtCard
          name="Error Lens"
          publisher="Usernamehw"
          id="usernamehw.errorlens"
          tag="診断"
          icon={<Bug size={18} />}
          why="エラー/警告を『その行の右端に直接』表示してくれる。下のパネルを開かなくてもエラー内容がわかる。グループ開発だと『自分のローカルではエラーになってないから push』→『他の人の環境で壊れる』が起きがちなので、見逃さない仕組みを最初に入れておくのがおすすめ。"
        />
        <ExtCard
          name="ESLint"
          publisher="Microsoft"
          id="dbaeumer.vscode-eslint"
          tag="JS"
          icon={<Code2 size={18} />}
          why="JavaScript/TypeScript の問題（未使用変数・文法ミス）を編集中に指摘。使われていないコードが黄色く薄くなるのでリファクタしやすい。"
        />
        <ExtCard
          name="Code Spell Checker"
          publisher="Street Side Software"
          id="streetsidesoftware.code-spell-checker"
          tag="診断"
          icon={<FileType2 size={18} />}
          why="変数名やコメントのスペルミスを波線で教えてくれる。グループ開発で怖いのは『他の人が `receive` で探しても、書いた本人が `recieve` で定義してる』ことで、全文検索に引っかからなくなるケース。初期段階でスペルを揃えておくと、あとで整合が取れなくなる事故を減らせます。"
        />
      </div>

      <h2 id="look">🎨 見た目・アイコン</h2>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <ExtCard
          name="Material Icon Theme"
          publisher="Philippe Charrière"
          id="PKief.material-icon-theme"
          tag="見た目"
          icon={<Palette size={18} />}
          why="ファイルの種類ごとにカラフルなアイコンを表示。エクスプローラが一目で『どれが HTML/CSS/JS/画像か』わかるようになる。"
        />
        <ExtCard
          name="Indent Rainbow"
          publisher="oderwat"
          id="oderwat.indent-rainbow"
          tag="見た目"
          icon={<Palette size={18} />}
          why="インデントを虹色に着色。ネストが深いコードでも『どの階層にいるか』が目で追える。"
        />
        <ExtCard
          name="Blockman - Highlight Nested Code Blocks"
          publisher="leodevbro"
          id="leodevbro.blockman"
          tag="見た目"
          icon={<Boxes size={18} />}
          why="関数・if・ループなど、ネストしたコードブロックごとに枠線を描いてくれる。Indent Rainbow が『インデント列』に色を付けるのに対し、こちらは『ブロックの範囲』を四角で囲むので、他の人が書いたコードを読むときに『このループどこまで？』『この関数どこで終わる？』が一瞬でわかります。"
          tips="描画にやや負荷がかかるタイプの拡張なので、起動が重いと感じたら無効化。Indent Rainbow とは好みで使い分けでOK。"
        />
        <ExtCard
          name="Highlight Matching Tag"
          publisher="vincaslt"
          id="vincaslt.highlight-matching-tag"
          tag="HTML"
          icon={<Code2 size={18} />}
          why="HTML の対応する開始タグ/終了タグを色でつなげてくれる。長い HTML で『どこの閉じタグか』迷わない。"
        />
      </div>

      <h2 id="ja">🗾 日本語・作業効率</h2>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <ExtCard
          star
          name="Japanese Language Pack"
          publisher="Microsoft"
          id="MS-CEINTL.vscode-language-pack-ja"
          tag="言語"
          icon={<Languages size={18} />}
          why="本編で入れた日本語パック。メニューがすべて日本語に。（念押し）"
        />
        <ExtCard
          name="Trailing Spaces"
          publisher="Shardul Mahadik"
          id="shardulm94.trailing-spaces"
          tag="編集"
          icon={<Zap size={18} />}
          why="行末の無駄な空白（半角スペース）を赤く表示。保存時に自動削除する設定も可能。『見えない空白だけの差分』がPRに混ざるとレビュー側の集中力を削るので、全員が入れて保存時自動削除にしておくのがおすすめ。"
        />
        <ExtCard
          name="Better Comments"
          publisher="Aaron Bond"
          id="aaron-bond.better-comments"
          tag="編集"
          icon={<MousePointer2 size={18} />}
          why="// TODO: / // ! / // ? / // * のプレフィックスでコメントを色分け。『あとでチームに相談』『ここ仮実装』といった申し送りを埋もれず残せるので、グループ開発での引き継ぎメモに便利。"
        />
        <ExtCard
          name="REST Client"
          publisher="Huachao Mao"
          id="humao.rest-client"
          tag="API"
          icon={<TerminalSquare size={18} />}
          why="`.http` ファイルにAPIリクエストを書いて『Send Request』を押すだけで実行できる。curl コマンドを覚えなくてOK。"
        />
      </div>

      <Callout variant="warn" title="入れすぎた感があるとき">
        VSCode 左下のステータスバー右端『⚙️ → プロファイル』からプロファイルを切り替えると、
        用途ごと（Web 制作用 / 文章執筆用など）に拡張のオン/オフを管理できます。
        Web班なら『Web』プロファイルを作って、関係ない拡張はそっちで無効化しておくと快適です。
      </Callout>

      <Callout variant="tip" title="グループ開発を前提に、まずは ★ の数個だけ">
        本番はグループ開発なので、
        <strong> Live Server（自分の画面確認）/ Prettier（書き方を揃える）/ GitLens（誰が書いた行か見る）/ GitHub Pull Requests（レビューと会話）</strong>
        あたりを入れておくと、個人作業ではなく『チームで1つのものを作る』ときのストレスがかなり減ります。
        他は必要になったタイミングで追加で十分です。
      </Callout>
    </div>
  );
}

function ExtCard({
  name,
  publisher,
  id,
  why,
  tag,
  tips,
  icon,
  star,
}: {
  name: string;
  publisher: string;
  id: string;
  why: string;
  tag: string;
  tips?: string;
  icon: React.ReactNode;
  star?: boolean;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0 rounded-md bg-primary/10 p-2 text-primary">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-semibold leading-tight">
              {star && (
                <span aria-label="おすすめ" title="おすすめ" className="mr-1 text-amber-500">
                  ★
                </span>
              )}
              {name}
            </div>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[0.65rem] text-muted-foreground">
              {tag}
            </span>
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            発行元: {publisher}
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{why}</p>
      {tips && (
        <p className="mt-1.5 text-xs text-primary/90">💡 {tips}</p>
      )}
      <code className="mt-2 block truncate rounded bg-muted px-2 py-1 font-mono text-[0.75rem]">
        {id}
      </code>
    </div>
  );
}
