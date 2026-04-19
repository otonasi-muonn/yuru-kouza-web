import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// GitHub Pages（プロジェクトサイト）では
//   https://<user>.github.io/<repo>/
// のように URL が階層化されるため、base を「/<リポジトリ名>/」に揃える必要がある。
//
// - ローカル開発 / 単体 HTML バンドル時: "/"（環境変数未指定）
// - Actions でのビルド: VITE_BASE_PATH=/yuru-kouza-web/（deploy.yml 側で指定）
//
// ついでに、bundle.html（Parcel 用の単一HTMLバンドル）を作るときは
// 相対パス扱いにしたいので "./" を強制したい場合の逃げ道も用意する。
const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // サンドボックス環境では fork の起動が遅くテストファイル毎に timeout しがち。
    // threads + 直列実行 + isolate=false で 1 ワーカーを使い回す。
    // 本番 CI（GitHub Actions）では十分速いので影響なし。
    pool: "threads",
    maxWorkers: 1,
    fileParallelism: false,
    isolate: false,
    testTimeout: 15000,
  },
});
