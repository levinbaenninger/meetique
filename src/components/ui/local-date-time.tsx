'use client';

function LocalDateTime({ date }: { date: Date }) {
  const localDate = new Date(date);
  return (
    <time dateTime={date.toISOString()}>
      {localDate.toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })}
    </time>
  );
}

export { LocalDateTime };
