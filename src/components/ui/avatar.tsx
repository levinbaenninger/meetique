'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Renders a styled container for displaying a user avatar.
 *
 * Combines default avatar layout and sizing styles with any additional classes provided. Forwards all other props to the underlying Radix UI Avatar root element.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders an avatar image with a fixed square aspect ratio and fills the container.
 *
 * Combines default styling with any additional classes provided. Forwards all other props to the underlying Radix UI Avatar image primitive.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot='avatar-image'
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  );
}

/**
 * Displays a fallback element within the avatar when the image cannot be loaded.
 *
 * Renders a styled container for fallback content, such as initials or an icon, centered within the avatar.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback,AvatarImage };
