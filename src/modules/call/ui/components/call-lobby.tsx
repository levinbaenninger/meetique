import '@stream-io/video-react-sdk/dist/css/styles.css';

import {
  DefaultVideoPlaceholder,
  type StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from '@stream-io/video-react-sdk';
import { PhoneIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { generateAvatarUri } from '@/lib/avatar';

interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data: session } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: session?.user.name ?? 'Unknown',
          image:
            session?.user.image ??
            generateAvatarUri({
              seed: session?.user.name ?? 'Unknown',
              variant: 'initials',
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className='text-sm'>
      Please grant your browser permission to access your camera and microphone.
    </p>
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasMicrophonePermission } =
    useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermission =
    hasCameraPermission && hasMicrophonePermission;

  return (
    <div className='from-sidebar-accent to-sidebar flex h-full flex-col items-center justify-center bg-radial'>
      <div className='flex flex-1 items-center justify-center px-8 py-4'>
        <div className='bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm'>
          <div className='flex flex-col gap-y-0.5 text-center'>
            <h6 className='text-lg font-medium'>Ready to join?</h6>
            <p className='text-muted-foreground text-sm'>
              Set up your camera and microphone to join the call.
            </p>
          </div>
          <div className='aspect-[4/3] w-full max-w-[280px] overflow-hidden md:max-w-[500px] [&_*]:!max-h-full [&_*]:!max-w-full'>
            <VideoPreview
              DisabledVideoPreview={
                hasBrowserMediaPermission
                  ? DisabledVideoPreview
                  : AllowBrowserPermissions
              }
            />
          </div>
          <div className='flex gap-x-2'>
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className='flex w-full justify-between'>
            <Button variant='ghost' asChild>
              <Link href='/meetings'>Cancel</Link>
            </Button>
            <Button onClick={onJoin}>
              <PhoneIcon className='size-4' />
              Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
