# Agent Guidelines & Design System Architecture

This document serves as the single source of truth for AI agents and developers building or extending pages, components, and UI patterns for **Olubunmi Ayantunji**'s official website.

---

## 1. Project & Brand Overview

- **Subject / Client:** Olubunmi (Bunmi) Ayantunji — Nigerian-Canadian public policy practitioner, legal scholar, and author.
- **Brand Tone:** Editorial, institutional, prestigious, intellectually rigorous, restrained, and modern. Think *Foreign Affairs*, *The Atlantic*, and high-level parliamentary publications rather than a generic tech portfolio.
- **Tech Stack:**
  - **Framework:** Next.js (App Router, TypeScript)
  - **Styling:** Tailwind CSS + PostCSS
  - **Motion:** Framer Motion (`Reveal` component with decelerating bezier curves)
  - **Icons:** `lucide-react`
  - **Typography:** `Inter` (grotesque sans applied via `next/font/google`)

---

## 2. Design Tokens & Color Palette

The project employs an editorial color system defined in `tailwind.config.ts`, complemented by crisp `slate` neutrals and pure `white`.

### 2.1 Core Palette

| Token / Class | Hex Value | Role & Usage |
|---|---|---|
| `bg-paper` | `#F6F1E6` | Warm cream — primary classical page background |
| `bg-paper-deep` | `#EFE8D9` | Slightly deeper cream for alternating section tones |
| `bg-paper-bright` | `#FBF8F1` | Lightest warm surface — cards, masthead surfaces |
| `bg-paper-toned` | `#E9E0CD` | Deeper toned cream for photo blending/seams |
| `text-ink` / `bg-ink` | `#0F1E36` | Deep navy charcoal — primary high-contrast text |
| `text-ink-soft` | `#334E68` | Secondary navy copy (body paragraphs, descriptions) |
| `text-ink-faint` | `#627D98` | Tertiary navy copy (captions, sub-labels, hints) |
| `accent` / `navy-900` | `#0A2540` | **Core Primary Navy Blue** — primary CTA buttons, badges |
| `accent-deep` / `navy-950` | `#061628` | Deep midnight navy — hover state for primary CTAs |
| `accent-tint` | `#EBF2F9` | Soft ice navy wash — subtle active states / highlights |
| `dark` | `#081A2F` | Cinematic navy dark — dark mode sections & footers |
| `dark-soft` | `#0E233D` | Raised dark surface |
| `dark-line` | `#1B3A60` | Dark navy borders & dividers |
| `line` | `#D9E2EC` | Classical hairline border |

### 2.2 Modern Slate Architecture
Many core routes (Home hero, About executive, Mastheads, CtaBand) also utilize the modern architectural scheme:
- **Backgrounds:** `bg-white`, `bg-slate-50`, `bg-slate-100`
- **Text:** `text-slate-900` (headings, titles), `text-slate-600` (body copy), `text-slate-500` (eyebrows, metadata)
- **Borders & Dividers:** `border-slate-200`, `border-slate-200/60`, `border-slate-200/80`

> **Rule:** Never introduce arbitrary hex codes outside this palette (no random `#3b82f6` blues or pure `#000000` blacks). Use `navy-900` (`#0A2540`), `ink`, or `slate-900`.

---

## 3. Typography Rules

Authority comes from **weight, scale, and negative tracking** rather than ornate serif contrasts.

### 3.1 Font Family
- Unified grotesque sans: `Inter` (`font-sans`, `font-inter`, `font-display`).
- Configured via CSS variable `--font-inter` in `app/layout.tsx`.

### 3.2 Scale & Hierarchy

| Element | Recommended Classes | Characteristics |
|---|---|---|
| **Eyebrow / Kicker** | `font-inter text-xs sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500` or `text-accent` | Sits above H1/H2; uppercase; heavily tracked; optionally with a 32px hairline rule (`h-px w-8 bg-accent/50`). |
| **Page H1 (Masthead)** | `text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.05]` | Exactly **one H1 per page**. Use `text-balance`. |
| **Section H2** | `text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight text-slate-900` | Sits within sections; paired with an Eyebrow and Lede. |
| **Subsection H3** | `text-xl sm:text-2xl font-semibold tracking-[-0.018em] text-slate-900` | Card headings, content sub-headers. |
| **Lede / Intro Paragraph** | `text-base sm:text-lg lg:text-xl font-light leading-relaxed sm:leading-loose text-slate-600` | High line-height, lighter weight (`font-light`), balanced measure (`max-w-2xl` to `max-w-3xl`). |
| **Standard Body** | `text-base leading-relaxed text-slate-600` or `text-ink-soft` | Clear, readable measure, `text-pretty`. |
| **Stats & Numbers** | `tabular-nums text-2xl sm:text-3xl font-bold tracking-tight text-slate-900` | Always enable `tabular-nums` for data alignment. |
| **Buttons & Action Links**| `font-sans font-medium uppercase tracking-[0.14em]` | Strict uppercase, spaced tracking, sharp edges. |

---

