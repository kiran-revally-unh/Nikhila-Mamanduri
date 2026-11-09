import { profile } from "@/content/profile";
import { WhatsAppIcon } from "./icons";

export function WhatsAppButton() {
  if (!profile.whatsapp) return null;
  return (
    <a
      href={`https://wa.me/${profile.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <WhatsAppIcon />
    </a>
  );
}
