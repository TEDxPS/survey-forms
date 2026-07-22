import { cache } from "react";
import dbConnect from "@/libs/mongodb";
import SiteConfig from "@/models/SiteConfig";
import { ISiteConfig, SocialLink } from "@/types/siteConfig";

export type ResolvedSiteConfig = Required<Omit<ISiteConfig, "socialLinks">> & {
  socialLinks: SocialLink[];
};

// Fallback used when no `siteconfig` document exists in MongoDB — keeps a
// fresh clone with an empty database fully functional out of the box.
export const DEFAULT_SITE_CONFIG: ResolvedSiteConfig = {
  siteName: "TEDxPetalingStreet Volunteer Application | Ideas Change Everything",
  title: "TEDxPetalingStreet Volunteer Application | Ideas Change Everything",
  description:
    "Join us in our journey of sharing inspiring Malaysian stories to showcase our brilliance to the world!",
  keywords: [
    "TEDx",
    "TED",
    "TED Talk",
    "TEDxPetalingStreet",
    "TEDxPS",
    "Ideas Change Everything",
    "Innovation",
    "Inspiration",
    "Community event",
    "Thought leadership",
    "Knowledge sharing",
    "Local voices",
    "Global ideas",
    "Petaling Street",
    "Kuala Lumpur",
    "Malaysia",
    "Conferences",
    "Speaker series",
    "Chinese",
    "Multilingual events",
    "Cultural exchange",
    "Transformative ideas",
  ],
  domain: "https://forms.tedxpetalingstreet.com",
  logo: "/tedxps_logo.png",
  favicon: "/icons/favicon.ico",
  defaultHeroImage: "/tedx-hero.jpeg",
  socialLinks: [
    { platform: "website", icon: "/icons/website.svg", url: "https://www.tedxpetalingstreet.com/en", label: "Official Site" },
    { platform: "facebook", icon: "/icons/facebook.png", url: "https://www.facebook.com/TEDxPetalingStreet" },
    { platform: "instagram", icon: "/icons/instagram.png", url: "https://www.instagram.com/tedxpetalingstreet/" },
    { platform: "youtube", icon: "/icons/youtube.png", url: "https://www.youtube.com/@TedxPetalingStreet" },
    { platform: "linkedin", icon: "/icons/linkedin.png", url: "https://my.linkedin.com/company/tedxpetalingstreet" },
    { platform: "tiktok", icon: "/icons/tiktok.png", url: "https://www.tiktok.com/@tedxpetalingstreet" },
  ],
};

/**
 * Reads the singleton `siteconfig` document and layers it over
 * DEFAULT_SITE_CONFIG. Cached per request so Header, page metadata, and the
 * page body all share one DB round trip.
 */
export const getSiteConfig = cache(async (): Promise<ResolvedSiteConfig> => {
  try {
    await dbConnect();
    const doc = await SiteConfig.findOne({});
    if (!doc) return DEFAULT_SITE_CONFIG;

    const config = doc.toObject() as ISiteConfig;
    return {
      siteName: config.siteName || DEFAULT_SITE_CONFIG.siteName,
      title: config.title || DEFAULT_SITE_CONFIG.title,
      description: config.description || DEFAULT_SITE_CONFIG.description,
      keywords: config.keywords?.length ? config.keywords : DEFAULT_SITE_CONFIG.keywords,
      domain: config.domain || DEFAULT_SITE_CONFIG.domain,
      logo: config.logo || DEFAULT_SITE_CONFIG.logo,
      favicon: config.favicon || DEFAULT_SITE_CONFIG.favicon,
      defaultHeroImage: config.defaultHeroImage || DEFAULT_SITE_CONFIG.defaultHeroImage,
      socialLinks: config.socialLinks?.length ? config.socialLinks : DEFAULT_SITE_CONFIG.socialLinks,
    };
  } catch (e) {
    console.error("Error fetching site config:", e);
    return DEFAULT_SITE_CONFIG;
  }
});
