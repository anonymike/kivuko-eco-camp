import { Link } from "react-router-dom";
import "./Button.css";

/**
 * variant: "filled" | "outline"
 * Renders a <Link> when `to` is provided, else a <button> (or <a> for
 * external `href`). Placeholder actions (no backend yet) should still
 * pass an onClick that is clearly a no-op / console note — see Contact
 * and StayDetail pages.
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "filled",
  type = "button",
  tone = "light",
  ...rest
}) {
  const className = `btn btn--${variant} btn--on-${tone}`;

  if (to) {
    return (
      <Link className={className} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={className} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
