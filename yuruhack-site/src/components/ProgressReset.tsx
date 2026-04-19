import { useState } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { clearAllProgress } from "@/lib/storage";

type Props = {
  compact?: boolean;
};

export function ProgressReset({ compact }: Props) {
  const [open, setOpen] = useState(false);

  const doReset = () => {
    clearAllProgress();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={[
            "inline-flex items-center gap-1.5 rounded-md border border-border bg-background transition",
            "hover:border-destructive/60 hover:text-destructive hover:bg-destructive/5",
            compact
              ? "px-2.5 py-1 text-xs"
              : "px-3 py-1.5 text-sm",
          ].join(" ")}
          aria-label="進捗をリセット"
        >
          <RotateCcw size={compact ? 12 : 14} />
          進捗リセット
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle size={18} />
            進捗をすべてリセットしますか？
          </DialogTitle>
          <DialogDescription className="pt-2 text-left">
            これまでチェックを入れたすべての項目が未完了に戻ります。
            <br />
            <span className="text-xs">
              この操作は取り消せませんが、手順を最初からやり直したいときや、表示がおかしくなったときの復旧手段として使えます。
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm hover:bg-secondary"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={doReset}
            className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
          >
            すべてリセット
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
