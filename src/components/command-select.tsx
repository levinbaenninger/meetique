import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

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
  disabled?: boolean;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  disabled,
  ariaInvalid,
  ariaDescribedBy,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <Button
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        className={cn(
          "h-9 justify-between px-2 font-normal hover:text-foreground",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          !selectedOption &&
            "text-muted-foreground hover:text-muted-foreground",
          className
        )}
        disabled={disabled}
        onClick={() => setIsOpen(true)}
        type="button"
        variant="outline"
      >
        <span className="truncate text-base md:text-sm">
          {selectedOption?.children ?? placeholder}
        </span>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        onOpenChange={setIsOpen}
        open={isOpen}
        shouldFilter={!onSearch}
      >
        <CommandInput onValueChange={onSearch} placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No options found.</CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                onSearch?.("");
                setIsOpen(false);
              }}
              value={option.value}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
