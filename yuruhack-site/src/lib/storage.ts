// localStorage wrapper (SSR-safe + degrades gracefully)
//
// NFR-6（プライバシー）対応のため、外部にデータを送らない設計。
// localStorage が使えない環境（プライベートブラウジング等）では
// プロセス内メモリに劣化して動作する。
//
// 失敗時は **一度だけ** console.warn を出す（ループでスパムしない）。

export type OS = "windows" | "mac";

const PREFIX = "yuruhack:";
const PROGRESS_PREFIX = `${PREFIX}progress:`;
const OS_KEY = `${PREFIX}os-pref`;
const VERSION_KEY = `${PREFIX}version`;
const THEME_KEY = `${PREFIX}theme`;

const available = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const t = "__yh_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
};

// In-memory fallback for degraded mode
const memProgress: Record<string, boolean> = {};
let memOS: OS | null = null;
let memTheme: string | null = null;

// 一度だけ warn を出すためのフラグ
const warned: Record<string, boolean> = {};
function warnOnce(scope: string, err: unknown) {
  if (warned[scope]) return;
  warned[scope] = true;
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    // eslint-disable-next-line no-console
    console.warn(
      `[yuruhack] ストレージ操作に失敗しました (${scope})。進捗はこのタブ内のみで保持されます。`,
      err
    );
  }
}

export function ensureVersion(): void {
  if (!available()) return;
  try {
    if (!localStorage.getItem(VERSION_KEY)) {
      localStorage.setItem(VERSION_KEY, "1");
    }
  } catch (err) {
    warnOnce("ensureVersion", err);
  }
}

export function getProgress(id: string): boolean {
  if (!available()) return !!memProgress[id];
  try {
    return localStorage.getItem(PROGRESS_PREFIX + id) === "1";
  } catch (err) {
    warnOnce("getProgress", err);
    return !!memProgress[id];
  }
}

export function setProgress(id: string, value: boolean): void {
  if (available()) {
    try {
      if (value) localStorage.setItem(PROGRESS_PREFIX + id, "1");
      else localStorage.removeItem(PROGRESS_PREFIX + id);
    } catch (err) {
      warnOnce("setProgress", err);
      memProgress[id] = value;
    }
  } else {
    memProgress[id] = value;
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("progress-updated", { detail: { id, value } })
    );
  }
}

export function getAllProgress(): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  if (available()) {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PROGRESS_PREFIX)) {
          out[k.slice(PROGRESS_PREFIX.length)] =
            localStorage.getItem(k) === "1";
        }
      }
      return out;
    } catch (err) {
      warnOnce("getAllProgress", err);
    }
  }
  return { ...memProgress };
}

export function clearAllProgress(): void {
  if (available()) {
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PROGRESS_PREFIX)) keys.push(k);
      }
      keys.forEach((k) => localStorage.removeItem(k));
    } catch (err) {
      warnOnce("clearAllProgress", err);
    }
  }
  for (const k of Object.keys(memProgress)) delete memProgress[k];
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("progress-cleared"));
  }
}

export function getOS(): OS | null {
  if (available()) {
    try {
      const v = localStorage.getItem(OS_KEY);
      return v === "windows" || v === "mac" ? v : null;
    } catch (err) {
      warnOnce("getOS", err);
      return memOS;
    }
  }
  return memOS;
}

export function setOS(os: OS): void {
  if (available()) {
    try {
      localStorage.setItem(OS_KEY, os);
    } catch (err) {
      warnOnce("setOS", err);
      memOS = os;
    }
  } else {
    memOS = os;
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("os-changed", { detail: { os } }));
  }
}

export function getTheme(): string | null {
  if (available()) {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (err) {
      warnOnce("getTheme", err);
      return memTheme;
    }
  }
  return memTheme;
}

export function setTheme(v: string): void {
  if (available()) {
    try {
      localStorage.setItem(THEME_KEY, v);
      return;
    } catch (err) {
      warnOnce("setTheme", err);
      memTheme = v;
    }
  } else {
    memTheme = v;
  }
}

export const storageAvailable = available;

// テスト用: warn-once フラグをリセット。本番コードからは呼ばない。
export function __resetWarnedForTest(): void {
  for (const k of Object.keys(warned)) delete warned[k];
}

// テスト用: メモリフォールバックをリセット。本番コードからは呼ばない。
export function __resetMemoryForTest(): void {
  for (const k of Object.keys(memProgress)) delete memProgress[k];
  memOS = null;
  memTheme = null;
}
