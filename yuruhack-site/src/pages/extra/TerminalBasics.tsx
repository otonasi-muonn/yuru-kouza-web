import { useState, useRef, useEffect } from "react";
import { Callout } from "@/components/Callout";
import { OSTabs } from "@/components/OSTabs";
import { TypingCommand } from "@/components/TypingCommand";
import { FadeIn } from "@/components/Animated";
import { Quiz } from "@/components/Quiz";
import { Terminal as TermIcon, Keyboard, Zap } from "lucide-react";

/**
 * おまけ: ターミナル入門（Windows / Mac 両対応）
 *
 * 本編では VSCode の GUI だけで完結させているが、
 * 本番（4/29）以降に自走するにはターミナルが避けられない。
 * ここでは『架空のファイルシステム』を用意し、cd/pwd/ls/mkdir/touch を
 * 実際に打って試せるミニターミナル付き。
 */
export function TerminalBasics() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>ターミナル入門</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          ターミナル（黒い画面）を初めて触る人向けの最初の一歩です。
          『画面の中にもう一つ別のPCが住んでいる』くらいの気持ちで読んでみてください。
          下のほうに <strong>実際にコマンドを打てるミニターミナル</strong> があります。
        </p>
      </Callout>

      <h2>🖥️ ターミナルって何？</h2>
      <p>
        ターミナルは、<strong>文字でPCに命令を出すための窓口</strong> です。
        マウスでアイコンをダブルクリックする代わりに、
        <code>ls</code> や <code>cd</code> といった<strong>コマンド</strong>を打って、
        ファイルを見たりフォルダを移動したりします。
      </p>
      <ul>
        <li>
          <strong>なぜ使うのか</strong> — Git や Node.js のようなツールは、
          ターミナルで動かすことを前提に作られています。マウスだけでは届かない機能が多い。
        </li>
        <li>
          <strong>慣れるまで</strong> — 最初の1週間は『タイプミスで何も動かない』の連続です。
          誰でもそう。<strong>矢印キーの上</strong> で前に打ったコマンドを呼び戻せることを覚えるだけで生存率が上がります。
        </li>
      </ul>

      <h2>📟 OS ごとの『黒い画面』の呼び方</h2>
      <OSTabs
        windows={
          <div className="space-y-2">
            <p>
              Windows には候補が3種類あります。<strong>最初は『Git Bash』推奨</strong>です（Mac/Linux と同じコマンドが使えるため）。
            </p>
            <ul>
              <li>
                <strong>Git Bash</strong> — Git をインストールすると一緒に入る。Mac/Linux と同じ <code>ls</code> <code>pwd</code> が使える。本サイトはこれ前提。
              </li>
              <li>
                <strong>PowerShell</strong> — Windows 標準。コマンド名が独自（<code>Get-ChildItem</code> など）で、他OS教材と互換性が弱い。
              </li>
              <li>
                <strong>コマンドプロンプト（cmd）</strong> — 古い黒い画面。<code>dir</code> でファイル一覧。今日は使わない。
              </li>
            </ul>
          </div>
        }
        mac={
          <div className="space-y-2">
            <p>
              Mac には最初から <strong>ターミナル.app</strong> が入っています。
              <kbd>Cmd</kbd> + スペース で Spotlight を開き <code>terminal</code> と打てば起動できます。
            </p>
            <ul>
              <li>
                <strong>ターミナル.app</strong> — 標準。シェルは <code>zsh</code>（2019年以降）または <code>bash</code>。
              </li>
              <li>
                <strong>iTerm2</strong>（任意）— より多機能な代替。慣れてから乗り換えで OK。
              </li>
            </ul>
          </div>
        }
      />

      <h2>👀 プロンプトの読み方</h2>
      <p>
        ターミナルを開くと、こんな文字列が点滅しています。これを <strong>プロンプト</strong> と呼びます。
      </p>
      <FadeIn>
        <div className="not-prose my-4 rounded-md bg-[hsl(222_18%_12%)] px-4 py-3 font-mono text-sm text-white/90">
          <span className="text-emerald-400">muonn@MacBook-Pro</span>
          <span className="text-white/60">:</span>
          <span className="text-sky-300">~/yuruhack</span>
          <span className="text-white/60">$ </span>
          <span className="animate-pulse">▌</span>
        </div>
      </FadeIn>
      <ul>
        <li>
          <strong>muonn@MacBook-Pro</strong> — ユーザー名とマシン名。
        </li>
        <li>
          <strong>~/yuruhack</strong> — <strong>いま自分がいるフォルダ</strong>（カレントディレクトリ）。<code>~</code> はホームディレクトリの省略形。
        </li>
        <li>
          <strong>$</strong> — コマンド入力を待っている印。この右に文字が打てる。
        </li>
      </ul>

      <Callout variant="tip" title="プロンプトは『自分がどこに立っているか』の地図">
        プログラミング初期のつまずきの9割は『自分がどのフォルダにいるか分かっていない』こと。
        迷ったら <code>pwd</code> で確認、が合言葉。
      </Callout>

      <h2>🎮 試してみよう（ミニターミナル）</h2>
      <p>
        下のターミナルには、架空のフォルダ <code>~/yuruhack</code> が用意されています。
        <code>ls</code> と打って Enter を押すと、中身が表示されます。
      </p>
      <p className="text-sm text-muted-foreground">
        使えるコマンド:{" "}
        <code>pwd</code> / <code>ls</code> / <code>cd</code> / <code>mkdir</code>{" "}
        / <code>touch</code> / <code>cat</code> / <code>clear</code> /{" "}
        <code>help</code>
      </p>

      <MiniTerminal />

      <h2>📋 これだけ覚えれば戦える 7コマンド</h2>
      <div className="not-prose my-5 grid gap-3 sm:grid-cols-2">
        <CmdCard
          cmd="pwd"
          icon={<Zap size={16} />}
          desc="いま自分がいるフォルダを表示（print working directory）"
        />
        <CmdCard
          cmd="ls"
          icon={<Zap size={16} />}
          desc="そのフォルダの中身一覧。-la を付けると隠しファイルも出る"
        />
        <CmdCard
          cmd="cd <フォルダ>"
          icon={<Zap size={16} />}
          desc="フォルダに入る。.. で一つ上、~ でホーム、- で直前の場所に戻る"
        />
        <CmdCard
          cmd="mkdir <名前>"
          icon={<Zap size={16} />}
          desc="フォルダを新規作成（make directory）"
        />
        <CmdCard
          cmd="touch <名前>"
          icon={<Zap size={16} />}
          desc="空ファイルを作成。Windows のエクスプローラで右クリック→新規作成 と同じ"
        />
        <CmdCard
          cmd="cat <ファイル>"
          icon={<Zap size={16} />}
          desc="ファイルの中身を表示。長いファイルは less <ファイル> のほうがラク"
        />
        <CmdCard
          cmd="clear"
          icon={<Zap size={16} />}
          desc="画面をきれいにする（Ctrl/Cmd + L でも可）"
        />
        <CmdCard
          cmd="Ctrl + C"
          icon={<Keyboard size={16} />}
          desc="止まらなくなったコマンドを強制中断。困ったらこれ"
        />
      </div>

      <h2>⌨️ 3大ショートカット（これで体感が変わる）</h2>
      <div className="not-prose my-5 space-y-2">
        <KeyTip
          keys={["↑", "↓"]}
          label="コマンド履歴を呼び戻す"
          desc="一度打ったコマンドを上矢印キーで再利用。タイプミスの修正も、矢印キーで戻って一部だけ書き換えればOK。"
        />
        <KeyTip
          keys={["Tab"]}
          label="補完"
          desc="長いフォルダ名 は最初の2〜3文字 → Tab キーで自動補完。大文字小文字も守ってくれる。2回連続で押すと候補一覧が出る。"
        />
        <KeyTip
          keys={["Ctrl", "C"]}
          label="中断（Windows も Mac も同じ）"
          desc="何かが止まらなくなった時の脱出キー。『プロンプト($)が返ってきたら落ち着けたサイン』。"
        />
      </div>

      <h2>🔰 よくある挫折ポイントと解法</h2>

      <TypingCommand
        steps={[
          { cmd: "pwd", out: "/Users/muonn", note: "いまホームにいる" },
          { cmd: "cd Yuruhack", out: "cd: no such file or directory: Yuruhack", note: "大文字で怒られた" },
          { cmd: "cd yuruhack", out: "", note: "小文字なら入れる（OS は大文字小文字を区別する場合あり）" },
          { cmd: "ls", out: "README.md  assets/  index.html" },
        ]}
      />

      <Callout variant="warn" title="『command not found』と出たとき">
        <p className="!mt-0">
          <strong>ほぼ9割はタイプミス</strong>か、<strong>ツールが未インストール</strong>。
          <code>gitstatus</code> と続けて打っていないか、<code>git  status</code>（全角スペース）になっていないか、
          まず疑ってください。どうしても分からなければ、そのエラー文字列をそのまま検索するのが最短です。
        </p>
      </Callout>

      <Callout variant="tip" title="日本語パスを避ける">
        <code>C:/ユーザー/田中/デスクトップ</code> のようにパスに日本語が入ると、
        古いツールが突然壊れることがあります。プロジェクト用のフォルダは{" "}
        <code>~/yuruhack</code> のように<strong>英小文字・ハイフン</strong> で。
      </Callout>

      <h2>✅ 小テスト</h2>
      <Quiz
        question="プロンプトで `~/yuruhack` と表示されている時、`~` が意味するのは？"
        choices={[
          { label: "カレントディレクトリ（いまいる場所）", hint: "それを示すのは別の記号です" },
          { label: "ホームディレクトリ（自分の専用スペース）", correct: true, hint: "その通り！" },
          { label: "ルート（システムの一番上）", hint: "ルートは `/` です" },
          { label: "直前にいたフォルダ", hint: "それは `-` で表します" },
        ]}
        explain="`~` はホームディレクトリ（Windows: C:\\Users\\<名前>、Mac: /Users/<名前>）の省略記法。`cd ~` だけでホームに戻れます。"
      />

      <Quiz
        question="コマンドが止まらなくなった。何を押す？"
        choices={[
          { label: "Enter キーを連打する" },
          { label: "ターミナルごと閉じる", hint: "最終手段。まずはこの下の答えを試して" },
          { label: "Ctrl + C", correct: true, hint: "これが正解。Mac でも Command ではなく Ctrl です" },
          { label: "Esc キー", hint: "効く場面もあるが、一般的には Ctrl + C" },
        ]}
        explain="`Ctrl + C` は『いま動いているコマンドを止める』合図。Mac でも Command ではなく Ctrl を使うのがポイント。"
      />

      <h2>🔗 関連</h2>
      <ul>
        <li>
          パスの読み方（絶対/相対）は「
          <a href="#/extra/path-basics">ファイル・フォルダ・パス入門</a>
          」に詳しく。
        </li>
        <li>
          Git コマンドは「
          <a href="#/extra/git-deep">Git インタラクティブ解説</a>
          」でビジュアルに。
        </li>
        <li>
          エラーが出たときは「
          <a href="#/extra/error-reading">エラーメッセージの読み方</a>
          」へ。
        </li>
      </ul>
    </div>
  );
}

