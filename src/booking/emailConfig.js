/**
 * Email configuration — documents every environment variable the email
 * delivery system needs. None of these are committed; they are set in
 * the Vercel project dashboard (Settings → Environment Variables).
 *
 * Required env vars for production:
 *   RESEND_API_KEY          — Resend API key (server-side only)
 *   BOOKING_NOTIFY_EMAIL    — recipient for owner booking notifications
 *   BOOKING_FROM_EMAIL      — verified sender (e.g. bookings@kivuko-eco-camp.com)
 *
 * Optional:
 *   BOOKING_CC_EMAIL        — CC address for notifications
 */
export const emailEnvVars = {
  resendApiKey: "RESEND_API_KEY",
  notifyEmail: "BOOKING_NOTIFY_EMAIL",
  fromEmail: "BOOKING_FROM_EMAIL",
  ccEmail: "BOOKING_CC_EMAIL",
};

/**
 * Client-side constants. These are NOT secrets — they identify the
 * API endpoint the frontend calls. The actual Resend key never
 * reaches the client.
 */
export const EMAIL_API_ENDPOINT = "/api/send-booking-email";

/** Event types the email system supports. */
export const EmailEventType = {
  BOOKING_NOTIFICATION: "booking-notification",
  BOOKING_CONFIRMATION: "booking-confirmation",
};

/** Human-readable labels for admin display. */
export const emailEventLabels = {
  [EmailEventType.BOOKING_NOTIFICATION]: "New booking notification (owner)",
  [EmailEventType.BOOKING_CONFIRMATION]: "Customer booking confirmation",
};
