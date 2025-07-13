'use client';

import { Loader2Icon } from 'lucide-react';

import { authClient } from '@/lib/auth-client';
import { generateAvatarUri } from '@/lib/avatar';
import { CallConnect } from '@/modules/call/ui/components/call-connect';

interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data: session, isPending } = authClient.useSession();

  if (!session || isPending) {
    return (
      <div className='from-sidebar-accent to-sidebar flex h-screen items-center justify-center bg-radial'>
        <Loader2Icon className='size-6 animate-spin text-white' />
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={session.user.id}
      userName={session.user.name ?? ''}
      userImage={
        session.user.image ??
        generateAvatarUri({ seed: session.user.name, variant: 'initials' })
      }
    />
  );
};
