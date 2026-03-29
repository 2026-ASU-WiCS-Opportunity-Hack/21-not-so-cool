export type Chapter = {
  slug: string;
  name: string;
  region: string;
  summary: string;
  focus: string;
  contactEmail: string;
};

export type Coach = {
  name: string;
  chapter: string;
  certification: "CALC" | "PALC" | "SALC" | "MALC";
  location: string;
  email: string;
  bio: string;
};

export const chapters: Chapter[] = [
  {
    slug: "usa",
    name: "WIAL USA",
    region: "North America",
    summary:
      "A chapter landing page for events, coach visibility, and local Action Learning resources.",
    focus: "Corporate leadership development and certification access",
    contactEmail: "usa@wial.org",
  },
  {
    slug: "nigeria",
    name: "WIAL Nigeria",
    region: "West Africa",
    summary:
      "A lightweight regional site designed for mobile-first access and chapter updates.",
    focus: "Local network building and chapter-led event promotion",
    contactEmail: "nigeria@wial.org",
  },
  {
    slug: "brazil",
    name: "WIAL Brazil",
    region: "South America",
    summary:
      "A chapter template showing how WIAL can keep global branding while localizing content for Portuguese-speaking audiences.",
    focus: "Executive coaching and Action Learning programming for regional organizations",
    contactEmail: "brazil@wial.org",
  },
  {
    slug: "canada",
    name: "WIAL Canada",
    region: "North America",
    summary:
      "A newly provisioned-style chapter site designed for local launch visibility, partnerships, and chapter updates.",
    focus: "National chapter launch planning and bilingual community visibility",
    contactEmail: "canada@wial.org",
  },
];

export const coaches: Coach[] = [
  {
    name: "Angela Reed",
    chapter: "USA",
    certification: "PALC",
    location: "Phoenix, Arizona",
    email: "angela.reed@example.com",
    bio: "Supports leadership teams adopting Action Learning in higher education and nonprofit settings.",
  },
  {
    name: "Tunde Adebayo",
    chapter: "Nigeria",
    certification: "CALC",
    location: "Lagos, Nigeria",
    email: "tunde.adebayo@example.com",
    bio: "Works with emerging chapter partners and community leaders to launch Action Learning cohorts.",
  },
  {
    name: "Ana Paula Ferreira",
    chapter: "Brazil",
    certification: "SALC",
    location: "Sao Paulo, Brazil",
    email: "ana.ferreira@example.com",
    bio: "Supports mid-sized organizations using Action Learning for leadership growth and executive coaching.",
  },
  {
    name: "Nadia Tremblay",
    chapter: "Canada",
    certification: "PALC",
    location: "Montreal, Canada",
    email: "nadia.tremblay@example.com",
    bio: "Builds bilingual chapter communities and helps launch local coach networks across Canada.",
  },
];
