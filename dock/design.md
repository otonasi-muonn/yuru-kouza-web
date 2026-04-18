# 設計書

## 0. 確定事項（2026/04/18 レビュー後）

| # | 項目 | 決定 |
|---|---|---|
| D-01 | SSG | **VitePress** |
| D-02 | ホスティング | **GitHub Pages**（4/29本番で参加者が使う同じ仕組み＝**ドッグフーディング**） |
| D-03 | リポジトリ構成 | **1リポジトリで4/26 + 4/29両方をホスト**。4/29は後日 `/hackathon/` 配下に追加 |
| D-04 | `ProgressReset` | **P0**（当日の復旧手段として必須） |

### ドッグフーディング観点の含意
本サイト自体が「GitHub Pages で公開された静的サイト」となるため、**参加者が4/29に学ぶ成果物の完成見本として機能**する。トップページで「このサイトも GitHub Pages で動いている」と明示すると動機付けに寄与する。

### 4/29コンテンツとの共存ルール
- 4/26用の現行パス: `/common/`, `/web/`, `/extra/`
- 4/29用の将来パス: `/hackathon/web/`, `/hackathon/unity/`（予定、本SDD対象外）
- サイドバーで「事前講座（4/26）」「ハッカソン本番（4/29）」の2グループに分ける構造にしておく
- 4/29コンテンツ追加時は `config.ts` のサイドバー定義のみ編集し、4/26コンテンツは移動しない

---

## 1. アーキテクチャ概要

### 1.1 採用技術

| レイヤ | 採用 | バージョン目安 |
|---|---|---|
| SSG | **VitePress** | 1.x |
| 言語 | **TypeScript** | 5.x |
| UIフレームワーク | Vue 3（VitePress同梱） | 3.x |
| パッケージマネージャ | pnpm | 8.x 以上 |
| ホスティング | GitHub Pages | - |
| CI/CD | GitHub Actions | - |

### 1.2 技術選定理由

#### VitePressを選ぶ
- **ドキュメント特化**: サイドバー・ナビバー・ローカル検索・ダークモードが既定で揃う。自作コストが最小。
- **Vueコンポーネントを `.md` に埋め込める**: 進捗チェック・OS切替のような小さなインタラクションを、Markdown 本文の中でタグとして書くだけで使える（執筆者の学習コストが極小）。
- **Vite基盤で高速**: ローカル開発のHMRが速く、執筆者の試行錯誤が軽い。
- **TypeScript対応**: 設定・コンポーネントを型で管理できる。

#### Astro / Docusaurus を選ばない理由
- **Astro**: 汎用性は高いがドキュメント用の既定UI（サイドバー等）を自作する必要があり、今回の工数制約に合わない。
- **Docusaurus**: React/MDX ベースで十分強力だが、本プロジェクトは「運営がMarkdownだけで編集できる」ことを重視するため、より軽量でVue単一SFCコンポーネントが使える VitePress が適切。

---

## 2. ディレクトリ構造

```
yuruhack-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages への自動デプロイ
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts               # サイト設定、サイドバー定義
│   │   ├── theme/
│   │   │   ├── index.ts            # テーマ拡張エントリ（コンポーネント登録）
│   │   │   ├── custom.css          # 日本語フォント、モバイル調整
│   │   │   └── components/
│   │   │       ├── ProgressCheck.vue
│   │   │       ├── OSTabs.vue
│   │   │       ├── CopyBlock.vue
│   │   │       └── ProgressReset.vue
│   │   └── utils/
│   │       ├── storage.ts          # localStorage ラッパー（SSRセーフ）
│   │       └── os.ts               # OS判定
│   ├── index.md                    # トップページ
│   ├── common/
│   │   ├── index.md
│   │   ├── 01-github-account.md
│   │   ├── 02-vscode-extensions.md
│   │   └── 03-github-oauth.md
│   ├── web/
│   │   ├── index.md
│   │   ├── 01-create-repository.md
│   │   ├── 02-clone.md
│   │   ├── 03-markdown-edit.md
│   │   ├── 04-commit-push.md
│   │   └── 05-challenge.md
│   └── extra/
│       ├── index.md
│       ├── ssh.md
│       ├── github-actions.md
│       ├── html-css-basics.md
│       ├── javascript-basics.md
│       ├── github-pages.md
│       └── css-frameworks.md
├── public/
│   └── images/                     # スクリーンショット類
├── package.json
├── tsconfig.json
└── README.md
```

### サイドバー定義（`config.ts` イメージ）

4/29コンテンツとの共存を見据え、「事前講座（4/26）」セクションとして括る。

