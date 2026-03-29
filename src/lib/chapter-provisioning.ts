import "server-only";

import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const chapterProvisionSchema = z.object({
  name: z.string().trim().min(3).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/),
  region: z.string().trim().min(2).max(120),
  contactEmail: z.email(),
  summary: z.string().trim().min(12).max(600),
  focus: z.string().trim().min(12).max(400),
});

export const selfServiceChapterProvisionSchema = chapterProvisionSchema.extend({
  leadName: z.string().trim().min(2).max(120),
  leadEmail: z.email(),
});

type ProvisionChapterFields = z.infer<typeof chapterProvisionSchema>;

type AttachLeadInput = ProvisionChapterFields & {
  leadEmail: string;
  leadName: string;
};

type ProvisionChapterInput = ProvisionChapterFields & {
  actorEmail: string | null;
};

type InviteOutcome =
  | { status: "sent"; detail: string }
  | { status: "existing-user"; detail: string }
  | { status: "failed"; detail: string };

export const reservedChapterSlugs = new Set([
  "about",
  "action-learning",
  "admin",
  "api",
  "certification",
  "coaches",
  "contact",
  "directory",
  "newsletter",
  "our-services",
  "payment",
  "start-a-chapter",
  "studio",
]);

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isAuthUserAlreadyPresent(message: string) {
  const normalized = message.toLowerCase();
  return normalized.includes("already") || normalized.includes("exists");
}

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "http://localhost:3000"
  );
}

async function findExistingChapterLead(email: string) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return { data: null, error: "Supabase admin access is not configured." };
  }

  const { data, error } = await supabase
    .from("chapter_admins")
    .select("email, role, chapter_slug, provision_slug")
    .eq("email", email)
    .maybeSingle<{
      email: string;
      role: "global_admin" | "chapter_lead";
      chapter_slug: string | null;
      provision_slug: string | null;
    }>();

  if (error) {
    return { data: null, error: "Unable to verify chapter lead access right now." };
  }

  return { data, error: null };
}

export async function provisionChapter({
  actorEmail,
  contactEmail,
  focus,
  name,
  region,
  slug,
  summary,
}: ProvisionChapterInput) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: false as const,
      status: 503,
      message: "Supabase provisioning is not configured.",
    };
  }

  if (reservedChapterSlugs.has(slug)) {
    return {
      ok: false as const,
      status: 409,
      message: `/${slug} is reserved by an existing WIAL route.`,
    };
  }

  const { data: existingChapter, error: existingChapterError } = await supabase
    .from("chapters")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle<{ slug: string }>();

  if (existingChapterError) {
    return {
      ok: false as const,
      status: 500,
      message: "Unable to validate the chapter slug right now.",
    };
  }

  if (existingChapter) {
    return {
      ok: false as const,
      status: 409,
      message: "That chapter slug already exists.",
    };
  }

  const { error } = await supabase.from("chapters").insert({
    slug,
    name,
    region,
    contact_email: normalizeEmail(contactEmail),
    description: summary,
    focus,
    about_heading: `About ${name}`,
    about_body: `${name} operates within the shared WIAL network while adapting outreach, partnerships, and local programming to the needs of ${region}.`,
    contact_heading: `Contact ${name}`,
    contact_body:
      "Reach the chapter directly for local programming, regional coaching activity, and partnership conversations.",
    other_offerings_label: "Visit full affiliate site",
    status: "active",
    launch_mode: "subdirectory",
    template_version: "wial-core-v1",
    created_by: actorEmail,
    updated_by: actorEmail,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return {
      ok: false as const,
      status: 500,
      message: "Provisioning failed while saving the chapter.",
    };
  }

  return {
    ok: true as const,
    chapterUrl: `/${slug}`,
  };
}

export async function attachChapterLeadAccess({
  contactEmail,
  focus,
  leadEmail,
  leadName,
  name,
  region,
  slug,
  summary,
}: AttachLeadInput) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: false as const,
      status: 503,
      message: "Supabase admin access is not configured.",
    };
  }

  const normalizedLeadEmail = normalizeEmail(leadEmail);
  const existingLead = await findExistingChapterLead(normalizedLeadEmail);

  if (existingLead.error) {
    return {
      ok: false as const,
      status: 500,
      message: existingLead.error,
    };
  }

  if (
    existingLead.data &&
    (existingLead.data.role !== "chapter_lead" ||
      (existingLead.data.chapter_slug &&
        existingLead.data.chapter_slug !== slug &&
        existingLead.data.provision_slug !== slug))
  ) {
    return {
      ok: false as const,
      status: 409,
      message:
        "That lead email is already assigned to another WIAL access record.",
    };
  }

  const { error } = await supabase.from("chapter_admins").upsert(
    {
      email: normalizedLeadEmail,
      display_name: leadName.trim(),
      role: "chapter_lead",
      chapter_slug: slug,
      provision_slug: slug,
      provision_name: name,
      provision_region: region,
      provision_contact_email: normalizeEmail(contactEmail),
      provision_summary: summary,
      provision_focus: focus,
      is_active: true,
    },
    { onConflict: "email" },
  );

  if (error) {
    return {
      ok: false as const,
      status: 500,
      message:
        "The chapter is live, but the chapter lead access record could not be saved.",
    };
  }

  return { ok: true as const };
}

export async function inviteChapterLead(email: string): Promise<InviteOutcome> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "failed",
      detail: "Supabase admin access is not configured.",
    };
  }

  const normalizedEmail = normalizeEmail(email);
  const redirectTo = `${getBaseUrl()}/admin/login`;
  const { error } = await supabase.auth.admin.inviteUserByEmail(normalizedEmail, {
    redirectTo,
  });

  if (!error) {
    return {
      status: "sent",
      detail: `A chapter lead invite was sent to ${normalizedEmail}.`,
    };
  }

  if (isAuthUserAlreadyPresent(error.message)) {
    return {
      status: "existing-user",
      detail: `${normalizedEmail} already has an auth account and can sign in immediately.`,
    };
  }

  return {
    status: "failed",
    detail: `The chapter is live, but the login invite could not be sent automatically: ${error.message}`,
  };
}
