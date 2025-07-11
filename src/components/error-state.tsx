import { AlertCircleIcon } from 'lucide-react';

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className='flex h-full flex-1 items-center justify-center px-8 py-4'>
      <div className='bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm'>
        <AlertCircleIcon className='text-destructive size-6' />
        <div className='flex flex-col gap-y-2 text-center'>
          <h6 className='text-lg font-medium'>{title}</h6>
          <p className='text-sm'>{description}</p>
        </div>
      </div>
    </div>
  );
};
