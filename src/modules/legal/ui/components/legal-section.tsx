import type { ReactNode } from "react";

interface LegalSectionProps {
  children: ReactNode;
}

export const LegalSection = ({ children }: LegalSectionProps) => (
  <section className="space-y-4">{children}</section>
);
