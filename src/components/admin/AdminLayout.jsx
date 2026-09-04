import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin.js";
import "./AdminLayout.css";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/accommodation", label: "Accommodation" },
  { to: "/admin/packages", label: "Packages" },
  { to: "/admin/experiences", label: "Experiences" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/bookings", label: "Bookings" },
  { to: "/admin/settings", label: "Settings" },
];

/**
 * Admin layout — wraps all /admin routes. Renders a sidebar navigation
 * (desktop) / slide-out drawer (mobile) and a main content area.
 *
 * The marketing Header and Footer are hidden on admin routes via the
 * conditional render in App.jsx.
 */
export default function AdminLayout() {
  const { isAuthenticated, signOut } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the mobile drawer on route change.
  useEffect(() => {
    setSidebarOpen(false);
  }, [typeof window !== "undefined" && window.location.pathname]);

  if (!isAuthenticated) {
    return (
      <div className="admin-auth-wall">
        <div className="admin-auth-wall__inner">
          <p className="eyebrow eyebrow--dark">Admin Access</p>
          <h1>Authentication pending</h1>
          <p>The admin panel requires authentication that has not been connected yet.</p>
          <p className="admin-auth-wall__note">
            When Supabase Auth or another provider is configured, this page will show a sign-in form.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Mobile toggle */}
      <button
        type="button"
        className="admin-layout__toggle"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-expanded={sidebarOpen}
        aria-controls="admin-sidebar"
        aria-label={sidebarOpen ? "Close admin menu" : "Open admin menu"}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="admin-layout__overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      <aside
        id="admin-sidebar"
        className={`admin-layout__sidebar ${sidebarOpen ? "admin-layout__sidebar--open" : ""}`}
      >
        <div className="admin-layout__brand">
          <NavLink to="/admin" className="admin-layout__logo">
            KIVUKO
          </NavLink>
          <span className="admin-layout__brand-label">Admin</span>
        </div>

        <nav className="admin-layout__nav" aria-label="Admin navigation">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? "is-active" : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-layout__footer">
          <NavLink to="/" className="admin-layout__site-link">
            ← View website
          </NavLink>
          <button type="button" className="admin-layout__signout" onClick={signOut}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="admin-layout__main">
        <Outlet />
      </main>
    </div>
  );
}