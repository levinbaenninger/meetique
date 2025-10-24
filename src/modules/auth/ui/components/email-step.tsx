import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
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

import { SocialButtons } from "./social-buttons";

const emailSchema = z.object({
  email: z.string().email(),
});

interface EmailStepProps {
  onSubmit: (email: string) => void;
  onSocialAuth: (provider: "google" | "github") => void;
  isLoading?: boolean;
  error?: string | null;
}

export const EmailStep = ({
  onSubmit,
  onSocialAuth,
  isLoading = false,
  error = null,
}: EmailStepProps) => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof emailSchema>) => {
    onSubmit(values.email);
  };

  return (
    <Form {...form}>
      <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-bold text-2xl">Welcome!</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email to continue
            </p>
          </div>

          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!!error && (
            <Alert className="border-none bg-destructive/10 text-destructive">
              <OctagonAlertIcon className="!text-destructive h-4 w-4" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>

          <SocialButtons isLoading={isLoading} onSocialAuth={onSocialAuth} />
        </div>
      </form>
    </Form>
  );
};
