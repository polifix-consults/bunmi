"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { submitWaitlistToSupabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

type WaitlistFormProps = {
  className?: string;
  tone?: "light" | "dark";
  /** Hide the internal heading when the surrounding section supplies one. */
  showHeading?: boolean;
};

/**
 * Waitlist capture. Submits directly to Supabase table waitlist_subscribers.
 */
export function WaitlistForm({
  className,
  tone = "light",
  showHeading = true,
}: WaitlistFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ firstName: "", email: "" });

  const dark = tone === "dark";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.email.trim()) return;
    setStatus("submitting");

    try {
      await submitWaitlistToSupabase({
        firstName: values.firstName,
        email: values.email,
        source: "book_launch_waitlist",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex flex-col items-start gap-4 border p-8 sm:p-10",
          dark
            ? "border-dark-line bg-dark-soft text-paper-bright"
            : "border-line bg-paper-bright text-ink",
          className,
        )}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-paper-bright">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-2xl">You’re on the list.</h3>
        <p className={cn("text-[0.9375rem] leading-relaxed", dark ? "text-paper-deep/70" : "text-ink-soft")}>
          Thank you{values.firstName ? `, ${values.firstName}` : ""}. You’ll be
          among the first to hear about the launch, early excerpts and
          pre-order access.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border p-8 sm:p-10",
        dark ? "border-dark-line bg-dark-soft" : "border-line bg-paper-bright",
        className,
      )}
    >
      {showHeading ? (
        <>
          <h3
            className={cn(
              "text-2xl sm:text-[1.75rem]",
              dark ? "text-paper-bright" : "text-ink",
            )}
          >
            Be the First to Read.
          </h3>
          <p
            className={cn(
              "mt-3 text-[0.9375rem] leading-relaxed",
              dark ? "text-paper-deep/65" : "text-ink-soft",
            )}
          >
            Join the waitlist for launch news, exclusive insights, and early excerpts.
          </p>
        </>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className={cn("space-y-6", showHeading && "mt-8")}
        noValidate
      >
        <Field id="waitlist-first-name" label="First Name" tone={tone} required>
          <Input
            id="waitlist-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            tone={tone}
            placeholder="Ada"
            value={values.firstName}
            onChange={(e) =>
              setValues((v) => ({ ...v, firstName: e.target.value }))
            }
          />
        </Field>

        <Field id="waitlist-email" label="Email Address" tone={tone} required>
          <Input
            id="waitlist-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            tone={tone}
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        </Field>

        {status === "error" ? (
          <p role="alert" className="text-sm text-accent">
            Something went wrong. Please try again.
          </p>
        ) : null}

        <Button
          type="submit"
          variant={dark ? "onDark" : "primary"}
          size="lg"
          disabled={status === "submitting"}
          className="w-full font-bold uppercase tracking-widest"
          icon={status === "submitting" ? Loader2 : undefined}
          withArrow
        >
          {status === "submitting" ? "Joining…" : "JOIN THE WAITLIST"}
        </Button>

        <p
          className={cn(
            "text-xs leading-relaxed",
            dark ? "text-paper-deep/45" : "text-ink-faint",
          )}
        >
          No spam — launch news only. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
