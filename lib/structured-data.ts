import { absoluteUrl } from "@/lib/seo";
import type { FaqItem } from "@/lib/faq-data";
import { routes, siteConfig, siteUrl } from "@/lib/site-config";

/**
 * schema.org JSON-LD builders.
 *
 * Structured data is what earns rich results: the FAQ accordions can surface as
 * expandable answers in Google, breadcrumbs replace the raw URL in the result,
 * and the Organization node ties the brand to its social profiles and support
 * number. Everything here describes what the site actually offers — inventing
 * ratings or review counts we do not have would be a manual-action risk.
 */

/** Stable @id values, so nodes can reference each other across pages. */
const ids = {
  organization: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  rentalService: `${siteUrl}${routes.rentalCar}#service`,
  returnService: `${siteUrl}${routes.returnCar}#service`,
} as const;

/** Reusable "where we operate" node. */
const areaServed = [
  {
    "@type": "Country",
    name: siteConfig.areaServed.country,
  },
  ...siteConfig.areaServed.cities.map((city) => ({
    "@type": "City",
    name: city,
  })),
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ids.organization,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: [...siteConfig.altNames],
    url: siteUrl,
    description: siteConfig.pitch,
    slogan: siteConfig.tagline,
    areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: siteConfig.areaServed.countryCode,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: siteConfig.supportPhone,
        email: siteConfig.supportEmail,
        areaServed: siteConfig.areaServed.countryCode,
        availableLanguage: ["English", "Bengali"],
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
      siteConfig.social.linkedin,
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    url: siteUrl,
    name: siteConfig.name,
    description: siteConfig.pitch,
    inLanguage: siteConfig.language,
    publisher: { "@id": ids.organization },
  };
}

/**
 * Breadcrumbs for an inner page. Google renders these in place of the URL in
 * search results, which measurably helps click-through.
 */
export function breadcrumbSchema(
  trail: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", path: routes.home },
      ...trail,
    ].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** FAQPage markup — the rich result that expands answers directly in search. */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type ServiceInput = {
  id: "rental" | "return";
  name: string;
  description: string;
  path: string;
  /** Short list of what the service includes. */
  offers: string[];
};

export function serviceSchema({
  id,
  name,
  description,
  path,
  offers,
}: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": id === "rental" ? ids.rentalService : ids.returnService,
    name,
    description,
    serviceType: "Car rental with driver",
    url: absoluteUrl(path),
    provider: { "@id": ids.organization },
    areaServed,
    // No prices are asserted: fares are set per trip by drivers, so any figure
    // here would be wrong the moment it was published.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} options`,
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offer },
        // Passengers pay the driver in cash on completion.
        availableDeliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
      })),
    },
  };
}

/** Generic page node, used to type the About / Contact / policy pages. */
export function webPageSchema({
  type,
  name,
  description,
  path,
  datePublished,
}: {
  type: "AboutPage" | "ContactPage" | "CollectionPage" | "WebPage";
  name: string;
  description: string;
  path: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: siteConfig.language,
    isPartOf: { "@id": ids.website },
    publisher: { "@id": ids.organization },
    ...(datePublished ? { datePublished } : {}),
  };
}

/** Mobile app listings. Kept without ratings until there are real ones. */
export function mobileAppSchema({
  name,
  description,
  os,
}: {
  name: string;
  description: string;
  os: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "TravelApplication",
    operatingSystem: os,
    url: absoluteUrl(routes.download),
    publisher: { "@id": ids.organization },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BDT",
    },
  };
}
