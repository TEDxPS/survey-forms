export interface SocialLink {
  platform: string;
  /** Path under /public, e.g. "/icons/facebook.png" — the file must already exist in the repo. */
  icon: string;
  url: string;
  label?: string;
}

export interface ISiteConfig {
  siteName?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  /** Canonical base URL, e.g. "https://forms.tedxpetalingstreet.com" (no trailing slash). */
  domain?: string;
  /** Path under /public, e.g. "/tedxps_logo.png". */
  logo?: string;
  /** Path under /public, e.g. "/icons/favicon.ico". */
  favicon?: string;
  /** Path under /public, used when a form doesn't set its own `heroImage`. */
  defaultHeroImage?: string;
  socialLinks?: SocialLink[];
  /** Source repo URL, shown in the footer to invite other chapters/orgs to self-host. */
  repoUrl?: string;
}
