import { contact } from "../../data/siteConfig.js";
import "./WhatsAppBubble.css";

export default function WhatsAppBubble() {
  const href = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    contact.whatsappMessage
  )}`;

  return (
    <a className="whatsapp-bubble" href={href} target="_blank" rel="noreferrer" aria-label="Chat with Kivuko on WhatsApp">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.83.5 3.53 1.36 5l-1.45 4.9 5.11-1.42a9.86 9.86 0 0 0 4.89 1.28c5.46 0 9.9-4.45 9.9-9.9 0-5.46-4.44-9.9-9.9-9.9Zm0 17.8a8 8 0 0 1-4.24-1.2l-.3-.18-3.03.84.84-2.95-.2-.3a7.9 7.9 0 0 1-1.24-4.1 8 8 0 1 1 8.17 7.9Zm4.4-5.95c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.4-1.33-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
      </svg>
      <span className="visually-hidden">WhatsApp</span>
    </a>
  );
}
