import { OfflineQueueForm } from "@/components/forms/OfflineQueueForm";

export default function AdminPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
          Admin Placeholder
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
          Future home for chapter management and role-based access.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">
          This page is intentionally lightweight for the initial branch. It gives
          the team a stable route for future Supabase auth, chapter provisioning,
          content editing, and payment reporting work.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          "Super Admin dashboard",
          "Chapter content management",
          "Coach profile approvals",
          "Stripe and PayPal reporting",
        ].map((item) => (
          <div
            key={item}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm"
          >
            {item}
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <OfflineQueueForm
          title="Dues payment initiation"
          description="When connectivity drops, the request is queued locally and retried automatically once the device is back online."
          endpoint="/api/forms/submit"
          queueType="dues-payment"
          fields={[
            {
              name: "chapter",
              label: "Chapter",
              placeholder: "WIAL Nigeria",
            },
            {
              name: "coachEmail",
              label: "Coach email",
              placeholder: "coach@example.com",
              type: "email",
            },
            {
              name: "amount",
              label: "Amount (USD)",
              placeholder: "50",
            },
          ]}
        />
        <OfflineQueueForm
          title="Coach profile update"
          description="Profile edits are also stored offline first, so chapter teams can work from low-connectivity regions without losing changes."
          endpoint="/api/forms/submit"
          queueType="coach-profile"
          fields={[
            {
              name: "coachName",
              label: "Coach name",
              placeholder: "Marisol de la Cruz",
            },
            {
              name: "location",
              label: "Location",
              placeholder: "Manila, Philippines",
            },
            {
              name: "bio",
              label: "Short bio",
              placeholder: "Action Learning facilitator for distributed teams",
            },
          ]}
        />
      </section>
    </main>
  );
}
