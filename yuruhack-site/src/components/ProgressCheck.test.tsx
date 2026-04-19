import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProgressCheck } from "./ProgressCheck";
import { getProgress, __resetMemoryForTest } from "@/lib/storage";

describe("<ProgressCheck />", () => {
  beforeEach(() => {
    localStorage.clear();
    __resetMemoryForTest();
  });

  it("初期状態は未チェック（aria-pressed=false）", () => {
    render(<ProgressCheck id="test-1" label="ラベル" />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("ラベル")).toBeInTheDocument();
  });

  it("クリックでチェック状態が切り替わり、localStorage に反映される", async () => {
    const user = userEvent.setup();
    render(<ProgressCheck id="test-2" label="完了タスク" />);
    const btn = screen.getByRole("button");

    await user.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(getProgress("test-2")).toBe(true);

    await user.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(getProgress("test-2")).toBe(false);
  });

  it("外部から progress-cleared イベントが来たら未チェックに戻る", async () => {
    const user = userEvent.setup();
    render(<ProgressCheck id="test-3" label="X" />);
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");

    act(() => {
      window.dispatchEvent(new CustomEvent("progress-cleared"));
    });
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });

  it("label の代わりに children を受け取れる", () => {
    render(<ProgressCheck id="test-4">子要素テキスト</ProgressCheck>);
    expect(screen.getByText("子要素テキスト")).toBeInTheDocument();
  });

  it("完了時にアクセシブルな「完了:」プレフィックスが付く", async () => {
    const user = userEvent.setup();
    render(<ProgressCheck id="test-5" label="やること" />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText(/完了: やること/)).toBeInTheDocument();
  });

  // 使われない変数の無視
  void vi;
});
