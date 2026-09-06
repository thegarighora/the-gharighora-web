import type { ReactNode } from "react";
import { cn } from "cn";

/**
 * Shared section shell + heading. Keeps vertical rhythm, max width and heading
 * hierarchy identical across every landing section, and keeps all colour
 * choices flowing through the brand tokens defined in app/theme.css.
 */

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** `surface` and `hero` are gradient bands; `plain` sits on the page background. */
  tone?: "plain" | "surface" | "hero";
  "aria-labelledby"?: string;
};

export function Section({
  id,
  children,
  className,
  tone = "plain",
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full scroll-mt-20 overflow-hidden py-16 sm:py-20 lg:py-28",
        tone === "surface" && "bg-gradient-surface",
        tone === "hero" && "bg-gradient-hero text-brand-on-brand",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  /** Rendered as the eyebrow above the heading. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  /** `h2` for page sections (default), `h3` when nested inside one. */
  as?: "h2" | "h3";
  invert?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "center",
  as: Heading = "h2",
  invert = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-semibold tracking-[0.18em] uppercase",
            invert ? "text-brand-secondary-200" : "text-brand-primary-600"
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          invert ? "text-brand-on-brand" : "text-brand-ink"
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed text-pretty sm:text-lg",
            invert ? "text-brand-on-brand/80" : "text-brand-ink-muted"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
