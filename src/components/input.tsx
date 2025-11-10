import * as React from 'react';

import { cn } from '@/lib/classnames';

const iconClassName = 'size-4 text-muted-foreground absolute top-1/2 transform -translate-y-1/2';

export function Input({ className, type, icon, endIcon, children, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && React.cloneElement(icon, { className: cn(iconClassName, 'left-3', icon.props.className) })}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'h-[37.19px] w-full min-w-0',
          icon && 'pl-8',
          endIcon && 'pr-8',
          className,
        )}
        {...props}
      />
      {endIcon && React.cloneElement(endIcon, { className: cn(iconClassName, 'right-3', endIcon.props.className) })}
      {children}
    </div>
  );
}

export type InputProps = Omit<React.ComponentProps<'input'>, 'form'> & {
  icon?: React.ReactElement<{ className?: string }>;
  endIcon?: React.ReactElement<{ className?: string }>;
};
