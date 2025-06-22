import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Renders a navigation element for breadcrumb navigation with appropriate accessibility attributes.
 *
 * Accepts all standard `<nav>` element props.
 */
function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />;
}

/**
 * Renders an ordered list for breadcrumb items with accessible markup and default styling.
 *
 * Combines default flexbox and text styling with any additional class names provided.
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a breadcrumb list item with appropriate styling and data attributes.
 *
 * Combines default inline-flex styling with any additional classes provided.
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='breadcrumb-item'
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
}

/**
 * Renders a breadcrumb link as either an anchor element or a custom component, with styling and accessibility attributes.
 *
 * If `asChild` is true, renders the link using the `Slot` component for flexible composition; otherwise, renders a standard `<a>` element.
 *
 * @param asChild - If true, renders the link as a custom component via `Slot` instead of an `<a>` element
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot='breadcrumb-link'
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  );
}

/**
 * Renders the current page indicator in a breadcrumb navigation as a styled, accessible span.
 *
 * The element is marked with `aria-current="page"` and `aria-disabled="true"` for accessibility.
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-page'
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  );
}

/**
 * Renders a decorative separator between breadcrumb items, typically displaying a chevron icon.
 *
 * If `children` are provided, they are rendered instead of the default chevron icon. The separator is marked as presentation-only and hidden from assistive technologies.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

/**
 * Renders an ellipsis indicator with an icon and accessible label for truncated breadcrumb paths.
 *
 * Displays a horizontal ellipsis icon and includes a visually hidden "More" label for screen readers.
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className='size-4' />
      <span className='sr-only'>More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
