import "./Eyebrow.css";

export default function Eyebrow({ children, tone = "dark", as: Tag = "p" }) {
  return <Tag className={`eyebrow eyebrow--${tone}`}>{children}</Tag>;
}
