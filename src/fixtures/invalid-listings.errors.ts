/**
 * INTENTIONAL TYPE ERRORS - this file is supposed to FAIL typechecking.
 *
 * Each export below breaks exactly one rule already encoded in the model,
 * with every other field valid, so the error that appears is the one the
 * case is named after and not incidental noise.
 *
 * Rules for this file:
 * - No `any`, no `unknown` escapes, no `as` assertions, no @ts-ignore.
 *   Silencing an error here would defeat the entire point.
 * - Do NOT "fix" these. They are the proof that the types work.
 *
 * Documented in: docs/type-safety/expected-type-errors.md
 * Happy-path counterpart: src/fixtures/sample-investor-listings.ts
 */

import type { InvestorListing } from '../types'

/** CASE 1: status typo. Filters and badges would silently miss this listing. */
export const invalidStatusSpelling: InvestorListing = {
  id: 'lst_bad_status',
  title: 'Downtown Duplex Offering',
  summary: 'Two-unit duplex near the transit corridor.',
  status: 'availble',
  propertyType: 'multifamily',
  address: {
    street: '100 Main St',
    city: 'Austin',
    region: 'TX',
    postalCode: '78701',
    country: 'US',
  },
  createdAt: '2026-01-05T10:00:00Z',
  updatedAt: '2026-01-06T10:00:00Z',
  contacts: [
    {
      id: 'ct_9001',
      fullName: 'Alex Rivera',
      role: 'broker',
      email: 'alex.rivera@example.com',
    },
  ],
  primaryContactId: 'ct_9001',
  ownership: [{ contactId: 'ct_9001', relationship: 'primary_owner' }],
}

/** CASE 2: required nested address field missing. Property cannot be located or mapped. */
export const missingAddressCity: InvestorListing = {
  id: 'lst_missing_city',
  title: 'Lakeview Fourplex',
  summary: 'Four-unit building with lake frontage.',
  status: 'draft',
  propertyType: 'multifamily',
  address: {
    street: '22 Lake Rd',
    region: 'TX',
    postalCode: '78702',
    country: 'US',
  },
  createdAt: '2026-02-01T10:00:00Z',
  updatedAt: '2026-02-02T10:00:00Z',
  contacts: [
    {
      id: 'ct_9002',
      fullName: 'Sam Lee',
      role: 'owner_rep',
      email: 'sam.lee@example.com',
    },
  ],
  primaryContactId: 'ct_9002',
  ownership: [{ contactId: 'ct_9002', relationship: 'primary_owner' }],
}

/** CASE 3: money as text. Sorting and arithmetic would silently misbehave. */
export const priceAsString: InvestorListing = {
  id: 'lst_price_string',
  title: 'Cedar Street Portfolio Slice',
  summary: 'Partial interest in a stabilized retail strip.',
  status: 'published',
  propertyType: 'retail',
  address: {
    street: '9 Cedar St',
    city: 'Dallas',
    region: 'TX',
    postalCode: '75201',
    country: 'US',
  },
  financialSummary: {
    askingPrice: '610000',
    currency: 'USD',
  },
  createdAt: '2026-03-01T10:00:00Z',
  updatedAt: '2026-03-02T10:00:00Z',
  contacts: [
    {
      id: 'ct_9003',
      fullName: 'Jordan Kim',
      role: 'broker',
      email: 'jordan.kim@example.com',
    },
  ],
  primaryContactId: 'ct_9003',
  ownership: [{ contactId: 'ct_9003', relationship: 'primary_owner' }],
}

/** CASE 4: contact role outside the closed vocabulary. Role-based filtering breaks. */
export const invalidContactRole: InvestorListing = {
  id: 'lst_bad_role',
  title: 'Mesa Industrial Shell',
  summary: 'Vacant industrial shell available for build-to-suit.',
  status: 'published',
  propertyType: 'industrial',
  address: {
    street: '400 Mesa Way',
    city: 'El Paso',
    region: 'TX',
    postalCode: '79901',
    country: 'US',
  },
  createdAt: '2026-04-01T10:00:00Z',
  updatedAt: '2026-04-02T10:00:00Z',
  contacts: [
    {
      id: 'ct_9004',
      fullName: 'Casey Moore',
      role: 'primary',
      email: 'casey.moore@example.com',
    },
  ],
  primaryContactId: 'ct_9004',
  ownership: [{ contactId: 'ct_9004', relationship: 'primary_owner' }],
}

