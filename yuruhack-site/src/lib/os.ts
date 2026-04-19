import type { OS } from "./storage";

// OS detection with userAgentData preference
export function detectOS(): OS | null {
  if (typeof navigator === "undefined") return null;
  // Modern API
  const uaData = (navigator as unknown as {
    userAgentData?: { platform?: string };
  }).userAgentData;
  const src = (uaData?.platform || navigator.platform || "").toLowerCase();
  if (src) {
    if (
      src.includes("mac") ||
      src.includes("darwin") ||
      src.includes("iphone") ||
      src.includes("ipad")
    ) {
      return "mac";
    }
    if (src.includes("win")) return "windows";
  }
  // Fallback by UA（platform が空 or 未知の場合も含めて試す）
  const ua = (navigator.userAgent || "").toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("windows")) return "windows";
  return null;
}
