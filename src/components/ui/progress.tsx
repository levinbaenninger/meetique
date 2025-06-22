'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Renders a customizable progress bar using Radix UI primitives.
 *
 * Displays a horizontal progress indicator whose filled portion reflects the `value` prop as a percentage. Additional props and class names are applied to the root container for further customization.
 *
 * @param value - The progress percentage to display, from 0 to 100. Defaults to 0 if not provided.
 * @returns A styled progress bar component.
 */
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className='bg-primary h-full w-full flex-1 transition-all'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
