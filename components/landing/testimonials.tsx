import { Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/landing/section";

/**
 * SAMPLE DATA: placeholder quotes written for layout. Replace with real,
 * consented quotes (and real names/photos) before launch.
 */
const testimonials = [
  {
    quote:
      "I needed to get to Cumilla the same evening. A driver was already heading back that way, so the whole car cost me about a third of a normal rental. The Gari Bhai called me twice to confirm.",
    name: "Nusrat J.",
    role: "Passenger · Dhaka Airport → Cumilla",
    rating: 5,
  },
  {
    quote:
      "I used to drive back from Chattogram with an empty car every week. Now I post the return trip before I start driving home, and most weeks somebody takes it.",
    name: "Md. Rasel",
    role: "Driver · Toyota Axio · 3 years",
    rating: 5,
  },
  {
    quote:
      "What I like is that the fare is settled in the app before pickup, and I only pay when I have actually arrived. No arguing at the roadside.",
    name: "Tanvir A.",
    role: "Passenger · Dhaka → Sylhet",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <Section id="stories" aria-labelledby="stories-heading">
      <SectionHeading
        id="stories-heading"
        eyebrow="Stories"
        title="What passengers and drivers say"
        description="Early feedback from both sides of the same trip."
      />

      {/* Swipeable row on mobile, plain grid from tablet up — no JS needed. */}
      <ul className="mt-block flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.name}
            className="flex min-w-[85%] snap-center flex-col gap-4 rounded-2xl border border-brand-hairline bg-brand-surface-raised p-6 shadow-brand-sm sm:min-w-[60%] lg:min-w-0"
          >
            <div className="flex items-center justify-between">
              <Quote
                aria-hidden="true"
                className="size-6 text-brand-primary-300"
              />
              <span
                className="flex items-center gap-0.5"
                aria-label={`Rated ${testimonial.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className={
                      index < testimonial.rating
                        ? "size-3.5 fill-brand-secondary-500 text-brand-secondary-500"
                        : "size-3.5 text-brand-hairline"
                    }
                  />
                ))}
              </span>
            </div>

            <blockquote className="text-sm leading-relaxed text-pretty text-brand-ink">
              {testimonial.quote}
            </blockquote>

            <div className="mt-auto flex items-center gap-3 border-t border-brand-hairline pt-4">
              {/* TODO: replace with a real profile photo once consented. */}
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-primary-100 text-sm font-semibold text-brand-primary-800 dark:bg-brand-surface dark:text-brand-primary-300"
              >
                {testimonial.name.charAt(0)}
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-semibold text-brand-ink">
                  {testimonial.name}
                </span>
                <span className="truncate text-xs text-brand-ink-muted">
                  {testimonial.role}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
