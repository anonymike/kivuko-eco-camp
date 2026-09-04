import { useEffect, useMemo, useRef, useState } from "react";
import {
  parseISO,
  addDays,
  formatDateLong,
  monthGrid,
  todayISO,
} from "../../booking/bookingUtils.js";
import Button from "../ui/Button.jsx";
import "./DateRangeCalendar.css";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/**
 * Accessible date-range picker for the booking flow.
 *
 * - Two months side by side on desktop, one month on mobile.
 * - Range selection: first click sets check-in, second sets check-out;
 *   clicking before the check-in moves it; clicking after a complete
 *   range starts a new one.
 * - Unavailable days (past dates + configured sample dates) are
 *   non-interactive and visually marked with a diagonal pattern — never
 *   conveyed by colour alone.
 * - Keyboard: arrows move a roving tabindex day by day/week, Home/End
 *   jump to the month's start/end, PageUp/PageDown change months,
 *   Enter/Space select. A live region announces the chosen range.
 * - Rendered as a modal dialog with Escape/backdrop close, body scroll
 *   lock, and a light focus trap.
 */
export default function DateRangeCalendar({ checkIn, checkOut, unavailableDates = [], onSelect, onClose }) {
  const today = todayISO();
  const unavailable = useMemo(() => new Set(unavailableDates), [unavailableDates]);

  const initial = parseISO(checkIn || addDays(today, 1));
  const [baseYear, setBaseYear] = useState(initial ? initial.getFullYear() : new Date().getFullYear());
  const [baseMonth, setBaseMonth] = useState(initial ? initial.getMonth() : new Date().getMonth());
  const [focusedISO, setFocusedISO] = useState(null);
  const dialogRef = useRef(null);
  const dayRefs = useRef({});

  const months = useMemo(() => {
    const first = new Date(baseYear, baseMonth, 1);
    const second = new Date(baseYear, baseMonth + 1, 1);
    return [
      { year: first.getFullYear(), month: first.getMonth() },
      { year: second.getFullYear(), month: second.getMonth() },
    ];
  }, [baseYear, baseMonth]);

  const isPast = (iso) => iso < today;
  const isUnavailable = (iso) => unavailable.has(iso) || isPast(iso);

  const inRange = (iso) => {
    if (!checkIn || !checkOut) return false;
    return iso > checkIn && iso < checkOut;
  };
  const isStart = (iso) => iso === checkIn;
  const isEnd = (iso) => iso === checkOut;

  // Initial focus: check-in date, else first selectable day of the base month.
  useEffect(() => {
    const focusISO = checkIn || firstSelectable(baseYear, baseMonth);
    setFocusedISO(focusISO);
    const el = dayRefs.current[focusISO];
    if (el) el.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Body scroll lock while the modal is open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const el = dayRefs.current[focusedISO];
    if (el) el.focus();
  }, [focusedISO]);

  // Escape closes; Tab is trapped within the dialog.
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function firstSelectable(year, monthIndex) {
    const days = monthGrid(year, monthIndex).filter(Boolean);
    return days.find((iso) => !isUnavailable(iso)) || days[0];
  }

  function shiftMonth(delta) {
    const next = new Date(baseYear, baseMonth + delta, 1);
    setBaseYear(next.getFullYear());
    setBaseMonth(next.getMonth());
    setFocusedISO(firstSelectable(next.getFullYear(), next.getMonth()));
  }

  function handleDayClick(iso) {
    if (isUnavailable(iso)) return;
    if (!checkIn || (checkIn && checkOut)) {
      onSelect(iso, "");
    } else if (iso <= checkIn) {
      onSelect(iso, "");
    } else {
      onSelect(checkIn, iso);
    }
  }

  function handleGridKeyDown(e) {
    if (!focusedISO) return;
    const focused = parseISO(focusedISO);
    const nextMonthDate = new Date(baseYear, baseMonth + 1, 1);
    let target = null;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        target = addDays(focusedISO, -1);
        break;
      case "ArrowRight":
        e.preventDefault();
        target = addDays(focusedISO, 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        target = addDays(focusedISO, -7);
        break;
      case "ArrowDown":
        e.preventDefault();
        target = addDays(focusedISO, 7);
        break;
      case "Home":
        e.preventDefault();
        target = firstSelectable(baseYear, baseMonth);
        break;
      case "End":
        e.preventDefault();
        {
          const days = monthGrid(baseYear, baseMonth).filter(Boolean);
          target = [...days].reverse().find((iso) => !isUnavailable(iso)) || days[days.length - 1];
        }
        break;
      case "PageUp":
        e.preventDefault();
        shiftMonth(-1);
        return;
      case "PageDown":
        e.preventDefault();
        shiftMonth(1);
        return;
      default:
        return;
    }

    // If the target falls outside the two visible months, move the view.
    const targetDate = parseISO(target);
    if (targetDate) {
      const visibleStart = new Date(baseYear, baseMonth, 1);
      if (targetDate < visibleStart) {
        setBaseYear(targetDate.getFullYear());
        setBaseMonth(targetDate.getMonth());
      } else if (targetDate >= nextMonthDate) {
        setBaseYear(targetDate.getFullYear());
        setBaseMonth(targetDate.getMonth());
      }
      setFocusedISO(target);
    }
  }

  const announcement = checkIn && checkOut
    ? `Check-in ${formatDateLong(checkIn)}. Check-out ${formatDateLong(checkOut)}.`
    : checkIn
      ? `Check-in ${formatDateLong(checkIn)}. Now choose your check-out date.`
      : "Choose your check-in date.";

  return (
    <div className="calendar-modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="calendar-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Choose your check-in and check-out dates"
      >
        <header className="calendar-modal__head">
          <div>
            <h2>Choose your dates</h2>
            <p className="calendar-modal__range" aria-live="polite">
              {announcement}
            </p>
          </div>
          <button type="button" className="calendar-modal__close" onClick={onClose} aria-label="Close calendar">
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <nav className="calendar-nav" aria-label="Change month">
          <button
            type="button"
            className="calendar-nav__btn"
            onClick={() => shiftMonth(-1)}
            disabled={new Date(baseYear, baseMonth, 1) <= new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
            aria-label="Previous month"
          >
            ‹
          </button>
          <p className="calendar-nav__titles" aria-hidden="true">
            {months.map(({ year, month }, i) => (
              <span key={`${year}-${month}`} className={i === 1 ? "calendar-nav__title--second" : ""}>
                {new Date(year, month, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </span>
            ))}
          </p>
          <button
            type="button"
            className="calendar-nav__btn"
            onClick={() => shiftMonth(1)}
            aria-label="Next month"
          >
            ›
          </button>
        </nav>

        <div className="calendar-months">
          {months.map(({ year, month }) => (
            <div className="calendar-month" key={`${year}-${month}`}>
              <h3 className="calendar-month__title visually-hidden">
                {new Date(year, month, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </h3>
              <div className="calendar-month__weekdays" aria-hidden="true">
                {WEEKDAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="calendar-month__grid" onKeyDown={handleGridKeyDown} role="grid" aria-label="Calendar">
                {monthGrid(year, month).map((iso, i) => {
                  if (!iso) return <span key={`empty-${i}`} />;
                  const date = parseISO(iso);
                  const disabled = isUnavailable(iso);
                  const state = isStart(iso) ? "start" : isEnd(iso) ? "end" : inRange(iso) ? "range" : "";
                  const isToday = iso === today;
                  return (
                    <button
                      key={iso}
                      ref={(el) => {
                        if (el) dayRefs.current[iso] = el;
                      }}
                      type="button"
                      className={`calendar-day ${state ? `calendar-day--${state}` : ""} ${isToday ? "calendar-day--today" : ""}`}
                      onClick={() => handleDayClick(iso)}
                      disabled={disabled}
                      tabIndex={iso === focusedISO ? 0 : -1}
                      aria-selected={state === "start" || state === "end"}
                      aria-label={`${date.toLocaleDateString("en-GB", { weekday: "long" })} ${formatDateLong(iso)}${state === "start" ? ", check-in" : state === "end" ? ", check-out" : ""}${disabled ? ", unavailable" : ""}`}
                    >
                      {date.getDate()}
                      {isToday && <span className="calendar-day__today" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <footer className="calendar-modal__foot">
          <p className="calendar-modal__note">
            <span aria-hidden="true">▦</span> Sample unavailable dates are demo data only.
          </p>
          <div className="calendar-modal__actions">
            {(checkIn || checkOut) && (
              <button type="button" className="calendar-modal__clear" onClick={() => onSelect("", "")}>
                Clear dates
              </button>
            )}
            <Button variant="filled" onClick={onClose}>
              Done
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}