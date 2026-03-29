"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

type SelfServiceResult = {
  ok: boolean;
  message: string;
  chapterUrl?: string;
  inviteStatus?: "sent" | "existing-user" | "failed";
  inviteDetail?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export function SelfServiceChapterForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SelfServiceResult | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
    );

    setResult(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/chapters/self-service", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = (await response.json()) as SelfServiceResult;
        setResult(data);

        if (response.ok) {
          form.reset();
        }
      } catch {
        setResult({
          ok: false,
          message: "Unable to launch the chapter right now.",
        });
      }
    });
  }

  return (
    <section className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8da7ff]">
          Self-Service Provisioning
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[#5b5b5b]">
          Launch a chapter site without waiting on a developer
        </h2>
        <p className="max-w-3xl text-base leading-8 text-[#555]">
          Submit one form to publish `wial.org/[slug]`, create the chapter lead
          access record, and trigger the login invite.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Lead name</span>
          <input
            name="leadName"
            required
            disabled={isPending}
            placeholder="Amina Hassan"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Lead email</span>
          <input
            name="leadEmail"
            type="email"
            required
            disabled={isPending}
            placeholder="chapter.lead@wial.org"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Chapter name</span>
          <input
            name="name"
            required
            disabled={isPending}
            placeholder="WIAL Kenya"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Slug</span>
          <input
            name="slug"
            required
            pattern="[a-z0-9\\-]+"
            disabled={isPending}
            placeholder="kenya"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Region</span>
          <input
            name="region"
            required
            disabled={isPending}
            placeholder="East Africa"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Public contact email</span>
          <input
            name="contactEmail"
            type="email"
            required
            disabled={isPending}
            placeholder="kenya@wial.org"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm md:col-span-2">
          <span className="font-medium text-slate-800">Summary</span>
          <textarea
            name="summary"
            rows={3}
            required
            disabled={isPending}
            placeholder="A newly launched chapter site for local Action Learning visibility, events, and partnerships."
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm md:col-span-2">
          <span className="font-medium text-slate-800">Local focus</span>
          <textarea
            name="focus"
            rows={3}
            required
            disabled={isPending}
            placeholder="Regional network building, chapter launch events, and certified coach visibility."
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {isPending ? "Launching chapter..." : "Launch chapter site"}
          </button>
        </div>
      </form>

      {result ? (
        <div
          className={`mt-6 rounded-2xl px-4 py-4 text-sm leading-7 ${
            result.ok
              ? "bg-emerald-50 text-emerald-900"
              : "bg-rose-50 text-rose-900"
          }`}
        >
          <p>{result.message}</p>
          {result.chapterUrl ? (
            <p className="mt-1">
              Live route:{" "}
              <Link href={result.chapterUrl} className="font-semibold underline">
                {result.chapterUrl}
              </Link>
            </p>
          ) : null}
          {result.inviteDetail ? <p className="mt-1">{result.inviteDetail}</p> : null}
          {result.fieldErrors
            ? Object.entries(result.fieldErrors).map(([field, messages]) =>
                messages?.length ? (
                  <p key={field} className="mt-1">
                    {field}: {messages.join(", ")}
                  </p>
                ) : null,
              )
            : null}
        </div>
      ) : null}
    </section>
  );
}
