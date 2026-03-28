import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Action Learning" },
  { href: "/coaches", label: "Find a Coach" },
  { href: "/usa", label: "Affiliates" },
  { href: "/admin", label: "Contact" },
];

const socialItems = [
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.facebook.com", label: "Facebook" },
  { href: "https://www.youtube.com", label: "YouTube" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/92 backdrop-blur">
      <div className="border-b border-slate-200/80 bg-slate-950 text-slate-200">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-end gap-4 px-6 py-2 text-xs sm:px-10 lg:px-12">
          {socialItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-800">
            WIAL
          </span>
          <span className="text-sm text-slate-600">
            World Institute for Action Learning
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-sky-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
