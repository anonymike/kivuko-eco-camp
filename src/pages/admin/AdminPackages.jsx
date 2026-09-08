import { useState } from "react";
import { getPackages, contentSections } from "../../services/contentService.js";
import AdminContentList from "../../components/admin/AdminContentList.jsx";

const FIELDS = [
  { key: "name", label: "Package name" },
  { key: "duration", label: "Duration" },
  { key: "oneLiner", label: "Short description" },
];

export default function AdminPackages() {
  const [tick, setTick] = useState(0);
  const pkgs = getPackages();

  return (
    <div>
      <header style={{ marginBottom: "var(--space-4)" }}>
        <h1 style={{ fontSize: "var(--step-h2)" }}>Packages</h1>
        <p style={{ marginTop: "0.5em", maxWidth: "42rem" }}>
          Manage the stay packages displayed on /packages.
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
