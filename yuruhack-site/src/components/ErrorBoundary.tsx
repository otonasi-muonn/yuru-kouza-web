import React from "react";
import { AlertTriangle, RotateCw } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

/**
 * アプリ全体をラップする最終ガード。
 *
 * - 外部送信は一切しない（NFR-6）。DevTools で拾える最低限のログのみ。
 * - ユーザーには「再読み込み」「進捗をリセットして再読み込み」の 2 択を提示。
 * - 進捗リセットは localStorage 破損による無限クラッシュから脱出するための脱出口。
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 外部送信はしない。DevTools で拾える分だけ出す。
    if (typeof console !== "undefined" && typeof console.error === "function") {
      // eslint-disable-next-line no-console
      console.error("[yuruhack] 画面の描画でエラーが発生しました", error, info);
    }
  }

  private handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  private handleResetAndReload = () => {
    if (typeof window === "undefined") return;
    try {
      // yuruhack: プレフィックスのキーだけ消す（他サイトのデータは触らない）
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith("yuruhack:")) keys.push(k);
      }
      keys.forEach((k) => localStorage.removeItem(k));
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        aria-live="assertive"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily:
            '"Noto Sans JP", system-ui, -apple-system, "Segoe UI", sans-serif',
          background: "hsl(40 30% 98%)",
          color: "hsl(24 10% 15%)",
        }}
      >
        <div
          style={{
            maxWidth: 560,
            width: "100%",
            border: "1px solid hsl(40 15% 85%)",
            borderRadius: 12,
            background: "#fff",
            padding: "1.75rem",
            boxShadow: "0 10px 30px -20px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
              color: "hsl(28 90% 45%)",
            }}
          >
            <AlertTriangle size={22} aria-hidden="true" />
            <strong style={{ fontSize: "1.05rem" }}>
              画面の表示でエラーが発生しました
            </strong>
          </div>
          <p style={{ margin: "0.25rem 0 1rem", lineHeight: 1.7 }}>
            大抵は <strong>再読み込み</strong> で直ります。
            それでも直らない場合は、
            保存された進捗データが壊れている可能性があります。
            <strong>「進捗をリセットして再読み込み」</strong>
            を押すと、このサイト内の保存データだけをクリアして開き直します。
          </p>
          {this.state.error?.message && (
            <pre
              style={{
                margin: "0 0 1rem",
                padding: "0.75rem",
                background: "hsl(40 30% 95%)",
                border: "1px solid hsl(40 15% 88%)",
                borderRadius: 8,
                fontSize: "0.78rem",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "hsl(24 10% 30%)",
              }}
            >
              {this.state.error.message}
            </pre>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button
              type="button"
              onClick={this.handleReload}
              style={btnPrimary}
            >
              <RotateCw size={15} aria-hidden="true" />
              再読み込み
            </button>
            <button
              type="button"
              onClick={this.handleResetAndReload}
              style={btnSecondary}
            >
              進捗をリセットして再読み込み
            </button>
          </div>
          <p
            style={{
              margin: "1rem 0 0",
              fontSize: "0.78rem",
              color: "hsl(24 10% 45%)",
            }}
          >
            このメッセージ自体は外部に送信されません。困った場合は運営 /
            メンターに画面を見せてください。
          </p>
        </div>
      </div>
    );
  }
}

const btnBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "0.55rem 0.95rem",
  borderRadius: 8,
  fontSize: "0.9rem",
  fontWeight: 600,
  cursor: "pointer",
  border: "1px solid transparent",
  minHeight: 44, // NFR: タップ 44px
};

const btnPrimary: React.CSSProperties = {
  ...btnBase,
  background: "hsl(28 90% 52%)",
  color: "#fff",
};

const btnSecondary: React.CSSProperties = {
  ...btnBase,
  background: "#fff",
  color: "hsl(24 10% 20%)",
  borderColor: "hsl(40 15% 82%)",
};
