import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-[70vh] items-center pt-[var(--nav-h)]"
    >
      <Container>
        <div className="max-w-xl py-20">
          <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-accent">
            Error 404
          </p>
          <h1 className="mt-6 text-4xl leading-[1.08] text-ink sm:text-5xl">
            This page has been redrafted.
          </h1>
          <p className="mt-6 text-lg leading-[1.75] text-ink-soft">
            The page you’re looking for doesn’t exist or has moved. Return home
            or explore the work.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/" withArrow>
              Back to Home
            </Button>
            <Button href="/policy-engagement" variant="secondary">
              Policy Engagement
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
