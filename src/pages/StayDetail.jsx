import { useParams, Link, Navigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { stayUnits, amenities } from "../data/stay.js";
import "./DetailPage.css";

export default function StayDetail() {
  const { slug } = useParams();
  const unit = stayUnits.find((item) => item.slug === slug);

  if (!unit) return <Navigate to="/stay" replace />;

  return (
    <PageLayout>
      <section className="detail-hero">
        <div className="detail-hero__media">
          <img src={unit.image} alt={unit.name} />
        </div>
      </section>

      <section className="section--tight">
        <div className="container detail-body">
          <Reveal as="div" className="detail-body__main">
            <Eyebrow>{unit.view}</Eyebrow>
            <h1>{unit.name}</h1>
            <p className="detail-body__desc">{unit.description}</p>

            <div className="detail-gallery">
              {unit.gallery.map((src, i) => (
                <img key={i} src={src} alt={`${unit.name} view ${i + 1}`} />
              ))}
            </div>

            <h2 className="detail-body__subhead">Amenities</h2>
            <ul className="amenity-list">
              {amenities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <aside className="detail-sidebar">
            <p className="detail-sidebar__price">
              From <strong>${unit.priceFrom}</strong> / night
            </p>
            <p className="detail-sidebar__meta">{unit.capacity}</p>
            <Button to={`/contact?subject=stay&unit=${unit.slug}`} variant="filled">
              Enquire About This Stay
            </Button>
            <p className="detail-sidebar__note">
              Direct is best — no middlemen, no booking fees. We&apos;ll confirm availability and your rate by
              WhatsApp or email.
            </p>
            <Link className="detail-sidebar__back" to="/stay">
              ← Back to all stays
            </Link>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
