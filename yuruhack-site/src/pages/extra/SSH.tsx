import { Callout } from "@/components/Callout";
import { CopyBlock } from "@/components/CopyBlock";

export function SSH() {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        おまけ · 発展コンテンツ
      </div>
      <h1>SSH接続（発展）</h1>

      <Callout variant="info" title="このページについて">
        <p className="!mt-0">
          今日の本編では SSH を扱いませんでした（挫折の主原因になりがちなので）。
          ここは「もう少し先を知りたい人」向けのおまけです。
        </p>
      </Callout>

      <h2>SSHとは</h2>
      <p>
        <strong>SSH（Secure Shell）</strong> は、手元のPCと相手のサーバ（ここではGitHub）を安全につなぐための仕組み。
        パスワードの代わりに、<strong>鍵ペア（公開鍵と秘密鍵）</strong> を使って認証します。
      </p>
      <ul>
        <li>
          <strong>秘密鍵</strong>: 自分のPCにだけ置く。誰にも見せない。
        </li>
        <li>
          <strong>公開鍵</strong>: GitHub 側に登録する。見せてOKなもの。
        </li>
      </ul>
      <p>
        一度登録すれば、Push のたびにログインを求められない、等のメリットがあります。
      </p>

      <h2>今日 SSH を使わなかった理由</h2>
      <ul>
        <li>鍵生成・パスフレーズ入力・SSH エージェント起動…など、ハマりポイントが多い</li>
        <li>OS ごとに微妙に手順が違う</li>
        <li>初回の GitHub 体験には重たい</li>
      </ul>
      <p>
        そこで本講座では、<strong>OAuth（ブラウザ経由のログイン）</strong>{" "}
        で認証を済ませる方針を採用しました。
      </p>

      <h2>鍵を作ってみる（参考）</h2>
      <p>
        もし試すなら、ターミナル（Windows は Git Bash または PowerShell、Mac はターミナル）で以下:
      </p>
      <CopyBlock
        code={`ssh-keygen -t ed25519 -C "your_email@example.com"`}
        lang="bash"
        filename="鍵ペアを生成"
        highlightPlaceholders={false}
      />
      <p>
        何も考えず Enter で進めると、<code>~/.ssh/id_ed25519</code>（秘密鍵）と{" "}
        <code>~/.ssh/id_ed25519.pub</code>（公開鍵）ができます。
      </p>

      <h2>公開鍵を GitHub に登録</h2>
      <ol>
        <li>
          <code>~/.ssh/id_ed25519.pub</code> をテキストエディタで開いてコピー。
        </li>
        <li>
          GitHub → 右上のアイコン →{" "}
          <strong>Settings → SSH and GPG keys → New SSH key</strong>
        </li>
        <li>
          Title は自分の PC 名など。Key 欄にコピーした公開鍵を貼り付けて保存。
        </li>
      </ol>

      <h2>動作確認</h2>
      <CopyBlock
        code={`ssh -T git@github.com`}
        lang="bash"
        filename="接続テスト"
        highlightPlaceholders={false}
      />
      <p>
        「Hi &lt;ユーザー名&gt;! You've successfully authenticated...」と出ればOK。
      </p>

      <Callout variant="warn" title="秘密鍵の扱いに注意">
        <code>id_ed25519</code>（拡張子なしのほう）は、絶対に他人に渡したり、GitHub 等に貼り付けたりしてはいけません。
        持ち主がなりすまされる原因になります。
      </Callout>

      <h2>さらに深掘りしたい人へ</h2>
      <ul>
        <li>
          <a
            href="https://docs.github.com/ja/authentication/connecting-to-github-with-ssh"
            target="_blank"
            rel="noreferrer"
          >
            GitHub 公式: SSH を使用した GitHub への接続
          </a>
        </li>
        <li>
          <a
            href="https://www.ssh.com/academy/ssh-keys"
            target="_blank"
            rel="noreferrer"
          >
            SSH Academy: SSH keys
          </a>
        </li>
      </ul>
    </div>
  );
}
