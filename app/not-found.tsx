import { Compass } from "lucide-react";
import { CtaLink } from "@/components/landing/cta-link";
import { SiteLink } from "@/components/landing/site-link";
import { navLinks, routes } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="relative isolate flex flex-1 items-center overflow-hidden bg-gradient-hero py-28 text-brand-on-brand sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-96 bg-gradient-glow opacity-40 blur-2xl"
      />
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-5 text-center sm:px-6">
        <span className="grid size-12 place-items-center rounded-2xl bg-brand-on-brand/10 ring-1 ring-brand-on-brand/25">
          <Compass aria-hidden="true" className="size-6" />
        </span>

        <p className="text-xs font-semibold tracking-[0.18em] text-brand-secondary-300 uppercase">
          404
        </p>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
          This road does not go anywhere
        </h1>
        <p className="text-base leading-relaxed text-pretty text-brand-on-brand/85">
          The page you were looking for has moved or never existed. The routes
          below definitely work.
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <CtaLink href={routes.home} tone="onDark">
            Back to home
          </CtaLink>
          <CtaLink href={routes.contact} tone="ghostOnDark">
            Contact support
          </CtaLink>
        </div>

        <ul className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <SiteLink
                href={link.href}
                className="text-sm text-brand-on-brand/75 underline underline-offset-4 hover:text-brand-on-brand"
              >
                {link.label}
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
