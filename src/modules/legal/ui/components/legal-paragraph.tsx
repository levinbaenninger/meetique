import type { ReactNode } from "react";

interface LegalParagraphProps {
  children: ReactNode;
}

export const LegalParagraph = ({ children }: LegalParagraphProps) => (
  <p className="text-muted-foreground">{children}</p>
);
