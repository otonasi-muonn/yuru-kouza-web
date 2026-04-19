import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";
import { OSTabs } from "@/components/OSTabs";
import { MousePointerClick, FileCode2, Network, Gauge } from "lucide-react";

/**
 * おまけ: ブラウザの開発者ツール入門
 * F12 / Cmd+Opt+I からの基本 4 タブ（Elements / Console / Network / Lighthouse）を解説。
 */

export function DevToolsIntro() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>ブラウザ開発者ツール（DevTools）入門</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          <strong>DevTools</strong> は『ブラウザに最初から入っている超高機能なデバッガ兼教材』。
          Web エンジニアを名乗る人は皆これを毎日開いています。
          今日は『開き方』と『最初に触る 4 タブ』だけ押さえましょう。
        </p>
      </Callout>

      <h2>🖥️ 開き方</h2>
      <OSTabs
        windows={
          <ul>
            <li><kbd>F12</kbd></li>
            <li>または <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd></li>
            <li>右クリック → 「検証」</li>
          </ul>
        }
        mac={
          <ul>
            <li><kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>I</kbd></li>
            <li>右クリック → 「検証」（事前に Safari は『開発』メニューを有効化）</li>
          </ul>
        }
      />

      <h2>4 つの必修タブ</h2>
      <FadeIn>
        <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
          <TabCard
            icon={<MousePointerClick size={18} className="text-primary" />}
            title="Elements（要素）"
            body="いま見ているページの HTML を直接見られる。要素をクリックすると対応する CSS も右に表示。その場で書き換えて見た目を試せる（ページ再読込で元に戻る）。"
            tips={[
              "『この色どう作ってるの？』を調べる → Styles ペイン",
              "『ここのクラス名変えたらどうなる？』を試す",
              "スマホ表示確認 → 左上のスマホアイコン（レスポンシブモード）",
            ]}
          />
          <TabCard
            icon={<FileCode2 size={18} className="text-primary" />}
            title="Console（コンソール）"
            body="JavaScript のエラーが赤く出る場所。自分で JS の式を打って実行もできる。"
            tips={[
              "真っ赤なエラーの 1 行目が一番大事",
              "console.log('ここまで来た') を仕込んで動作確認",
              "1 + 1 や document.title を打って遊んでみる",
            ]}
          />
          <TabCard
            icon={<Network size={18} className="text-primary" />}
            title="Network（通信）"
            body="ページが読み込んでいるファイル（HTML / CSS / 画像 / API）の一覧と、それぞれの所要時間・サイズを見られる。"
            tips={[
              "画像が重い → ここでサイズを確認",
              "API がエラー → Status が 4xx / 5xx になっている",
              "『再読込しないと出ない』時は、開きながら Cmd/Ctrl+R",
            ]}
          />
          <TabCard
            icon={<Gauge size={18} className="text-primary" />}
            title="Lighthouse / Performance"
            body="ページの速さ・アクセシビリティ・SEO を点数化してくれる自動診断。改善提案も出る。"
            tips={[
              "公開前に 1 度走らせて 80 点以上を目指す",
              "モバイル設定で測るのが王道",
              "画像の最適化・フォントの preload の効果を数字で確認",
            ]}
          />
        </div>
      </FadeIn>

      <h2>よくある使い方ベスト 5</h2>
      <ol>
        <li>
          <strong>『なぜ表示されない？』</strong> → Elements タブで実 HTML を見る。
          <code>display: none</code> や <code>visibility: hidden</code> が効いていないか。
        </li>
        <li>
          <strong>『なんでこのボタン動かない？』</strong> → Console タブで赤いエラーを探す。
        </li>
        <li>
          <strong>『遅い』</strong> → Network タブで重いファイルを特定。画像を圧縮。
        </li>
        <li>
          <strong>『スマホ表示が崩れる』</strong> → Elements タブ上部のスマホアイコンでデバイス切替。
        </li>
        <li>
          <strong>『レイアウトがグシャっと重なる』</strong> → Elements で該当要素を選び、
          右の Box Model（margin/border/padding）を見る。
        </li>
      </ol>

      <Callout variant="tip" title="学習用に取っておきたい機能">
        <ul className="!mt-2">
          <li><strong>$0</strong> — Elements で選んだ要素を Console から参照できる</li>
          <li><strong>ThrottlingでSlow 3G</strong> — 遅い回線を体験（Network タブ上部）</li>
          <li><strong>Sources タブ</strong> — JS にブレークポイントを置いて途中停止</li>
        </ul>
      </Callout>
    </div>
  );
}

function TabCard({
  icon,
  title,
  body,
  tips,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tips: string[];
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <div className="font-semibold text-[0.95rem]">{title}</div>
      </div>
      <p className="mb-2 text-sm text-muted-foreground">{body}</p>
      <ul className="text-xs text-muted-foreground space-y-1 pl-4 list-disc">
        {tips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
