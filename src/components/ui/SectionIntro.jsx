import Eyebrow from "./Eyebrow.jsx";
import Reveal from "./Reveal.jsx";
import "./SectionIntro.css";

export default function SectionIntro({ eyebrow, title, children, align = "center" }) {
  return (
    <Reveal as="div" variant="none" className={`section-intro section-intro--${align}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {children && <p className="section-intro__body">{children}</p>}
    </Reveal>
  );
}
