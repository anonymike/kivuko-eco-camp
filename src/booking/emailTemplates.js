/**
 * Pure HTML email template generators. These functions return strings —
 * no React, no DOM. They are imported by both the Vercel API route
 * (server-side) and potentially by a client preview tool.
 *
 * Templates use inline CSS (email clients ignore <style> tags in most
 * cases). Kivuko brand colors are inlined from tokens.css values.
 */

const COLORS = {
  forest: "#2f3b2a",
  terracotta: "#c2622d",
  sand: "#f4efe6",
  cream: "#ffffff",
  ink: "#1c1c1a",
  inkSoft: "#5a5a56",
};

const CAMP_NAME = "Kivuko Eco Camp";

function baseShell({ title, children }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${COLORS.sand};font-family:Georgia,'Iowan Old Style','Times New Roman',serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.sand};padding:40px 20px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:${COLORS.cream};max-width:600px;width:100%;border:1px solid rgba(28,28,26,0.08);">
  <tr><td style="padding:32px 40px;border-bottom:3px solid ${COLORS.terracotta};">
    <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${COLORS.inkSoft};font-family:Arial,Helvetica,sans-serif;">${title}</p>
    <h1 style="margin:8px 0 0;font-size:24px;color:${COLORS.forest};font-weight:500;line-height:1.15;">${CAMP_NAME}</h1>
  </td></tr>
  <tr><td style="padding:32px 40px;">
    ${children}
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid rgba(28,28,26,0.08);background:${COLORS.sand};">
    <p style="margin:0;font-size:12px;color:${COLORS.inkSoft};font-family:Arial,Helvetica,sans-serif;text-align:center;">${CAMP_NAME} · Taita Wildlife Conservancy, Kenya<br>
    reservations@kivuko-eco-camp.com · +254 111 499 248</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function row(label, value) {
  return `<tr>
    <td style="padding:6px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.inkSoft};font-family:Arial,Helvetica,sans-serif;vertical-align:top;width:140px;">${label}</td>
    <td style="padding:6px 0;font-size:15px;color:${COLORS.ink};font-family:Georgia,'Iowan Old Style',serif;">${value || "—"}</td>
  </tr>`;
}

/**
 * Owner notification email — sent to the Kivuko team when a new
 * booking request is submitted.
 */
export function bookingNotificationTemplate(booking) {
  const {
    guest = {},
    checkIn,
    checkOut,
    nights,
    adults,
    children,
    unit,
    packageName,
    rate,
    total,
    paymentStatus = "Pending",
    reference,
    requests,
  } = booking;

  const tableRows = [
    row("Guest", `${guest.name || "—"}`),
    row("Email", guest.email),
    row("Phone", guest.phone),
    row("Arrival", checkIn),
    row("Departure", checkOut),
    row("Nights", nights ? String(nights) : null),
    row("Guests", `${adults || 1} adult${adults > 1 ? "s" : ""}${children > 0 ? ` · ${children} child${children > 1 ? "ren" : ""}` : ""}`),
    row("Accommodation", unit),
    row("Package / Rate", packageName || rate || "—"),
    row("Amount", total ? `$${total}` : "To be connected"),
    row("Payment", paymentStatus),
    row("Booking Ref", reference || "Awaiting booking engine"),
    row("Special Requests", requests || "None"),
  ].join("\n");

  return baseShell({
    title: "New Booking Request",
    children: `
      <p style="margin:0 0 24px;font-size:15px;color:${COLORS.ink};line-height:1.6;">A new booking request has been submitted through the Kivuko website.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(28,28,26,0.08);">
        ${tableRows}
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
        <tr><td style="background:${COLORS.sand};padding:16px 20px;border-left:3px solid ${COLORS.terracotta};">
          <p style="margin:0;font-size:13px;color:${COLORS.inkSoft};font-family:Arial,Helvetica,sans-serif;">
            This is a demo booking notification. Once a booking engine and email are connected, this email will arrive in your real inbox.
          </p>
        </td></tr>
      </table>
    `,
  });
}

/**
 * Customer confirmation email — sent to the guest after a successful
 * booking submission.
 */
export function bookingConfirmationTemplate(booking) {
  const {
    guest = {},
    checkIn,
    checkOut,
    nights,
    adults,
    children,
    unit,
    packageName,
    rate,
    total,
    reference,
  } = booking;

  const tableRows = [
    row("Guest Name", guest.name),
    row("Arrival", checkIn),
    row("Departure", checkOut),
    row("Nights", nights ? String(nights) : null),
    row("Guests", `${adults || 1} adult${adults > 1 ? "s" : ""}${children > 0 ? ` · ${children} child${children > 1 ? "ren" : ""}` : ""}`),
    row("Accommodation", unit),
    row("Package / Rate", packageName || rate || "—"),
    row("Amount", total ? `$${total}` : "To be confirmed"),
    row("Booking Reference", reference || "Awaiting booking engine"),
  ].join("\n");

  return baseShell({
    title: "Booking Confirmation",
    children: `
      <p style="margin:0 0 8px;font-size:18px;color:${COLORS.terracotta};font-weight:500;">Booking confirmed</p>
      <p style="margin:0 0 24px;font-size:15px;color:${COLORS.ink};line-height:1.6;">Thank you, ${guest.name || "valued guest"}. Your stay at ${CAMP_NAME} has been confirmed.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(28,28,26,0.08);">
        ${tableRows}
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:1px solid rgba(28,28,26,0.08);">
        <tr><td style="padding:20px 0 0;">
          <p style="margin:0 0 12px;font-size:14px;color:${COLORS.forest};font-weight:500;">Important information</p>
          <ul style="margin:0;padding:0 0 0 18px;font-size:13px;color:${COLORS.inkSoft};line-height:1.8;font-family:Arial,Helvetica,sans-serif;">
            <li>50% deposit on confirmation, balance due on arrival.</li>
            <li>Full board includes accommodation, all meals, and the evening bonfire sundowner.</li>
            <li>Check-in from 2:00 p.m. · Check-out by 10:30 a.m.</li>
          </ul>
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
        <tr><td style="background:${COLORS.sand};padding:16px 20px;border-left:3px solid ${COLORS.terracotta};">
          <p style="margin:0;font-size:13px;color:${COLORS.inkSoft};font-family:Arial,Helvetica,sans-serif;">
            This is a demo confirmation email. The real version will be sent via a connected booking engine.
          </p>
        </td></tr>
      </table>
    `,
  });
}
