import { z } from "zod";

export const createAgentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  instructions: z.string().min(1, { message: "Instructions are required" }),
});

export const updateAgentSchema = createAgentSchema.extend({
  id: z.string().min(1, { message: "ID is required" }),
});
