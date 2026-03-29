"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  getConfiguredChapterSlug,
  getGlobalFallbackHref,
  isChapterDeployment,
} from "@/lib/deployment";

const globalNavItems = [
  { href: "/about", label: "About" },
  { href: "/directory", label: "Directory" },
  { href: "/start-a-chapter", label: "Start a Chapter" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/login", label: "Admin Login" },
];

const chapterNavItems = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: getGlobalFallbackHref("/"), label: "Global WIAL" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const chapterDeployment = isChapterDeployment();
  const navItems = chapterDeployment ? chapterNavItems : globalNavItems;
  const chapterSlug = getConfiguredChapterSlug();
  const logoHref = chapterDeployment ? "/" : "/";
  const logoAlt = chapterDeployment
    ? `WIAL ${chapterSlug?.toUpperCase() ?? "Chapter"} logo`
    : "WIAL logo";

  return (
    <header className="border-b border-slate-200 bg-white/96 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-6 py-5 sm:px-8 lg:px-10">
        <Link
          href={logoHref}
          className="flex items-center gap-4"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/wial-usa-placeholder-optimized-removebg-preview.png"
            alt={logoAlt}
            width={220}
            height={113}
            className="h-auto w-[150px] sm:w-[180px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-[0.16em] text-slate-700 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href.startsWith("/")
                ? pathname === item.href || pathname.startsWith(`${item.href}/`)
                : false;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive ? "text-[#d50f45]" : "hover:text-[#d50f45]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-900 transition hover:border-[#d50f45] hover:text-[#d50f45] lg:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex w-full max-w-[1180px] flex-col px-6 py-4 sm:px-8 lg:px-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-slate-100 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:text-[#d50f45]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
