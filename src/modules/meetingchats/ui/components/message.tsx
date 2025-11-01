import { clsx } from "clsx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LocalDateTime } from "@/components/ui/local-date-time";
import { MarkdownStyleType, MarkdownView } from "@/components/ui/markdown-view";
import type { BaseMessage } from "@/modules/meetingchats/types";

interface MessageProps {
  message: BaseMessage;
  classNames?: string;
}

export const Message = ({ message, classNames }: MessageProps) => (
  <div
    className={clsx(
      "m-4 flex w-2/3 min-w-20 flex-col gap-2 rounded-lg bg-gray-100 p-4 text-sm",
      classNames
    )}
  >
    <div className="flex items-center gap-x-2">
      <Avatar className="size-6">
        <AvatarImage alt={message.author.name} src={message.author.image} />
        <AvatarFallback>
          {message.author.name
            .split(" ")
            .map((value) => value.charAt(0))
            .slice(0, 2)
            .join("")}
        </AvatarFallback>
      </Avatar>
      <p className="font-medium text-sm">{message.author.name}</p>
      <p className="text-muted-foreground text-xs">
        <LocalDateTime date={message.date} />
      </p>
    </div>
    <MarkdownView
      markdownText={message.message}
      type={MarkdownStyleType.TextPrimary}
    />
  </div>
);
