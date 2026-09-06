import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { routes } from "@/lib/site-config";

/**
 * XML sitemap, served at /sitemap.xml and referenced from robots.txt.
 *
 * Priority and change frequency are set per page rather than uniformly: telling
 * a crawler that a policy page changes as often as the home page wastes crawl
 * budget on the pages that matter least.
 */

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const entries: Entry[] = [
  // Commercial pages — the ones we want ranking.
  { path: routes.home, priority: 1, changeFrequency: "weekly" },
  { path: routes.returnCar, priority: 0.9, changeFrequency: "weekly" },
  { path: routes.rentalCar, priority: 0.9, changeFrequency: "weekly" },
  { path: routes.forDrivers, priority: 0.9, changeFrequency: "weekly" },
  { path: routes.howItWorks, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.download, priority: 0.8, changeFrequency: "monthly" },
  // Support and trust content — strong for long-tail queries.
  { path: routes.faq, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.trustSafety, priority: 0.6, changeFrequency: "monthly" },
  { path: routes.about, priority: 0.6, changeFrequency: "monthly" },
  { path: routes.contact, priority: 0.5, changeFrequency: "monthly" },
  { path: routes.careers, priority: 0.5, changeFrequency: "weekly" },
  // Policies: indexable (they signal legitimacy) but rarely updated.
  { path: routes.terms, priority: 0.3, changeFrequency: "yearly" },
  { path: routes.privacy, priority: 0.3, changeFrequency: "yearly" },
  { path: routes.cancellation, priority: 0.3, changeFrequency: "yearly" },
  { path: routes.driverAgreement, priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

/**
 * Guard: every route in site-config must appear above, so a new page cannot be
 * added without also being listed in the sitemap. Throws at build time.
 */
const missing = Object.values(routes).filter(
  (route) => !entries.some((entry) => entry.path === route)
);

if (missing.length > 0) {
  throw new Error(
    `sitemap.ts is missing routes: ${missing.join(", ")}. Add them to \`entries\`.`
  );
}
