"use client";

import Link from "next/link";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-[860px] flex-1 flex-col justify-center gap-6 px-6 py-16 sm:px-8">
      <section className="rounded-[2rem] bg-white px-8 py-12 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0b4a9c]">
          Child Route Error
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          This section failed, but the landing page is isolated.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-700">
          The child route shell is independent from the homepage shell, so `/`
          can stay up even when a chapter or inner page throws.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Retry this page
          </button>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            Return home
          </Link>
        </div>
        {error.digest ? (
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-slate-500">
            Error digest: {error.digest}
          </p>
        ) : null}
      </section>
    </main>
  );
}
