"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/lib/trpc";
import { createAgentSchema } from "@/modules/agents/schemas";
import type { Agent } from "@/modules/agents/types";

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: Agent;
}

export const AgentsForm = ({ onSuccess, onCancel, initialValues }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.list.queryOptions({}));
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
        if (error.data?.code === "FORBIDDEN") {
          router.push("/upgrade");
        }
      },
    })
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.list.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.get.queryOptions({
              id: initialValues.id,
            })
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof createAgentSchema>>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (values: z.infer<typeof createAgentSchema>) => {
    if (isEdit) {
      updateAgent.mutate({
        id: initialValues.id,
        ...values,
      });
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          className="size-16 border"
          seed={form.watch("name")}
          variant="botttsNeutral"
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='e.g. "Math Tutor"' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='e.g. "You are a math tutor. You are helpful and friendly."'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              disabled={isPending}
              onClick={onCancel}
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
