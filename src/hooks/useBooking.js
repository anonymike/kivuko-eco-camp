import { useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { nightsBetween } from "../booking/bookingUtils.js";

/**
 * Booking flow state, kept in URL search params so every step is
 * refresh-safe, shareable, and back/forward-compatible:
 *
 *   /book?checkIn=2026-09-12&checkOut=2026-09-15&adults=2&children=1
 *   /book/results?...same params...&unit=twin-tent
 *
 * The hook exposes plain values + setters; components never parse the URL
 * themselves.
 */
export default function useBooking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = Math.max(1, Number(searchParams.get("adults")) || 1);
  const children = Math.max(0, Number(searchParams.get("children")) || 0);
  const unit = searchParams.get("unit") || "";

  const nights = useMemo(
    () => (checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0),
    [checkIn, checkOut]
  );

  const hasDates = Boolean(checkIn && checkOut && nights > 0);

  /** Update dates without navigating away (used by the calendar). */
  const setDates = useCallback(
    (nextCheckIn, nextCheckOut) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("checkIn", nextCheckIn);
          if (nextCheckOut) next.set("checkOut", nextCheckOut);
          else next.delete("checkOut");
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setGuests = useCallback(
    (nextAdults, nextChildren) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("adults", String(nextAdults));
          next.set("children", String(nextChildren));
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const selectUnit = useCallback(
    (slug) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("unit", slug);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  /** Move to the next step, carrying the current params along. */
  const goTo = useCallback(
    (path) => {
      navigate(`${path}?${searchParams.toString()}`);
    },
    [navigate, searchParams]
  );

  return {
    checkIn,
    checkOut,
    adults,
    children,
    unit,
    nights,
    hasDates,
    setDates,
    setGuests,
    selectUnit,
    goTo,
  };
}