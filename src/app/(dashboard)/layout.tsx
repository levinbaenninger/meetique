import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardNavbar } from '@/modules/dashboard/ui/components/dashboard-navbar';
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className='bg-muted w-screen'>
        <DashboardNavbar />
        <div className='mx-auto flex h-screen w-full max-w-screen-2xl flex-col'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};
export default Layout;
