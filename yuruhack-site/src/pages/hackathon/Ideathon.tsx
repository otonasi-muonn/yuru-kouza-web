import {
  ArrowRight,
  ArrowLeft,
  Users,
  Lightbulb,
  Layers,
  Palette,
  CheckSquare,
  UserCog,
} from "lucide-react";
import { Callout } from "@/components/Callout";
import { FadeIn } from "@/components/Animated";

type Tone = {
  name: string;
  desc: string;
  palette: string[];
};

const TONES: Tone[] = [
  {
    name: "ポップ",
    desc: "明るく元気。カジュアル系のサイトに",
    palette: ["#ff7a00", "#ffd166", "#06d6a0", "#fff8ee"],
  },
  {
    name: "クール",
    desc: "落ち着いた青系。テック寄りやプロダクト紹介に",
    palette: ["#0f172a", "#3b82f6", "#94a3b8", "#f8fafc"],
  },
  {
    name: "ナチュラル",
    desc: "やわらかいベージュ＋緑。優しい雰囲気に",
    palette: ["#5d4037", "#a3b18a", "#dad7cd", "#fefae0"],
  },
  {
    name: "レトロ",
    desc: "90〜00年代の個人サイト風。遊び心マシマシ",
    palette: ["#dc2626", "#facc15", "#1e40af", "#fef3c7"],
  },
  {
    name: "ダーク",
    desc: "黒背景＋アクセントカラー。クリエイター系",
    palette: ["#0a0a0a", "#1f1f1f", "#a855f7", "#e5e5e5"],
  },
];

const THEME_EXAMPLES = [
  {
    title: "チームメンバー紹介サイト",
    desc: "チーム全員のプロフィールを並べた1ページ。各自1セクション担当で分担しやすい",
  },
  {
    title: "架空のお店・ブランドサイト",
    desc: "「夜だけ開く本屋」「ボタン専門店」など、空想の店舗紹介。トップ・メニュー・お問い合わせで分担",
  },
  {
    title: "好きなもの布教サイト",
    desc: "チームで好きなアニメ・ゲーム・音楽などを紹介。「魅力ベスト3」「おすすめ作品」など章立て",
  },
  {
    title: "診断・クイズサイト",
    desc: "「あなたのタイプは？」系。ボタンクリックで結果が出るシンプルなもの。ロジック担当と装飾担当で分担",
  },
  {
    title: "イベント告知ページ",
    desc: "学園祭・架空のフェス等のLP。日時・出演者・アクセス・FAQをセクションごとに",
  },
];

const ROLES = [
  {
    name: "とりまとめ役",
    desc: "リポジトリを作って全員を招待・全体の進行管理・困ったときの相談まとめ",
  },
  {
    name: "中身（コンテンツ）",
    desc: "サイトに載せる文章・画像・情報を集めて整える",
  },
  {
    name: "見た目（CSS）",
    desc: "色・フォント・レイアウト・装飾を担当。CSS担当",
  },
  {
    name: "公開・整備（デプロイ）",
    desc: "GitHub Pages の設定・deploy.yml の設置・動作確認",
  },
];

const ESSENTIAL = [
  "サイトのタイトル（と1行のサブタイトル）",
  "サイトに必要なセクション一覧（誰が何を担当するか付き）",
  "代表者のリポジトリ名（みんなで共有）",
  "色の方向性（メインカラー1〜2色）",
];

