import { NextResponse } from "next/server";
import { getCurrentAuthorizedAdmin } from "@/lib/admin-auth";
import {
  attachChapterLeadAccess,
  provisionChapter,
} from "@/lib/chapter-provisioning";

export async function POST() {
  const { user, admin } = await getCurrentAuthorizedAdmin();

  if (!user || !admin || admin.role !== "chapter_lead") {
    return NextResponse.json(
      {
        ok: false,
        message: "Only chapter leads can use one-click chapter creation.",
      },
      { status: 403 },
    );
  }

  const slug = admin.provisionSlug?.trim().toLowerCase() ?? "";
  const name = admin.provisionName?.trim() ?? "";
  const region = admin.provisionRegion?.trim() ?? "";
  const contactEmail = admin.provisionContactEmail?.trim().toLowerCase() ?? "";
  const summary = admin.provisionSummary?.trim() ?? "";
  const focus = admin.provisionFocus?.trim() ?? "";

  if (!slug || !name || !region || !contactEmail || !summary || !focus) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "This chapter lead account is missing a pre-approved chapter profile.",
      },
      { status: 400 },
    );
  }

  const chapterResult = await provisionChapter({
    actorEmail: user.email?.trim().toLowerCase() ?? null,
    name,
    slug,
    region,
    contactEmail,
    summary,
    focus,
  });

  if (!chapterResult.ok && chapterResult.status !== 409) {
    return NextResponse.json(
      {
        ok: false,
        message: chapterResult.message,
      },
      { status: chapterResult.status },
    );
  }

  const accessResult = await attachChapterLeadAccess({
    leadEmail: admin.email,
    leadName: admin.displayName?.trim() || name,
    name,
    slug,
    region,
    contactEmail,
    summary,
    focus,
  });

  if (!accessResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: accessResult.message,
      },
      { status: accessResult.status },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      chapterResult.status === 409
        ? `Your chapter already exists at /${slug}.`
        : `Chapter created successfully at /${slug}.`,
    chapterUrl: `/${slug}`,
  });
}
