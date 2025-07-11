import type { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: '%s | Meetique',
    default: 'Meetique',
  },
};

const Layout = ({ children }: Props) => {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>{children}</div>
    </div>
  );
};

export default Layout;
