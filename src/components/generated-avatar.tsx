import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateAvatarUri } from '@/lib/avatar';

interface GeneratedAvatarProps {
  seed: string;
  variant: 'botttsNeutral' | 'initials';
  className?: string;
}

export const GeneratedAvatar = ({
  seed,
  variant,
  className,
}: GeneratedAvatarProps) => {
  const avatarUri = generateAvatarUri({ seed, variant });

  return (
    <Avatar className={className}>
      <AvatarImage src={avatarUri} alt='avatar' />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
