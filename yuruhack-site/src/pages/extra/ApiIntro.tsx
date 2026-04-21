import { Callout } from "@/components/Callout";
import { StoryFlow } from "@/components/StoryFlow";
import { FadeIn } from "@/components/Animated";
import { ArrowRight, Laptop, Network, Server } from "lucide-react";

export function ApiIntro() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>APIって何？図でわかる入門</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          API は、アプリ同士がデータをやり取りするときの
          <strong>「共通ルール」</strong>です。
          ここでは、比喩に頼りすぎず、実際に使う流れをそのまま理解します。
        </p>
      </Callout>

      <h2>まず 30 秒でいうと</h2>
      <ul>
        <li>
          API は「どこに・何を・どんな形式で送るか」を決めた<strong>約束</strong>
        </li>
        <li>
          クライアントが <strong>リクエスト</strong> を送り、サーバーが <strong>レスポンス</strong> を返す
        </li>
        <li>
          実装の中身を知らなくても、ルールどおりなら使える
        </li>
      </ul>

      <h2>言い換えるなら「入力ルール付きの申請フォーム」</h2>
      <p>
        API は、自由に書いて送る場所ではありません。
        必須項目や形式が決まったフォームに近く、ルールが合っていれば処理され、合っていなければエラーになります。
      </p>

      <StoryFlow
        interval={1200}
        stages={[
          {
            label: "1. クライアント",
            title: "リクエスト送信",
            desc: "URL・メソッド・パラメータを決まった形式で送る",
            icon: <Laptop size={18} />,
            color: "#0ea5e9",
          },
          {
            label: "2. APIルール",
            title: "受付・検証",
            desc: "形式や認証を確認して、処理先に渡す",
            icon: <Network size={18} />,
            color: "#d97706",
          },
          {
            label: "3. サーバー",
            title: "処理・取得",
            desc: "必要な計算やDB読み取りを行う",
            icon: <Server size={18} />,
            color: "#16a34a",
          },
          {
            label: "4. 画面",
            title: "表示更新",
            desc: "返ってきたJSONを使ってUIを更新する",
            icon: <Laptop size={18} />,
            color: "#6366f1",
          },
        ]}
      />

      <div className="not-prose my-5 rounded-lg border border-border bg-card p-4">
        <div className="mb-3 text-sm font-semibold">通信の流れ（簡易アニメーション）</div>
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs sm:text-sm">
          <div className="rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-2 font-medium">
            ブラウザ
          </div>
          <ArrowRight size={16} className="mx-auto animate-pulse text-sky-500" />
          <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-2 font-medium">
            API
          </div>
          <ArrowRight
            size={16}
            className="mx-auto animate-pulse text-amber-500"
            style={{ animationDelay: "220ms" }}
          />
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-2 font-medium">
            サーバー
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <code className="rounded bg-muted px-2 py-1 animate-pulse">GET /weather?city=Tokyo</code>
          <code className="rounded bg-muted px-2 py-1 animate-pulse" style={{ animationDelay: "300ms" }}>
            200 OK
          </code>
          <code className="rounded bg-muted px-2 py-1 animate-pulse" style={{ animationDelay: "600ms" }}>
            {`{ "temp": 22 }`}
          </code>
        </div>
      </div>

      <FadeIn>
        <h2>リクエストとレスポンス</h2>
        <p>
          API とのやり取りは、基本的にこの 2 つです。
        </p>
        <div className="not-prose my-4 overflow-hidden rounded-md border border-border text-sm">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="border-b border-border px-3 py-2 text-left font-semibold">こちらが送るもの</th>
                <th className="border-b border-border px-3 py-2 text-left font-semibold">相手が返すもの</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-3 py-2">
                  リクエスト
                  <div className="text-xs text-muted-foreground">
                    例: どの URL に、どの条件で、何が欲しいか
                  </div>
                </td>
                <td className="px-3 py-2">
                  レスポンス
                  <div className="text-xs text-muted-foreground">
                    例: データ本体（JSON）と成功/失敗の結果
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </FadeIn>

      <h2>HTTP メソッド（最小限だけ）</h2>
      <ul>
        <li>
          <code>GET</code>: データを読む
        </li>
        <li>
          <code>POST</code>: 新しいデータを作る
        </li>
        <li>
          <code>PUT</code> / <code>PATCH</code>: データを更新する
        </li>
        <li>
          <code>DELETE</code>: データを削除する
        </li>
      </ul>

      <h2>ステータスコードは「結果の合図」</h2>
      <ul>
        <li>
          <code>200</code> / <code>201</code>: 成功
        </li>
        <li>
          <code>400</code>: リクエストの形が不正
        </li>
        <li>
          <code>401</code> / <code>403</code>: 認証・権限の問題
        </li>
        <li>
          <code>404</code>: URL や対象が見つからない
        </li>
        <li>
          <code>500</code>: サーバー側のエラー
        </li>
      </ul>

      <h2>🌍 Web API の具体例</h2>
      <p>
        Web 制作では、外部サービスの API を使って「必要なデータだけ借りる」場面が多いです。
      </p>
      <ul>
        <li>
          <strong>地図 API</strong>: 地図やルート情報を表示する
        </li>
        <li>
          <strong>天気 API</strong>: 地域の天気データを出す
        </li>
        <li>
          <strong>動画 API</strong>: 検索結果や動画情報を取得する
        </li>
      </ul>

      <Callout variant="warn" title="API キーは公開しない">
        <p className="!mt-0">
          多くの API では、利用者を識別するために <strong>API キー</strong> を使います。
          これはパスワードに近い情報です。GitHub に公開すると不正利用され、課金トラブルにつながることがあります。
          <strong>キーはコードに直書きせず、公開リポジトリにも置かない</strong> を徹底してください。
        </p>
      </Callout>

      <Callout variant="tip" title="今日の講座で困ったらここを見る">
        <ul className="!mt-2">
          <li>通信が失敗する: DevTools の Network でステータスコードを見る</li>
          <li>英語エラーが読めない: エラーメッセージをそのまま検索 or AI に貼って意味を確認</li>
          <li>どこが悪いかわからない: URL・メソッド・送信データの3点を順に確認</li>
        </ul>
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
