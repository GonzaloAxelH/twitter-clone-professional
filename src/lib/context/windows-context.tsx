import React, { createContext, useContext, useEffect, useState } from 'react';
import type { LayoutProps } from '@components/layouts/main-layout';

type WindowSize = {
  width: number;
  height: number;
};

type WindowContext = WindowSize & {
  isMobile: boolean;
};

export const WindowContext = createContext<WindowContext | null>(null);

const WindowContextProvider = ({ children }: LayoutProps): JSX.Element => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = (): void =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const value: WindowContext = {
    ...windowSize,
    isMobile: windowSize.width < 500
  };

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};

export default WindowContextProvider;

export function useWindow(): WindowContext {
  const context = useContext(WindowContext);

  if (!context)
    throw new Error('useWindow must be used within an WindowContextProvider');

  return context;
}
