import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";

type Variant = "info" | "warn" | "tip" | "danger";

const TITLES: Record<Variant, string> = {
  info: "このステップについて",
  warn: "注意",
  tip: "ヒント",
  danger: "落とし穴",
};

const ICONS: Record<Variant, React.ComponentType<{ size?: number }>> = {
  info: Info,
  warn: AlertTriangle,
  tip: Lightbulb,
  danger: AlertCircle,
};

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}) {
  const Icon = ICONS[variant];
  return (
    <div className={`callout callout-${variant}`}>
      <div className="callout-title">
        <Icon size={16} />
        {title ?? TITLES[variant]}
      </div>
      <div className="text-[0.95rem] leading-relaxed [&>p]:my-1.5 [&>ul]:ml-5 [&>ul]:list-disc [&>ul]:space-y-1 [&>ol]:ml-5 [&>ol]:list-decimal [&>ol]:space-y-1">
        {children}
      </div>
    </div>
  );
}

export function StepMeta({
  goal,
  time,
  prev,
}: {
  goal: string;
  time: string;
  prev?: { path: string; label: string };
}) {
  return (
    <Callout variant="info" title="このステップについて">
      <ul>
        <li>
          <strong>ゴール:</strong> {goal}
        </li>
        <li>
          <strong>所要時間:</strong> {time}
        </li>
        {prev && (
          <li>
            <strong>前のステップ:</strong>{" "}
            <a href={`#${prev.path}`} className="text-primary underline underline-offset-2">
              {prev.label}
            </a>
          </li>
        )}
      </ul>
    </Callout>
  );
}
