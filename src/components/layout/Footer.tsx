import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-8 bg-[#d50f45] text-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-6 py-6 text-sm sm:px-8 lg:px-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p>© Copyright 2025 WIAL | Privacy Policy</p>
          <div className="flex gap-4 text-base">
            <span>t</span>
            <span>in</span>
            <span>f</span>
            <span>▶</span>
          </div>
        </div>
        <nav className="flex flex-wrap gap-8 text-base">
          <Link href="/">Home</Link>
          <Link href="/#home">Action Learning</Link>
          <Link href="/#contact">WIAL’s Team</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
