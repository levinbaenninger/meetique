import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | Meetique",
    default: "Meetique",
  },
};

const Layout = ({ children }: Props) => (
  <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
  </div>
);

export default Layout;
