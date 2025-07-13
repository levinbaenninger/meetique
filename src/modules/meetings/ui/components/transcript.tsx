import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTRPC } from '@/lib/trpc';

interface Props {
  meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data: transcript } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ meetingId }),
  );

  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = (transcript ?? []).filter((t) =>
    t.text.toString().toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='flex w-full flex-col gap-y-4 rounded-lg border bg-white px-4 py-5'>
      <p className='text-sm font-medium'>Transcript</p>
      <div className='relative'>
        <Input
          placeholder='Search Transcript'
          className='h-9 w-[240px] pl-7'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className='text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2' />
      </div>
      <ScrollArea>
        <div className='flex flex-col gap-y-4'>
          {filteredData.map((item) => (
            <div
              key={item.start_ts}
              className='hover:bg-muted flex flex-col gap-y-2 rounded-md border p-4'
            >
              <div className='flex items-center gap-x-2'>
                <Avatar className='size-6'>
                  <AvatarImage src={item.user.image} alt={item.user.name} />
                </Avatar>
                <p className='text-sm font-medium'>{item.user.name}</p>
                <p className='text-muted-foreground text-xs'>
                  {format(new Date(0, 0, 0, 0, 0, 0, item.start_ts), 'mm:ss')}
                </p>
              </div>
              <Highlighter
                className='text-muted-foreground text-sm'
                highlightClassName='bg-primary text-primary-foreground'
                searchWords={[searchQuery]}
                autoEscape={true}
                textToHighlight={item.text}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
