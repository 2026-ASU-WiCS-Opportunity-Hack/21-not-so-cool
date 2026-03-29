import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import { baseSiteMetadata } from "@/lib/site-metadata";
import "../globals.css";

export const metadata: Metadata = baseSiteMetadata;

export default function LandingLayout({
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
