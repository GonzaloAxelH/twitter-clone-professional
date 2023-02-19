import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@lib/context/auth-context';

import { sleep } from '@lib/utils';
import { Placeholder } from '@components/common/placeholder';
import type { FC, ReactNode } from 'react';
export type LayoutProps = {
  children: ReactNode;
};

const AuthLayout: FC<LayoutProps> = ({ children }): JSX.Element => {
  const [pending, setPending] = useState(true);
  const { user, loading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      setPending(true);

      if (user) {
        await sleep(500);
        void replace('/home');
      } else if (!loading) {
        await sleep(500);
        setPending(false);
      }
    };

      void checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading || pending) return <Placeholder />;

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthLayout;
