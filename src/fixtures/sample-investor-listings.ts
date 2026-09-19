import type { InvestorListing } from '../types'

/**
 * Sample PREIshare investor listings, one per ListingStatus value.
 *
 * Every constant below is a plain object literal annotated `: InvestorListing`
 * with no `as` assertions, so `npm run typecheck` is a real proof that the
 * shapes match the types, not a silenced error.
 */

/** Draft listing: still being prepared, so financial metrics are not filled in yet. */
export const sampleDraftListing: InvestorListing = {
  id: 'lst_draft_2041',
  title: 'Oak Street Retail Pad (Draft)',
  summary:
    'Early-stage draft for a single-tenant retail pad near the Oak Street corridor. Pricing and returns still being underwritten.',
  status: 'draft',
  propertyType: 'retail',
  address: {
    street: '88 Oak St',
    city: 'Dallas',
    region: 'TX',
    postalCode: '75201',
    country: 'US',
  },
  createdAt: '2026-08-14T09:12:00Z',
  updatedAt: '2026-09-02T16:45:00Z',
  contacts: [
    {
      id: 'ct_5501',
      fullName: 'Priya Raman',
      role: 'owner_rep',
      email: 'priya.raman@example.com',
    },
  ],
  primaryContactId: 'ct_5501',
  ownership: [
    {
      contactId: 'ct_5501',
      relationship: 'primary_owner',
      sharePercent: 100,
    },
  ],
}

/** Published listing: live to investors, with full financials and two contacts. */
export const samplePublishedListing: InvestorListing = {
  id: 'lst_pub_1001',
  title: 'Riverfront Multifamily, 24 Units',
  summary:
    'Value-add 24-unit multifamily asset two blocks from the river trail, with in-place rents roughly 12% below submarket comps.',
  status: 'published',
  propertyType: 'multifamily',
  address: {
    street: '1200 River Rd',
    unit: 'Suite 100',
    city: 'Austin',
    region: 'TX',
    postalCode: '78701',
    country: 'US',
  },
  financialSummary: {
    askingPrice: 4250000,
    currency: 'USD',
    projectedIrrPercent: 14.2,
    capRatePercent: 7.3,
  },
  createdAt: '2026-06-03T14:00:00Z',
  updatedAt: '2026-09-10T11:30:00Z',
  contacts: [
    {
      id: 'ct_1101',
      fullName: 'Jordan Lee',
      role: 'broker',
      email: 'jordan.lee@example.com',
      phone: '+1-512-555-0142',
    },
    {
      id: 'ct_1102',
      fullName: 'Riverfront Holdings LLC',
      role: 'owner_rep',
      email: 'ir@riverfrontholdings.example.com',
    },
  ],
  primaryContactId: 'ct_1101',
  ownership: [
    {
      contactId: 'ct_1102',
      relationship: 'primary_owner',
      sharePercent: 100,
    },
    {
      contactId: 'ct_1101',
      relationship: 'broker',
    },
  ],
}

/** Under-offer listing: active interest, co-owned 60/40. */
export const sampleUnderOfferListing: InvestorListing = {
  id: 'lst_uo_1003',
  title: 'Cedar Industrial Park, Building C',
  summary:
    'Single-tenant industrial building with 18 months remaining on a corporate lease. Currently under offer pending buyer diligence.',
  status: 'under_offer',
  propertyType: 'industrial',
  address: {
    street: '4500 Cedar Blvd',
    city: 'Houston',
    region: 'TX',
    postalCode: '77002',
    country: 'US',
  },
  financialSummary: {
    askingPrice: 6100000,
    currency: 'USD',
    capRatePercent: 7.5,
  },
  createdAt: '2026-05-21T08:05:00Z',
  updatedAt: '2026-09-15T13:20:00Z',
  contacts: [
    {
      id: 'ct_2201',
      fullName: 'Sam Rivera',
      role: 'broker',
      email: 'sam.rivera@example.com',
      phone: '+1-713-555-0188',
    },
    {
      id: 'ct_2202',
      fullName: 'Cedar JV Partners',
      role: 'owner_rep',
      email: 'partners@cedarjv.example.com',
    },
  ],
  primaryContactId: 'ct_2201',
  ownership: [
    {
      contactId: 'ct_2202',
      relationship: 'primary_owner',
      sharePercent: 60,
    },
    {
      contactId: 'ct_2201',
      relationship: 'co_owner',
      sharePercent: 40,
    },
  ],
}

/** Sold listing: the only status branch that requires `closedAt`. */
export const sampleSoldListing: InvestorListing = {
  id: 'lst_sold_1004',
  title: 'Summit Office Plaza',
  summary:
    'Four-story suburban office asset sold to a regional private buyer. Retained as a historical comparable.',
  status: 'sold',
  closedAt: '2026-08-29T17:00:00Z',
  propertyType: 'office',
  address: {
    street: '1 Summit Plaza',
    city: 'San Antonio',
    region: 'TX',
    postalCode: '78205',
    country: 'US',
  },
  financialSummary: {
    askingPrice: 2750000,
    currency: 'USD',
    capRatePercent: 7.2,
  },
  createdAt: '2026-02-11T10:15:00Z',
  updatedAt: '2026-08-29T17:05:00Z',
  contacts: [
    {
      id: 'ct_3301',
      fullName: 'Alex Chen',
      role: 'broker',
      email: 'alex.chen@example.com',
    },
    {
      id: 'ct_3302',
      fullName: 'Summit Investor Relations',
      role: 'investor_relations',
      email: 'ir@summitplaza.example.com',
    },
  ],
  primaryContactId: 'ct_3301',
  ownership: [
    {
      contactId: 'ct_3302',
      relationship: 'primary_owner',
      sharePercent: 100,
    },
  ],
}

/** Archived listing: pulled from active browse but retained, managed by a third party. */
export const sampleArchivedListing: InvestorListing = {
  id: 'lst_arch_1005',
  title: 'Lakeside Mixed-Use Parcel',
  summary:
    'Mixed-use development parcel withdrawn from market pending a rezoning decision. Retained for future re-listing.',
  status: 'archived',
  propertyType: 'mixed_use',
  address: {
    street: '77 Lakeside Dr',
    unit: 'Building B',
    city: 'Fort Worth',
    region: 'TX',
    postalCode: '76102',
    country: 'US',
  },
  financialSummary: {
    askingPrice: 1850000,
    currency: 'USD',
  },
  createdAt: '2025-11-07T12:00:00Z',
  updatedAt: '2026-07-19T09:40:00Z',
  contacts: [
    {
      id: 'ct_4401',
      fullName: 'Dana Whitfield',
      role: 'asset_manager',
      email: 'dana.whitfield@example.com',
      phone: '+1-817-555-0110',
    },
  ],
  primaryContactId: 'ct_4401',
  ownership: [
    {
      contactId: 'ct_4401',
      relationship: 'property_manager',
    },
  ],
}

/** All valid samples, useful for later UI mocks and typecheck scripts. */
export const sampleInvestorListings: InvestorListing[] = [
  sampleDraftListing,
  samplePublishedListing,
  sampleUnderOfferListing,
  sampleSoldListing,
  sampleArchivedListing,
]
