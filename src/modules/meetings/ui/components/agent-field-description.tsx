"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AgentFieldDescriptionProps {
  isDisabled: boolean;
  onCreateNewAgent: () => void;
  onCreateNewMeeting: () => void;
}

export const AgentFieldDescription = ({
  isDisabled,
  onCreateNewAgent,
  onCreateNewMeeting,
}: AgentFieldDescriptionProps) => {
  if (isDisabled) {
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="cursor-help rounded p-0 underline decoration-dotted focus:outline-none focus:ring-2 focus:ring-ring"
                type="button"
              >
                Agent is locked once the meeting starts.
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                The agent cannot be changed after a meeting has started, is
                processing, completed, or cancelled.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>{" "}
        <Button
          className="p-0"
          onClick={onCreateNewMeeting}
          type="button"
          variant="link"
        >
          Create new meeting
        </Button>
      </>
    );
  }

  return (
    <>
      Didn&apos;t find what you&apos;re looking for?{" "}
      <Button
        className="p-0"
        onClick={onCreateNewAgent}
        type="button"
        variant="link"
      >
        Create a new agent
      </Button>
    </>
  );
};
