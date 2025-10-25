"use client";

import { CheckCircle, Loader2, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

const SECONDS_TO_MILLISECONDS = 1000;
const SIXTY_SECONDS = 60;
const SIXTY_SECONDS_IN_MILLISECONDS = SIXTY_SECONDS * SECONDS_TO_MILLISECONDS;

interface Props {
  email: string;
  name?: string;
}

export const CheckEmailView = ({ email, name }: Props) => {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [lastResendTime, setLastResendTime] = useState<number>(Date.now());
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (lastResendTime) {
      const updateCountdown = () => {
        const elapsed = Date.now() - lastResendTime;
        const remaining = Math.max(0, SIXTY_SECONDS_IN_MILLISECONDS - elapsed);
        const remainingSeconds = Math.ceil(remaining / SECONDS_TO_MILLISECONDS);

        setCountdown(remainingSeconds);

        if (remainingSeconds <= 0 && interval) {
          clearInterval(interval);
          interval = null;
        }
      };

      updateCountdown();
      interval = setInterval(updateCountdown, SECONDS_TO_MILLISECONDS);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [lastResendTime]);

  const canResend = countdown <= 0;

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Email not found. Please try signing up/signing in again.");
      return;
    }

    if (!canResend) {
      toast.error(
        `Please wait ${countdown} seconds before requesting another email.`
      );
      return;
    }

    setIsResending(true);
    try {
      await authClient.signIn.magicLink({
        name,
        email,
        callbackURL: "/",
      });
      setLastResendTime(Date.now());
      toast.success("Magic link sent! Check your inbox.");
    } catch {
      toast.error("Failed to resend magic link. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckVerification = async () => {
    try {
      const response = await authClient.getSession();
      if (response.data?.session) {
        toast.success("Magic link verified successfully!");
        router.push("/");
      } else {
        toast.error("Magic link not verified yet. Please check your inbox.");
      }
    } catch {
      toast.error("Failed to check magic link status.");
    }
  };

  const resendButtonContent = () => {
    if (isResending) {
      return (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Resending...
        </>
      );
    }

    if (canResend) {
      return (
        <>
          <Mail className="h-4 w-4" />
          Resend magic link
        </>
      );
    }

    return (
      <>
        <Mail className="h-4 w-4" />
        Resend in {countdown}s
      </>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="font-bold text-2xl">Check your email</h1>
                <p className="mt-2 text-balance text-muted-foreground">
                  We&apos;ve sent you a magic link to{" "}
                  <span className="font-medium">{email}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span>
                      Check your inbox (and spam folder) for the magic link
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full"
                    onClick={handleCheckVerification}
                    variant="default"
                  >
                    I&apos;ve verified my magic link
                  </Button>

                  <Button
                    className="w-full"
                    disabled={isResending || !canResend}
                    onClick={handleResendEmail}
                    variant="outline"
                  >
                    {resendButtonContent()}
                  </Button>
                </div>
              </div>

              <div className="text-center text-muted-foreground text-sm">
                Need help?{" "}
                <Link
                  className="underline underline-offset-4 hover:text-primary"
                  href="/sign-in"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>

          <div className="relative hidden flex-col items-center justify-center gap-y-5 bg-radial from-sidebar-accent to-sidebar md:flex">
            <Image alt="logo" height={92} src="/logo.svg" width={92} />
            <p className="font-semibold text-2xl text-white">Meetique</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-muted-foreground text-xs">
        The magic link will expire in 24 hours for security reasons.
      </div>
    </div>
  );
};
