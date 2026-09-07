import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading } from "@/components/landing/section";
import { ArrowLink, SiteLink } from "@/components/landing/site-link";
import type { FaqItem } from "@/lib/faq-data";
import { featuredFaqs } from "@/lib/faq-data";
import { routes, siteConfig } from "@/lib/site-config";

/**
 * FAQ accordion. Defaults to the short featured set for the home page; the
 * dedicated /faq page passes in a full group instead.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion defaultValue={items.length ? [items[0].id] : []}>
      {items.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="gap-4 py-5 text-base font-semibold text-brand-ink hover:no-underline sm:text-lg">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pr-8 text-sm leading-relaxed text-brand-ink-muted sm:text-base">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Home-page FAQ section: the featured questions plus a link to the full page. */
export function Faq({ items = featuredFaqs }: { items?: FaqItem[] }) {
  return (
    <Section id="faq" tone="surface" aria-labelledby="faq-heading">
      <SectionHeading
        id="faq-heading"
        eyebrow="FAQ"
        title="Questions, answered"
        description="The things people ask most often before their first trip."
      />

      <div className="mx-auto mt-block max-w-3xl rounded-3xl border border-brand-hairline bg-brand-surface-raised px-5 py-2 shadow-brand-sm sm:px-7">
        <FaqAccordion items={items} />
      </div>

      <div className="mt-4 flex flex-col items-center gap-3">
        <ArrowLink href={routes.faq}>Read all the questions</ArrowLink>
        <p className="text-center text-sm text-brand-ink-muted">
          Still unsure?{" "}
          <SiteLink
            href={`tel:${siteConfig.supportPhone.replace(/\s|-/g, "")}`}
            className="font-semibold text-brand-primary-700 underline underline-offset-4 dark:text-brand-primary-300"
          >
            {siteConfig.supportPhone}
          </SiteLink>{" "}
          reaches a Gari Bhai who will talk you through it.
        </p>
      </div>
    </Section>
  );
}
