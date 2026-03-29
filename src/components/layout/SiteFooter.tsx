import Link from "next/link";
import { getGlobalFallbackHref, isChapterDeployment } from "@/lib/deployment";

const globalFooterLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/directory", label: "Directory" },
  { href: "/start-a-chapter", label: "Start a Chapter" },
  { href: "/admin/login", label: "Admin Login" },
];

const chapterFooterLinks = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: getGlobalFallbackHref("/"), label: "Global WIAL" },
];

export function SiteFooter() {
  const chapterDeployment = isChapterDeployment();
  const footerLinks = chapterDeployment ? chapterFooterLinks : globalFooterLinks;

  return (
    <footer className="mt-8 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-4 px-6 py-6 text-sm text-slate-600 sm:px-8 lg:px-10 md:flex-row md:items-center md:justify-between">
        <p>
          {chapterDeployment
            ? "Independent chapter deployment powered by the shared WIAL template."
            : "Shared WIAL site shell for child routes and chapter pages."}
        </p>
        <nav className="flex flex-wrap gap-5">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-slate-700 transition hover:text-[#d50f45]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
