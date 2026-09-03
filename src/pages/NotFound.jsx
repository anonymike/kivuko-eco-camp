import Button from "../components/ui/Button.jsx";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow eyebrow--dark">404</p>
        <h1>This trail doesn&apos;t lead anywhere.</h1>
        <p>The page you're looking for isn't here. Let's get you back on the path.</p>
        <Button to="/" variant="filled">
          Return Home
        </Button>
      </div>
    </section>
  );
}
