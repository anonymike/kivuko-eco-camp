/**
 * Bookings management — currently an empty state. When a booking
 * engine / PMS is connected, this page will list real reservations
 * with status, dates, guest info, and payment state.
 */
export default function AdminBookings() {
  return (
    <div>
      <header style={{ marginBottom: "var(--space-4)" }}>
        <h1 style={{ fontSize: "var(--step-h2)" }}>Bookings</h1>
        <p style={{ marginTop: "0.5em", maxWidth: "42rem" }}>
          Booking and reservation management. This section will populate once a booking engine and email delivery are connected.
        </p>
      </header>

      <div style={{ background: "var(--color-cream)", border: "1px solid var(--color-line)", padding: "var(--space-5)", textAlign: "center" }}>
        <p style={{ fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-ink-soft)", fontWeight: 600 }}>
          No bookings yet
        </p>
        <p style={{ marginTop: "var(--space-2)", fontSize: "0.9rem", color: "var(--color-ink-soft)", maxWidth: "32rem", marginInline: "auto" }}>
          Connect a booking engine (PMS / channel manager) to start receiving reservations.
          Enquiries submitted through the website contact form will appear here as well.
        </p>
      </div>

      <div style={{ marginTop: "var(--space-4)", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "var(--space-3)" }}>
        {["New", "Pending", "Confirmed", "Cancelled"].map((status) => (
          <div key={status} style={{ background: "var(--color-cream)", border: "1px solid var(--color-line)", padding: "var(--space-3)" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ink-soft)", fontWeight: 600 }}>
              {status}
            </p>
            <p style={{ fontSize: "1.5rem", color: "var(--color-forest)", marginTop: "0.3em" }}>0</p>
          </div>
        ))}
      </div>
    </div>
  );
}