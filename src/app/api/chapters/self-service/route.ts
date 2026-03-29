import { NextResponse } from "next/server";
import {
  attachChapterLeadAccess,
  inviteChapterLead,
  provisionChapter,
  selfServiceChapterProvisionSchema,
} from "@/lib/chapter-provisioning";

export async function POST(request: Request) {
  const payload = selfServiceChapterProvisionSchema.safeParse(await request.json());

  if (!payload.success) {
    const fieldErrors = payload.error.flatten().fieldErrors;

    return NextResponse.json(
      {
        ok: false,
        message: "Invalid self-service chapter payload.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const normalized = {
    ...payload.data,
    slug: payload.data.slug.trim().toLowerCase(),
    leadEmail: payload.data.leadEmail.trim().toLowerCase(),
    contactEmail: payload.data.contactEmail.trim().toLowerCase(),
  };

  const chapterResult = await provisionChapter({
    actorEmail: normalized.leadEmail,
    name: normalized.name,
    slug: normalized.slug,
    region: normalized.region,
    contactEmail: normalized.contactEmail,
    summary: normalized.summary,
    focus: normalized.focus,
  });

  if (!chapterResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: chapterResult.message,
      },
      { status: chapterResult.status },
    );
  }

  const leadAccessResult = await attachChapterLeadAccess(normalized);

  if (!leadAccessResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: leadAccessResult.message,
        chapterUrl: chapterResult.chapterUrl,
      },
      { status: leadAccessResult.status },
    );
  }

  const inviteResult = await inviteChapterLead(normalized.leadEmail);

  return NextResponse.json({
    ok: true,
    message: `Chapter launched successfully at /${normalized.slug}.`,
    chapterUrl: chapterResult.chapterUrl,
    inviteStatus: inviteResult.status,
    inviteDetail: inviteResult.detail,
  });
}
