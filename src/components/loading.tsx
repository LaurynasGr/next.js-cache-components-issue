'use client';

import { cn } from '@/lib/classnames';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'size-4 border-2',
  sm: 'size-6 border-2',
  md: 'size-10 border-4',
  lg: 'size-14 border-4',
  xl: 'size-18 border-4',
};

// Basic circular spinner
export function CircularSpinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div className={cn('animate-spin rounded-full border-gray-300 border-t-chart-1', sizeClasses[size], className)} />
  );
}

export function LoadingOverlay({ className, iconClassName, ...rest }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-20 flex items-center justify-center bg-background/50 rounded-[inherit]',
        className,
      )}
    >
      <CircularSpinner {...rest} className={iconClassName} />
    </div>
  );
}

interface LoadingOverlayProps extends SpinnerProps {
  iconClassName?: string;
}
