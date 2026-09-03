import "./StatStrip.css";

export default function StatStrip({ items, tone = "light" }) {
  return (
    <ul className={`stat-strip stat-strip--${tone}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
