import { describe, it, expect, vi, afterEach } from "vitest";
import { detectOS } from "./os";

type NavLike = {
  platform?: string;
  userAgent?: string;
  userAgentData?: { platform?: string };
};

function stubNavigator(next: NavLike) {
  const original = globalThis.navigator;
  Object.defineProperty(globalThis, "navigator", {
    value: next,
    configurable: true,
    writable: true,
  });
  return () => {
    Object.defineProperty(globalThis, "navigator", {
      value: original,
      configurable: true,
      writable: true,
    });
  };
}

describe("detectOS", () => {
  const restores: Array<() => void> = [];
  afterEach(() => {
    while (restores.length) restores.pop()?.();
    vi.restoreAllMocks();
  });

  it("userAgentData.platform に mac を含む場合 'mac' を返す", () => {
    restores.push(
      stubNavigator({ userAgentData: { platform: "macOS" }, platform: "", userAgent: "" })
    );
    expect(detectOS()).toBe("mac");
  });

  it("userAgentData.platform に Windows を含む場合 'windows' を返す", () => {
    restores.push(
      stubNavigator({ userAgentData: { platform: "Windows" }, platform: "", userAgent: "" })
    );
    expect(detectOS()).toBe("windows");
  });

  it("userAgentData が未対応で platform=Win32 なら 'windows'", () => {
    restores.push(stubNavigator({ platform: "Win32", userAgent: "" }));
    expect(detectOS()).toBe("windows");
  });

  it("platform=MacIntel なら 'mac'", () => {
    restores.push(stubNavigator({ platform: "MacIntel", userAgent: "" }));
    expect(detectOS()).toBe("mac");
  });

  it("platform=iPhone なら 'mac' として扱う（タブは mac 寄りに）", () => {
    restores.push(stubNavigator({ platform: "iPhone", userAgent: "" }));
    expect(detectOS()).toBe("mac");
  });

  it("platform 空で UA に Windows を含む場合 'windows' にフォールバック", () => {
    restores.push(
      stubNavigator({
        platform: "",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      })
    );
    expect(detectOS()).toBe("windows");
  });

  it("platform 空で UA に Mac を含む場合 'mac' にフォールバック", () => {
    restores.push(
      stubNavigator({
        platform: "",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6)",
      })
    );
    expect(detectOS()).toBe("mac");
  });

  it("どれにもマッチしない場合は null", () => {
    restores.push(
      stubNavigator({
        platform: "",
        userAgent: "SomeLinuxBrowser/1.0",
      })
    );
    expect(detectOS()).toBeNull();
  });
});
