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
      <main className='bg-muted flex min-h-screen w-screen flex-col'>
        <DashboardNavbar />
        <div className='mx-auto flex w-full max-w-screen-2xl flex-1 flex-col'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};
export default Layout;
