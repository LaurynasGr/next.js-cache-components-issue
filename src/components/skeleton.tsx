import { cva, type VariantProps } from 'class-variance-authority';

const skeletonVariants = cva('animate-pulse rounded-md', {
  variants: {
    color: {
      light: 'bg-gray-100 dark:bg-gray-800',
      medium: 'bg-gray-200 dark:bg-gray-700',
      dark: 'bg-gray-300 dark:bg-gray-600',
    },
  },
  defaultVariants: {
    color: 'light',
  },
});

export function Skeleton({ className, color, ...props }: SkeletonProps) {
  return <div className={skeletonVariants({ color, className })} data-slot="skeleton" {...props} />;
}

type SkeletonProps = React.ComponentProps<'div'> & VariantProps<typeof skeletonVariants>;
