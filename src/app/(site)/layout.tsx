import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import { baseSiteMetadata } from "@/lib/site-metadata";
import "../globals.css";

export const metadata: Metadata = baseSiteMetadata;

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ServiceWorkerRegistration />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
