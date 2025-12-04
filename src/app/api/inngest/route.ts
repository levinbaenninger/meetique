import { serve } from "inngest/next";

import { inngest } from "@/inngest/client";
import { functionGenerateAgentMessage } from "@/inngest/functions/function-recall-assistant";
import { functionSummarizer } from "@/inngest/functions/function-summarizer";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [functionSummarizer, functionGenerateAgentMessage],
});
