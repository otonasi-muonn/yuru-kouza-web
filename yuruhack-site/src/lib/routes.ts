export type PageDef = {
  path: string;
  title: string;
  section?: "common" | "web" | "extra";
  progressId?: string;
  sectionLabel?: string;
};

export const HOME: PageDef = { path: "/", title: "ゆるハッカソン 事前講座" };

export const COMMON_PAGES: PageDef[] = [
  {
    path: "/common/01-github-account",
    title: "GitHubアカウント作成",
    section: "common",
    progressId: "common-01-github-account",
    sectionLabel: "共通モジュール",
  },
  {
    path: "/common/02-vscode-extensions",
    title: "VSCode推奨拡張",
    section: "common",
    progressId: "common-02-vscode-extensions",
    sectionLabel: "共通モジュール",
  },
  {
    path: "/common/03-github-oauth",
    title: "GitHub OAuth連携",
    section: "common",
    progressId: "common-03-github-oauth",
    sectionLabel: "共通モジュール",
  },
];

export const WEB_PAGES: PageDef[] = [
  {
    path: "/web/01-create-repository",
    title: "リポジトリ作成",
    section: "web",
    progressId: "web-01-repo",
    sectionLabel: "Web班",
  },
  {
    path: "/web/02-clone",
    title: "Cloneする",
    section: "web",
    progressId: "web-02-clone",
    sectionLabel: "Web班",
  },
  {
    path: "/web/03-markdown-edit",
    title: "READMEを書く",
    section: "web",
    progressId: "web-03-markdown-edit",
    sectionLabel: "Web班",
  },
  {
    path: "/web/04-commit-push",
    title: "Commit & Push",
    section: "web",
    progressId: "web-04-commit-push",
    sectionLabel: "Web班",
  },
  {
    path: "/web/05-challenge",
    title: "ミニチャレンジ",
    section: "web",
    progressId: "web-05-challenge",
    sectionLabel: "Web班",
  },
];

export const EXTRA_PAGES: PageDef[] = [
  { path: "/extra/ssh", title: "SSH接続", section: "extra", sectionLabel: "おまけ" },
  { path: "/extra/github-actions", title: "GitHub Actions", section: "extra", sectionLabel: "おまけ" },
  { path: "/extra/html-css-basics", title: "HTML/CSS基礎", section: "extra", sectionLabel: "おまけ" },
  { path: "/extra/javascript-basics", title: "JavaScript基礎", section: "extra", sectionLabel: "おまけ" },
  { path: "/extra/github-pages", title: "GitHub Pages", section: "extra", sectionLabel: "おまけ" },
  { path: "/extra/css-frameworks", title: "CSSフレームワーク", section: "extra", sectionLabel: "おまけ" },
  { path: "/extra/vscode-plus", title: "VSCode拡張（拡充版）", section: "extra", sectionLabel: "おまけ" },
  { path: "/extra/git-deep", title: "Git インタラクティブ", section: "extra", sectionLabel: "おまけ" },
];

export const ALL_PAGES: PageDef[] = [
  HOME,
  ...COMMON_PAGES,
  ...WEB_PAGES,
  ...EXTRA_PAGES,
];

export const MAIN_FLOW: PageDef[] = [...COMMON_PAGES, ...WEB_PAGES];

export function findPage(path: string): PageDef | undefined {
  return ALL_PAGES.find((p) => p.path === path);
}

export function getNextPage(current: string): PageDef | undefined {
  const idx = MAIN_FLOW.findIndex((p) => p.path === current);
  if (idx === -1) return undefined;
  return MAIN_FLOW[idx + 1];
}

export function getPrevPage(current: string): PageDef | undefined {
  const idx = MAIN_FLOW.findIndex((p) => p.path === current);
  if (idx <= 0) return undefined;
  return MAIN_FLOW[idx - 1];
}
