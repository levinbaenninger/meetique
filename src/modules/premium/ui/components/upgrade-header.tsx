import type { Product } from '@polar-sh/sdk/models/components/product.js';

interface Props {
  currentSubscription: Product | null;
}

export const UpgradeHeader = ({ currentSubscription }: Props) => {
  return (
    <div>
      <h5 className='text-xl font-medium'>Your subscription</h5>
      <p className='text-muted-foreground text-sm'>
        You are on the{' '}
        <span className='text-primary font-semibold'>
          {currentSubscription?.name ?? 'Free'}
        </span>{' '}
        plan.
      </p>
    </div>
  );
};
