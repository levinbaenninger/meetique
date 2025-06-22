'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Renders a styled separator line, either horizontal or vertical, using Radix UI primitives.
 *
 * @param className - Additional class names to apply to the separator
 * @param orientation - The orientation of the separator, either 'horizontal' or 'vertical' (default: 'horizontal')
 * @param decorative - Whether the separator is decorative and should be hidden from assistive technologies (default: true)
 */
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot='separator'
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
