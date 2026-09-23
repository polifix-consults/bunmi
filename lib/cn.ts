/**
 * Tiny className joiner. Keeps components dependency-free — no clsx needed
 * for the conditional-string cases this design system uses.
 */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
