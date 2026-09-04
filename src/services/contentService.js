/**
 * Content service — a facade that decouples the frontend from the data
 * source. Today it re-exports static JS modules. When Supabase (or any
 * CMS) is connected, this file is the ONLY place that changes.
 *
 * The admin panel reads and writes through this service. The marketing
 * frontend reads through this service. Neither needs to know whether the
 * data comes from local files or a remote database.
 *
 * For now, admin "edits" are previewed in localStorage and clearly
 * labelled as demo-only.
 */
import { stayUnits, amenities } from "../data/stay.js";
import { packages } from "../data/packages.js";
import { experiences } from "../data/experiences.js";
import { galleryImages, galleryCategories } from "../data/gallery.js";
import { contact, brand, footerLinks } from "../data/siteConfig.js";
import { reservationTerms, enquirySubjects } from "../data/reservationTerms.js";

/**
 * Read content by section. Returns a plain object that the admin can
 * display in editable forms and the frontend renders directly.
 *
 * `localStorage` overrides: admin pages save drafts to localStorage
 * under `kivuko_admin_<section>` keys. This function merges them on
 * read so the admin can preview edits without a backend.
 */
function loadOverride(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function mergeArray(base, override, keyField = "slug") {
  if (!override) return base;
  const map = new Map(base.map((item) => [item[keyField], item]));
  for (const item of override) {
    if (item[keyField]) map.set(item[keyField], { ...map.get(item[keyField]), ...item });
  }
  return Array.from(map.values());
}

function mergeObject(base, override) {
  if (!override) return base;
  return { ...base, ...override };
}

export const contentSections = {
  STAYS: "stays",
  PACKAGES: "packages",
  EXPERIENCES: "experiences",
  GALLERY: "gallery",
  CONTACT: "contact",
  BRAND: "brand",
  HOMEPAGE: "homepage",
  DINING: "dining",
  CONSERVATION: "conservation",
};

export function getStays() {
  return mergeArray(stayUnits, loadOverride("kivuko_admin_stays"));
}

export function getAmenities() {
  return amenities;
}

export function getPackages() {
  return mergeArray(packages, loadOverride("kivuko_admin_packages"));
}

export function getExperiences() {
  return mergeArray(experiences, loadOverride("kivuko_admin_experiences"));
}

export function getGallery() {
  const overrides = loadOverride("kivuko_admin_gallery");
  if (!overrides) return galleryImages;
  return mergeArray(galleryImages, overrides, "alt");
}

export function getGalleryCategories() {
  return galleryCategories;
}

export function getContact() {
  return mergeObject(contact, loadOverride("kivuko_admin_contact"));
}

export function getBrand() {
  return mergeObject(brand, loadOverride("kivuko_admin_brand"));
}

export function getReservationTerms() {
  return mergeObject(reservationTerms, loadOverride("kivuko_admin_terms"));
}

/**
 * Save an admin override. This writes to localStorage and returns the
 * merged result. When Supabase is connected, this becomes a write to
 * the database and invalidates any cache.
 */
export function saveAdminOverride(section, data) {
  const key = `kivuko_admin_${section}`;
  localStorage.setItem(key, JSON.stringify(data));
}

/** Clear a single section's overrides (revert to static data). */
export function clearAdminOverride(section) {
  localStorage.removeItem(`kivuko_admin_${section}`);
}

/** Clear all admin overrides at once. */
export function clearAllOverrides() {
  Object.values(contentSections).forEach(clearAdminOverride);
}
