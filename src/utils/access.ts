import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { meeting, meeting_chat } from '@/db/schema';

export async function hasUserMeetingAccess(userId: string, meetingId: string) {
  const [foundMeeting] = await db
    .select({
      id: meeting.id,
      userId: meeting.userId,
    })
    .from(meeting)
    .where(and(eq(meeting.id, meetingId), eq(meeting.userId, userId)));

  return foundMeeting != null;
}

export async function hasUserMeetingChatAccess(
  userId: string,
  meetingChatId: string,
) {
  const [foundMeetingChat] = await db
    .select({
      id: meeting_chat.id,
      userId: meeting_chat.createdByUserId,
    })
    .from(meeting_chat)
    .where(
      and(
        eq(meeting_chat.id, meetingChatId),
        eq(meeting_chat.createdByUserId, userId),
      ),
    );

  return foundMeetingChat != null;
}