export function HackathonIdeathon() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        ハッカソン本番 · 11:00〜12:00
      </div>
      <h1>アイディアソン: チームで作るWebサイトを企画しよう</h1>

      <Callout variant="info" title="この時間のゴール">
        <p className="!mt-0">
          午後の制作タイムですぐ手を動かせるよう、
          <strong>「何を・誰が・どんなテイストで」</strong>をチームで合意します。
        </p>
        <p>
          完璧じゃなくてOK。書いたメモは午後の開発中いつでも変えられます。
          <strong>このページは「迷ったら開く」用</strong>なので、流れに合いそうな所だけ拾い読みでも構いません。
        </p>
      </Callout>

      <h2 id="theme">📦 お題: チームで1つのWebサイトを作る</h2>
      <p>
        テーマ自体はチームで自由に決めてOK。下に <strong>例</strong> を並べます。
        全員が「これなら手を動かせそう」と思えるものを1つ選んでください。
      </p>

      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        {THEME_EXAMPLES.map((t) => (
          <div
            key={t.title}
            className="rounded-md border border-border bg-card p-3"
          >
            <div className="font-semibold text-sm">{t.title}</div>
            <p className="m-0 mt-1 text-xs text-muted-foreground">{t.desc}</p>
          </div>
        ))}
      </div>

      <Callout variant="tip" title="テーマ選びのコツ">
        <p className="!mt-0">
          「ページが <strong>セクションで分けられるか</strong>」を基準にすると分担しやすいです。
          1ページ完結でも、セクション3〜5個に切れれば、各メンバーが1つずつ担当できます。
        </p>
      </Callout>

      <h2 id="worksheet">📝 5ステップ・チームワークシート</h2>
      <p>
        ホワイトボード・付箋・共有メモなんでもOK。チームで話しながら埋めていきます。
        各ステップは <strong>5〜15分</strong> 目安です。
      </p>

      <FadeIn>
        <Step
          n={1}
          icon={<Lightbulb size={18} />}
          color="#0ea5e9"
          title="チームで作るサイトのテーマを決める"
          time="15分"
        >
          <p>
            上の例から1つ選ぶ・組み合わせる・全く別のテーマにする、なんでもOK。
            <strong>「30秒で他人に説明できる」</strong>ところまで言語化できれば成功。
          </p>
          <Sample>
            <strong>例:</strong>「夜にしか開かない本屋『ねむり書店』の架空サイト。
            営業案内・おすすめ本・お問い合わせの3セクション」
          </Sample>
        </Step>
      </FadeIn>

      <FadeIn delay={80}>
        <Step
          n={2}
          icon={<Layers size={18} />}
          color="#16a34a"
          title="ページのセクションを書き出す"
          time="10分"
        >
          <p>
            サイトに置きたい「ブロック」を3〜6個書き出します。
            あとで担当割りに使うので、<strong>一覧で並べておく</strong>のが大事。
          </p>
          <Sample>
            <strong>例:</strong> ① ヒーロー（タイトル＋キャッチ）／
            ② お店紹介／③ おすすめの本／④ アクセス・営業時間／⑤ お問い合わせ
          </Sample>
        </Step>
      </FadeIn>

      <FadeIn delay={160}>
        <Step
          n={3}
          icon={<UserCog size={18} />}
          color="#9333ea"
          title="役割を分担する"
          time="10分"
        >
          <p>
            「誰がどのセクションを書くか」または「誰がどの役割を持つか」を決めます。
            <strong>1人で全部抱えない</strong>のがコツ。完全な専業じゃなくて、ゆるい主担当でOK。
          </p>
          <p>役割の例（人数に応じて兼任可）:</p>
          <ul className="!mt-2 grid gap-2 sm:grid-cols-2">
            {ROLES.map((r) => (
              <li
                key={r.name}
                className="flex items-start gap-2 rounded-md border border-border bg-muted/20 p-2 text-sm"
              >
                <Users size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <strong className="text-[0.9rem]">{r.name}</strong>
                  <div className="mt-0.5 text-xs text-muted-foreground">{r.desc}</div>
                </div>
              </li>
            ))}
          </ul>
          <Callout variant="tip" title="セクション担当 vs 役割担当">
            <p className="!mt-0">
              小規模チーム（3人以下）は「セクション担当」、4人以上なら「役割担当」が回しやすいです。
              <strong>必ず「とりまとめ役」を1人決めておく</strong>と、午後に方針が割れたとき助かります。
            </p>
          </Callout>
        </Step>
      </FadeIn>

      <FadeIn delay={240}>
        <Step
          n={4}
          icon={<Palette size={18} />}
          color="#f59e0b"
          title="トーン＆カラーを揃える"
          time="5分"
        >
          <p>
            5つのテイストから1つ選ぶ、または独自に。
            <strong>カラーコードは午後そのままCSSで使える</strong>ので、必ずチームで共有してください。
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TONES.map((t) => (
              <div
                key={t.name}
                className="rounded-md border border-border bg-card p-3 text-sm transition hover:border-primary/40 hover:shadow"
              >
                <div className="mb-2 flex items-center justify-between">
                  <strong>{t.name}</strong>
                </div>
                <div className="mb-2 flex gap-1">
                  {t.palette.map((c) => (
                    <span
                      key={c}
                      title={c}
                      className="inline-block h-6 w-6 rounded-md border border-border/50"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <p className="m-0 text-xs text-muted-foreground">{t.desc}</p>
                <div className="mt-2 flex flex-wrap gap-1 font-mono text-[0.7rem] text-muted-foreground">
                  {t.palette.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Step>
      </FadeIn>

      <FadeIn delay={320}>
        <Step
          n={5}
          icon={<CheckSquare size={18} />}
          color="#ec4899"
          title="お昼休みまでに揃えるもの"
          time="3分"
        >
          <p>
            12:00 のお昼前に、これだけ揃っていれば午後すぐ動けます。
          </p>
          <ul className="mt-3 space-y-2">
            {ESSENTIAL.map((e) => (
              <li
                key={e}
                className="flex items-start gap-2 rounded-md border border-border bg-card p-3"
              >
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 rounded border-border"
                  aria-label={e}
                />
                <span className="text-sm">{e}</span>
              </li>
            ))}
          </ul>
          <Callout variant="tip" title="代表者リポジトリの作り方">
            <p className="!mt-0">
              チームの誰か1人がリポジトリを作って、
              Settings → Collaborators から他メンバーを <strong>Write 権限</strong>で招待。
              詳しい手順は <a href="#/hackathon/build" className="text-primary">チーム開発スタート</a> で扱います。
            </p>
          </Callout>
        </Step>
      </FadeIn>

      <NavFooter />
    </div>
  );
}

function Step({
  n,
  icon,
  color,
  title,
  time,
  children,
}: {
  n: number;
  icon: React.ReactNode;
  color: string;
  title: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose my-6 rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {n}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="rounded-md p-1.5"
            style={{ backgroundColor: `${color}1a`, color }}
          >
            {icon}
          </span>
          <h3 className="m-0 text-lg font-bold">{title}</h3>
        </div>
        <span
          className="ml-auto rounded-md px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {time}
        </span>
      </div>
      <div className="prose-sm text-[0.95rem] [&>p]:my-2">{children}</div>
    </div>
  );
}

function Sample({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-md border-l-2 border-muted-foreground/30 bg-muted/30 px-3 py-2 text-sm">
      {children}
    </div>
  );
}

function NavFooter() {
  return (
    <div className="not-prose mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      <a
        href="#/hackathon/icebreak"
        className="group flex flex-col items-start rounded-md border border-border bg-card px-4 py-3 transition hover:border-primary/60 hover:bg-secondary/60"
      >
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowLeft size={12} /> 前へ
        </span>
        <span className="mt-0.5 font-medium group-hover:text-primary">
          アイスブレイク
        </span>
      </a>
      <a
        href="#/hackathon/build"
        className="group flex flex-col items-end rounded-md border border-primary/40 bg-primary/5 px-4 py-3 transition hover:border-primary hover:bg-primary/10 sm:col-start-2"
      >
        <span className="flex items-center gap-1 text-xs text-primary/80">
          午後 13:00〜 <ArrowRight size={12} />
        </span>
        <span className="mt-0.5 font-medium text-primary">
          チーム開発スタート
        </span>
      </a>
    </div>
  );
}
