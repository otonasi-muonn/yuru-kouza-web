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
      <p>4/29 の本番（HTML/CSS）でとくに効くやつです。</p>

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
          why="保存時にコードを整形してくれる。インデントずれ・謎の空白がなくなり、GitHub 上でも読みやすいコードになります。"
          tips="設定で『Editor: Format On Save』をオンにすると、保存＝整形になります。"
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
          why="<img src='...'> や @import '...' のパスを書くときに、フォルダ構造から候補を出してくれる。タイポ由来の『画像が表示されない』問題を防止。"
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
          why="各行の右側に『誰がいつ変更したか』が薄く表示される。履歴を遡るのが一瞬に。ブランチのグラフ表示も見やすい。"
          tips="有料機能の案内が出ますが、無料機能だけで十分強力です。"
        />
        <ExtCard
          name="Git Graph"
          publisher="mhutchie"
          id="mhutchie.git-graph"
          tag="Git"
          icon={<GitBranch size={18} />}
          why="コミット履歴を『線でつながったグラフ』で表示する。ブランチのマージや分岐が目で追える。どんな履歴になっているかは、おまけの『Git インタラクティブ』ページも参照。"
        />
        <ExtCard
          name="GitHub Pull Requests"
          publisher="GitHub"
          id="GitHub.vscode-pull-request-github"
          tag="Git"
          icon={<GitBranch size={18} />}
          why="VSCode 内から Pull Request を作成・レビューできる。チーム開発を始めたら便利。"
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
          why="エラー/警告を『その行の右端に直接』表示してくれる。下のパネルを開かなくてもエラー内容がわかる。初学者に一番効く拡張かもしれない。"
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
          why="変数名やコメントのスペルミスを波線で教えてくれる。`recieve` とか書いたらしっかり怒ってくれます。"
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
          why="行末の無駄な空白（半角スペース）を赤く表示。保存時に自動削除する設定も可能。"
        />
        <ExtCard
          name="Better Comments"
          publisher="Aaron Bond"
          id="aaron-bond.better-comments"
          tag="編集"
          icon={<MousePointer2 size={18} />}
          why="// TODO: / // ! / // ? / // * のプレフィックスでコメントを色分け。重要なメモを目立たせられる。"
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

      <Callout variant="tip" title="まずは ★ の3つだけ">
        <strong>Live Server / Prettier / GitLens（または Git Graph）</strong> の3つを入れるだけで、
        4/29 本番の体感はかなり変わります。他はそのうち必要になったら追加、で十分です。
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
