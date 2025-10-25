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

const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "Name is required" }),
});

interface NameStepProps {
  email: string;
  onSubmit: (data: { email: string; name: string }) => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const NameStep = ({
  email,
  onSubmit,
  onBack,
  isLoading = false,
  error = null,
}: NameStepProps) => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email,
      name: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof signUpSchema>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-bold text-2xl">Almost there!</h1>
            <p className="text-balance text-muted-foreground">
              All we need is your name
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
                      type="email"
                      {...field}
                      className="bg-muted"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" type="text" {...field} />
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

          <div className="flex gap-3">
            <Button
              className="flex-1"
              disabled={isLoading}
              onClick={onBack}
              type="button"
              variant="outline"
            >
              Back
            </Button>
            <Button className="flex-1" disabled={isLoading} type="submit">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
