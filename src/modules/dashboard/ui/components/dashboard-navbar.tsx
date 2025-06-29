'use client';

import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { DashboardCommand } from '@/modules/dashboard/ui/components/dashboard-command';

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className='bg-background flex items-center gap-x-2 border-b px-4 py-3'>
        <Button className='size-9' variant='outline' onClick={toggleSidebar}>
          {state === 'collapsed' || isMobile ? (
            <PanelLeftIcon className='size-4' />
          ) : (
            <PanelLeftCloseIcon className='size-4' />
          )}
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setCommandOpen(true)}
          className='text-muted-foreground hover:text-muted-foreground h-9 w-[240px] justify-start font-normal'
        >
          <SearchIcon />
          <span className='text-sm'>Search</span>
          <kbd className='bg-muted text-muted-foreground pointer-events-none ml-auto inline-flex h-5 items-center gap-0.5 rounded border px-1.5 font-mono text-xs select-none'>
            <span>&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
