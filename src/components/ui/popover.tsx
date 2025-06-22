'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Provides the root context for a popover, enabling controlled or uncontrolled open/close state and configuration.
 *
 * Wraps the Radix UI Popover root component and adds a `data-slot="popover"` attribute for identification.
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />;
}

/**
 * Renders a popover trigger element that opens or closes the popover when interacted with.
 *
 * Forwards all props to the underlying Radix UI Popover Trigger component and adds a `data-slot="popover-trigger"` attribute for identification.
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
}

/**
 * Displays the popover content in a styled portal with customizable alignment and offset.
 *
 * Renders the popover's content inside a React portal, applying default and custom styles, and allowing control over alignment and side offset.
 *
 * @param className - Additional CSS classes to apply to the popover content
 * @param align - Alignment of the popover content relative to its trigger (default: 'center')
 * @param sideOffset - Offset distance from the trigger element (default: 4)
 */
function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot='popover-content'
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

/**
 * Renders a popover anchor element, serving as a reference point for popover positioning.
 *
 * Forwards all props to the underlying Radix UI Popover Anchor component and adds a `data-slot="popover-anchor"` attribute.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />;
}

export { Popover, PopoverAnchor,PopoverContent, PopoverTrigger };
