import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";

interface SocialButtonsProps {
  onSocialAuth: (provider: "google" | "github") => void;
  isLoading?: boolean;
}

export const SocialButtons = ({
  onSocialAuth,
  isLoading = false,
}: SocialButtonsProps) => (
  <>
    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
      <span className="relative z-10 bg-card px-2 text-muted-foreground">
        Or continue with
      </span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Button
        className="w-full"
        disabled={isLoading}
        onClick={() => onSocialAuth("google")}
        type="button"
        variant="outline"
      >
        <FaGoogle />
      </Button>
      <Button
        className="w-full"
        disabled={isLoading}
        onClick={() => onSocialAuth("github")}
        type="button"
        variant="outline"
      >
        <FaGithub />
      </Button>
    </div>
  </>
);
