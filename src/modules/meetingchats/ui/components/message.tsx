import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MarkdownStyleType, MarkdownView } from '@/components/ui/markdown-view';
import { BaseMessage } from '@/modules/meetingchats/types';

interface MessageProps {
  message: BaseMessage;
  classNames?: string;
}

export const Message = ({ message, classNames }: MessageProps) => {
  return (
    <div
      className={`m-4 flex w-2/3 min-w-20 flex-col gap-2 rounded-lg bg-gray-100 p-4 text-sm ${classNames}`}
    >
      <div className='flex items-center gap-x-2'>
        <Avatar className='size-6'>
          <AvatarImage src={message.author.image} alt={message.author.name} />
        </Avatar>
        <p className='text-sm font-medium'>{message.author.name}</p>
        <p className='text-muted-foreground text-xs'>
          {message.date.toLocaleString()}
        </p>
      </div>
      <MarkdownView
        markdownText={message.message}
        type={MarkdownStyleType.TextPrimary}
      />
    </div>
  );
};
