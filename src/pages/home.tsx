import React from 'react';
import { useWindow } from '@lib/context/windows-context';
import MainLayout from '@components/layouts/main-layout';
import { HomeLayout } from '@components/layouts/common';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import type { ReactNode, ReactElement } from 'react';

const Home = (): JSX.Element => {
  const { isMobile, width, height } = useWindow();

  return (
    <MainContainer>
      <MainHeader>
        Titulo 
      </MainHeader>
      {!isMobile && <Input />}
    </MainContainer>
  );
};

Home.getLayout = (page: ReactElement): ReactNode => (
  <MainLayout>
    <HomeLayout>{page}</HomeLayout>
  </MainLayout>
);

export default Home;
