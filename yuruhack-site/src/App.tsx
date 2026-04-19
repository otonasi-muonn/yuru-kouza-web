import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ensureVersion } from "@/lib/storage";
import { Home } from "@/pages/Home";
import { GithubAccount } from "@/pages/common/GithubAccount";
import { VSCodeExtensions } from "@/pages/common/VSCodeExtensions";
import { GithubOauth } from "@/pages/common/GithubOauth";
import { CreateRepository } from "@/pages/web/CreateRepository";
import { Clone } from "@/pages/web/Clone";
import { MarkdownEdit } from "@/pages/web/MarkdownEdit";
import { CommitPush } from "@/pages/web/CommitPush";
import { Challenge } from "@/pages/web/Challenge";
import { SSH } from "@/pages/extra/SSH";
import { GithubActions } from "@/pages/extra/GithubActions";
import { HtmlCssBasics } from "@/pages/extra/HtmlCssBasics";
import { JavaScriptBasics } from "@/pages/extra/JavaScriptBasics";
import { GithubPagesPage } from "@/pages/extra/GithubPages";
import { CssFrameworks } from "@/pages/extra/CssFrameworks";
import { VSCodePlus } from "@/pages/extra/VSCodePlus";
import { GitDeepDive } from "@/pages/extra/GitDeepDive";
import { TerminalBasics } from "@/pages/extra/TerminalBasics";
import { PathBasics } from "@/pages/extra/PathBasics";
import { Glossary } from "@/pages/extra/Glossary";
import { ErrorMessages } from "@/pages/extra/ErrorMessages";
import { ApiIntro } from "@/pages/extra/ApiIntro";
import { AITools } from "@/pages/extra/AITools";
import { MarkdownAdvanced } from "@/pages/extra/MarkdownAdvanced";
import { ImageHandling } from "@/pages/extra/ImageHandling";
import { GitignoreIntro } from "@/pages/extra/GitignoreIntro";
import { DevToolsIntro } from "@/pages/extra/DevToolsIntro";
import { AccessibilityIntro } from "@/pages/extra/AccessibilityIntro";
import { LicenseIntro } from "@/pages/extra/LicenseIntro";
import { MergeConflict } from "@/pages/extra/MergeConflict";
import { VcsMotivation } from "@/pages/extra/VcsMotivation";
import { NotFound } from "@/pages/NotFound";

function normalizeHash(): string {
  const h = window.location.hash || "";
  const raw = h.startsWith("#") ? h.slice(1) : h;
  if (!raw || raw === "/") return "/";
  return raw.startsWith("/") ? raw : "/" + raw;
}

function App() {
  const [path, setPath] = useState(() => {
    if (typeof window === "undefined") return "/";
    return normalizeHash();
  });

  useEffect(() => {
    ensureVersion();
    const onHash = () => {
      const p = normalizeHash();
      setPath(p);
      // scroll to top on route change
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    // Normalize empty hash
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const PageComponent = resolvePage(path);

  return (
    <Layout currentPath={path}>
      <PageComponent />
    </Layout>
  );
}

function resolvePage(path: string): () => React.JSX.Element {
  switch (path) {
    case "/":
      return Home;
    case "/common/01-github-account":
      return GithubAccount;
    case "/common/02-vscode-extensions":
      return VSCodeExtensions;
    case "/common/03-github-oauth":
      return GithubOauth;
    case "/web/01-create-repository":
      return CreateRepository;
    case "/web/02-clone":
      return Clone;
    case "/web/03-markdown-edit":
      return MarkdownEdit;
    case "/web/04-commit-push":
      return CommitPush;
    case "/web/05-challenge":
      return Challenge;
    case "/extra/ssh":
      return SSH;
    case "/extra/github-actions":
      return GithubActions;
    case "/extra/html-css-basics":
      return HtmlCssBasics;
    case "/extra/javascript-basics":
      return JavaScriptBasics;
    case "/extra/github-pages":
      return GithubPagesPage;
    case "/extra/css-frameworks":
      return CssFrameworks;
    case "/extra/vscode-plus":
      return VSCodePlus;
    case "/extra/git-deep":
      return GitDeepDive;
    case "/extra/terminal-basics":
      return TerminalBasics;
    case "/extra/path-basics":
      return PathBasics;
    case "/extra/glossary":
      return Glossary;
    case "/extra/error-reading":
      return ErrorMessages;
    case "/extra/api-intro":
      return ApiIntro;
    case "/extra/ai-tools":
      return AITools;
    case "/extra/markdown-advanced":
      return MarkdownAdvanced;
    case "/extra/image-handling":
      return ImageHandling;
    case "/extra/gitignore-intro":
      return GitignoreIntro;
    case "/extra/dev-tools":
      return DevToolsIntro;
    case "/extra/accessibility-intro":
      return AccessibilityIntro;
    case "/extra/license-intro":
      return LicenseIntro;
    case "/extra/merge-conflict":
      return MergeConflict;
    case "/extra/vcs-motivation":
      return VcsMotivation;
    default:
      return NotFound;
  }
}

export default App;

