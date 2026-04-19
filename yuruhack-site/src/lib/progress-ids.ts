// Progress IDs — single source of truth
// Section naming: <section>-<step>-<topic>
export const PROGRESS_IDS = {
  common: [
    "common-01-github-account",
    "common-02-vscode-extensions",
    "common-03-github-oauth",
  ],
  web: [
    "web-01-repo",
    "web-02-clone",
    "web-03-markdown-edit",
    "web-04-commit-push",
    "web-05-challenge",
  ],
} as const;

export type SectionKey = keyof typeof PROGRESS_IDS;

export const SECTION_LABELS: Record<SectionKey, string> = {
  common: "共通モジュール",
  web: "Web班",
};
