'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/lib/trpc';
import { AuthCard } from '@/modules/auth/ui/components/auth-card';
import { EmailStep } from '@/modules/auth/ui/components/email-step';
import { NameStep } from '@/modules/auth/ui/components/name-step';

type Step = 'email' | 'name';

export const AuthView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [step, setStep] = useState<Step>('email');
  const [userEmail, setUserEmail] = useState('');
  const [shouldCheckUser, setShouldCheckUser] = useState(false);

  const trpc = useTRPC();

  const { data: userExistsResult, isLoading: isCheckingUser } = useQuery({
    ...trpc.auth.checkUserExists.queryOptions({ email: userEmail }),
    enabled: shouldCheckUser && !!userEmail,
  });

  useEffect(() => {
    if (shouldCheckUser && userExistsResult && !isCheckingUser) {
      setShouldCheckUser(false);

      if (userExistsResult.exists) {
        authClient.signIn.magicLink(
          {
            email: userEmail,
            callbackURL: '/',
          },
          {
            onSuccess: () => {
              router.push(
                `/check-email?email=${encodeURIComponent(userEmail)}`,
              );
            },
            onError: ({ error }) => {
              setError(error.message);
              setIsPending(false);
            },
          },
        );
      } else {
        setStep('name');
        setIsPending(false);
      }
    }
  }, [shouldCheckUser, userExistsResult, isCheckingUser, userEmail, router]);

  const handleEmailSubmit = (email: string) => {
    setError(null);
    setIsPending(true);
    setUserEmail(email);
    setShouldCheckUser(true);
  };

  const handleNameSubmit = (data: { email: string; name: string }) => {
    setError(null);
    setIsPending(true);

    authClient.signIn.magicLink(
      {
        name: data.name,
        email: data.email,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          router.push(
            `/check-email?email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.name)}`,
          );
        },
        onError: ({ error }) => {
          setError(error.message);
          setIsPending(false);
        },
      },
    );
  };

  const handleSocialAuth = (provider: 'google' | 'github') => {
    setError(null);
    setIsPending(true);

    authClient.signIn.social(
      { provider, callbackURL: '/' },
      {
        onError: ({ error }) => {
          setError(error.message);
          setIsPending(false);
        },
      },
    );
  };

  const handleBack = () => {
    setStep('email');
    setError(null);
    setIsPending(false);
    setShouldCheckUser(false);
  };

  const isLoading = isPending || isCheckingUser;

  return (
    <AuthCard>
      {step === 'email' ? (
        <EmailStep
          onSubmit={handleEmailSubmit}
          onSocialAuth={handleSocialAuth}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <NameStep
          email={userEmail}
          onSubmit={handleNameSubmit}
          onBack={handleBack}
          isLoading={isLoading}
          error={error}
        />
      )}
    </AuthCard>
  );
};
