'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';

/**
 * Provides the root container for a Drawer UI, extending the base Drawer primitive with a slot identifier.
 */
function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot='drawer' {...props} />;
}

/**
 * A trigger component that opens or closes the Drawer when interacted with.
 *
 * Renders a button or element that activates the Drawer, forwarding all props and adding a slot identifier.
 */
function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot='drawer-trigger' {...props} />;
}

/**
 * Renders the portal container for the drawer, enabling content to be rendered outside the DOM hierarchy of the parent component.
 */
function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot='drawer-portal' {...props} />;
}

/**
 * A button or element that closes the drawer when activated.
 *
 * Wraps the underlying DrawerPrimitive.Close and adds a data attribute for slot identification.
 */
function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot='drawer-close' {...props} />;
}

/**
 * Renders a styled overlay behind the drawer, dimming the background and applying open/close animations.
 *
 * Merges additional class names and forwards all props to the underlying overlay primitive.
 */
function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot='drawer-overlay'
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the main content area of the drawer, applying directional styling and including an overlay.
 *
 * The content adapts its layout, size, and border radius based on the drawer's open direction (`top`, `bottom`, `left`, or `right`). A decorative handle is displayed when the drawer opens from the bottom.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param children - Elements to render inside the drawer content area
 */
function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot='drawer-portal'>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot='drawer-content'
        className={cn(
          'group/drawer-content bg-background fixed z-50 flex h-auto flex-col',
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t',
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
          className,
        )}
        {...props}
      >
        <div className='bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block' />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

/**
 * Renders the header section of the drawer with appropriate styling and slot identification.
 *
 * Applies flex layout, padding, and conditional text alignment based on the drawer's direction.
 */
function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='drawer-header'
      className={cn(
        'flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the footer section of a drawer with appropriate styling and slot identification.
 *
 * Applies margin, padding, and vertical layout to contain footer actions or content within the drawer.
 */
function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='drawer-footer'
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

/**
 * Renders the drawer title with emphasized styling and a slot identifier.
 *
 * Applies bold font and foreground color to the title, and merges any additional class names.
 */
function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot='drawer-title'
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

/**
 * Renders a styled description for the drawer, typically used to provide additional context or instructions below the title.
 *
 * Applies muted text styling and a small font size. Additional class names can be merged via the `className` prop.
 */
function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot='drawer-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
