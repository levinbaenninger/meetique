'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
                type='button'
                className='focus:ring-ring cursor-help rounded p-0 underline decoration-dotted focus:ring-2 focus:outline-none'
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
        </TooltipProvider>{' '}
        <Button
          variant='link'
          type='button'
          onClick={onCreateNewMeeting}
          className='p-0'
        >
          Create new meeting
        </Button>
      </>
    );
  }

  return (
    <>
      Didn&apos;t find what you&apos;re looking for?{' '}
      <Button
        variant='link'
        type='button'
        onClick={onCreateNewAgent}
        className='p-0'
      >
        Create a new agent
      </Button>
    </>
  );
};
