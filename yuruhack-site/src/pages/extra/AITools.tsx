import { useState } from "react";
import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";
import { Sparkles, Copy, Check, Bot, Lightbulb, Shield } from "lucide-react";

/**
 * おまけ: AI ツールの使い方
 *
 * ChatGPT / Claude / Copilot を学習の補助輪として安全に使うための手引き。
 * 『良いプロンプト』のテンプレートをコピーできるカード群と、
 * よくあるアンチパターンの比較トグル。
 */

const GOOD_PROMPTS = [
  {
    title: "エラーの意味を教えてもらう",
    body: `以下のエラーが出ました。

- 何をしようとしたか: （例）npm install を叩いた
- 実行したコマンド: npm install
- 実際のエラー全文:
\`\`\`
<ここにエラーを貼る>
\`\`\`

1) このエラーの日本語での意味
2) 起きている可能性が高い原因トップ3
3) それぞれの確かめ方

を、初心者向けに説明してください。`,
  },
  {
    title: "コードの意味を一行ずつ解説してもらう",
    body: `このコードを、初心者向けに一行ずつ解説してください。
わからない用語は都度補足してください。

\`\`\`
<コードを貼る>
\`\`\``,
  },
  {
    title: "動かしながら理解する段取りをもらう",
    body: `〇〇を作りたいのですが、初学者なのでいきなりコードだけ貰っても理解できません。

1) 完成までの段階を 3〜5 ステップに分ける
2) 各ステップでの『できた』の確認方法
3) 初心者がつまずきやすい罠

を、説明してください。`,
  },
  {
    title: "『なぜ』を掘り下げる",
    body: `（AI の回答）を受けて:

あなたの回答の中で '〇〇' と書きましたが、
なぜそうする必要があるのか、代わりに△△ではダメな理由と合わせて教えてください。`,
  },
];

const BAD_GOOD: { bad: string; good: string; why: string }[] = [
  {
    bad: "エラー出た",
    good: "このエラーが出ました: (全文)。やりたかったのは(意図)。直し方を教えて。",
    why: "AI は『あなたが今、何に、どういう状況で、何を期待したか』を知らない。状況・実行したこと・期待・実際の差分を投げると精度が跳ね上がる。",
  },
  {
    bad: "React でいい感じのサイト作って",
    good: "React + TypeScript で、『ToDo を追加・削除・完了にできる』最小のサンプルが欲しい。stateをuseStateで、UI はシンプルな HTML でいい。",
    why: "『いい感じ』は人によって全く違う。要件（機能 / 技術 / 見た目）を 2〜3 行でも書けば、そのまま動く成果物が来やすい。",
  },
  {
    bad: "エラーの直し方を教えて。コピペできる完成コードで。",
    good: "エラーの直し方を、原因 → 修正方針 → 小さな差分 の順で教えて。まず原理を理解したい。",
    why: "完成コードだけ貰うと、同じエラーが別パターンで来た時に何もできない。『原理 → 差分』の順で貰うクセを付ける。",
  },
];

