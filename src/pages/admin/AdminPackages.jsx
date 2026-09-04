import { useState } from "react";
import { getPackages, contentSections } from "../../services/contentService.js";
import AdminContentList from "../../components/admin/AdminContentList.jsx";

const FIELDS = [
  { key: "name", label: "Package name" },
  { key: "duration", label: "Duration" },
  { key: "oneLiner", label: "Short description" },
  { key: "priceFrom", label: "From price (USD)", type: "number", placeholder: "e.g. 580" },
  { key: "priceUnit", label: "Price unit", placeholder: "e.g. per person sharing" },
];

export default function AdminPackages() {
  const [tick, setTick] = useState(0);
  const pkgs = getPackages();

  return (
    <div>
      <header style={{ marginBottom: "var(--space-4)" }}>
        <h1 style={{ fontSize: "var(--step-h2)" }}>Packages</h1>
        <p style={{ marginTop: "0.5em", maxWidth: "42rem" }}>
          Manage the stay packages displayed on /packages. Prices shown are brochure from-rates until the booking engine is connected.
        </p>
      </header>

      <AdminContentList
        section={contentSections.PACKAGES}
        items={pkgs}
        editableFields={FIELDS}
        onOverrideSaved={() => setTick((t) => t + 1)}
      />
    </div>
  );
}