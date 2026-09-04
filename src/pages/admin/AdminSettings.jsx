import { useState } from "react";
import { getContact, getBrand, saveAdminOverride } from "../../services/contentService.js";

/**
 * Site settings — contact information and brand configuration.
 * Currently reads from static data and saves to localStorage for
 * preview. When Supabase is connected, writes will persist.
 */
export default function AdminSettings() {
  const contact = getContact();
  const brand = getBrand();

  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.reservationsEmail);
  const [address, setAddress] = useState(contact.address);
  const [hours, setHours] = useState(contact.receptionHours);
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    saveAdminOverride("contact", {
      phone,
      reservationsEmail: email,
      address,
      receptionHours: hours,
    });
    setSaved(true);
  }

  return (
    <div>
      <header style={{ marginBottom: "var(--space-4)" }}>
        <h1 style={{ fontSize: "var(--step-h2)" }}>Settings</h1>
        <p style={{ marginTop: "0.5em", maxWidth: "42rem" }}>
          Contact information and site configuration. These values are used across the marketing website.
        </p>
      </header>

      <form
        onSubmit={handleSave}
        style={{
          background: "var(--color-cream)",
          border: "1px solid var(--color-line)",
          padding: "var(--space-4)",
          maxWidth: "42rem",
        }}
      >
        <h2 style={{ fontSize: "var(--step-h3)", marginBottom: "var(--space-3)" }}>Contact Information</h2>

        <label style={{ display: "block", marginBottom: "var(--space-3)" }}>
          <span style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-forest)", marginBottom: "0.4em" }}>
            Camp name
          </span>
          <input type="text" value={brand.fullName} disabled style={{ width: "100%", padding: "0.6em 0.8em", border: "1px solid var(--color-line)", borderRadius: "var(--radius-sm)", background: "var(--color-sand)", color: "var(--color-ink-soft)" }} />
        </label>

        <label style={{ display: "block", marginBottom: "var(--space-3)" }}>
          <span style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-forest)", marginBottom: "0.4em" }}>
            Phone
          </span>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "0.6em 0.8em", border: "1px solid var(--color-line)", borderRadius: "var(--radius-sm)" }} />
        </label>

        <label style={{ display: "block", marginBottom: "var(--space-3)" }}>
          <span style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-forest)", marginBottom: "0.4em" }}>
            Reservations email
          </span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "0.6em 0.8em", border: "1px solid var(--color-line)", borderRadius: "var(--radius-sm)" }} />
        </label>

        <label style={{ display: "block", marginBottom: "var(--space-3)" }}>
          <span style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-forest)", marginBottom: "0.4em" }}>
            Address
          </span>
          <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "0.6em 0.8em", border: "1px solid var(--color-line)", borderRadius: "var(--radius-sm)", resize: "vertical" }} />
        </label>

        <label style={{ display: "block", marginBottom: "var(--space-3)" }}>
          <span style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-forest)", marginBottom: "0.4em" }}>
            Reception hours
          </span>
          <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} style={{ width: "100%", padding: "0.6em 0.8em", border: "1px solid var(--color-line)", borderRadius: "var(--radius-sm)" }} />
        </label>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <button type="submit" className="btn btn--filled">
            {saved ? "Saved ✓" : "Save changes"}
          </button>
          <p style={{ fontSize: "0.75rem", color: "var(--color-ink-soft)" }}>
            Preview only — connect Supabase to persist.
          </p>
        </div>
      </form>
    </div>
  );
}