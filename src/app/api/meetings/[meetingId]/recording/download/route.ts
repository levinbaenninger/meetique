import { format } from "date-fns";
import { and, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { meeting } from "@/db/schema";
import { auth } from "@/lib/auth";
import { RESOURCE_RETENTION_DAYS } from "@/modules/meetings/constants";
import { areResourcesAvailable } from "@/modules/meetings/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ meetingId: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { meetingId } = await params;

    const [existingMeeting] = await db
      .select()
      .from(meeting)
      .where(
        and(eq(meeting.id, meetingId), eq(meeting.userId, session.user.id))
      );

    if (!existingMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    if (!existingMeeting.recordingUrl) {
      return NextResponse.json(
        { error: "Recording not available for this meeting" },
        { status: 404 }
      );
    }

    if (!existingMeeting.endedAt) {
      return NextResponse.json(
        { error: "Recording not yet available" },
        { status: 409 }
      );
    }

    if (!areResourcesAvailable(existingMeeting.endedAt)) {
      return NextResponse.json(
        {
          error: `Recording has expired (${RESOURCE_RETENTION_DAYS}-day retention period)`,
        },
        { status: 410 }
      );
    }

    const response = await fetch(existingMeeting.recordingUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch recording from storage" },
        { status: 502 }
      );
    }

    const safeBase =
      String(existingMeeting.name)
        .replace(/[^a-zA-Z0-9 _.-]/g, "")
        .trim()
        .replace(/\s+/g, "_") || "meeting";

    const filename = `recording-${safeBase}-${format(
      existingMeeting.startedAt || new Date(),
      "yyyy-MM-dd"
    )}.mp4`;

    const headers: Record<string, string> = {
      "Content-Type": response.headers.get("content-type") || "video/mp4",
      "Content-Disposition": `attachment; filename="${filename}"`,
    };
    const len = response.headers.get("content-length");
    if (len) {
      headers["Content-Length"] = len;
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
