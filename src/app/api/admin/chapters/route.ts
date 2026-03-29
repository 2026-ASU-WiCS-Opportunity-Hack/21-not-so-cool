import { NextResponse } from "next/server";
import { getCurrentAuthorizedAdmin } from "@/lib/admin-auth";
import {
  chapterProvisionSchema,
  provisionChapter,
} from "@/lib/chapter-provisioning";

export async function POST(request: Request) {
  const { user, admin } = await getCurrentAuthorizedAdmin();

  if (!user || !admin) {
    return NextResponse.json(
      {
        ok: false,
        message: "You are not authorized to provision chapters.",
      },
      { status: 403 },
    );
  }

  const payload = chapterProvisionSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid chapter provisioning payload.",
      },
      { status: 400 },
    );
  }

  const { name, region, summary, focus } = payload.data;
  const slug = payload.data.slug.trim().toLowerCase();
  const contactEmail = payload.data.contactEmail.trim().toLowerCase();

  if (admin.role === "chapter_lead" && admin.chapterSlug && admin.chapterSlug !== slug) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Chapter leads can only provision the chapter assigned to their account.",
      },
      { status: 403 },
    );
  }

  const result = await provisionChapter({
    actorEmail: user.email?.trim().toLowerCase() ?? null,
    name,
    slug,
    region,
    contactEmail,
    summary,
    focus,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: result.message,
      },
      { status: result.status },
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Chapter provisioned successfully for /${slug}.`,
    chapterUrl: result.chapterUrl,
  });
}
