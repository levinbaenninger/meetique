import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Renders a styled card container with base layout, background, border, and shadow.
 *
 * Spreads additional div props onto the root element for extensibility.
 */
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the header section of a Card with a grid layout and responsive styling.
 *
 * Applies specific styles for layout, spacing, and alignment, and supports an optional action slot for aligning actions to the top-right.
 */
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the title section of a card with emphasized font styling.
 *
 * Use within a CardHeader to display the main heading or title of the card.
 */
function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

/**
 * Renders descriptive text within a card, styled with muted color and smaller font size.
 *
 * Use to provide supplementary information or context inside a card layout.
 */
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

/**
 * Renders a container for card action elements, positioned at the top-right within the card header grid.
 */
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the main content area of a card with horizontal padding.
 *
 * Additional props are spread onto the root div element.
 */
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn('px-6', className)}
      {...props}
    />
  );
}

/**
 * Renders the footer section of a card with horizontal padding and flex alignment.
 *
 * Additional props are spread onto the root div element.
 */
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
