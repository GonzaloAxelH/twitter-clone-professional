import '@styles/globals.scss';

import Head from 'next/head';
import { ThemeContextProvider } from '@lib/context/teme-context';
import { AuthContextProvider } from '@lib/context/auth-context';
import type { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps
}: AppPropsWithLayout): ReactNode {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name='og:title' content='Twitter' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='twitter:site' content='@gonzaloaxelh' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <AuthContextProvider>
        <ThemeContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  );
}
