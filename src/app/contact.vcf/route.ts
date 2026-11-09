import { profile } from "@/content/profile";

// Same contact card as Nikki's Setly digital card (setly.net/nikki/contact.vcf).
export function GET() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:Mamanduri;${profile.shortName};;MHA\\, CAPM;`,
    `FN:${profile.name}`,
    "ORG:Medi-Weightloss;Thousand Oaks",
    `TITLE:${profile.headline}`,
    `TEL;TYPE=WORK,VOICE:${profile.phone}`,
    `TEL;TYPE=CELL:+${profile.whatsapp}`,
    `EMAIL;TYPE=INTERNET,WORK:${profile.email}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedin}`,
    `URL;TYPE=WhatsApp:https://wa.me/${profile.whatsapp}`,
    "ADR;TYPE=WORK:;;;Thousand Oaks;CA;;United States",
    "NOTE:Better systems create stronger teams and a better experience for every patient.",
    "END:VCARD",
    "",
  ].join("\r\n");
  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="nikki-mamanduri.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
