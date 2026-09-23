import { cn } from "@/lib/cn";

const FIELD_BASE =
  "w-full rounded-none border-0 border-b bg-transparent px-0 py-3.5 font-sans text-base transition-colors duration-300 placeholder:text-ink-faint/70 focus:outline-none focus:ring-0 disabled:opacity-60";

const LIGHT = "border-ink/20 text-ink focus:border-accent";
const DARK =
  "border-paper-bright/25 text-paper-bright placeholder:text-paper-deep/45 focus:border-paper-bright";

type Tone = "light" | "dark";

type FieldShellProps = {
  id: string;
  label: string;
  tone?: Tone;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  hint?: string;
};

/** Label + field + optional hint. Keeps every control's a11y wiring identical. */
export function Field({
  id,
  label,
  tone = "light",
  required,
  className,
  children,
  hint,
}: FieldShellProps) {
  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={id}
        className={cn(
          "block font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em]",
          tone === "light" ? "text-ink-faint" : "text-paper-deep/60",
        )}
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-accent">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p
          id={`${id}-hint`}
          className={cn(
            "mt-2 text-xs",
            tone === "light" ? "text-ink-faint" : "text-paper-deep/50",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { tone?: Tone };

export function Input({ className, tone = "light", ...props }: InputProps) {
  return (
    <input
      className={cn(FIELD_BASE, tone === "light" ? LIGHT : DARK, className)}
      {...props}
    />
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  tone?: Tone;
};

export function Textarea({ className, tone = "light", ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        FIELD_BASE,
        "resize-y",
        tone === "light" ? LIGHT : DARK,
        className,
      )}
      {...props}
    />
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  tone?: Tone;
};

export function Select({
  className,
  tone = "light",
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={cn(
        FIELD_BASE,
        "cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.25rem_center] bg-no-repeat pr-8",
        tone === "light" ? LIGHT : DARK,
        className,
      )}
      style={{
        backgroundImage:
          tone === "light"
            ? "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%2357514A' stroke-width='1.5'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")"
            : "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23EFE8D9' stroke-width='1.5'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  );
}
