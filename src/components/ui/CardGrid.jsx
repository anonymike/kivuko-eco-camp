import "./CardGrid.css";

export default function CardGrid({ children, columns = 3 }) {
  return <div className={`card-grid card-grid--${columns}`}>{children}</div>;
}
