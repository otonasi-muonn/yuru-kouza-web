import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNextPage, getPrevPage } from "@/lib/routes";

export function PageNav({ current }: { current: string }) {
  const prev = getPrevPage(current);
  const next = getNextPage(current);
  if (!prev && !next) return null;
  return (
    <div className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      {prev ? (
        <a
          href={`#${prev.path}`}
          className="group flex flex-col items-start rounded-md border border-border bg-card px-4 py-3 transition hover:border-primary/60 hover:bg-secondary/60"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft size={12} /> 前のステップ
          </span>
          <span className="mt-0.5 font-medium group-hover:text-primary">
            {prev.title}
          </span>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a
          href={`#${next.path}`}
          className="group flex flex-col items-end rounded-md border border-primary/40 bg-primary/5 px-4 py-3 transition hover:border-primary hover:bg-primary/10 sm:col-start-2"
        >
          <span className="flex items-center gap-1 text-xs text-primary/80">
            次のステップ <ArrowRight size={12} />
          </span>
          <span className="mt-0.5 font-medium text-primary">{next.title}</span>
        </a>
      ) : (
        <div />
      )}
    </div>
  );
}
