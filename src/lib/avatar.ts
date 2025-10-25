import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

interface Props {
  seed: string;
  variant: "botttsNeutral" | "initials";
}

export const generateAvatarUri = ({ seed, variant }: Props) => {
  let avatar: ReturnType<typeof createAvatar>;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed });
  }

  return avatar.toDataUri();
};
