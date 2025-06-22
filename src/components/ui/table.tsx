'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Renders a responsive HTML table with consistent styling and horizontal overflow handling.
 *
 * The table is wrapped in a container that enables horizontal scrolling on smaller screens. Additional class names can be provided for custom styling.
 */
function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot='table-container'
      className='relative w-full overflow-x-auto'
    >
      <table
        data-slot='table'
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

/**
 * Renders a styled table header (`<thead>`) element with a bottom border on all child rows.
 *
 * Accepts standard `<thead>` HTML props and allows additional class names for custom styling.
 */
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot='table-header'
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  );
}

/**
 * Renders a styled `<tbody>` element for use within a table.
 *
 * Removes the border from the last table row and allows additional class names and props to be applied.
 */
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot='table-body'
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

/**
 * Renders a styled table footer (`<tfoot>`) with a muted background, top border, and medium font weight.
 *
 * Applies custom styles for the last row to remove its bottom border.
 */
function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot='table-footer'
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a table row with hover and selected state styling.
 *
 * Applies background color changes on hover and when selected, along with a bottom border and color transition effects.
 */
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot='table-row'
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled table header cell (`<th>`) with consistent alignment, padding, and font styling.
 *
 * Applies additional styling for child elements with the `role="checkbox"` attribute to ensure proper alignment.
 */
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot='table-head'
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled table cell (`<td>`) element with consistent padding, vertical alignment, and optional custom classes.
 *
 * Applies special styling for child elements with the `role="checkbox"` attribute.
 */
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot='table-cell'
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled table caption element with muted text color and spacing.
 *
 * Accepts all standard HTML caption element props and allows additional custom class names.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot='table-caption'
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
