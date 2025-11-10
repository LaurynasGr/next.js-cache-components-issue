'use client';

import { Suspense } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/classnames';

const preventDefault = (e: React.MouseEvent) => e.preventDefault();

function NavLink({
  className,
  activeClassName,
  hoverClassName,
  exactMatch,
  children,
  activeChildren,
  ...rest
}: LinkProps) {
  const pathName = usePathname();
  const isActive = exactMatch ? pathName === rest.href : pathName.startsWith(rest.href);

  return (
    <NextLink
      className={cn(className, isActive ? activeClassName : hoverClassName)}
      data-active={isActive ? 'true' : undefined}
      {...rest}
    >
      {children}
      {isActive && activeChildren}
    </NextLink>
  );
}

export function SuspendedNavLink(props: NavLinkActiveProps & LinkProps) {
  // These would be unrecognized props by NextLink, so we need to destructure them
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { activeClassName, hoverClassName, activeChildren, exactMatch, ...rest } = props;
  return (
    <Suspense fallback={<NextLink {...rest} />}>
      <NavLink {...props} />
    </Suspense>
  );
}

export function Link({ className, disabled, onClick, router, ...rest }: LinkProps) {
  // For cacheComponents: true, we need to use `SuspendedNavLink` instead of `NavLink`
  const LinkComponent = rest.activeClassName || router ? NavLink : NextLink;
  const isDisabled = disabled;
  return (
    <LinkComponent
      onClick={isDisabled ? preventDefault : onClick}
      className={cn('underline-offset-2', isDisabled && 'opacity-50 cursor-not-allowed', className)}
      prefetch={false}
      {...rest}
    />
  );
}

export interface NavLinkActiveProps {
  activeClassName?: string;
  hoverClassName?: string;
  activeChildren?: React.ReactNode;
  exactMatch?: boolean;
  router?: boolean;
}

export interface LinkProps extends React.ComponentProps<typeof NextLink>, NavLinkActiveProps {
  href: string;
  disabled?: boolean;
}
