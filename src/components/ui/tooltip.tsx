'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Provides context for tooltip components with an optional delay before showing tooltips.
 *
 * Wraps Radix UI's TooltipPrimitive.Provider and sets a customizable `delayDuration` for tooltip appearance.
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot='tooltip-provider'
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * Provides a tooltip context and renders a tooltip root element.
 *
 * Wraps the Radix UI TooltipPrimitive.Root inside a TooltipProvider to ensure consistent tooltip behavior and context.
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  );
}

/**
 * Renders an element that acts as the trigger for displaying the tooltip.
 *
 * Passes all props to the underlying Radix UI TooltipPrimitive.Trigger and adds a `data-slot` attribute for identification.
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />;
}

/**
 * Renders styled tooltip content in a portal with an arrow, supporting custom class names and side offset.
 *
 * @param className - Additional CSS classes to apply to the tooltip content
 * @param sideOffset - Distance in pixels between the tooltip and its trigger (default: 0)
 * @param children - Tooltip content to display
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn(
          'bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className='bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]' />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider,TooltipTrigger };
