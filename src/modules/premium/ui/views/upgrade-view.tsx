'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/lib/trpc';

import { PricingCard } from '../components/pricing-card';
import { UpgradeHeader } from '../components/upgrade-header';

export const UpgradeView = () => {
  const trpc = useTRPC();
  const { data: subscriptions } = useSuspenseQuery(
    trpc.premium.getSubscriptions.queryOptions(),
  );

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions(),
  );

  return (
    <div className='flex flex-1 flex-col gap-y-4 p-4 md:px-8'>
      <UpgradeHeader currentSubscription={currentSubscription} />
      <div className='mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3'>
        {subscriptions.map((subscription) => {
          const isCurrentSubscription =
            subscription.id === currentSubscription?.id;
          const isPremium = !!currentSubscription;

          let buttonText = 'Upgrade';
          let onClick = () =>
            authClient.checkout({ products: [subscription.id] });

          if (isCurrentSubscription) {
            buttonText = 'Manage';
            onClick = () => authClient.customer.portal();
          } else if (isPremium) {
            buttonText = 'Change Plan';
            onClick = () => authClient.customer.portal();
          }

          return (
            <PricingCard
              key={subscription.id}
              title={subscription.name}
              description={subscription.description ?? ''}
              price={
                subscription.prices[0].amountType === 'fixed'
                  ? subscription.prices[0].priceAmount / 100
                  : 0
              }
              priceSuffix={`/${subscription.prices[0].recurringInterval}`}
              features={subscription.benefits.map(
                (benefit) => benefit.description,
              )}
              buttonText={buttonText}
              onClick={onClick}
              variant={
                subscription.metadata.variant === 'highlighted'
                  ? 'highlighted'
                  : 'default'
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export const UpgradeViewLoading = () => {
  return (
    <LoadingState
      title='Loading your subscription'
      description='Please wait while we load your subscription.'
    />
  );
};

export const UpgradeViewError = () => {
  return (
    <ErrorState
      title='Error loading your subscription'
      description='Please try again later.'
    />
  );
};
