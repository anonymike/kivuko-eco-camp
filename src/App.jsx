import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import WhatsAppBubble from "./components/layout/WhatsAppBubble.jsx";

import Home from "./pages/Home.jsx";
import Stay from "./pages/Stay.jsx";
import StayDetail from "./pages/StayDetail.jsx";
import Experiences from "./pages/Experiences.jsx";
import ExperienceDetail from "./pages/ExperienceDetail.jsx";
import Dining from "./pages/Dining.jsx";
import Packages from "./pages/Packages.jsx";
import Conservation from "./pages/Conservation.jsx";
import About from "./pages/About.jsx";
import Location from "./pages/Location.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Booking from "./pages/Booking.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminAccommodation from "./pages/admin/AdminAccommodation.jsx";
import AdminPackages from "./pages/admin/AdminPackages.jsx";
import AdminExperiences from "./pages/admin/AdminExperiences.jsx";
import AdminGallery from "./pages/admin/AdminGallery.jsx";
import AdminBookings from "./pages/admin/AdminBookings.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Chapter transition between major public pages: the new route simply
 * settles in (a short fade + quiet rise) — no loading screen, no delay
 * to navigation. Skipped on the first load (LCP stays untouched), on
 * the booking flow (it must stay fast and focused) and in admin.
 */
function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [navKey, setNavKey] = useState(0);
  const firstPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== firstPath.current) setNavKey((k) => k + 1);
  }, [pathname]);

  const animate =
    navKey > 0 && !pathname.startsWith("/book") && !pathname.startsWith("/admin");

  return (
    <div key={animate ? `page-${navKey}` : "static"} className={animate ? "page-transition" : undefined}>
      {children}
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="site">
      <ScrollToTop />
      {!isAdmin && <Header />}
      <main id="main">
        <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stay" element={<Stay />} />
          <Route path="/stay/:slug" element={<StayDetail />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experiences/:slug" element={<ExperienceDetail />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/conservation" element={<Conservation />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/book/results" element={<Booking />} />
          <Route path="/book/review" element={<Booking />} />
          <Route path="/book/details" element={<Booking />} />
          <Route path="/book/confirmed" element={<Booking />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="accommodation" element={<AdminAccommodation />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="experiences" element={<AdminExperiences />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        </PageTransition>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppBubble />}
    </div>
  );
}
