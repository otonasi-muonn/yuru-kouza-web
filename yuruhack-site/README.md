# yuruhack-site

ゆるハッカソン 事前講座（4/26）Web班 教材サイトのソースコード。

SDD 仕様書（親フォルダ `dock/`）の FR/NFR を実装。
ビルド成果物 `bundle.html`（単一 HTML ファイル）は、そのまま GitHub Pages
や任意の静的ホスティングに置けます。

## 構成

- **React 18 + TypeScript**（ハッシュルーティングの SPA）
- **Tailwind CSS 3.4** + **shadcn/ui**（Dialog のみ使用）
- **Vite**（開発サーバとビルド）
- **Parcel + html-inline**（単一 HTML へのバンドル）

## ディレクトリ

```
src/
  App.tsx                     # ルーティング
  main.tsx                    # エントリ
  index.css                   # テーマ・プロース（Markdown 風）スタイル
  lib/
    storage.ts                # localStorage ラッパ（SSRセーフ / 劣化モード対応）
    os.ts                     # navigator.userAgentData → navigator.platform の OS 判定
    routes.ts                 # ページ定義・prev/next 計算
    progress-ids.ts           # 進捗ID一覧（サイドバー側の集計に使用）
    utils.ts                  # shadcn 用
  components/
    Layout.tsx                # ヘッダー + サイドバー + main
    Sidebar.tsx               # 折りたたみ可能。各セクションに進捗バッジ
    ProgressCheck.tsx         # 進捗チェックボックス（localStorage 永続）
    OSTabs.tsx                # Windows/Mac タブ（ページ間同期）
    CopyBlock.tsx             # コピー可能なテンプレブロック。プレースホルダー強調
    ProgressReset.tsx         # 確認ダイアログ付き進捗リセット
    ThemeToggle.tsx           # ダーク/ライト
    Callout.tsx               # info / warn / tip / danger の4種
    NextLink.tsx              # 前後ステップへのリンク
    ui/                       # shadcn/ui（ほぼ Dialog のみ使用）
  pages/
    Home.tsx                  # トップ（タイムスケジュール・ドッグフーディング明示）
    common/*.tsx              # 共通モジュール3ページ
    web/*.tsx                 # Web班5ページ
    extra/*.tsx               # 発展コンテンツ6ページ
    NotFound.tsx
```

## 開発

pnpm と Node 18 以上が必要。

```bash
pnpm install
pnpm dev         # ローカルサーバ（Vite HMR）
pnpm build       # TypeScript チェック + 本番ビルド (dist/)
pnpm test        # Vitest: lib/ 単体テスト + コンポーネント smoke
pnpm test:watch  # 開発中の watch モード
```

### テスト

- **環境**: Vitest 4 + jsdom + React Testing Library
- **対象**:
  - `src/lib/*` — storage（localStorage ラッパ / 劣化モード）、os 判定、ルーティング
  - `src/components/*` — ProgressCheck / CopyBlock / Sidebar の smoke test
- **CI**: `.github/workflows/deploy.yml` の `Unit tests` ステップでビルド前に実行。
  テストが落ちると Pages デプロイもされない。

## 単一 HTML へバンドル

```bash
pnpm add -D parcel @parcel/config-default parcel-resolver-tspaths html-inline
# .parcelrc が無い場合は以下を作成:
# { "extends": "@parcel/config-default",
#   "resolvers": ["parcel-resolver-tspaths", "..."] }

pnpm exec parcel build index.html --dist-dir dist --no-source-maps
pnpm exec html-inline dist/index.html > bundle.html
```

成果物 `bundle.html`（約 400KB）はそのままブラウザで開けて動きます。
親フォルダの `yuruhack-docs.html` がその完成品です。

## GitHub Pages へのデプロイ（SDD 7章対応）

`.github/workflows/deploy.yml` 例:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - uses: actions/deploy-pages@v4
```

`vite.config.ts` に `base: '/<リポジトリ名>/'` を追記すれば
プロジェクト Pages として公開できます。

## 実装済みの SDD 要件

| SDD | 実装箇所 |
|---|---|
| FR-1 教材閲覧・サイドバー・次へリンク | `Layout` / `Sidebar` / `NextLink` |
| FR-2 レスポンシブ・ハンバーガー・タップ44px | `Layout`（lg 未満でドロワー表示） |
| FR-3 コピペ（API不可時フォールバック + プレースホルダー強調） | `CopyBlock` |
| FR-4 進捗保存・復元・サイドバー可視化・**リセット（P0）** | `ProgressCheck` + `Sidebar` + `ProgressReset` |
| FR-5 OS切替（自動判定→手動・ページ内同期） | `OSTabs` + `os.ts` |
| FR-6 発展コンテンツを区別 | サイドバー「おまけ（発展）」で折りたたみ |
| NFR-1 堅牢性（例外で画面全滅させない） | `ErrorBoundary`（再読み込み / 進捗リセット付き） |
| NFR-4 キー操作・コントラスト | 全ボタン `aria-*`、WCAG AA 配色 |
| NFR-6 プライバシー | `localStorage` に進捗/OS/テーマのみ、外部通信なし |
| D-03 4/29 コンテンツとの共存 | サイドバー「事前講座（4/26）」グループ構造、`/hackathon/` 追加用プレースホルダー表示 |
| D-11 ドッグフーディング明示 | トップページと全ページフッター |

## 当日運用

メンター / TA 向けのトラブル対応集は `../dock/runbook.md` に置いています。
