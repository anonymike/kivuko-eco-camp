import { Link } from "react-router-dom";
import { brand, contact, footerLinks } from "../../data/siteConfig.js";
import "./Footer.css";

/**
 * No footer screenshot was supplied — this is a first implementation
 * built from the doc's §2 content spec, using the same tokens/type/
 * spacing as everywhere else. Keep this component's structure (three
 * columns + brand blurb + bottom bar) intact so it's easy to line up
 * against a reference screenshot later.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label={`${brand.fullName} — Home`}>
            <img src="/kivuko-logo.png" alt={`${brand.fullName} logo`} />
          </Link>
          <p className="site-footer__blurb">{brand.blurb}</p>
        </div>

        <nav className="site-footer__col" aria-label="Explore">
          <h3>Explore</h3>
          <ul>
            {footerLinks.explore.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__col" aria-label="Discover">
          <h3>Discover</h3>
          <ul>
            {footerLinks.discover.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
            </li>
            <li>
              <a href={`mailto:${contact.reservationsEmail}`}>{contact.reservationsEmail}</a>
            </li>
            <li>
              <a
                href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                  contact.whatsappMessage
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-row">
          <p>{contact.address}</p>
          <p>
            © {brand.copyrightYear} {brand.fullName}
          </p>
          <ul>
            {footerLinks.bottomBar.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
