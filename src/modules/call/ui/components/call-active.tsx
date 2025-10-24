import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => (
  <div className="flex h-full flex-col justify-between gap-y-4 p-4 text-secondary">
    <div className="flex items-center gap-4 rounded-full bg-secondary-foreground p-4">
      <Link
        className="flex w-fit items-center justify-center rounded-full p-1"
        href="/"
      >
        <Image alt="logo" height={24} src="/logo.svg" width={24} />
      </Link>
      <h4 className="text-base">{meetingName}</h4>
    </div>
    <SpeakerLayout />
    <div className="rounded-full bg-secondary-foreground px-4">
      <CallControls onLeave={onLeave} />
    </div>
  </div>
);
