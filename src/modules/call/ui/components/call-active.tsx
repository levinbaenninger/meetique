import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className='text-secondary flex h-full flex-col justify-between p-4'>
      <div className='bg-secondary-foreground flex items-center gap-4 rounded-full p-4'>
        <Link
          href='/'
          className='flex w-fit items-center justify-center rounded-full p-1'
        >
          <Image src='/logo.svg' width={24} height={24} alt='logo' />
        </Link>
        <h4 className='text-base'>{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className='bg-secondary-foreground rounded-full px-4'>
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};
