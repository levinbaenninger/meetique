import { z } from "zod";

export const createChatSchema = z.object({
  meetingId: z.string().min(1, { message: "Meeting ID is required" }),
});

export const chatMessagesSchema = z.array(
  z.object({
    author: z.string().min(1, { message: "Author is required" }),
    date: z.date().refine((date) => !Number.isNaN(date.getTime())),
    message: z.string().min(1, { message: "Message is required" }),
  })
);

export const createChatUserMessageSchema = z.object({
  meetingChatId: z.string().min(1, { message: "Meeting chat ID is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export const generateChatAgentMessageSchema = z.object({
  meetingChatId: z.string().min(1, { message: "Meeting chat ID is required" }),
  agentId: z.string().min(1, { message: "Agent ID is required" }),
});
