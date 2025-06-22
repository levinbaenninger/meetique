'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Provides the root component for an alert dialog, managing its open and close state.
 *
 * Wraps the Radix UI AlertDialog root primitive and adds a `data-slot` attribute for identification.
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />;
}

/**
 * Renders a trigger element that opens the alert dialog when activated.
 *
 * Forwards all props to the underlying trigger primitive and adds a `data-slot` attribute for identification.
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
  );
}

/**
 * Renders the portal container for the alert dialog, enabling dialog content to be rendered outside the DOM hierarchy of its parent.
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />
  );
}

/**
 * Renders the overlay backdrop for the alert dialog, covering the viewport with a semi-transparent background and animated transitions.
 *
 * Applies fixed positioning, z-index, and state-based fade animations to visually separate the dialog from the underlying content.
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot='alert-dialog-overlay'
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the main content area of the alert dialog, centered on the screen with overlay and animation effects.
 *
 * Combines default and custom class names for styling, and forwards all props to the underlying primitive.
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot='alert-dialog-content'
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

/**
 * Renders the header section of an alert dialog with vertical layout and responsive text alignment.
 *
 * Applies flexbox styling for vertical stacking and gap between elements, centering text by default and aligning left on small screens and above.
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-dialog-header'
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

/**
 * Renders a footer section for the alert dialog, typically used to contain action buttons.
 *
 * Applies responsive flexbox layout to arrange children in a column-reverse direction on small screens and a row with right alignment on larger screens.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-dialog-footer'
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the alert dialog title with appropriate styling and slot identification.
 *
 * Combines default and custom class names for typography and forwards all props to the underlying primitive.
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot='alert-dialog-title'
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
}

/**
 * Renders the description text for an alert dialog with muted styling.
 *
 * Use within an alert dialog to provide additional context or information below the title.
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot='alert-dialog-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

/**
 * Renders a styled action button for confirming an alert dialog.
 *
 * Combines default button styles with any additional class names provided.
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

/**
 * Renders a cancel button for the alert dialog, styled with the outline button variant.
 *
 * Forwards all props to the underlying Radix AlertDialogPrimitive.Cancel component and supports custom class names.
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
