'use client';

import { OTPInput, OTPInputContext } from 'input-otp';
import { MinusIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Renders a customizable OTP (One-Time Password) input component with support for additional container and input styling.
 *
 * Accepts all props of the underlying `OTPInput` component, with optional class names for both the container and input elements.
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot='input-otp'
      containerClassName={cn(
        'flex items-center gap-2 has-disabled:opacity-50',
        containerClassName,
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  );
}

/**
 * Renders a flex container for grouping OTP input slots.
 *
 * Additional class names and div props can be provided for customization.
 */
function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='input-otp-group'
      className={cn('flex items-center', className)}
      {...props}
    />
  );
}

/**
 * Renders an individual OTP input slot displaying its character and active state.
 *
 * Displays the character for the specified slot index and visually indicates when the slot is active or contains a caret. Shows a blinking caret animation if the slot is focused.
 *
 * @param index - The position of the slot within the OTP input sequence
 */
function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot='input-otp-slot'
      data-active={isActive}
      className={cn(
        'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='animate-caret-blink bg-foreground h-4 w-px duration-1000' />
        </div>
      )}
    </div>
  );
}

/**
 * Renders a visual separator with a minus icon for use between OTP input slots.
 *
 * Adds accessibility attributes for screen readers and accepts all standard `div` props.
 */
function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot='input-otp-separator' role='separator' {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator,InputOTPSlot };
