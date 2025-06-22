import { cn } from '@/lib/utils';

/**
 * Renders a skeleton loading placeholder as a `div` with animated and styled appearance.
 *
 * Combines default skeleton styles with any additional classes provided via the `className` prop. All other standard `div` props are supported and passed through.
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
