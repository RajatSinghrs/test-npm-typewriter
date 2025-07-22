import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: 'running' | 'paused' | 'stopped' | 'idle';
  className?: string;
}

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        'status-indicator',
        `status-${status}`,
        className
      )}
    />
  );
}
