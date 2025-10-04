import { format } from 'date-fns';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { meeting } from '@/db/schema';
import { auth } from '@/lib/auth';
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

    if (!areResourcesAvailable(existingMeeting.endedAt)) {
      return NextResponse.json(
        { error: 'Transcript has expired (14-day retention period)' },
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

    const transcriptData = await response.text();

    const filename = `transcript-${existingMeeting.name}-${format(existingMeeting.startedAt || new Date(), 'yyyy-MM-dd')}.txt`;

    return new NextResponse(transcriptData, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Transcript download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
