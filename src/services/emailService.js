/**
 * Client-side email service — wraps the Vercel API route for sending
 * booking emails. This module never touches the Resend API key; that
 * lives only in server-side environment variables.
 *
 * Usage:
 *   import { sendBookingNotification, sendBookingConfirmation } from "../services/emailService.js";
 *   await sendBookingNotification(bookingData);
 *   await sendBookingConfirmation(bookingData);
 *
 * Returns { ok: true } on success, { ok: false, error: "..." } on failure.
 */
import { EMAIL_API_ENDPOINT, EmailEventType } from "../booking/emailConfig.js";

async function sendEmail(eventType, bookingData) {
  try {
    const res = await fetch(EMAIL_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType, booking: bookingData }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error || `HTTP ${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message || "Network error" };
  }
}

export function sendBookingNotification(bookingData) {
  return sendEmail(EmailEventType.BOOKING_NOTIFICATION, bookingData);
}

export function sendBookingConfirmation(bookingData) {
  return sendEmail(EmailEventType.BOOKING_CONFIRMATION, bookingData);
}
