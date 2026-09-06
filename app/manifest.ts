import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Web app manifest. Lets the site be added to a home screen — worth having in a
 * market where most traffic is mobile — and gives search engines a further
 * consistent signal of the brand name and description.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Rental Car & Return Car`,
    short_name: siteConfig.name,
    description: siteConfig.pitch,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    // Matches --brand-primary-950 in app/theme.css.
    theme_color: "#0b2a31",
    lang: siteConfig.language,
    categories: ["travel", "transportation"],
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
