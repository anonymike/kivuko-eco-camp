import { useEffect, useRef } from "react";
import { bookingConfig } from "../../booking/bookingConfig.js";
import Button from "../ui/Button.jsx";
import "./GuestsControl.css";

/**
 * Guests & rooms selection — a small modal with steppers for adults and
 * children. Limits come from bookingConfig (configurable, not invented).
 * Children pricing from the published reservation terms is shown as a
 * supporting note.
 */
export default function GuestsControl({ adults, children, onChange, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function step(kind, delta) {
    const next =
      kind === "adults"
        ? Math.min(bookingConfig.maxAdults, Math.max(1, adults + delta))
        : Math.min(bookingConfig.maxChildren, Math.max(0, children + delta));
    onChange(kind === "adults" ? next : adults, kind === "adults" ? children : next);
  }

  return (
    <div className="guests-modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="guests-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Guests"
        tabIndex={-1}
      >
        <h2>Guests</h2>

        <div className="guests-row">
          <div className="guests-row__label">
            <strong>Adults</strong>
            <span>Age 13 and over</span>
          </div>
          <div className="stepper">
            <button
              type="button"
              onClick={() => step("adults", -1)}
              disabled={adults <= 1}
              aria-label="Decrease adults"
            >
              −
            </button>
            <output aria-live="polite">{adults}</output>
            <button
              type="button"
              onClick={() => step("adults", 1)}
              disabled={adults >= bookingConfig.maxAdults}
              aria-label="Increase adults"
            >
              +
            </button>
          </div>
        </div>

        <div className="guests-row">
          <div className="guests-row__label">
            <strong>Children</strong>
            <span>Age 12 and under</span>
          </div>
          <div className="stepper">
            <button
              type="button"
              onClick={() => step("children", -1)}
              disabled={children <= 0}
              aria-label="Decrease children"
            >
              −
            </button>
            <output aria-live="polite">{children}</output>
            <button
              type="button"
              onClick={() => step("children", 1)}
              disabled={children >= bookingConfig.maxChildren}
              aria-label="Increase children"
            >
              +
            </button>
          </div>
        </div>

        <p className="guests-modal__note">
          Children 0–3 stay free sharing with parents; ages 4–12 at 50% of the per-person rate (sharing). Teenagers
          pay the adult rate.
        </p>

        <div className="guests-modal__actions">
          <Button variant="filled" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}