## 4. Architectural Patterns & Signature Motifs

### 4.1 The 5-Column Vertical Alignment Grid
The visual connective tissue across pages is the subtle 5-column architectural background grid, representing institutional rigor:
```tsx
{/* Vertical alignment grid — placed inside relative sections with pointer-events-none */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 z-0 mx-auto grid max-w-7xl grid-cols-1 divide-x divide-slate-200/60 px-4 sm:px-6 md:grid-cols-5 lg:px-8"
>
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="hidden h-full md:block" />
  ))}
</div>
```

### 4.2 Fixed Header Offsets
The global navigation has a fixed height defined in CSS:
```css
:root {
  --nav-h: 5rem;
}
```
Any top section (Hero, Masthead, PageHeader) **must** clear the navbar:
```tsx
className="pt-[calc(var(--nav-h)+3.5rem)] sm:pt-[calc(var(--nav-h)+4.5rem)] lg:pt-[calc(var(--nav-h)+6rem)]"
```

### 4.3 Container Constraints & Gutters
- **Standard Width:** `max-w-7xl` or `max-w-shell` (`80rem` / `1280px`).
- **Gutter Padding:** `px-4 sm:px-6 lg:px-8` (or `px-6 sm:px-8 lg:px-12` when using the `<Container>` component).
- **Prose Reading Measure:** `max-w-3xl` or `max-w-2xl` for long-form editorial copy.

### 4.4 Hairline Dividers
Sections are separated by hairline borders rather than drop shadows:
- `border-b border-slate-200`
- `border-t border-slate-200/80`
- Dark sections: `border-dark-line` (`#1B3A60`)

### 4.5 Link Hover Animation (`.link-underline`)
For text links and inline navigation:
```tsx
<Link href="/about" className="link-underline text-slate-900 hover:text-accent">
  Learn more
</Link>
```
Expands an underline from left to right smoothly on hover.

---

## 5. UI Component Library & Usage Guide

All shared primitives live in `@/components/ui/` and `@/components/sections/`.

### 5.1 `<Button>` (`@/components/ui/Button`)
Polymorphic component: automatically renders a `next/link` when `href` is supplied, or a `<button>` otherwise.

```tsx
import { Button } from "@/components/ui/Button";

// Primary action with animated arrow
<Button href="/contact" variant="primary" withArrow>
  Get in Touch
</Button>

// Secondary bordered button
<Button href="/about" variant="secondary">
  Read Bio
</Button>

// On Dark surfaces
<Button href="/order" variant="onDark">
  Order Copy
</Button>
```
- **Variants:** `primary` (Navy `#0A2540`), `secondary` (bordered), `ghost` (text-only, tracked), `onDark` (white on dark background).
- **Sizes:** `sm`, `md` (default), `lg`.
- **Props:** `withArrow` (nudges right on hover), `icon` (`LucideIcon`).

### 5.2 `<PageMasthead>` (`@/components/ui/PageMasthead`)
Preferred top hero for interior pages (About, Research, Podcasts, Policy Engagement).
Includes the 5-column vertical grid, uppercase eyebrow, single page H1, optional lede text, and optional tabular stats block.

```tsx
import { PageMasthead } from "@/components/ui/PageMasthead";

<PageMasthead
  eyebrow="Policy Research"
  title="Publications & Institutional Briefs"
  intro="A curated collection of legislative analysis, academic papers, and governance frameworks."
  stats={[
    { label: "Publications", value: "24+" },
    { label: "Jurisdictions", value: "02" },
  ]}
/>
```

### 5.3 `<Section>` & `<SectionHeading>`
For content bands within an existing page:

```tsx
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

<Section tone="paper" spacing="default">
  <Container>
    <SectionHeading
      eyebrow="Strategic Advisory"
      title="Institutional Governance & Reform"
      intro="Strengthening decision-making structures and legislative efficacy across jurisdictions."
    />
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Content cards */}
    </div>
  </Container>
</Section>
```

### 5.4 `<CtaBand>` (`@/components/sections/CtaBand`)
Standard closing section for pages, maintaining a cohesive conversion funnel across routes:

```tsx
import { CtaBand } from "@/components/sections/CtaBand";

<CtaBand
  eyebrow="Work Together"
  title="Bring rigorous policy thinking to your institution."
  body="Available for legislative drafting, cabinet-level advisory, and keynote addresses."
  primary={{ label: "Start a Conversation", href: "/contact" }}
  secondary={{ label: "Research & Publications", href: "/research-publication" }}
/>
```

### 5.5 `<Reveal>` (`@/components/ui/Reveal`)
Wrap elements for scroll-triggered staggered fade-in-up animations:
```tsx
import { Reveal } from "@/components/ui/Reveal";

<Reveal delay={0.08}>
  <h2>Heading</h2>
</Reveal>
<Reveal delay={0.16}>
  <p>Body copy...</p>
</Reveal>
```

