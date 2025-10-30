import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/lib/trpc";
import { createChatUserMessageSchema } from "@/modules/meetingchats/schemas";
import { Message } from "@/modules/meetingchats/ui/components/message";
import type { Meeting } from "@/modules/meetings/types";

interface Props {
  meeting: Meeting;
}

export const MeetingChat = ({ meeting }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: chats } = useSuspenseQuery(
    trpc.meetings.chats.getChats.queryOptions({ meetingId: meeting.id })
  );

  const chat = chats[0] ?? null;

  const { data: messages } = useSuspenseQuery(
    trpc.meetings.chats.getMessages.queryOptions({
      meetingChatId: chat?.id ?? "",
    })
  );

  const createChatMutation = useMutation(
    trpc.meetings.chats.createChat.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.chats.getChats.queryOptions({ meetingId: meeting.id })
        );
      },
      onError: (error) => {
        toast.error(error.message);
        if (error.data?.code === "FORBIDDEN") {
          router.push("/upgrade");
        }
      },
    })
  );

  const createChatHandler = () => {
    createChatMutation.mutate({ meetingId: meeting.id });
  };

  const generateAgentMessageMutation = useMutation(
    trpc.meetings.chats.generateAgentMessage.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.chats.getMessages.queryOptions({
            meetingChatId: chat?.id || "",
          })
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );
      },
      onError: (error) => {
        toast.error(error.message);
        if (error.data?.code === "FORBIDDEN") {
          router.push("/upgrade");
        }
      },
    })
  );

  const createUserMessageMutation = useMutation(
    trpc.meetings.chats.createUserMessage.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.chats.getMessages.queryOptions({
            meetingChatId: chat?.id || "",
          })
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );
        form.reset();
        if (!chat) {
          return;
        }
        generateAgentMessageMutation.mutate({
          meetingChatId: chat.id,
          agentId: meeting.agentId,
        });
        const messagesScrollArea = document.getElementById(
          "messages-scroll-area"
        );
        const messagesScrollAreaBottom = document.getElementById(
          "messages-scroll-area-bottom"
        );
        if (messagesScrollArea && messagesScrollAreaBottom) {
          messagesScrollArea.scrollTo({
            top: messagesScrollAreaBottom.offsetTop,
            behavior: "smooth",
          });
        }
      },
      onError: (error) => {
        toast.error(error.message);
        if (error.data?.code === "FORBIDDEN") {
          router.push("/upgrade");
        }
      },
    })
  );

  const form = useForm<z.infer<typeof createChatUserMessageSchema>>({
    resolver: zodResolver(createChatUserMessageSchema),
    defaultValues: {
      meetingChatId: chat?.id,
      message: "",
    },
  });

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-4">
        <EmptyState
          description="Create a chat to ask questions about the meeting and get answers from the agent."
          title="No chat created yet or access denied"
        />
        <Button onClick={createChatHandler}>Create chat</Button>
      </div>
    );
  }

  let messageComponent: React.ReactNode;
  if (messages.length === 0) {
    messageComponent = (
      <div className="flex flex-col items-center justify-center gap-y-4">
        <EmptyState
          description="Ask questions about the meeting and get answers from the agent."
          title="No messages yet"
        />
      </div>
    );
  } else {
    messageComponent = (
      <ScrollArea
        className="h-auto max-h-full w-full flex-col overflow-y-auto"
        id="messages-scroll-area"
      >
        {messages.map((message) => (
          <Message
            classNames={
              message.author.isCurrentUser
                ? "justify-self-end"
                : "justify-self-start"
            }
            key={`${message.author.type}_${message.author.name}_${message.date.toISOString()}`}
            message={message}
          />
        ))}
        <div id="messages-scroll-area-bottom" />
      </ScrollArea>
    );
  }

  const onSubmit = (values: z.infer<typeof createChatUserMessageSchema>) => {
    createUserMessageMutation.mutate({
      meetingChatId: chat.id,
      message: values.message,
    });
  };

  return (
    <div className="flex h-[calc(100vh-250px)] w-full flex-col gap-y-8 rounded-lg bg-white px-4 py-5">
      {messageComponent}
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-row gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormControl>
                    <Textarea
                      className="w-full"
                      {...field}
                      placeholder="Ask questions about the meeting..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={createUserMessageMutation.isPending}
              type="submit"
            >
              <SendIcon />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
