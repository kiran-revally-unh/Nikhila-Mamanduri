"use client";

// Inline Cal.com scheduler for one event, themed to the site. Cal.com handles
// availability, the Google Meet link, calendar invites and confirmation emails.
import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export function CalEmbed({ calLink, namespace }: { calLink: string; namespace: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    (async () => {
      const cal = await getCalApi({ namespace });
      cal("ui", {
        hideEventTypeDetails: true,
        layout: "month_view",
        cssVarsPerTheme: { light: { "cal-brand": "#216f70" }, dark: { "cal-brand": "#6cc3b7" } },
      });
    })();
  }, [namespace]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      config={{ layout: "month_view", theme: dark ? "dark" : "light" }}
      className="min-h-[640px] w-full overflow-hidden rounded-2xl"
    />
  );
}
