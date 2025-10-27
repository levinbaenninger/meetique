import type { ReactNode } from "react";

interface LegalListProps {
  children: ReactNode;
}

export const LegalList = ({ children }: LegalListProps) => (
  <ul className="ml-4 list-inside list-disc space-y-2 text-muted-foreground">
    {children}
  </ul>
);
