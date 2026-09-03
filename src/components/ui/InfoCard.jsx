import "./InfoCard.css";

export default function InfoCard({ title, children }) {
  return (
    <div className="info-card">
      <span className="info-card__rule" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
