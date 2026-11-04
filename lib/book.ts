export const BOOK_CURRENCY = "cad";

export const BOOK_EDITIONS = ["paperback", "hardcover"] as const;

export type BookEdition = (typeof BOOK_EDITIONS)[number];

export const BOOK_EDITION_PRICES_IN_CENTS: Record<BookEdition, number> = {
  paperback: 50,
  hardcover: 70,
};

export const BOOK_EDITION_LABELS: Record<BookEdition, string> = {
  paperback: "Paperback",
  hardcover: "Hardcover",
};

export function getBookEditionLabel(edition: BookEdition): string {
  return BOOK_EDITION_LABELS[edition];
}

export function isBookEdition(value: unknown): value is BookEdition {
  return value === "paperback" || value === "hardcover";
}
