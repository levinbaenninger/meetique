import { format } from 'date-fns';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { meeting } from '@/db/schema';
import { auth } from '@/lib/auth';
import { RESOURCE_RETENTION_DAYS } from '@/modules/meetings/constants';
import { areResourcesAvailable } from '@/modules/meetings/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ meetingId: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { meetingId } = await params;

    const [existingMeeting] = await db
      .select()
      .from(meeting)
      .where(
        and(eq(meeting.id, meetingId), eq(meeting.userId, session.user.id)),
      );

    if (!existingMeeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    if (!existingMeeting.transcriptUrl) {
      return NextResponse.json(
        { error: 'Transcript not available for this meeting' },
        { status: 404 },
      );
    }

    if (!existingMeeting.endedAt) {
      return NextResponse.json(
        { error: 'Transcript not yet available' },
        { status: 409 },
      );
    }

    if (!areResourcesAvailable(existingMeeting.endedAt)) {
      return NextResponse.json(
        {
          error: `Transcript has expired (${RESOURCE_RETENTION_DAYS}-day retention period)`,
        },
        { status: 410 },
      );
    }

    const response = await fetch(existingMeeting.transcriptUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch transcript from storage' },
        { status: 502 },
      );
    }

    const safeBase =
      String(existingMeeting.name)
        .replace(/[^a-zA-Z0-9 _.\-]/g, '')
        .trim()
        .replace(/\s+/g, '_') || 'meeting';

    const filename = `transcript-${safeBase}-${format(
      existingMeeting.startedAt || new Date(),
      'yyyy-MM-dd',
    )}.txt`;

    const headers: Record<string, string> = {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'private, no-store',
    };
    const len = response.headers.get('content-length');
    if (len) headers['Content-Length'] = len;

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Transcript download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
