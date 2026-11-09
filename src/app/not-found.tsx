import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="text-7xl font-semibold text-accent">404</p>
        <h1 className="mt-4 text-2xl font-semibold">This page doesn&apos;t exist</h1>
        <p className="mt-2 text-muted-foreground">It may have moved. Let&apos;s get you back on track.</p>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Contact</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
