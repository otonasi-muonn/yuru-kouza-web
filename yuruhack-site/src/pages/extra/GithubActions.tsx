import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";

const YAML_SAMPLE = `name: Say hello on push

on:
  push:
    branches: [main]

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Print a message
        run: echo "Push されたよ！"
`;

export function GithubActions() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>GitHub Actions（CI/CD の入口）</h1>

      <Callout variant="info" title="ざっくり説明">
        <p className="!mt-0">
          <strong>GitHub Actions</strong> は、リポジトリに何かが起きたとき（push、pull request、スケジュール等）
          に自動で何かを実行させる仕組みです。
          4/29 の本番で「push したら自動でサイトが公開される」のも、この仕組みです。
        </p>
      </Callout>

      <h2>CI / CD って何？</h2>
      <ul>
        <li>
          <strong>CI（Continuous Integration）</strong>:
          コードが変わるたびに、ビルドやテストを自動で回す仕組み。
        </li>
        <li>
          <strong>CD（Continuous Delivery / Deployment）</strong>:
          ビルドが通ったものを自動で本番に配布・公開する仕組み。
        </li>
      </ul>
      <p>
        小さな個人プロジェクトなら「push したら自動で公開する」だけで十分 CI/CD と言えます。
      </p>

      <h2>小さなサンプル: push されたら挨拶するワークフロー</h2>
      <p>
        リポジトリに <code>.github/workflows/hello.yml</code>{" "}
        というファイルを作って以下を書きます:
      </p>
      <CopyBlock
        code={YAML_SAMPLE}
        lang="yaml"
        filename=".github/workflows/hello.yml"
        highlightPlaceholders={false}
      />

      <p>
        これだけで、<code>main</code> ブランチに Push するたびに GitHub の Actions タブで
        「Push されたよ！」が実行される、という動きになります。
      </p>

      <h2>今日の特殊リポジトリで試すなら</h2>
      <p>
        たとえば「README が更新されたら自動で最終更新日時を別ファイルに記録する」
        などの小さな遊びができます。
      </p>
      <ul>
        <li>
          <a
            href="https://docs.github.com/ja/actions"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Actions ドキュメント
          </a>
        </li>
        <li>
          <a
            href="https://github.com/marketplace?type=actions"
            target="_blank"
            rel="noreferrer"
          >
            Actions Marketplace（既製アクションの一覧）
          </a>
        </li>
      </ul>

      <Callout variant="tip" title="本番で出会う例">
        4/29 のハッカソンでは「GitHub Pages にデプロイする公式アクション」
        （<code>actions/deploy-pages</code>）を使います。
        push するだけでサイトが更新される魔法の正体、ぜひ覗いてみてください。
      </Callout>
    </div>
  );
}
