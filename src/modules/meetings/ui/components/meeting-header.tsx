import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const MeetingHeader = ({ meetingName, onEdit, onRemove }: Props) => {
  return (
    <div className='flex items-center justify-between'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className='text-xl font-medium'>
              <Link href='/meetings'>My Meetings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='text-xl font-medium'>
              {meetingName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={onEdit}>
            <PencilIcon className='size-4 text-black' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onRemove}
            className='text-destructive focus:text-destructive'
          >
            <TrashIcon className='text-destructive size-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
