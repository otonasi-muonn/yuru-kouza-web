import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

// 各テスト前に localStorage をクリーンに
beforeEach(() => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.clear();
  }
});

// 各テスト後に DOM をクリーンに
afterEach(() => {
  cleanup();
});
