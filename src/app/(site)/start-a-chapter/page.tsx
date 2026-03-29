import Link from "next/link";
import { SelfServiceChapterForm } from "@/components/provisioning/SelfServiceChapterForm";
import { listProvisionedChapters } from "@/lib/chapters";

export const dynamic = "force-dynamic";

export default async function StartAChapterPage() {
  const chapters = await listProvisionedChapters();

  return (
    <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-8 px-6 py-12 sm:px-8 lg:px-10">
      <section className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
          Ticket P4
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Self-service chapter provisioning
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-200">
          A chapter lead fills one form, `wial.org/[slug]` goes live, and the
          lead gets a login path without a developer touchpoint.
        </p>
      </section>

      <SelfServiceChapterForm />

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d50f45]">
            What happens on submit
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
            <li>The slug is checked against existing live routes and chapter records.</li>
            <li>A live chapter record is inserted into Supabase immediately.</li>
            <li>The chapter lead access record is created or updated automatically.</li>
            <li>A Supabase login invite is sent when possible.</li>
          </ul>
        </article>

        <article className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0b4a9c]">
            Live chapter routes
          </p>
          <div className="mt-5 grid gap-4">
            {chapters.map((chapter) => (
              <div
                key={chapter.slug}
                className="rounded-[1.5rem] border border-slate-200 px-5 py-4 text-sm leading-7 text-slate-700"
              >
                <p className="font-semibold text-slate-950">{chapter.name}</p>
                <p>{chapter.region}</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Link href={`/${chapter.slug}`} className="font-semibold text-[#0b4a9c] underline">
                    /{chapter.slug}
                  </Link>
                  <Link href={`/${chapter.slug}/about`} className="text-slate-600 underline">
                    About
                  </Link>
                  <Link href={`/${chapter.slug}/contact`} className="text-slate-600 underline">
                    Contact
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
