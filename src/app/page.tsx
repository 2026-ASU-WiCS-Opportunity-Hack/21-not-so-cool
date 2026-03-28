import Link from "next/link";
import { StaticPicture } from "@/components/media/StaticPicture";
import { chapters, coaches } from "@/lib/site-data";

const heroLinks = [
  { href: "/about", label: "What is Action Learning?" },
  { href: "/coaches", label: "Find a Coach" },
  { href: "/usa", label: "Become an Affiliate" },
];

const coreSections = [
  {
    eyebrow: "Action Learning",
    title: "What is Action Learning?",
    body: "Action Learning is a practical way of solving real business challenges while developing stronger teams and leaders.",
    href: "/about",
  },
  {
    eyebrow: "Solution Spheres",
    title: "Action Learning Solutions",
    body: "WIAL supports organizations through certification, facilitation, leadership development, and chapter-led programming.",
    href: "/about",
  },
  {
    eyebrow: "Benefits",
    title: "Get more out of your business",
    body: "See how Action Learning strengthens individuals, teams, and organizations through structured reflection and action.",
    href: "/about",
  },
  {
    eyebrow: "People",
    title: "Search for Action Learning Coaches",
    body: `Find WIAL certified coaches at the click of a button with the growing directory of ${coaches.length} seeded profiles.`,
    href: "/coaches",
  },
  {
    eyebrow: "Certification",
    title: "WIAL is the world’s leading certifying body for Action Learning",
    body: "Explore certification pathways and discover how Action Learning changes the way people work, think, and do business.",
    href: "/about",
  },
];

const lowerFeatures = [
  {
    eyebrow: "People",
    title: "WIAL Better World Fund",
    body: "WIAL established the Better World Fund to provide Action Learning services to community-based organizations around the world.",
    linkLabel: "Read more",
    href: "/about",
  },
  {
    eyebrow: "Newsletter",
    title: "Join Our Newsletter",
    body: "Stay up to date on all things Action Learning with a lightweight email signup call-to-action.",
    linkLabel: "Sign up today",
    href: "https://visitor.r20.constantcontact.com",
  },
  {
    eyebrow: "Certifications",
    title: "In-House Programs",
    body: "Bring Action Learning into your organization with certified coaches and structured in-house programming.",
    linkLabel: "Learn more",
    href: "/about",
  },
];

const footerColumns = [
  {
    heading: "How to Reach Us",
    items: ["P.O. Box 7601 #83791", "Washington, DC 20044", "executivedirector@wial.org"],
  },
  {
    heading: "WIAL Conferences",
    items: ["WIAL Global Conference", "Past conferences", "Community events"],
  },
  {
    heading: "Most Read",
    items: ["WIAL Talk", "Power of Action Learning", "Better World Fund"],
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-6 py-10 sm:px-10 lg:px-12">
      <section className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
              Action Learning
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              A better way of thinking, doing business, and developing teams.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              This homepage now follows the same broad rhythm as the current
              WIAL site: Action Learning, benefits, people, certification,
              Better World, newsletter, and practical ways to connect.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {heroLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center justify-center rounded-full bg-sky-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <StaticPicture
          alt="Illustration of WIAL chapter connections across a global network"
          width={960}
          height={576}
          className="overflow-hidden rounded-[1.5rem] border border-slate-200"
          sources={[
            { srcSet: "/images/network-card.avif", type: "image/avif" },
            { srcSet: "/images/network-card.webp", type: "image/webp" },
          ]}
          fallbackSrc="/images/network-card.jpg"
          loading="eager"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        {coreSections.map((section, index) => (
          <article
            key={section.title}
            className={`rounded-[1.6rem] border border-slate-200 p-6 shadow-sm ${
              index === 0
                ? "lg:col-span-2 bg-slate-950 text-slate-50"
                : "bg-white text-slate-900"
            }`}
          >
            <p
              className={`text-sm font-semibold uppercase tracking-[0.22em] ${
                index === 0 ? "text-sky-200" : "text-sky-800"
              }`}
            >
              {section.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <p
              className={`mt-4 text-sm leading-7 ${
                index === 0 ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {section.body}
            </p>
            <Link
              href={section.href}
              className={`mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] ${
                index === 0 ? "text-sky-200" : "text-sky-900"
              }`}
            >
              Read more
            </Link>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              People
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Search for Action Learning Coaches
            </h2>
          </div>
          <Link
            href="/coaches"
            className="text-sm font-semibold text-sky-900 underline decoration-sky-300 underline-offset-4"
          >
            Open directory
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/${chapter.slug}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-800">
                {chapter.region}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">
                {chapter.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {chapter.summary} Browse chapter-specific information while the
                global directory stays centralized.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {lowerFeatures.map((feature) => (
          <article
            key={feature.title}
            className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
              {feature.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {feature.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              {feature.body}
            </p>
            <Link
              href={feature.href}
              className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-sky-900"
            >
              {feature.linkLabel}
            </Link>
          </article>
        ))}
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
            WIAL Video Series
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Click to see the why of Action Learning
          </h2>
          <p className="text-sm leading-7 text-slate-700">
            The live site points visitors toward video and story-driven
            education. This version keeps the same invitation but uses a single
            lightweight visual and a direct call to action.
          </p>
          <Link
            href="https://www.youtube.com"
            className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Watch series
          </Link>
        </div>
        <StaticPicture
          alt="WIAL promotional media card"
          width={960}
          height={576}
          className="overflow-hidden rounded-[1.5rem] border border-slate-200"
          sources={[
            { srcSet: "/images/network-card.avif", type: "image/avif" },
            { srcSet: "/images/network-card.webp", type: "image/webp" },
          ]}
          fallbackSrc="/images/network-card.jpg"
          loading="lazy"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {footerColumns.map((column) => (
          <article
            key={column.heading}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              {column.heading}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
