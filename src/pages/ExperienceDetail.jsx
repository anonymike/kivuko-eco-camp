import { useParams, Link, Navigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { experiences } from "../data/experiences.js";
import "./DetailPage.css";

export default function ExperienceDetail() {
  const { slug } = useParams();
  const exp = experiences.find((item) => item.slug === slug);

  if (!exp) return <Navigate to="/experiences" replace />;

  return (
    <PageLayout>
      <section className="detail-hero">
        <div className="detail-hero__media">
          <img src={exp.image} alt={exp.name} />
        </div>
      </section>

      <section className="section--tight">
        <div className="container detail-body">
          <Reveal as="div" className="detail-body__main">
            <Eyebrow>{exp.duration}</Eyebrow>
            <h1>{exp.name}</h1>
            <p className="detail-body__desc">{exp.oneLiner}</p>
          </Reveal>

          <aside className="detail-sidebar">
            <p className="detail-sidebar__meta">{exp.duration}</p>
            <Button to={`/contact?subject=experience&activity=${exp.slug}`} variant="filled">
              Enquire About This Experience
            </Button>
            <p className="detail-sidebar__note">
              Curated by the camp and shaped around your dates — get in touch and we&apos;ll build it into your
              stay.
            </p>
            <Link className="detail-sidebar__back" to="/experiences">
              ← Back to all experiences
            </Link>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
