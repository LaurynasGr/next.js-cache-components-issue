'use client';

import React from 'react';
import { SidebarContext } from './context';

export function SidebarProvider({ defaultOpen, children }: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [rendered, setRendered] = React.useState(defaultOpen);
  const renderedRef = React.useRef(rendered);
  const toggle = React.useCallback(() => {
    setOpen((old) => {
      const newOpen = !old;
      document.cookie = `sidebar-open=${newOpen}; path=/`;
      return newOpen;
    });
  }, []);

  const toggleSidebar = React.useCallback(() => {
    if (!renderedRef.current) {
      setRendered(true);
      renderedRef.current = true;
      requestAnimationFrame(toggle);
    } else {
      toggle();
      setTimeout(() => {
        setRendered(false);
        renderedRef.current = false;
      }, 200);
    }
  }, [toggle]);

  return (
    <SidebarContext.Provider value={{ open, rendered, toggle: toggleSidebar }}>{children}</SidebarContext.Provider>
  );
}

interface SidebarProviderProps {
  defaultOpen: boolean;
  children: React.ReactNode;
}