/* ===== 小道具 ===== */
function CmdCard({ cmd, desc, icon }: { cmd: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="mb-1 flex items-center gap-2">
        <div className="rounded bg-primary/10 p-1 text-primary">{icon}</div>
        <code className="font-mono text-sm font-semibold">{cmd}</code>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function KeyTip({
  keys,
  label,
  desc,
}: {
  keys: string[];
  label: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-border bg-card p-3">
      <div className="flex shrink-0 gap-1">
        {keys.map((k) => (
          <kbd key={k} className="!mx-0">
            {k}
          </kbd>
        ))}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{label}</div>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

/* ===== ミニターミナル ===== */
type FsNode = { name: string; kind: "dir" | "file"; content?: string; children?: FsNode[] };

const INITIAL_FS: FsNode = {
  name: "~",
  kind: "dir",
  children: [
    {
      name: "yuruhack",
      kind: "dir",
      children: [
        { name: "README.md", kind: "file", content: "# yuruhack\n\n4/26 事前講座で作るリポジトリ" },
        {
          name: "assets",
          kind: "dir",
          children: [{ name: "avatar.png", kind: "file", content: "(画像データ)" }],
        },
        { name: "index.html", kind: "file", content: "<!doctype html><h1>Hello</h1>" },
      ],
    },
    { name: "Downloads", kind: "dir", children: [] },
    { name: ".bashrc", kind: "file", content: "export PS1='$ '" },
  ],
};

function MiniTerminal() {
  const [fs] = useState<FsNode>(INITIAL_FS);
  const [cwd, setCwd] = useState<string[]>([]); // ~ からの相対パス
  const [lines, setLines] = useState<{ kind: "in" | "out" | "err"; text: string }[]>([
    { kind: "out", text: "ミニターミナルへようこそ。`help` を打つと使えるコマンドが見られます。" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [lines]);

  const resolve = (parts: string[]): FsNode | null => {
    let node: FsNode = fs;
    for (const p of parts) {
      if (node.kind !== "dir") return null;
      const next = node.children?.find((c) => c.name === p);
      if (!next) return null;
      node = next;
    }
    return node;
  };

  const cwdDisplay = cwd.length === 0 ? "~" : "~/" + cwd.join("/");

  const run = (cmd: string) => {
    const trimmed = cmd.trim();
    const pushIn = () => setLines((l) => [...l, { kind: "in", text: trimmed }]);
    const add = (text: string, kind: "out" | "err" = "out") =>
      setLines((l) => [...l, { kind, text }]);
    if (!trimmed) {
      pushIn();
      return;
    }
    pushIn();
    setHistory((h) => [...h, trimmed]);
    setHIdx(-1);

    const [name, ...args] = trimmed.split(/\s+/);
    const arg = args[0];
    switch (name) {
      case "help":
        add(
          "使えるコマンド: pwd, ls, cd <dir>, mkdir <name>, touch <name>, cat <file>, clear, help",
        );
        break;
      case "pwd":
        add(
          cwd.length === 0
            ? "/Users/you"
            : "/Users/you/" + cwd.join("/"),
        );
        break;
      case "ls": {
        const node = resolve(cwd);
        if (!node || node.kind !== "dir") {
          add("ls: no such directory", "err");
          break;
        }
        const children = node.children ?? [];
        if (children.length === 0) {
          add("(空)");
        } else {
          add(
            children
              .map((c) => (c.kind === "dir" ? `${c.name}/` : c.name))
              .join("  "),
          );
        }
        break;
      }
      case "cd": {
        if (!arg || arg === "~") {
          setCwd([]);
          break;
        }
        if (arg === "..") {
          setCwd((c) => c.slice(0, -1));
          break;
        }
        if (arg === ".") break;
        const target = resolve([...cwd, arg]);
        if (!target || target.kind !== "dir") {
          add(`cd: ${arg}: そんなフォルダはありません`, "err");
          break;
        }
        setCwd((c) => [...c, arg]);
        break;
      }
      case "mkdir":
      case "touch": {
        if (!arg) {
          add(`${name}: 名前が必要です`, "err");
          break;
        }
        const parent = resolve(cwd);
        if (!parent || parent.kind !== "dir") {
          add(`${name}: 作成先がありません`, "err");
          break;
        }
        parent.children = parent.children ?? [];
        if (parent.children.some((c) => c.name === arg)) {
          add(`${name}: ${arg}: すでに存在します`, "err");
          break;
        }
        parent.children.push({
          name: arg,
          kind: name === "mkdir" ? "dir" : "file",
          children: name === "mkdir" ? [] : undefined,
          content: name === "touch" ? "" : undefined,
        });
        add(`(${name === "mkdir" ? "フォルダ" : "ファイル"} ${arg} を作成)`, "out");
        break;
      }
      case "cat": {
        if (!arg) {
          add("cat: ファイル名が必要です", "err");
          break;
        }
        const parent = resolve(cwd);
        const f = parent?.children?.find((c) => c.name === arg);
        if (!f) {
          add(`cat: ${arg}: ファイルがありません`, "err");
          break;
        }
        if (f.kind === "dir") {
          add(`cat: ${arg}: フォルダです`, "err");
          break;
        }
        add(f.content ?? "");
        break;
      }
      case "clear":
        setLines([]);
        break;
      default:
        add(`${name}: command not found`, "err");
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx === -1) return;
      const next = hIdx + 1;
      if (next >= history.length) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="not-prose my-5 overflow-hidden rounded-md border border-border bg-[hsl(222_18%_12%)] text-sm shadow-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-1.5 text-xs">
        <TermIcon size={12} className="text-white/80" />
        <span className="text-white/60">mini-terminal — 安全な練習場</span>
      </div>
      <div
        className="max-h-80 overflow-y-auto p-3 font-mono text-[0.85rem] leading-relaxed"
        aria-live="polite"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.kind === "in"
                ? "text-white/95"
                : l.kind === "err"
                ? "text-red-300"
                : "text-white/70"
            }
          >
            {l.kind === "in" ? (
              <>
                <span className="select-none text-emerald-400/90">$ </span>
                {l.text}
              </>
            ) : (
              <span className="whitespace-pre-wrap">{l.text}</span>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2 text-white/95">
          <span className="select-none text-sky-300">{cwdDisplay}</span>
          <span className="select-none text-emerald-400/90">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent outline-none"
            spellCheck={false}
            autoComplete="off"
            aria-label="コマンド入力"
            placeholder="ここにコマンド（例: ls）"
          />
        </div>
      </div>
    </div>
  );
}
