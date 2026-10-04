import type { CurrencyCode } from '../types'

/**
 * Formats a whole-unit money amount in the given currency, e.g. 4250000 USD
 * becomes "$4,250,000". Takes the currency explicitly because listings carry
 * their own CurrencyCode; assuming USD would mislabel a CAD or EUR price.
 */
export function formatMoney(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats a date-only ISO string such as "2026-09-28" for display.
 *
 * Uses UTC because date-only strings parse as midnight UTC. Formatting in
 * local time would show the previous day west of UTC, and could differ
 * between the server render and the browser.
 */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(isoDate))
}