export function AITools() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>AI ツールの使い方（学習の補助輪として）</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          ChatGPT / Claude / GitHub Copilot は<strong>『一緒に考えてくれる先輩』</strong>です。
          ただし『全部任せる』使い方だと上達は止まります。
          『理解の助けにする』使い方を身につけると、学習スピードが倍くらい変わります。
        </p>
      </Callout>

      <h2>使い分けマップ</h2>
      <FadeIn>
        <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
          <ToolCard
            name="ChatGPT / Claude"
            tag="汎用チャット"
            why="エラーの意味を聞く・手順を整理する・コードの説明を貰う。今日の学習の 90% はこれで足ります。"
          />
          <ToolCard
            name="GitHub Copilot"
            tag="エディタ内補完"
            why="VSCode に住み込む相棒。書きかけの行を先読みして続きを提案。ただし『なぜその続きか』は説明してくれない。"
          />
          <ToolCard
            name="Cursor / Windsurf"
            tag="AI ネイティブ IDE"
            why="VSCode の派生 IDE。チャットで『このファイルのこの関数を直して』と頼むと自動編集まで走る。慣れない内は VSCode + ChatGPT 併用で十分。"
          />
        </div>
      </FadeIn>

      <h2>学習に使える 4 つのプロンプト</h2>
      <p>
        そのままコピーして、&lt;ここに〜&gt; の部分を埋めて投げるだけ。
      </p>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        {GOOD_PROMPTS.map((p) => (
          <PromptCard key={p.title} title={p.title} body={p.body} />
        ))}
      </div>

      <h2>💥 アンチパターン vs 👍 良いパターン</h2>
      <div className="not-prose space-y-3 my-5">
        {BAD_GOOD.map((row, i) => (
          <BadGoodRow key={i} {...row} />
        ))}
      </div>

      <h2 id="safety">安全に使うための 3 つの鉄則</h2>
      <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
        <SafetyCard
          icon={<Shield size={18} className="text-emerald-500" />}
          title="秘密情報は投げない"
          body="APIキー（意味があいまいなら『APIって何？』を先に確認）・パスワード・他人の個人情報は AI チャットに貼らない。社内ルールがある場合は必ず確認。"
        />
        <SafetyCard
          icon={<Lightbulb size={18} className="text-amber-500" />}
          title="鵜呑みにしない"
          body="AI は自信満々に間違えます。特に古い URL や存在しないライブラリ名を『それっぽく』返すので、公式ドキュメントで裏取りする。"
        />
        <SafetyCard
          icon={<Bot size={18} className="text-primary" />}
          title="丸投げしない"
          body="課題やハッカソンで『全部書いてもらった』は自分の成長を捨てる行為。『詰まったら聞く』『答え合わせに使う』に留めると伸びます。"
        />
      </div>

      <h2>具体例: 今日の学習で使いたい場面</h2>
      <ul>
        <li>
          <strong>Push に失敗した赤い文字が読めない</strong> → そのまま AI に貼る。『日本語で、原因の可能性トップ3』と付ける。
        </li>
        <li>
          <strong>README の装飾を盛りたい</strong> → 『GitHub の README に使える装飾アイデアを 5 つ教えて』と聞いて取捨選択する。
        </li>
        <li>
          <strong>Markdown の表の書き方を忘れた</strong> → 検索より AI の方が例を出してくれるので早い。
        </li>
      </ul>

      <Callout variant="warn" title="成果物の著作権・使用条件">
        AI が生成したコードや文章を公開するとき、使っているサービスの利用規約を確認しましょう。
        学習用コードの範囲なら通常問題ありませんが、商用利用や有償サービスへの組み込みは別問題。
        不安なら先生やメンターに相談を。
      </Callout>
    </div>
  );
}

function ToolCard({
  name,
  tag,
  why,
}: {
  name: string;
  tag: string;
  why: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4 transition-all hover:shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <Sparkles size={14} className="text-primary" />
        <div className="font-semibold text-[0.95rem]">{name}</div>
      </div>
      <div className="mb-2 inline-block rounded-full bg-muted px-2 py-0.5 text-[0.65rem] text-muted-foreground">
        {tag}
      </div>
      <p className="text-sm text-muted-foreground">{why}</p>
    </div>
  );
}

function PromptCard({ title, body }: { title: string; body: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard?.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="flex flex-col rounded-md border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="font-semibold text-[0.95rem]">{title}</div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
          aria-label="コピー"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "コピー済み" : "コピー"}
        </button>
      </div>
      <pre className="flex-1 overflow-auto rounded-md bg-muted/60 p-3 text-[0.78rem] leading-relaxed whitespace-pre-wrap">
        {body}
      </pre>
    </div>
  );
}

function BadGoodRow({
  bad,
  good,
  why,
}: {
  bad: string;
  good: string;
  why: string;
}) {
  return (
    <div className="grid gap-3 rounded-md border border-border bg-card p-4 sm:grid-cols-2">
      <div className="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm">
        <div className="mb-1 text-xs font-semibold text-red-500">💥 ありがち</div>
        <div className="font-mono text-[0.82rem]">{bad}</div>
      </div>
      <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm">
        <div className="mb-1 text-xs font-semibold text-emerald-600">
          👍 こう投げる
        </div>
        <div className="font-mono text-[0.82rem]">{good}</div>
      </div>
      <p className="sm:col-span-2 text-xs text-muted-foreground">
        <strong>なぜ:</strong> {why}
      </p>
    </div>
  );
}

function SafetyCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <div className="font-semibold text-[0.95rem]">{title}</div>
      </div>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
