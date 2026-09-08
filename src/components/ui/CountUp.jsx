import { useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const getDecimalPlaces = (number) => {
    const decimals = number.toString().split(".")[1];
    return decimals && Number.parseInt(decimals, 10) !== 0 ? decimals.length : 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));
  const formatValue = useCallback(
    (latest) => {
      const options = {
        useGrouping: Boolean(separator),
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals,
      };
      const formatted = Intl.NumberFormat("en-US", options).format(latest);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [maxDecimals, separator],
  );

  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(direction === "down" ? to : from);
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (!startWhen) return undefined;

    onStart?.();
    const startTimeout = window.setTimeout(() => {
      motionValue.set(direction === "down" ? from : to);
    }, delay * 1000);
    const endTimeout = window.setTimeout(() => onEnd?.(), (delay + duration) * 1000);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(endTimeout);
    };
  }, [startWhen, motionValue, direction, from, to, delay, duration, onStart, onEnd]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = formatValue(latest);
    });
    return unsubscribe;
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} aria-label={`${to} kilometers`} />;
}
