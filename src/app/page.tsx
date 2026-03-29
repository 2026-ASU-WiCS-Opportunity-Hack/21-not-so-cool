import Image from "next/image";
import Link from "next/link";
import { StaticPicture } from "@/components/media/StaticPicture";

const topicPanels = [
  {
    eyebrow: "Action Learning",
    title: "What is Action Learning?",
    accent: "border-l-[5px] border-[#90aef7]",
  },
  {
    eyebrow: "Solution Spheres",
    title: "Action Learning Solution",
    accent: "border-l-[5px] border-[#82d8ab]",
  },
  {
    eyebrow: "Benefits",
    title: "Get more out of your business",
    accent: "border-l-[5px] border-[#ff5757]",
  },
  {
    eyebrow: "People",
    title: "Search for Action Learning Coaches",
    accent: "border-l-[5px] border-[#274b8d]",
  },
  {
    eyebrow: "Certifications",
    title: "WIAL is the world’s leading certifying body for Action Learning",
    accent: "border-l-[5px] border-[#f3a533]",
  },
];

const featureCards = [
  {
    eyebrow: "People",
    title: "WIAL Better World Fund",
    body: "WIAL established the WIAL Better World Fund in 2015 to provide Action Learning services to community-based organizations around the world.",
    accent: "bg-[#274b8d]",
    image: "/images/network-card.jpg",
  },
  {
    eyebrow: "News Letter",
    title: "Join Our Newsletter",
    body: "Want to stay up-to-date on all things Action Learning? Never miss a beat! Join our newsletter.",
    accent: "bg-[#ff5b93]",
    image: "/images/network-card.jpg",
    cta: "Sign up Today",
  },
  {
    eyebrow: "Certifications",
    title: "In-House Programs",
    body: "Want to bring Action Learning to your business? We have In-House programs where a certified coach will conduct Action Learning training.",
    accent: "bg-[#f3a533]",
    image: "/images/network-card.jpg",
  },
];

