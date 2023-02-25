import React from 'react';
import { SWRConfig } from 'swr';
import WindowContextProvider from '@lib/context/windows-context';
import Sidebar from '@components/sidebar/Sidebar';
import type { ReactNode } from 'react';
export type LayoutProps = {
  children: ReactNode;
};
const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className='flex w-full justify-center gap-0 lg:gap-4'>
      <WindowContextProvider>
        <Sidebar />
        <SWRConfig value={{ fetcher: () => null }}>{children}</SWRConfig>
      </WindowContextProvider>
      <div className='Toast'></div>
    </div>
  );
};

export default MainLayout;
