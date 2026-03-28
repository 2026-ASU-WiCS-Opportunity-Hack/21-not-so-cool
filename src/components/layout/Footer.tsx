export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm sm:px-10 lg:px-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© Copyright 2025 WIAL</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://twitter.com" className="hover:text-white">
              Twitter
            </a>
            <a href="https://www.linkedin.com" className="hover:text-white">
              LinkedIn
            </a>
            <a href="https://www.facebook.com" className="hover:text-white">
              Facebook
            </a>
            <a href="https://www.youtube.com" className="hover:text-white">
              YouTube
            </a>
          </div>
        </div>
        <p className="text-slate-400">
          Low-bandwidth reinterpretation of the current WIAL homepage structure.
        </p>
      </div>
    </footer>
  );
}