/** CASE 5: sold listing with no close date. Historical records lose their close date. */
export const soldWithoutClosedAt: InvestorListing = {
  id: 'lst_sold_no_date',
  title: 'Brookside Office Sale',
  summary: 'Closed sale of a suburban office asset.',
  status: 'sold',
  propertyType: 'office',
  address: {
    street: '12 Brookside Ave',
    city: 'Plano',
    region: 'TX',
    postalCode: '75024',
    country: 'US',
  },
  createdAt: '2026-05-01T10:00:00Z',
  updatedAt: '2026-05-20T10:00:00Z',
  contacts: [
    {
      id: 'ct_9005',
      fullName: 'Robin Vale',
      role: 'broker',
      email: 'robin.vale@example.com',
    },
  ],
  primaryContactId: 'ct_9005',
  ownership: [{ contactId: 'ct_9005', relationship: 'primary_owner' }],
}

/** CASE 6: close date on a listing that has not closed. Reports would count it as a closed deal. */
export const closedAtOnDraftListing: InvestorListing = {
  id: 'lst_draft_with_close',
  title: 'Harbor Land Parcel',
  summary: 'Raw land parcel still being underwritten.',
  status: 'draft',
  closedAt: '2026-06-15T10:00:00Z',
  propertyType: 'land',
  address: {
    street: '1 Harbor Rd',
    city: 'Corpus Christi',
    region: 'TX',
    postalCode: '78401',
    country: 'US',
  },
  createdAt: '2026-06-01T10:00:00Z',
  updatedAt: '2026-06-10T10:00:00Z',
  contacts: [
    {
      id: 'ct_9006',
      fullName: 'Tam Nguyen',
      role: 'asset_manager',
      email: 'tam.nguyen@example.com',
    },
  ],
  primaryContactId: 'ct_9006',
  ownership: [{ contactId: 'ct_9006', relationship: 'primary_owner' }],
}

/** CASE 7: ownership as one object instead of a list. Co-owners become unrepresentable. */
export const ownershipAsSingleObject: InvestorListing = {
  id: 'lst_ownership_object',
  title: 'Alamo Mixed-Use Block',
  summary: 'Mixed-use block with ground-floor retail.',
  status: 'published',
  propertyType: 'mixed_use',
  address: {
    street: '55 Alamo St',
    city: 'San Antonio',
    region: 'TX',
    postalCode: '78205',
    country: 'US',
  },
  createdAt: '2026-07-01T10:00:00Z',
  updatedAt: '2026-07-02T10:00:00Z',
  contacts: [
    {
      id: 'ct_9007',
      fullName: 'Morgan Diaz',
      role: 'owner_rep',
      email: 'morgan.diaz@example.com',
    },
  ],
  primaryContactId: 'ct_9007',
  ownership: { contactId: 'ct_9007', relationship: 'primary_owner' },
}

/** CASE 9: currency outside the supported set. Price would render with an unknown symbol. */
export const unsupportedCurrency: InvestorListing = {
  id: 'lst_bad_currency',
  title: 'Gulfport Warehouse',
  summary: 'Distribution warehouse near the port.',
  status: 'published',
  propertyType: 'industrial',
  address: {
    street: '700 Port Rd',
    city: 'Galveston',
    region: 'TX',
    postalCode: '77550',
    country: 'US',
  },
  financialSummary: {
    askingPrice: 2100000,
    currency: 'XYZ',
  },
  createdAt: '2026-08-01T10:00:00Z',
  updatedAt: '2026-08-02T10:00:00Z',
  contacts: [
    {
      id: 'ct_9009',
      fullName: 'Lena Ortiz',
      role: 'broker',
      email: 'lena.ortiz@example.com',
    },
  ],
  primaryContactId: 'ct_9009',
  ownership: [{ contactId: 'ct_9009', relationship: 'primary_owner' }],
}

/** CASE 8: reassigning an identifier after creation. Breaks every reference to this listing. */
export function reassignReadonlyId(listing: InvestorListing): void {
  listing.id = 'lst_reassigned_9999'
}
