import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Call",
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="flex h-screen w-screen flex-col bg-foreground">
    {children}
  </div>
);
export default Layout;
