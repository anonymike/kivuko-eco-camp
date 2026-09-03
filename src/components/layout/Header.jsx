import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useScrollHeader from "../../hooks/useScrollHeader.js";
import { nav, brand } from "../../data/siteConfig.js";
import Button from "../ui/Button.jsx";
import "./Header.css";

export default function Header() {
  const scrolled = useScrollHeader(60);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  // Interior pages don't have a full-bleed hero directly under the header,
  // so their header is solid from the start (conservative reading of the
  // screenshots, which show the interior-page header already dark at load).
  const solid = scrolled || !isHome || menuOpen;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header className={`site-header ${solid ? "site-header--solid" : "site-header--transparent"}`}>
      <div className="container site-header__row">
        <NavLink to="/" className="site-header__logo" aria-label={`${brand.fullName} — Home`}>
          {brand.name}
        </NavLink>

        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => (isActive ? "is-active" : undefined)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__cta">
          <Button to="/book" variant="outline" tone="light">
            Book Your Escape
          </Button>
        </div>

        <button
          className="site-header__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-nav" className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>
        <ul>
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button to="/book" variant="filled" onClick={() => setMenuOpen(false)}>
          Book Your Escape
        </Button>
      </div>
    </header>
  );
}
