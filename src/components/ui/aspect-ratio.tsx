'use client';

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

/**
 * A React component that maintains a consistent aspect ratio for its content.
 *
 * Wraps the Radix UI AspectRatio primitive, forwarding all props and adding a `data-slot="aspect-ratio"` attribute for styling or identification.
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot='aspect-ratio' {...props} />;
}

export { AspectRatio };
