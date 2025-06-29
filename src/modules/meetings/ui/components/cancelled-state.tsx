import { EmptyState } from '@/components/empty-state';

export const CancelledState = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5'>
      <EmptyState
        image='/cancelled.svg'
        title='Meeting is cancelled'
        description='This meeting has been cancelled.'
      />
    </div>
  );
};
