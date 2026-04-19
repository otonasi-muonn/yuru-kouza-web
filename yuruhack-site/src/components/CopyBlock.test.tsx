import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CopyBlock } from "./CopyBlock";

describe("<CopyBlock /> (smoke)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("code 内容と filename ラベルを表示する", () => {
    render(
      <CopyBlock code={"# Hello\nWorld"} filename="README.md" />
    );
    expect(screen.getByText("README.md")).toBeInTheDocument();
    // コードブロック内にコードが描画される
    expect(
      screen.getAllByText(/Hello|World/).length
    ).toBeGreaterThan(0);
  });

  it("filename が無い場合 lang が代わりに表示される", () => {
    render(<CopyBlock code={"x"} lang="markdown" />);
    expect(screen.getByText("markdown")).toBeInTheDocument();
  });

  it("ボタンに aria-label が付く（初期状態）", () => {
    render(<CopyBlock code={"x"} filename="a.md" />);
    expect(screen.getByRole("button")).toHaveAccessibleName(/コピー/);
  });

  it("クリックで clipboard API が呼ばれる（secure context & clipboard あり）", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    Object.defineProperty(window, "isSecureContext", {
      configurable: true,
      value: true,
    });

    render(<CopyBlock code={"payload"} filename="test.md" />);
    const btn = screen.getByRole("button");
    // user-event の自動 clipboard スタブを避けて fireEvent で直接
    fireEvent.click(btn);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("payload");
    });
    expect(await screen.findByText("コピー済み")).toBeInTheDocument();
  });

  it("clipboard/execCommand 共に使えない場合、失敗メッセージを表示", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(window, "isSecureContext", {
      configurable: true,
      value: false,
    });
    // jsdom は execCommand を実装していないので、undefined のまま -> throw
    // document.execCommand を定義しつつ throw させる
    (document as unknown as { execCommand: () => boolean }).execCommand = () => {
      throw new Error("not supported");
    };

    render(<CopyBlock code={"fallback-payload"} filename="x.md" />);
    fireEvent.click(screen.getByRole("button"));

    expect(
      await screen.findByText(/自動コピーに失敗しました/)
    ).toBeInTheDocument();
  });
});
