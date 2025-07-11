'use client';

import { BotIcon, StarIcon, VideoIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { DashboardUserButton } from '@/modules/dashboard/ui/components/dashboard-user-button';

import { DashboardTrial } from './dashboard-trial';

const featureSection = [
  {
    icon: VideoIcon,
    label: 'Meetings',
    href: '/meetings',
  },
  {
    icon: BotIcon,
    label: 'Agents',
    href: '/agents',
  },
];

const pricingSection = [
  {
    icon: StarIcon,
    label: 'Upgrade',
    href: '/upgrade',
  },
];

const groups = [
  {
    label: 'Features',
    items: featureSection,
  },
  {
    label: 'Pricing',
    items: pricingSection,
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <Sidebar>
      <SidebarHeader className='text-sidebar-accent-foreground'>
        <Link href='/' className='flex items-center gap-2 px-2 pt-2'>
          <Image src='/logo.svg' alt='logo' width={36} height={36} />
          <p className='text-2xl font-bold'>Meetique</p>
        </Link>
      </SidebarHeader>
      <div className='px-4 py-2'>
        <Separator className='text-sidebar-muted opacity-10' />
      </div>
      <SidebarContent>
        {groups.map((group, index) => (
          <React.Fragment key={group.label}>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          'from-sidebar-accent via-sidebar/50 to-sidebar/50 hover:border-sidebar-muted/10 h-10 border border-transparent from-5% via-30% hover:bg-linear-to-r/oklch',
                          isActive(item.href) &&
                            'border-sidebar-muted/10 bg-linear-to-r/oklch',
                        )}
                        isActive={isActive(item.href)}
                      >
                        <Link href={item.href}>
                          <item.icon className='size-5' />
                          <span className='text-sm font-medium tracking-tight'>
                            {item.label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {index !== groups.length - 1 && (
              <div className='px-4 py-2' key={`${group.label}-separator`}>
                <Separator className='text-sidebar-muted opacity-10' />
              </div>
            )}
          </React.Fragment>
        ))}
      </SidebarContent>
      <SidebarFooter className='text-white'>
        <DashboardTrial />
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
