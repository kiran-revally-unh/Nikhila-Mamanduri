// "Let's work together" CTA (inspired by 21st.dev "lets-work-section").
import { CalendarCheck } from "lucide-react";
import { Container, ButtonLink } from "./ui";

export function CTA({
  title = "Let's work together",
  text = "Have a project, a question or just want to say hi? Book a free intro call — it takes less than a minute.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Container className="mt-24">
      <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center text-background sm:px-16">
        <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-accent/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-emerald-500/30 blur-3xl" />
        <CalendarCheck className="relative mx-auto size-10 opacity-80" />
        <h2 className="relative mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-pretty opacity-75">{text}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/book" className="bg-background text-foreground">Book a call</ButtonLink>
          <ButtonLink href="/contact" variant="secondary" className="border-white/20 bg-transparent text-background hover:bg-white/10">
            Send a message
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
