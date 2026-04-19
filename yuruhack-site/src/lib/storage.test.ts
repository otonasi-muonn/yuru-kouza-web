import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  getProgress,
  setProgress,
  getAllProgress,
  clearAllProgress,
  getOS,
  setOS,
  getTheme,
  setTheme,
  ensureVersion,
  storageAvailable,
  __resetWarnedForTest,
  __resetMemoryForTest,
} from "./storage";

describe("storage (localStorage 利用可)", () => {
  beforeEach(() => {
    localStorage.clear();
    __resetWarnedForTest();
    __resetMemoryForTest();
  });

  it("storageAvailable は jsdom 環境で true を返す", () => {
    expect(storageAvailable()).toBe(true);
  });

  it("setProgress / getProgress で読み書きできる", () => {
    expect(getProgress("web-01-repo")).toBe(false);
    setProgress("web-01-repo", true);
    expect(getProgress("web-01-repo")).toBe(true);
    setProgress("web-01-repo", false);
    expect(getProgress("web-01-repo")).toBe(false);
  });

  it("他サイトのキーには触らない（yuruhack: プレフィックスのみ扱う）", () => {
    localStorage.setItem("other-app:score", "9999");
    setProgress("web-01-repo", true);
    clearAllProgress();
    expect(localStorage.getItem("other-app:score")).toBe("9999");
  });

  it("getAllProgress は true のものだけでなく両方を返す（存在する分）", () => {
    setProgress("a", true);
    setProgress("b", false); // removeItem されるので不在になる
    setProgress("c", true);
    const all = getAllProgress();
    expect(all).toEqual({ a: true, c: true });
  });

  it("clearAllProgress で進捗だけが消える。OS や theme は残る", () => {
    setProgress("web-01-repo", true);
    setOS("mac");
    setTheme("dark");
    clearAllProgress();
    expect(getProgress("web-01-repo")).toBe(false);
    expect(getOS()).toBe("mac");
    expect(getTheme()).toBe("dark");
  });

  it("setProgress 後に progress-updated イベントが発火する", () => {
    const handler = vi.fn();
    window.addEventListener("progress-updated", handler);
    setProgress("web-01-repo", true);
    expect(handler).toHaveBeenCalledTimes(1);
    const ev = handler.mock.calls[0][0] as CustomEvent;
    expect(ev.detail).toEqual({ id: "web-01-repo", value: true });
    window.removeEventListener("progress-updated", handler);
  });

  it("clearAllProgress 後に progress-cleared イベントが発火する", () => {
    const handler = vi.fn();
    window.addEventListener("progress-cleared", handler);
    setProgress("web-01-repo", true);
    clearAllProgress();
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener("progress-cleared", handler);
  });

  it("setOS / getOS で OS を読み書きできる", () => {
    expect(getOS()).toBeNull();
    setOS("windows");
    expect(getOS()).toBe("windows");
    setOS("mac");
    expect(getOS()).toBe("mac");
  });

  it("getOS は windows / mac 以外の値を null として扱う", () => {
    localStorage.setItem("yuruhack:os-pref", "linux");
    expect(getOS()).toBeNull();
  });

  it("setOS 後に os-changed イベントが発火する", () => {
    const handler = vi.fn();
    window.addEventListener("os-changed", handler);
    setOS("mac");
    expect(handler).toHaveBeenCalledTimes(1);
    const ev = handler.mock.calls[0][0] as CustomEvent;
    expect(ev.detail).toEqual({ os: "mac" });
    window.removeEventListener("os-changed", handler);
  });

  it("setTheme / getTheme で任意文字列を保持できる", () => {
    expect(getTheme()).toBeNull();
    setTheme("dark");
    expect(getTheme()).toBe("dark");
    setTheme("light");
    expect(getTheme()).toBe("light");
  });

  it("ensureVersion は初回のみ version を書き込み、2回目以降は上書きしない", () => {
    expect(localStorage.getItem("yuruhack:version")).toBeNull();
    ensureVersion();
    expect(localStorage.getItem("yuruhack:version")).toBe("1");
    localStorage.setItem("yuruhack:version", "custom");
    ensureVersion();
    expect(localStorage.getItem("yuruhack:version")).toBe("custom");
  });
});

describe("storage (localStorage 書き込みが途中から失敗する場合 / 容量超過 シナリオ)", () => {
  let setItemSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;

  // available() は "__yh_test__" というキーで setItem を試すので、
  // そのキーだけは通し、本物の書き込みで throw させることで
  // 「available() は true / 実書き込みは失敗」の状態を再現する。
  beforeEach(() => {
    localStorage.clear();
    __resetWarnedForTest();
    __resetMemoryForTest();
    setItemSpy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(function (this: Storage, key: string, _value: string) {
        if (key === "__yh_test__") {
          // available() 検査だけは素通しする（内部の Map を使わず何もしない）
          return;
        }
        throw new Error("QuotaExceeded (mock)");
      });
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    setItemSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it("setProgress は throw せず、progress-updated イベントは発火する（劣化運用）", () => {
    const handler = vi.fn();
    window.addEventListener("progress-updated", handler);
    expect(() => setProgress("web-01-repo", true)).not.toThrow();
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener("progress-updated", handler);
  });

  it("失敗時は console.warn が一度だけ呼ばれる（スパム防止）", () => {
    setProgress("a", true);
    setProgress("b", true);
    setProgress("c", true);
    const calls = warnSpy.mock.calls.filter(
      (c: unknown[]) => typeof c[0] === "string" && c[0].includes("setProgress")
    );
    expect(calls.length).toBe(1);
  });
});

describe("storage (localStorage そのものが使えない / プライベートモード風)", () => {
  // window.localStorage を触ると全操作で throw する状態を再現
  let originalLS: Storage;
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    __resetWarnedForTest();
    __resetMemoryForTest();
    originalLS = window.localStorage;
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("SecurityError (mock)");
      },
    });
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: originalLS,
      writable: true,
    });
    warnSpy.mockRestore();
  });

  it("storageAvailable は false になり、メモリフォールバックで動作する", () => {
    expect(storageAvailable()).toBe(false);
    setProgress("web-01-repo", true);
    expect(getProgress("web-01-repo")).toBe(true);
    setProgress("web-01-repo", false);
    expect(getProgress("web-01-repo")).toBe(false);
  });

  it("劣化モードでも OS / Theme の読み書きができる", () => {
    setOS("mac");
    expect(getOS()).toBe("mac");
    setTheme("light");
    expect(getTheme()).toBe("light");
  });
});
