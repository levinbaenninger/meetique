import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import * as React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Renders a navigation container for pagination controls with appropriate ARIA attributes and customizable styling.
 */
function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role='navigation'
      aria-label='pagination'
      data-slot='pagination'
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

/**
 * Renders a flexbox-styled unordered list for pagination items.
 *
 * Applies horizontal layout and spacing for child pagination components.
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

/**
 * Renders a list item for use within a pagination component.
 *
 * Adds a data attribute for slot identification and passes through additional props.
 */
function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='pagination-item' {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>;

/**
 * Renders a pagination link styled as a button, supporting active state indication and customizable size.
 *
 * @param isActive - Whether the link represents the current page
 * @param size - The button size; defaults to "icon"
 * @returns An anchor element styled as a pagination button, with ARIA attributes for accessibility
 */
function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot='pagination-link'
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a pagination control for navigating to the previous page.
 *
 * Displays a left-chevron icon and a "Previous" label (visible on small screens and above). Sets an accessible label for screen readers.
 */
function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className='hidden sm:block'>Previous</span>
    </PaginationLink>
  );
}

/**
 * Renders a pagination link for navigating to the next page, including a right-chevron icon and an accessible label.
 *
 * Displays the "Next" label on small screens and above, alongside a chevron icon.
 */
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label='Go to next page'
      size='default'
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className='hidden sm:block'>Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

/**
 * Renders an ellipsis indicator for omitted pages in a pagination control.
 *
 * Displays a horizontal dots icon and includes screen-reader-only text for accessibility.
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot='pagination-ellipsis'
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className='size-4' />
      <span className='sr-only'>More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
