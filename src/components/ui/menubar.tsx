'use client';

import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Renders the root menubar container with base styling and layout.
 *
 * Forwards all props to the underlying Radix Menubar primitive and applies a `data-slot` attribute for slot identification.
 */
function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot='menubar'
      className={cn(
        'bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Provides a styled wrapper for a menubar menu, forwarding all props to the underlying Radix primitive.
 */
function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot='menubar-menu' {...props} />;
}

/**
 * Renders a styled menubar group container, forwarding all props to the underlying Radix Group primitive.
 */
function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot='menubar-group' {...props} />;
}

/**
 * Renders a portal for menubar content, forwarding all props and adding a slot identification attribute.
 */
function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot='menubar-portal' {...props} />;
}

/**
 * Provides a styled container for grouping related radio items within a menubar.
 */
function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot='menubar-radio-group' {...props} />
  );
}

/**
 * A styled menubar trigger button that opens or closes its associated menu.
 *
 * Applies focus and open state styles, and forwards all props to the underlying Radix menubar trigger.
 */
function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot='menubar-trigger'
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the menubar dropdown content with styling, alignment, and animation.
 *
 * Displays the menu content in a portal with configurable alignment and offsets, applying transitions and visual styles for accessibility and consistency.
 *
 * @param align - Menu alignment relative to the trigger (default: 'start')
 * @param alignOffset - Offset for alignment positioning (default: -4)
 * @param sideOffset - Offset for side positioning (default: 8)
 */
function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot='menubar-content'
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md',
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  );
}

/**
 * Renders a styled menubar item with optional inset padding and variant-based coloring.
 *
 * @param inset - If true, applies additional left padding for alignment with icons or indicators.
 * @param variant - Controls the color scheme; use 'destructive' for error or dangerous actions.
 */
function MenubarItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <MenubarPrimitive.Item
      data-slot='menubar-item'
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled menubar checkbox item with an indicator icon when checked.
 *
 * Displays a check icon on the left when selected and applies focus, disabled, and layout styles. Accepts children as the item label.
 */
function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot='menubar-checkbox-item'
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

/**
 * Renders a styled menubar radio item with a left-positioned circle indicator when selected.
 *
 * Displays its children as the label and applies focus, disabled, and layout styles for consistency within a menubar.
 */
function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot='menubar-radio-item'
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

/**
 * Renders a styled menubar label with optional inset padding.
 *
 * @param inset - If true, applies additional left padding for alignment with menu items.
 */
function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.Label
      data-slot='menubar-label'
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a horizontal separator line within a menubar for visual grouping of menu items.
 *
 * Applies consistent spacing and border styling. Additional class names and props are forwarded to the underlying separator primitive.
 */
function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot='menubar-separator'
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

/**
 * Renders a styled span for displaying keyboard shortcuts within a menubar item.
 *
 * Applies muted text color, right alignment, small font size, and wide letter spacing for visual distinction.
 */
function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='menubar-shortcut'
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Provides a styled wrapper for a submenu within the menubar.
 *
 * Forwards all props to the underlying Radix UI Sub primitive and adds a data attribute for slot identification.
 */
function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot='menubar-sub' {...props} />;
}

/**
 * Renders a styled menubar sub-trigger that opens a submenu, with optional inset padding and a right-pointing chevron icon.
 *
 * @param inset - If true, applies additional left padding for visual alignment.
 */
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot='menubar-sub-trigger'
      data-inset={inset}
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto h-4 w-4' />
    </MenubarPrimitive.SubTrigger>
  );
}

/**
 * Renders a styled submenu content panel for the menubar, applying animation, positioning, and visual styles.
 *
 * Accepts all props supported by the underlying Radix SubContent primitive, along with additional class names.
 */
function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot='menubar-sub-content'
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg',
        className,
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
