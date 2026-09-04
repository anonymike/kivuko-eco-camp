import { useState } from "react";
import { getStays, getAmenities, contentSections } from "../../services/contentService.js";
import AdminContentList from "../../components/admin/AdminContentList.jsx";

const FIELDS = [
  { key: "name", label: "Name" },
  { key: "view", label: "View / Tagline" },
  { key: "description", label: "Short description" },
  { key: "capacity", label: "Occupancy" },
  { key: "priceFrom", label: "From rate (USD/night)", type: "number", placeholder: "e.g. 320" },
];

export default function AdminAccommodation() {
  const [tick, setTick] = useState(0);
  const stays = getStays();
  const amenities = getAmenities();

  return (
    <div>
      <header style={{ marginBottom: "var(--space-4)" }}>
        <h1 style={{ fontSize: "var(--step-h2)" }}>Accommodation</h1>
        <p style={{ marginTop: "0.5em", maxWidth: "42rem" }}>
          Manage the stay units displayed on the /stay page. Edits are preview-only until a content database is connected.
        </p>
      </header>

      <AdminContentList
        section={contentSections.STAYS}
        items={stays}
        editableFields={FIELDS}
        onOverrideSaved={() => setTick((t) => t + 1)}
      />

      <section style={{ marginTop: "var(--space-5)" }}>
        <h2 style={{ fontSize: "var(--step-h3)" }}>Amenities (shared)</h2>
        <p style={{ marginTop: "0.4em", fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
          The same amenity list applies to every unit. Edit the source file to update all stays at once.
        </p>
        <ul style={{ marginTop: "var(--space-2)", paddingLeft: "1.2em", color: "var(--color-forest)" }}>
          {amenities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}