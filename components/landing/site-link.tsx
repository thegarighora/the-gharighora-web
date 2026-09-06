import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { isInternal } from "@/components/landing/cta-link";

type SiteLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * Plain text link. Routes internal destinations through `next/link` and leaves
 * `tel:`, `mailto:` and external URLs as ordinary anchors.
 */
export function SiteLink({ className, href, ...props }: SiteLinkProps) {
  const classes = cn(
    "rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
    className
  );

  if (isInternal(href)) {
    return <Link href={href} className={classes} {...props} />;
  }

  return <a href={href} className={classes} {...props} />;
}

/**
 * "Read more" style link with a nudging arrow — used to send home-page sections
 * off to their dedicated pages.
 */
export function ArrowLink({
  className,
  children,
  invert = false,
  ...props
}: SiteLinkProps & { invert?: boolean }) {
  return (
    <SiteLink
      className={cn(
        "group/arrow inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
        invert
          ? "text-brand-on-brand hover:text-brand-secondary-200"
          : "text-brand-primary-700 hover:text-brand-primary-600 dark:text-brand-primary-300",
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform group-hover/arrow:translate-x-0.5"
      />
    </SiteLink>
  );
}
