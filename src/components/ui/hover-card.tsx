'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Provides a container for hover card interactions, wrapping the Radix HoverCard root element.
 *
 * All props are forwarded to the underlying Radix primitive. Adds a `data-slot="hover-card"` attribute for slot identification.
 */
function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot='hover-card' {...props} />;
}

/**
 * A trigger component that opens the hover card when interacted with.
 *
 * Wraps the Radix HoverCardPrimitive.Trigger and adds a data attribute for slot identification.
 */
function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot='hover-card-trigger' {...props} />
  );
}

/**
 * Displays the content of a hover card in a styled, animated popover.
 *
 * Renders the hover card content inside a portal with customizable alignment, offset, and additional styling. The content is visually enhanced with transitions, shadows, and rounded borders.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param align - Alignment of the popover relative to the trigger (default: 'center')
 * @param sideOffset - Offset distance from the trigger element (default: 4)
 */
function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot='hover-card-portal'>
      <HoverCardPrimitive.Content
        data-slot='hover-card-content'
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardContent,HoverCardTrigger };
