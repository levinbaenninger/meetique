import { TabsList } from '@radix-ui/react-tabs';
import { format } from 'date-fns';
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
} from 'lucide-react';
import Link from 'next/link';
import Markdown from 'react-markdown';

import { GeneratedAvatar } from '@/components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { VideoPlayer } from '@/components/ui/video-player';
import { formatDuration } from '@/lib/utils';
import { Meeting } from '@/modules/meetings/types';
import { Transcript } from '@/modules/meetings/ui/components/transcript';

interface Props {
  meeting: Meeting;
}

export const CompletedState = ({ meeting }: Props) => {
  return (
    <div className='flex flex-col gap-y-4'>
      <Tabs defaultValue='summary'>
        <div className='rounded-lg border bg-white px-3'>
          <ScrollArea>
            <TabsList className='bg-background h-13 justify-start rounded-none p-0'>
              <TabsTrigger
                value='summary'
                className='text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none'
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value='transcript'
                className='text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none'
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value='recording'
                className='text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none'
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
        <TabsContent value='summary'>
          <div className='rounded-lg border bg-white'>
            <div className='col-span-5 flex flex-col gap-y-5 px-4 py-5'>
              <h2 className='text-2xl font-medium capitalize'>
                {meeting.name}
              </h2>
              <div className='flex items-center gap-x-2'>
                <Link
                  href={`/agents/${meeting.agent.id}`}
                  className='flex items-center gap-x-2 capitalize underline underline-offset-4'
                >
                  <GeneratedAvatar
                    variant='botttsNeutral'
                    seed={meeting.agent.name}
                    className='size-6'
                  />
                  {meeting.agent.name}
                </Link>
                <p className='text-muted-foreground text-sm'>
                  {meeting.startedAt ? format(meeting.startedAt, 'PPP') : ''}
                </p>
              </div>
              <Badge
                variant='outline'
                className='flex items-center gap-x-2 [&>svg]:size-4'
              >
                <ClockFadingIcon className='text-primary' />
                {meeting.duration
                  ? formatDuration(meeting.duration)
                  : 'No duration'}
              </Badge>
              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 {...props} className='mb-6 text-2xl font-medium' />
                    ),
                    h2: (props) => (
                      <h2 {...props} className='mb-4 text-xl font-medium' />
                    ),
                    h3: (props) => (
                      <h3 {...props} className='mb-3 text-lg font-medium' />
                    ),
                    h4: (props) => (
                      <h4 {...props} className='mb-2 text-base font-medium' />
                    ),
                    p: (props) => (
                      <p
                        {...props}
                        className='text-muted-foreground mb-2 text-sm leading-relaxed'
                      />
                    ),
                    ul: (props) => (
                      <ul
                        {...props}
                        className='mb-2 list-inside list-disc pl-5'
                      />
                    ),
                    li: (props) => (
                      <li
                        {...props}
                        className='text-muted-foreground mb-0 text-sm leading-relaxed'
                      />
                    ),
                    strong: (props) => (
                      <strong
                        {...props}
                        className='text-muted-foreground font-semibold'
                      />
                    ),
                    code: (props) => (
                      <code
                        {...props}
                        className='text-muted-foreground bg-muted rounded-md px-1 py-0.5 text-sm'
                      />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        {...props}
                        className='text-muted-foreground border-primary border-l-2 pl-4'
                      />
                    ),
                    img: (props) => (
                      <img
                        {...props}
                        className='mb-2 rounded-md'
                        alt={props.alt}
                      />
                    ),
                  }}
                >
                  {meeting.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='transcript'>
          <Transcript meetingId={meeting.id} />
        </TabsContent>
        <TabsContent value='recording'>
          <div className='rounded-lg border bg-white px-4 py-5'>
            <VideoPlayer src={meeting.recordingUrl!} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
