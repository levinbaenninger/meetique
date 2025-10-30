import type { ReactNode } from "react";

interface LegalContentProps {
  children: ReactNode;
}

export const LegalContent = ({ children }: LegalContentProps) => (
  <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
    {children}
  </div>
);
