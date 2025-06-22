'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

/**
 * A wrapper component for Radix UI's Collapsible root that adds a `data-slot="collapsible"` attribute.
 *
 * Forwards all props to the underlying Radix Collapsible root component.
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot='collapsible' {...props} />;
}

/**
 * A React component that renders a trigger for toggling the collapsible state, forwarding all props to the underlying Radix UI CollapsibleTrigger.
 *
 * Adds a `data-slot="collapsible-trigger"` attribute for identification.
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot='collapsible-trigger'
      {...props}
    />
  );
}

/**
 * A wrapper component for Radix UI's CollapsibleContent that adds a `data-slot="collapsible-content"` attribute.
 *
 * Forwards all props to the underlying Radix CollapsibleContent component.
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot='collapsible-content'
      {...props}
    />
  );
}

export { Collapsible, CollapsibleContent,CollapsibleTrigger };
