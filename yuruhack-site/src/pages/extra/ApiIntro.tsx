import { Callout } from "@/components/Callout";
import { StoryFlow } from "@/components/StoryFlow";
import { FadeIn } from "@/components/Animated";
import { Network, Server, Laptop } from "lucide-react";

export function ApiIntro() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>APIって何？（レストランで例える）</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          プログラミングをしていると「API を叩く」「API キー」「API がエラー」といった言葉によく出会います。
          ここでは、専門用語を減らして <strong>レストランの注文</strong> に例えてイメージを掴みます。
        </p>
      </Callout>

      <h2>🍽️ API ＝ レストランのウェイター</h2>
      <p>
        API（Application Programming Interface）は、一言でいうと <strong>「窓口（ウェイター）」</strong> です。
      </p>

      <StoryFlow
        stages={[
          {
            label: "あなた（アプリ）",
            title: "お客さん",
            desc: "メニューを見て「ハンバーグをお願い」と伝える（リクエスト）",
            icon: <Laptop size={18} />,
            color: "#0ea5e9",
          },
          {
            label: "API",
            title: "ウェイター",
            desc: "注文をキッチンへ伝え、完成した料理をあなたに運ぶ",
            icon: <Network size={18} />,
            color: "#d97706",
          },
          {
            label: "サーバー/DB",
            title: "キッチン",
            desc: "注文通りに料理（データ）を作る。厨房の中身はお客さんには見えない",
            icon: <Server size={18} />,
            color: "#16a34a",
          },
        ]}
      />

      <FadeIn>
        <h3>なぜ API が必要なの？</h3>
        <p>
          あなたが直接キッチンに入って、冷蔵庫から肉を取り出し、火加減を調整してハンバーグを作るのは大変ですよね？（しかも危険です）。
          <br />
          API という「窓口」を通すことで、<strong>「裏側がどうなっているか知らなくても、お願いするだけで欲しいものがもらえる」</strong> のが最大のメリットです。
        </p>
      </FadeIn>

      <h2>🌍 Web API（世の中の便利なデータを借りる）</h2>
      <p>
        Web サイトを作るときに最もよく使うのが「Web API」です。インターネット越しに他の会社のシステムにお願いをします。
      </p>
      <ul>
        <li><strong>Google Maps API</strong>: 「渋谷駅の地図をちょうだい」→ 🗺️ 地図データが返ってくる</li>
        <li><strong>天気予報 API</strong>: 「今日の東京の天気を教えて」→ ☀️ のデータが返ってくる</li>
        <li><strong>YouTube API</strong>: 「猫の動画の一覧をちょうだい」→ 🐈 動画リストが返ってくる</li>
      </ul>

      <Callout variant="warn" title="API キー ＝ 会員証">
        <p className="!mt-0">
          誰でもタダで無制限に頼めるとキッチン（サーバー）がパンクしてしまうので、多くの API には <strong>API キー（会員証・パスワード）</strong> が必要です。
          これを GitHub 等に誤って公開してしまうと、他人に勝手に注文されて（＝高額な請求が来て）しまうので注意が必要です。
        </p>
      </Callout>

      <h2>🔗 関連</h2>
      <ul>
        <li>
          通信の様子を実際に見てみる → 「<a href="#/extra/dev-tools">DevTools 入門</a>」
        </li>
        <li>
          JavaScript で API を呼ぶ（Fetch API） → 「<a href="#/extra/javascript-basics">JavaScript基礎</a>」
        </li>
        <li>
          API が繋がらない時のエラー → 「<a href="#/extra/error-reading">エラーメッセージの読み方</a>」
        </li>
      </ul>
    </div>
  );
}
