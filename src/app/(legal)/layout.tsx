import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal information for Meetique",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-12">{children}</div>
    </div>
  );
}
