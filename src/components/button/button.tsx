'use client';

import React, { type ButtonHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/classnames';
import { useIsMountedRef } from '@/lib/mounted';
import { CircularSpinner } from '../loading';
import { buttonVariants } from './variants';

export function Button({
  className,
  variant,
  size = variant === 'text' ? 'none' : 'default',
  loading,
  children,
  disabled,
  onClick,
  async,
  ...rest
}: ButtonProps) {
  const [internalLoading, setIsLoading] = React.useState(false);
  const isLoading = loading || internalLoading;
  const buttonDisabled = disabled || isLoading;
  const isMountedRef = useIsMountedRef();
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonDisabled) {
      return event.preventDefault();
    }

    if (onClick) {
      try {
        if (async && isMountedRef.current) {
          setIsLoading(true);
        }
        await onClick(event);
      } finally {
        if (async && isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      disabled={buttonDisabled}
      data-slot="button"
      {...rest}
      // Overriding the original to not add `false` value to `aria-disabled` attribute
      aria-disabled={rest['aria-disabled'] === true || rest['aria-disabled'] === 'true' ? true : undefined}
    >
      {isLoading && <CircularSpinner className="mr-1" size="sm" />}
      {children}
    </button>
  );
}

type BaseButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick'>;

export interface ButtonProps extends BaseButtonProps, VariantProps<typeof buttonVariants> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  loading?: boolean;
  async?: boolean;
  /**
   * If true, the button will be appear disabled but will still be clickable.
   */
  'aria-disabled'?: ButtonHTMLAttributes<HTMLButtonElement>['aria-disabled'];
}

Button.displayName = 'Button';