```ts
sidebar: {
  '/': [
    {
      text: '事前講座（4/26）',
      items: [
        {
          text: '共通モジュール',
          collapsed: false,
          items: [
            { text: 'GitHubアカウント作成', link: '/common/01-github-account' },
            { text: 'VSCode推奨拡張',       link: '/common/02-vscode-extensions' },
            { text: 'GitHub OAuth連携',     link: '/common/03-github-oauth' },
          ],
        },
        {
          text: 'Web班',
          collapsed: false,
          items: [
            { text: 'リポジトリ作成',   link: '/web/01-create-repository' },
            { text: 'Clone',            link: '/web/02-clone' },
            { text: 'READMEを書く',     link: '/web/03-markdown-edit' },
            { text: 'Commit & Push',    link: '/web/04-commit-push' },
            { text: 'ミニチャレンジ',   link: '/web/05-challenge' },
          ],
        },
        {
          text: 'おまけ（発展）',
          collapsed: true,
          items: [
            { text: 'SSH接続',             link: '/extra/ssh' },
            { text: 'GitHub Actions',      link: '/extra/github-actions' },
            { text: 'HTML/CSS基礎',        link: '/extra/html-css-basics' },
            { text: 'JavaScript基礎',      link: '/extra/javascript-basics' },
            { text: 'GitHub Pages',        link: '/extra/github-pages' },
            { text: 'CSSフレームワーク',   link: '/extra/css-frameworks' },
          ],
        },
      ],
    },
    // 4/29本番コンテンツは後日ここに `{ text: 'ハッカソン本番（4/29）', items: [...] }` として追加
  ],
}
```

---

## 3. コンポーネント設計

全コンポーネントに共通する方針:
- **SSRセーフ**: VitePress はビルド時に SSG するため、`window` / `localStorage` アクセスは `onMounted` 内または `typeof window !== 'undefined'` ガード内でのみ行う
- **軽量**: 外部UIライブラリは入れない
- **Markdownフレンドリー**: 引数は属性、本文はスロットで受ける

### 3.1 `ProgressCheck.vue`

**目的**: Markdown 内に埋め込める進捗チェックボックス。

**Props**
| 名前 | 型 | 必須 | 説明 |
|---|---|---|---|
| `id` | `string` | ✓ | 進捗識別子（例: `web-01-repo`） |
| `label` | `string` | - | 表示テキスト（省略時はスロット） |

**内部動作**
1. `onMounted` で `storage.getProgress(id)` を読み出し `checked` を初期化
2. クリックで状態反転し `storage.setProgress(id, checked)`
3. 変化時にカスタムイベント `progress-updated` を `window` に発火（サイドバー側が受けて再計算）

**Markdownでの使用例**
```md
作業が終わったらチェック:

<ProgressCheck id="web-01-repo" label="リポジトリが作成できた" />
```

---

### 3.2 `OSTabs.vue`

**目的**: Windows / Mac 固有手順を切り替える。

**Slots**
- `#windows` - Windows 向け内容
- `#mac` - Mac 向け内容

**内部動作**
1. `onMounted` で `storage.getOS()` を読み出し、なければ `detectOS()` で推測
2. タブクリックで `storage.setOS(os)` + `os-changed` イベント発火
3. 他の `OSTabs` も `os-changed` をリスンして同期

**Markdownでの使用例**
```md
<OSTabs>
  <template #windows>

「Ctrl + Shift + P」でコマンドパレットを開く。

  </template>
  <template #mac>

「Cmd + Shift + P」でコマンドパレットを開く。

  </template>
</OSTabs>
```

---

### 3.3 `CopyBlock.vue`

**目的**: 自己紹介テンプレなど、コピペ前提のブロック。

**Props**
| 名前 | 型 | 既定値 | 説明 |
|---|---|---|---|
| `lang` | `string` | `"markdown"` | シンタックスハイライト |
| `filename` | `string` | - | ヘッダに表示するファイル名 |

**動作**
- 右上にコピー用ボタン
- `navigator.clipboard.writeText` で書き込み。非対応時は `document.execCommand('copy')` にフォールバック
- 成功時「コピーしました」トースト（2秒）

---

### 3.4 `ProgressReset.vue`

**目的**: 全進捗をクリア。

**動作**
- ボタン押下 → 確認ダイアログ → `storage.clearAllProgress()`
- フッターまたは「設定」欄に配置

---

### 3.5 サイドバー進捗表示（VitePressテーマ拡張）

- VitePressのデフォルトサイドバーを `Layout` 拡張で差し替え、セクションごとに「✓ 3/5」のような進捗バッジを表示
- `progress-updated` イベントで再計算
- モバイル（ハンバーガー展開時）でも表示

---

## 4. データモデル

### 4.1 `localStorage` スキーマ

- プレフィックス: `yuruhack:`（他サイトとの衝突回避）
- バージョンキーを持ち、将来スキーマ変更時にマイグレーションできるようにする

| キー | 値 | 例 |
|---|---|---|
| `yuruhack:version` | スキーマバージョン | `"1"` |
| `yuruhack:progress:<id>` | `"1"`（完了）／キー自体なし（未完了） | `yuruhack:progress:web-01-repo` → `"1"` |
| `yuruhack:os-pref` | `"windows"` ＼ `"mac"` | `"mac"` |

