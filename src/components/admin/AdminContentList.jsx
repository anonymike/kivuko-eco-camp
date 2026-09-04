import { useState } from "react";
import { saveAdminOverride, clearAdminOverride } from "../../services/contentService.js";
import "./AdminContentList.css";

/**
 * Generic content list for admin sections (Accommodation, Packages,
 * Experiences). Shows all items in editable form fields. Saves are
 * preview-only (localStorage) until Supabase is connected.
 */
export default function AdminContentList({
  section,
  items,
  editableFields,
  onOverrideSaved,
}) {
  const [edits, setEdits] = useState({});
  const [saved, setSaved] = useState(false);

  function updateItem(slug, field, value) {
    setEdits((prev) => ({
      ...prev,
      [slug]: { ...(prev[slug] || {}), [field]: value },
    }));
    setSaved(false);
  }

  function handleSave() {
    const overrides = Object.entries(edits)
      .filter(([, v]) => Object.keys(v).length > 0)
      .map(([slug, changes]) => ({ slug, ...changes }));
    saveAdminOverride(section, overrides);
    setSaved(true);
    onOverrideSaved?.();
  }

  function handleRevert() {
    clearAdminOverride(section);
    setEdits({});
    setSaved(false);
    onOverrideSaved?.();
  }

  const hasEdits = Object.keys(edits).length > 0;

  return (
    <div className="admin-content-list">
      <div className="admin-content-list__actions">
        <button
          type="button"
          className="btn btn--filled"
          disabled={!hasEdits}
          onClick={handleSave}
        >
          {saved ? "Saved ✓" : "Save changes"}
        </button>
        {hasEdits && (
          <button type="button" className="admin-content-list__revert" onClick={handleRevert}>
            Revert
          </button>
        )}
        <p className="admin-content-list__demo">
          Edits are saved locally for preview. Connect Supabase to persist changes.
        </p>
      </div>

      {items.map((item) => {
        const itemEdits = edits[item.slug] || {};
        return (
          <div key={item.slug} className="admin-content-card">
            <h3>{itemEdits.name ?? item.name ?? item.slug}</h3>
            <dl>
              {editableFields.map((field) => (
                <div key={field.key}>
                  <dt>{field.label}</dt>
                  <dd>
                    {field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        defaultValue={item[field.key] ?? ""}
                        onChange={(e) => updateItem(item.slug, field.key, e.target.value)}
                        placeholder={field.placeholder || ""}
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        defaultValue={item[field.key] ?? ""}
                        onChange={(e) => updateItem(item.slug, field.key, e.target.value)}
                        placeholder={field.placeholder || ""}
                      />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            {itemEdits.name && itemEdits.name !== item.name && (
              <p className="admin-content-card__preview">
                Preview: <strong>{itemEdits.name}</strong>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}