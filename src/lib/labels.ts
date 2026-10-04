import type { ListingStatus, PropertyType } from '../types'

/**
 * Investor-facing names for each property type. A full Record, so adding a
 * value to PropertyType fails typecheck here until it gets a label.
 */
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  multifamily: 'Multifamily',
  office: 'Office',
  retail: 'Retail',
  industrial: 'Industrial',
  mixed_use: 'Mixed use',
  land: 'Land',
}

/**
 * Investor-facing names for each listing status. Investors only ever see
 * `published` and `under_offer` (see isOpenDeal), but the Record covers every
 * status so no value can render as a raw code like "under_offer".
 */
export const LISTING_STATUS_LABELS: Record<ListingStatus, string> = {
  draft: 'Draft',
  published: 'Open',
  under_offer: 'Under offer',
  sold: 'Sold',
  archived: 'Archived',
}
