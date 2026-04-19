import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";
import { FadeIn } from "@/components/Animated";

const TABLE = `| 項目 | 内容 |
| ---- | ---- |
| 名前 | たろう |
| 学科 | 情報系 |
| 趣味 | ゲーム |
`;

const CHECKBOX = `## 今週のやること
- [x] GitHub アカウント作成
- [x] README を書く
- [ ] 本番ハッカソン
`;

const CODEBLOCK = `\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`
`;

const DETAILS = `<details>
<summary>📖 詳細を見る</summary>

この中に長い説明を隠しておけます。
クリックで開閉できるので、README が縦長になるのを防げます。

</details>
`;

const BLOCKQUOTE = `> 「コードは、人間が読むために書くのであって、
> たまたま機械が実行できるだけである。」
> — Harold Abelson
`;

const ALERT = `> [!NOTE]
> 参考情報です。

> [!TIP]
> おすすめの使い方。

> [!IMPORTANT]
> 重要な情報。

> [!WARNING]
> 注意が必要。

> [!CAUTION]
> 危険・やらないほうがいい。
`;

const FRONTMATTER = `---
title: 記事のタイトル
date: 2026-04-29
tags: [hackathon, beginner]
---

ここから本文。Jekyll・Hugo・Astro 等で使われるヘッダ情報。
`;

export function MarkdownAdvanced() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>Markdown 発展</h1>

      <Callout variant="info" title="このページについて">
        基本（見出し・太字・箇条書き・リンク）を覚えた人向けに、
        README や記事をグッと『読み物』にするための発展記法を集めました。
        全部覚える必要はなく、使いたくなった時にコピペで足せれば OK。
      </Callout>

      <FadeIn>
        <h2>📊 表（テーブル）</h2>
        <p>
          <code>|</code> で区切り、2 行目の <code>---</code> が『ここがヘッダ』の合図。
          列の数は揃える。
        </p>
        <CopyBlock code={TABLE} filename="README.md（表）" />
      </FadeIn>

      <FadeIn>
        <h2>✅ チェックボックス</h2>
        <p>
          GitHub 上では <code>[ ]</code> / <code>[x]</code>{" "}
          がチェックボックスとして描画されます。Issue / PR でも使えて、To-Do が追える。
        </p>
        <CopyBlock code={CHECKBOX} filename="README.md（チェックリスト）" />
      </FadeIn>

      <FadeIn>
        <h2>💻 コードブロック（シンタックスハイライト）</h2>
        <p>
          <code>```</code>（バッククォート3つ）で囲みます。
          言語名を添えるとハイライトが効きます（<code>js</code> / <code>ts</code> /{" "}
          <code>python</code> / <code>bash</code> など）。
        </p>
        <CopyBlock code={CODEBLOCK} filename="README.md（コードブロック）" />
      </FadeIn>

      <FadeIn>
        <h2>📖 折りたたみ（details）</h2>
        <p>
          長い補足や FAQ を隠しておけます。
          <strong>HTML タグですが Markdown と混在 OK</strong>。
        </p>
        <CopyBlock code={DETAILS} filename="README.md（details）" />
      </FadeIn>

      <FadeIn>
        <h2>💬 引用</h2>
        <CopyBlock code={BLOCKQUOTE} filename="README.md（引用）" />
      </FadeIn>

      <FadeIn>
        <h2>⚠️ GitHub 独自の警告ブロック</h2>
        <p>
          <code>{'> [!NOTE]'}</code> のように書くと、GitHub 上では色付きのバナーで描画されます。
          README で『ここ重要！』を目立たせたい時に。
        </p>
        <CopyBlock code={ALERT} filename="README.md（警告ブロック）" />
      </FadeIn>

      <FadeIn>
        <h2>🗂️ Front Matter（フロントマター）</h2>
        <p>
          ファイル冒頭の <code>---</code> で囲まれたブロック。
          静的サイトジェネレータ（Jekyll / Hugo / Astro 等）で『記事の属性』として使われます。
          GitHub で単に README 用途なら無視されますが、ブログ化する時に必要になります。
        </p>
        <CopyBlock code={FRONTMATTER} filename="記事.md（Front Matter）" />
      </FadeIn>

      <Callout variant="tip" title="書き味を上げる拡張">
        VSCode に <code>Markdown All in One</code> を入れておくと:
        <ul>
          <li>表を書くと列幅が自動で揃う</li>
          <li><kbd>Ctrl</kbd>+<kbd>B</kbd> で太字、<kbd>Ctrl</kbd>+<kbd>I</kbd> で斜体</li>
          <li>目次（TOC）を自動生成</li>
        </ul>
        が手に入ります。
      </Callout>
    </div>
  );
}
