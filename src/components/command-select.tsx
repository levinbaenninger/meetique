import { ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface Props {
  options: {
    id: string;
    value: string;
    children: React.ReactNode;
  }[];
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = 'Select an option',
  ariaInvalid,
  ariaDescribedBy,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <Button
        type='button'
        variant='outline'
        onClick={() => setIsOpen(true)}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className={cn(
          'hover:text-foreground h-9 justify-between px-2 font-normal',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          !selectedOption &&
            'text-muted-foreground hover:text-muted-foreground',
          className,
        )}
      >
        <span className='truncate text-base md:text-sm'>
          {selectedOption?.children ?? placeholder}
        </span>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CommandInput placeholder='Search...' onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>No options found.</CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              value={option.value}
              onSelect={() => {
                onSelect(option.value);
                onSearch?.('');
                setIsOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
