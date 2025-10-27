import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LegalHeaderProps {
  title: string;
  lastUpdated?: string;
}

export const LegalHeader = ({
  title,
  lastUpdated = "October 27, 2025",
}: LegalHeaderProps) => (
  <div>
    <Button asChild className="mb-4" size="sm" variant="ghost">
      <Link href="/">
        <ChevronLeft /> Back to Home
      </Link>
    </Button>
    <h1 className="font-bold text-4xl">{title}</h1>
    <p className="mt-2 text-muted-foreground">Last updated: {lastUpdated}</p>
  </div>
);
