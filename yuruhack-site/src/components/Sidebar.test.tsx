import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "./Sidebar";
import { setProgress, __resetMemoryForTest } from "@/lib/storage";

describe("<Sidebar />", () => {
  beforeEach(() => {
    localStorage.clear();
    __resetMemoryForTest();
  });

  it("共通モジュール / Web班 / おまけ（発展）の 3 セクションを描画", () => {
    render(<Sidebar currentPath="/" />);
    expect(screen.getByText("共通モジュール")).toBeInTheDocument();
    expect(screen.getByText("Web班")).toBeInTheDocument();
    expect(screen.getByText("おまけ（発展）")).toBeInTheDocument();
  });

  it("進捗バッジ「0/3」「0/5」が初期表示で出る（発展は総数0なので出ない）", () => {
    render(<Sidebar currentPath="/" />);
    expect(screen.getByText("0/3")).toBeInTheDocument();
    expect(screen.getByText("0/5")).toBeInTheDocument();
  });

  it("進捗を付けるとバッジがリアクティブに更新される", () => {
    render(<Sidebar currentPath="/" />);
    expect(screen.getByText("0/5")).toBeInTheDocument();
    act(() => {
      setProgress("web-01-repo", true);
    });
    expect(screen.getByText("1/5")).toBeInTheDocument();
  });

  it("currentPath に対応するナビリンクに aria-current='page' が付く", () => {
    render(<Sidebar currentPath="/web/01-create-repository" />);
    const link = screen.getByRole("link", { name: /リポジトリ作成/ });
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("おまけセクションは折りたたまれており、押下で開閉する", async () => {
    const user = userEvent.setup();
    render(<Sidebar currentPath="/" />);
    const toggle = screen.getByRole("button", { name: /おまけ（発展）/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
