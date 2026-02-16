export interface TimestampToDateResult {
  utc: string;
  local: string;
}

export interface DateToTimestampResult {
  seconds: number;
  milliseconds: number;
  utc: string;
}

export function timestampToDate(timestamp: number): TimestampToDateResult {
  const ms = timestamp > 1e12 ? timestamp : timestamp * 1000;
  const date = new Date(ms);
  if (isNaN(date.getTime())) throw new Error('Invalid timestamp');
  return {
    utc: date.toISOString(),
    local: date.toLocaleString(undefined, {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZoneName: 'short',
    }),
  };
}

export function dateToTimestamp(dateString: string): DateToTimestampResult {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) throw new Error('Invalid date string');
  return {
    seconds: Math.floor(date.getTime() / 1000),
    milliseconds: date.getTime(),
    utc: date.toISOString(),
  };
}

export function currentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}
