import { Loader2Icon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: Props) => (
  <div className="flex h-full flex-1 items-center justify-center px-8 py-4">
    <div className="flex flex-col items-center justify-center gap-y-6 rounded-lg bg-background p-10 shadow-sm">
      <Loader2Icon className="size-6 animate-spin text-primary" />
      <div className="flex flex-col gap-y-2 text-center">
        <h6 className="font-medium text-lg">{title}</h6>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  </div>
);
