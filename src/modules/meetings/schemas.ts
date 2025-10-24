import { z } from "zod";

export const createMeetingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  agentId: z.string().min(1, { message: "Agent is required" }),
});

export const updateMeetingSchema = createMeetingSchema.extend({
  id: z.string().min(1, { message: "ID is required" }),
});
