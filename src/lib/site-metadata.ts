import type { Metadata } from "next";

export const baseSiteMetadata: Metadata = {
  title: "WIAL by #21NotSoCool",
  description: "Low-bandwidth Next.js MVP for WIAL global and chapter websites.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/images/wial-usa-placeholder-optimized-removebg-preview.png",
        type: "image/png",
        sizes: "220x113",
      },
    ],
    shortcut: [
      {
        url: "/images/wial-usa-placeholder-optimized-removebg-preview.png",
        type: "image/png",
        sizes: "220x113",
      },
    ],
  },
};
