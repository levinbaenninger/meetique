import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => (
  <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
    <EmptyState
      description="This meeting has been cancelled."
      image="/cancelled.svg"
      title="Meeting is cancelled"
    />
  </div>
);