### 4.2 `storage.ts` 型定義

```ts
// docs/.vitepress/utils/storage.ts
export type OS = 'windows' | 'mac';

export interface Storage {
  getProgress(id: string): boolean;
  setProgress(id: string, value: boolean): void;
  getAllProgress(): Record<string, boolean>;
  clearAllProgress(): void;
  getOS(): OS | null;
  setOS(os: OS): void;
}

// 実装は typeof window !== 'undefined' のガード必須
```

### 4.3 進捗ID命名規則

`<section>-<step>-<topic>` の3セグメント。
- 例: `common-01-github-account`, `web-03-markdown-edit`
- セクション横断で一意
- 進捗IDはページ内の `ProgressCheck` のほか、サイドバー側で「Webセクションは全5個のうち3個完了」とカウントするキー集合の定義にも使う

### 4.4 ID 管理の運用

- `docs/.vitepress/utils/progress-ids.ts` に全IDを列挙した定数を置く
- 型で縛って typo を防ぐ
- サイドバー側の完了カウントもこの定数を参照する

```ts
export const PROGRESS_IDS = {
  common: [
    'common-01-github-account',
    'common-02-vscode-extensions',
    'common-03-github-oauth',
  ],
  web: [
    'web-01-repo',
    'web-02-clone',
    'web-03-markdown-edit',
    'web-04-commit-push',
    'web-05-challenge',
  ],
} as const;
```

---

## 5. ページテンプレート標準

各手順ページは以下の共通構造を持つ。

```md
# ステップ名

::: info このステップについて
- ゴール: <一文>
- 所要時間: <目安>
- 前のステップ: [<リンク>](<path>)
:::

## 手順

1. ...
2. ...

（必要なら `<OSTabs>` で分岐）

## よくあるつまずき

- 症状 → 対処

---

<ProgressCheck id="..." label="..." />

[次のステップへ →](<path>)
```

---

## 6. スタイル方針

### 6.1 カラー
- プライマリ: VitePress 既定の青系（独自ブランドなし）
- アクセント: 黄（`::: warning`）、緑（完了マーク）
- 本文コントラスト: WCAG AA（4.5:1）以上

### 6.2 タイポグラフィ
- 日本語: Noto Sans JP（Google Fonts、または OS システムフォントにフォールバック）
- モノスペース: `'SF Mono', 'Menlo', 'Consolas', monospace`
- 本文: 16px 以上（モバイル可読性を重視）

### 6.3 モバイル優先
- 最小幅 320px 対応
- タップターゲット 44px 以上
- スクロール時にサイドバー固定で画面が狭くなりすぎないよう閾値を調整

---

## 7. デプロイパイプライン

1. `main` ブランチへ PR マージ（または push）
2. GitHub Actions で `pnpm install && pnpm docs:build`
3. `docs/.vitepress/dist` を `actions/deploy-pages@v4` で GitHub Pages へ公開

### 設定
- `config.ts` の `base: '/yuruhack-docs/'`（プロジェクト Pages の場合）
- リポジトリの Settings > Pages > Source を「GitHub Actions」に

---

## 8. 設計上の論点と判断

以下はレビュー時点で確定済み。追加の論点が出た場合はこの表に追記する。

| # | 論点 | 判断 | 状態 |
|---|---|---|---|
| 1 | 進捗を画面本文に出すか、サイドバーに出すか | **両方**。インラインチェックで操作性、サイドバーで俯瞰性 | 確定 |
| 2 | OS自動判定の精度 | 自動はあくまで初期ヒント。**手動タブを常に見える位置に** | 確定 |
| 3 | `navigator.platform` が非推奨 | `userAgentData.platform` 優先、未対応時のみフォールバック | 確定 |
| 4 | localStorage 不可環境の扱い | **機能劣化モード**。閲覧はフル成立、チェックはその場のみ有効 | 確定 |
| 5 | ダークモード | VitePress 標準のままサポート（追加工数ゼロ） | 確定 |
| 6 | サイト内検索 | P2。VitePress のローカル検索（`search: { provider: 'local' }`）を有効化 | 確定 |
| 7 | 画像の置き場所 | `public/images/` 固定。Win / Mac 両方の差分画像を `-win.png` / `-mac.png` で命名 | 確定 |
| 8 | スマホで見ながらPC操作という利用形態への配慮 | コードブロック内の長い行は折返しオプションを付け、モバイルで潰れない | 確定 |
| 9 | 進捗リセットの優先度 | **P0に昇格**。当日の復旧手段として必須（4/18レビュー） | 確定 |
| 10 | 4/29コンテンツとの共存 | 同リポジトリの別パス（`/hackathon/`）で後日追加。今回は4/26分のみ構築 | 確定 |
| 11 | ドッグフーディング明示 | トップページに「このサイト自体が GitHub Pages で動いている＝4/29で作る成果物と同じ仕組み」と記載 | 新規追加 |