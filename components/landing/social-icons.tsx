/**
 * Social glyphs.
 *
 * lucide-react v1 no longer ships brand icons, so these are minimal in-house
 * outlines drawn to match lucide's stroke weight. They use `currentColor` only,
 * so they inherit whatever brand token the parent sets.
 *
 * TODO: replace with the platforms' official marks if brand guidelines require
 * exact artwork.
 */
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M14.5 8.5V7.2c0-.7.4-1.2 1.2-1.2H17V3.2h-2c-2.2 0-3.4 1.3-3.4 3.5v1.8H9.5v3h2.1V21h2.9v-9.5H17l.4-3h-2.9Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5l4.5 2.5-4.5 2.5v-5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M7.6 10.5V17" />
      <circle cx="7.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.4 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
      <path d="M11.4 10.5V17" />
    </svg>
  );
}