### 5.6 Form Controls (`@/components/ui/Field`)
Minimalist bottom-bordered input styling with uppercase tracked labels:
```tsx
import { Field, Input, Textarea } from "@/components/ui/Field";

<Field id="fullName" label="Full Name" required>
  <Input id="fullName" name="fullName" placeholder="Jane Doe" required />
</Field>

<Field id="message" label="Message" required hint="Include organization name and timeline.">
  <Textarea id="message" name="message" rows={4} required />
</Field>
```

### 5.7 Global Interactive Modals
Interactive modals exist via React Context in `@/components/context/`:
- `OrderModalContext` (`useOrderModal()`): Opens the Stripe book checkout modal.
- `WaitlistModalContext` (`useWaitlistModal()`): Opens the book waitlist subscription modal.
- `NewsletterModalContext` (`useNewsletterModal()`): Opens the newsletter sign-up modal.

---

## 6. How to Build a New Page: Step-by-Step

Follow this checklist whenever creating a new route:

### Step 1: Create the Route Directory
Create `app/[route-name]/page.tsx`.

### Step 2: Configure SEO & Metadata
Export Next.js `metadata` incorporating `SITE` from `@/lib/site`:
```tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Precise editorial summary of this page (1-2 sentences).",
  alternates: { canonical: "/page-path" },
  openGraph: {
    title: `Page Title | ${SITE.name}`,
    description: "Precise editorial summary.",
    url: "/page-path",
  },
};
```

### Step 3: Scaffold the Page Structure
1. Wrap the entire view in `<main id="main">` (enables skip-to-content accessibility).
2. Begin with either `<PageMasthead>` (preferred) or a custom header with **exactly one `<h1>`**.
3. Structure middle sections using `<Section>` + `<Container>` or self-contained sections with the 5-column grid.
4. Conclude with `<CtaBand>` before closing `</main>`.

### Step 4: Example Page Template
```tsx
import type { Metadata } from "next";
import { PageMasthead } from "@/components/ui/PageMasthead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Advisory & Consulting",
  description: "Institutional governance advisory and legislative strategy services.",
  alternates: { canonical: "/advisory" },
};

export default function AdvisoryPage() {
  return (
    <main id="main">
      <PageMasthead
        eyebrow="Services"
        title="Institutional Advisory & Strategy"
        intro="Advising governments, parliamentary bodies, and civic institutions on policy architecture and public reform."
        stats={[
          { label: "Experience", value: "10+ Yrs" },
          { label: "Focus", value: "Public Reform" },
        ]}
      />

      <Section tone="paper" spacing="default">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Reveal delay={0.08}>
              <div className="border border-slate-200/80 bg-white p-8">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">01</span>
                <h2 className="mt-4 text-xl font-bold text-slate-900">Legislative Drafting</h2>
                <p className="mt-3 text-slate-600 font-light leading-relaxed">
                  Drafting statutory frameworks, legislative amendments, and policy directives.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Initiate Engagement"
        title="Schedule a consultation with Olubunmi."
        body="Discuss policy design, institutional evaluation, or speaking engagements."
        primary={{ label: "Contact Directly", href: "/contact" }}
      />
    </main>
  );
}
```

---

## 7. How to Build a New Component or UI Section

When adding a new UI module:

1. **Hierarchy & Heading Levels:** Never duplicate `<h1>`. Inside sections, use `<h2>` or `<h3>`. Use `<SectionHeading>` to keep title spacing and reveal effects uniform.
2. **Layout Grid:** If creating a full-width section with background styling, consider including the 5-column divider lines to maintain site consistency.
3. **Motion:** Use `<Reveal>` with subtle upward distances (default 26px) and staggered delays (`0.08`, `0.16`). Do not build aggressive spring physics or bouncing animations.
4. **Cards & Containers:**
   - Prefer sharp corners (`rounded-none` or subtle `rounded-sm` / `rounded-md`).
   - Use thin border outlines: `border border-slate-200/80` or `border border-line`.
   - Hover effects should be subtle: slight elevation `hover:scale-[1.01]` or border darkening `hover:border-slate-400`.
5. **Interactive Controls:**
   - Buttons must use uppercase tracking (`tracking-[0.14em]` to `tracking-[0.18em]`).
   - Buttons should use the `<Button>` component whenever possible.
6. **Images:**
   - Always use `next/image` with `sizes` and descriptive `alt` tags.
   - For portrait photos, use `aspect-[4/5]` with `object-cover`.
   - For book covers, use `aspect-[1/1.18]`.

---

## 8. Development & Verification Rules

- **Type Safety:** Always run `npm run typecheck` (`tsc --noEmit`) after modifications. Ensure no TypeScript errors exist.
- **Next.js Production Build:** Test changes with `npm run build` to verify static generation and route validity.
- **Semantic HTML & A11y:**
  - Anchor elements clear the sticky header automatically via `[id] { scroll-margin-top: calc(var(--nav-h) + 1.5rem); }`.
  - Ensure all decorative SVGs have `aria-hidden="true"`.
  - Maintain high contrast: `text-slate-900` or `text-ink` for headings, `text-slate-600` or `text-ink-soft` for body copy.
