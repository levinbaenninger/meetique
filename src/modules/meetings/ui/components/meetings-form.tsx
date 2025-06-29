'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { CommandSelect } from '@/components/command-select';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NewAgentDialog } from '@/modules/agents/ui/components/new-agent-dialog';
import { createMeetingSchema } from '@/modules/meetings/schemas';
import type { Meeting } from '@/modules/meetings/types';
import { useTRPC } from '@/utils/trpc';

interface Props {
  onSuccess?: (id: string) => void;
  onCancel?: () => void;
  initialValues?: Meeting;
}

export const MeetingsForm = ({ onSuccess, onCancel, initialValues }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState('');

  const { data: agents } = useQuery(
    trpc.agents.list.queryOptions({
      limit: 100,
      search: agentSearch,
    }),
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (createdMeeting) => {
        queryClient.invalidateQueries(trpc.meetings.list.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.get.queryOptions({
              id: initialValues.id,
            }),
          );
        }

        onSuccess?.(createdMeeting.id);
      },
      onError: (error) => {
        toast.error(error.message);
        // TODO: if error is 401 or 403, redirect to sign-in or /upgrade
      },
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async (updatedMeeting) => {
        queryClient.invalidateQueries(trpc.meetings.list.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.get.queryOptions({
              id: initialValues.id,
            }),
          );
        }

        onSuccess?.(updatedMeeting.id);
      },
      onError: (error) => {
        toast.error(error.message);
        // TODO: if error is 401 or 403, redirect to sign-in
      },
    }),
  );

  const form = useForm<z.infer<typeof createMeetingSchema>>({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      agentId: initialValues?.agentId ?? '',
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof createMeetingSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({
        id: initialValues.id,
        ...values,
      });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='e.g. "Daily Standup"' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='agentId'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    {...field}
                    options={(agents?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className='flex items-center gap-x-2'>
                          <GeneratedAvatar
                            seed={agent.name}
                            variant='botttsNeutral'
                            className='size-6 border'
                          />
                          <span className='truncate text-base md:text-sm'>
                            {agent.name}
                          </span>
                        </div>
                      ),
                    }))}
                    onSelect={(value) => field.onChange(value)}
                    onSearch={(value) => setAgentSearch(value)}
                    value={field.value}
                    placeholder='Search for an agent...'
                    ariaInvalid={!!fieldState.error}
                    ariaDescribedBy={fieldState.error?.message}
                  />
                </FormControl>
                <FormDescription>
                  No found what you&apos;re looking for?{' '}
                  <Button
                    variant='link'
                    type='button'
                    onClick={() => setOpenNewAgentDialog(true)}
                    className='p-0'
                  >
                    Create a new agent
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between gap-x-2'>
            {onCancel && (
              <Button
                variant='ghost'
                disabled={isPending}
                type='button'
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button type='submit' disabled={isPending}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
