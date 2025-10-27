import type { Metadata } from "next";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

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
  <SidebarProvider>
    <DashboardSidebar />
    <main className="flex min-h-screen w-screen flex-col bg-muted">
      <DashboardNavbar />
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col">
        {children}
      </div>
    </main>
  </SidebarProvider>
);
export default Layout;
