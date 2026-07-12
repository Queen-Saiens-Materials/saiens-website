// Site-wide constants shared across pages and components.
// Single source of truth — update here, not at each call site.
//
// Data lives in content/settings/site.json (editable via Tina CMS);
// this module re-exports the same named constants/types the rest of
// the codebase already imports, so no call site needs to change.

import siteData from "@/content/settings/site.json";

export const LINE_URL = siteData.lineUrl;

export const SOCIAL_LINKS = siteData.socialLinks;

export interface ShowroomImage {
  src: string;
  alt: string;
}

const SHOWROOM_IMAGES: Record<"TAIPEI" | "TAICHUNG" | "KAOHSIUNG", ShowroomImage> =
  siteData.showroomImages;

export interface Showroom {
  city: string;
  label: string;
  mapUrl: string;
  address: string;
  telHref: string;
  telLabel: string;
  hours: string[];
  image: ShowroomImage;
}

// TW/EN showroom info, used on /visit-us.
export const SHOWROOMS: Showroom[] = siteData.showrooms.map((showroom) => ({
  city: showroom.city,
  label: showroom.label,
  mapUrl: showroom.mapUrl,
  address: showroom.address,
  telHref: showroom.telHref,
  telLabel: showroom.telLabel,
  hours: showroom.hours,
  image: SHOWROOM_IMAGES[showroom.imageKey as keyof typeof SHOWROOM_IMAGES],
}));

export interface ShowroomJa {
  city: string;
  label: string;
  mapUrl: string;
  address: string;
  details: string[];
  image: ShowroomImage;
}

// JP-localized showroom info, used on /visit-us-jp. Kept separate from
// SHOWROOMS because the JP copy uses different phrasing/formatting
// (e.g. phone numbers are plain text, not a `tel:` link) rather than a
// literal translation of the same fields.
export const SHOWROOMS_JA: ShowroomJa[] = siteData.showroomsJa.map((showroom) => ({
  city: showroom.city,
  label: showroom.label,
  mapUrl: showroom.mapUrl,
  address: showroom.address,
  details: showroom.details,
  image: SHOWROOM_IMAGES[showroom.imageKey as keyof typeof SHOWROOM_IMAGES],
}));

// Contact info for the invite-only Saiens Salon event, kept distinct from
// SHOWROOMS[0] because the address/phone text there differs in wording
// and spacing from the Taipei showroom entry above.
export const SAIENS_SALON = siteData.saiensSalon;
