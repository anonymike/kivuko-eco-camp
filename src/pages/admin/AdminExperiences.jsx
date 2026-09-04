import { useState } from "react";
import { getExperiences, contentSections } from "../../services/contentService.js";
import AdminContentList from "../../components/admin/AdminContentList.jsx";

const FIELDS = [
  { key: "name", label: "Experience name" },
  { key: "duration", label: "Duration" },
  { key: "oneLiner", label: "Short description" },
];

export default function AdminExperiences() {
  const [tick, setTick] = useState(0);
  const exps = getExperiences();

  return (
    <div>
      <header style={{ marginBottom: "var(--space-4)" }}>
        <h1 style={{ fontSize: "var(--step-h2)" }}>Experiences</h1>
        <p style={{ marginTop: "0.5em", maxWidth: "42rem" }}>
          Manage the guest experiences displayed on /experiences. Edit details as they are confirmed by the team.
        </p>
      </header>

      <AdminContentList
        section={contentSections.EXPERIENCES}
        items={exps}
        editableFields={FIELDS}
        onOverrideSaved={() => setTick((t) => t + 1)}
      />
    </div>
  );
}