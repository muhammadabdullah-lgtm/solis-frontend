/**
 * Calculate discount percentage between price and compare_at_price.
 * Returns null if no compare_at_price is provided.
 */
export function calcDiscount(
  price: string | number,
  compareAtPrice: string | number | null,
): number | null {
  if (!compareAtPrice) return null;
  return Math.round((1 - Number(price) / Number(compareAtPrice)) * 100);
}

/**
 * Format a date string for display (e.g. "5 April 2025").
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format a short date string (e.g. "5 Apr 2025").
 */
export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-AE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Pluralise a word based on count (e.g. "1 item", "2 items").
 */
export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
