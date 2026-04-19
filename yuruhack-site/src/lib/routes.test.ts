import { describe, it, expect } from "vitest";
import {
  ALL_PAGES,
  COMMON_PAGES,
  EXTRA_PAGES,
  MAIN_FLOW,
  WEB_PAGES,
  findPage,
  getNextPage,
  getPrevPage,
} from "./routes";

describe("routes 定義", () => {
  it("共通 3 / Web 5 / 発展 8 ページあり、MAIN_FLOW は共通＋Web のみ", () => {
    expect(COMMON_PAGES.length).toBe(3);
    expect(WEB_PAGES.length).toBe(5);
    expect(EXTRA_PAGES.length).toBe(8);
    expect(MAIN_FLOW.length).toBe(COMMON_PAGES.length + WEB_PAGES.length);
  });

  it("ALL_PAGES のパスに重複が無い", () => {
    const paths = ALL_PAGES.map((p) => p.path);
    const uniq = new Set(paths);
    expect(paths.length).toBe(uniq.size);
  });

  it("common ページは全員に progressId が付いている（FR-4 要件）", () => {
    for (const p of COMMON_PAGES) expect(p.progressId).toBeTruthy();
  });

  it("web ページは全員に progressId が付いている（FR-4 要件）", () => {
    for (const p of WEB_PAGES) expect(p.progressId).toBeTruthy();
  });

  it("発展ページは progressId を持たない（進捗対象外）", () => {
    for (const p of EXTRA_PAGES) expect(p.progressId).toBeUndefined();
  });
});

describe("findPage", () => {
  it("存在するパスに対応する PageDef を返す", () => {
    const p = findPage("/web/01-create-repository");
    expect(p?.title).toBe("リポジトリ作成");
  });

  it("存在しないパスは undefined", () => {
    expect(findPage("/nonexistent")).toBeUndefined();
  });
});

describe("getNextPage / getPrevPage", () => {
  it("先頭（common-01）の prev は undefined", () => {
    expect(getPrevPage("/common/01-github-account")).toBeUndefined();
  });

  it("最終（web-05）の next は undefined", () => {
    expect(getNextPage("/web/05-challenge")).toBeUndefined();
  });

  it("common-03 の次は web-01 に跨る", () => {
    const next = getNextPage("/common/03-github-oauth");
    expect(next?.path).toBe("/web/01-create-repository");
  });

  it("web-01 の前は common-03 に戻る", () => {
    const prev = getPrevPage("/web/01-create-repository");
    expect(prev?.path).toBe("/common/03-github-oauth");
  });

  it("MAIN_FLOW 外のパス（発展など）は prev/next とも undefined", () => {
    expect(getNextPage("/extra/ssh")).toBeUndefined();
    expect(getPrevPage("/extra/ssh")).toBeUndefined();
  });
});