const mostReadColumns = [
  {
    heading: "WIAL Talk",
    links: ["Scenario: Questions/Answers", "Scenario: Multiple Variables"],
  },
  {
    heading: "Education",
    links: ["Optimizing the Power of Action Learning", "Power of Action Learning"],
  },
  {
    heading: "People",
    links: ["WIAL Better World Fund", "Executive Board"],
  },
  {
    heading: "WIAL Action Learning Brochure",
    links: ["Action Learning Brochure"],
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-8 px-4 py-8 sm:px-8 lg:px-10">
      <section
        id="home"
        className="grid gap-0 lg:grid-cols-[minmax(0,1.65fr)_355px]"
      >
        <div className="relative min-h-[560px] overflow-hidden bg-white shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
          <StaticPicture
            alt="Action Learning group discussion"
            width={960}
            height={700}
            className="block h-full w-full"
            sources={[
              { srcSet: "/images/network-card.avif", type: "image/avif" },
              { srcSet: "/images/network-card.webp", type: "image/webp" },
            ]}
            fallbackSrc="/images/network-card.jpg"
            loading="eager"
          />

          <div className="absolute left-6 top-6 max-w-[540px] bg-white px-8 py-10 shadow-[0_14px_34px_rgba(15,34,60,0.12)] sm:left-9 sm:top-9 sm:px-9">
            <p className="text-sm uppercase tracking-[0.28em] text-[#90aef7]">
              Action Learning
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#5b5b5b]">
              What is Action Learning?
            </h1>
            <p className="mt-5 max-w-[430px] text-[1.05rem] font-medium leading-8 text-[#151515]">
              Action Learning is a new way of thinking, doing business, and
              interacting in teams.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex bg-white px-6 py-4 text-sm uppercase tracking-[0.18em] text-[#666] shadow-[0_10px_18px_rgba(28,40,70,0.12)] transition hover:text-[#cc1f1f]"
            >
              Read More
            </Link>
          </div>
        </div>

        <aside className="bg-white shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
          {topicPanels.map((panel) => (
            <article
              key={panel.title}
              className={`min-h-[112px] border-b border-[#f1f1f1] px-8 py-9 ${panel.accent}`}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#8da7ff]">
                {panel.eyebrow}
              </p>
              <h2 className="mt-3 text-[1.15rem] font-semibold leading-9 text-[#0b4a9c]">
                {panel.title}
              </h2>
            </article>
          ))}
        </aside>
      </section>

      <section
        id="events"
        className="grid gap-7 lg:grid-cols-[repeat(3,minmax(0,1fr))_320px]"
      >
        {featureCards.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,40,70,0.08)]"
          >
            <div className="h-[295px] bg-[#e8edf5]">
              <Image
                src={card.image}
                alt={card.title}
                width={420}
                height={295}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className={`h-[5px] w-full ${card.accent}`} />
            <div className="space-y-5 px-9 py-9">
              <p className="text-sm uppercase tracking-[0.24em] text-[#274b8d]">
                {card.eyebrow}
              </p>
              <h2 className="text-[1.15rem] font-semibold leading-10 text-[#5b5b5b] sm:text-[1.3rem]">
                {card.title}
              </h2>
              <p className="text-[1.02rem] leading-10 text-[#676767]">
                {card.body}
              </p>
              {card.cta ? (
                <button
                  type="button"
                  className="rounded-xl bg-[#0d809b] px-8 py-4 text-xl font-medium text-white"
                >
                  {card.cta}
                </button>
              ) : null}
            </div>
          </article>
        ))}

        <article className="bg-white px-9 py-9 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#14c9ad]">
            WIAL Video Series
          </p>
          <h2 className="mt-8 text-[1.2rem] font-semibold leading-[1.35] text-[#5b5b5b] sm:text-[1.65rem]">
            Click to see the WHY of Action Learning
          </h2>
          <div className="mt-8 overflow-hidden border border-[#f0f0f0]">
            <Image
              src="/images/network-card.jpg"
              alt="WIAL video preview"
              width={320}
              height={180}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        </article>
      </section>

      <section
        id="contact"
        className="grid gap-10 bg-white px-7 py-12 shadow-[0_12px_36px_rgba(28,40,70,0.08)] lg:grid-cols-[1.2fr_0.8fr_1fr]"
      >
        <div className="space-y-8">
          <Image
            src="/images/wial-usa-placeholder-optimized-removebg-preview.png"
            alt="WIAL logo"
            width={330}
            height={169}
            className="h-auto w-[330px]"
            loading="lazy"
          />
          <div>
            <h2 className="text-[1.35rem] font-semibold text-[#d50f45]">
              How to Reach Us
            </h2>
            <div className="mt-4 space-y-1 text-[1rem] leading-8 text-[#202020]">
              <p>P.O. Box 7601 #83791</p>
              <p>Washington, DC 20044</p>
            </div>
          </div>
          <div>
            <h2 className="text-[1.35rem] font-semibold text-[#d50f45]">
              Follow Us
            </h2>
            <div className="mt-4 flex gap-3">
              {["t", "in", "f", "▶"].map((item) => (
                <span
                  key={item}
                  className="flex h-11 w-11 items-center justify-center rounded bg-[#0d809b] text-lg font-semibold text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-[1.35rem] font-semibold text-[#d50f45]">
            WIAL Conferences
          </h2>
          <div className="space-y-3 text-[1rem] leading-8 text-[#0d809b]">
            <p>WIAL Global Conference 2021</p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-[1.35rem] font-semibold text-[#d50f45]">
            Most Read
          </h2>
          <div className="space-y-8">
            {mostReadColumns.map((group) => (
              <div key={group.heading}>
                <p className="text-sm uppercase tracking-[0.22em] text-[#404040]">
                  {group.heading}
                </p>
                <div className="mt-2 space-y-1 text-[1rem] leading-8 text-[#0d809b]">
                  {group.links.map((link) => (
                    <p key={link}>{link}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
