import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { AuthBranding } from "./auth-branding";

interface AuthCardProps {
  children: ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => (
  <div className="flex flex-col gap-6">
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        {children}
        <AuthBranding />
      </CardContent>
    </Card>

    <div className="text-balance text-center text-muted-foreground text-xs *:[a]:underline-offset-8 *:[a]:hover:text-primary">
      By clicking continue, you agree to our{" "}
      <Link className="underline underline-offset-4" href="/terms">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link className="underline underline-offset-4" href="/privacy">
        Privacy Policy
      </Link>
      .
    </div>
  </div>
);
