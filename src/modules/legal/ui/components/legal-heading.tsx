import type { ReactNode } from "react";

const HEADING_LEVEL_3 = 3;

interface LegalHeadingProps {
  children: ReactNode;
  level?: 2 | 3;
}

export const LegalHeading = ({ children, level = 2 }: LegalHeadingProps) => {
  if (level === HEADING_LEVEL_3) {
    return <h3 className="font-semibold text-xl">{children}</h3>;
  }

  return <h2 className="font-semibold text-2xl">{children}</h2>;
};
