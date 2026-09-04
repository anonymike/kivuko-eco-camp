import "./AdminDashboard.css";

const STATUS_CARDS = [
  {
    title: "Bookings",
    items: [
      { label: "New", value: "—" },
      { label: "Pending", value: "—" },
      { label: "Confirmed", value: "—" },
      { label: "Cancelled", value: "—" },
    ],
    note: "No booking engine connected yet.",
  },
  {
    title: "Website",
    items: [
      { label: "Published pages", value: "12" },
      { label: "Draft changes", value: "0" },
    ],
    note: null,
  },
  {
    title: "Content",
    items: [
      { label: "Accommodation", value: "3 units" },
      { label: "Packages", value: "3 packages" },
      { label: "Experiences", value: "6 experiences" },
      { label: "Gallery", value: "11 photos" },
    ],
    note: null,
  },
  {
    title: "System",
    items: [
      { label: "Email delivery", value: "Demo mode" },
      { label: "Booking engine", value: "Not connected" },
      { label: "Payment gateway", value: "Not connected" },
      { label: "Content database", value: "Local (static)" },
    ],
    note: "Connect Supabase to enable live data.",
  },
];

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1>Dashboard</h1>
        <p>Welcome to the Kivuko admin panel. Content and booking data will appear here as integrations are connected.</p>
      </header>

      <div className="admin-dashboard__grid">
        {STATUS_CARDS.map((card) => (
          <section key={card.title} className="admin-status-card">
            <h2>{card.title}</h2>
            <dl>
              {card.items.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            {card.note && <p className="admin-status-card__note">{card.note}</p>}
          </section>
        ))}
      </div>
    </div>
  );
}