'use client';

import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { useZkLogin } from '@/hooks/useZkLogin';
import {
  handleOauthResponse,
  restoreFullAccounts,
} from '@/lib/sui-related/zkLoginClient';

import AccountAddedPage from '@/components/PageComponents/AccountAddedPage';
import AccountRestoredPage from '@/components/PageComponents/AccountRestoredPage';
import LoadingPage from '@/components/PageComponents/LoadingPage';
import NewUserPage from '@/components/PageComponents/NewUserPage';

function OauthHandling() {
  const zkLogin = useZkLogin();
  const [isInitializing, setIsInitializing] = useState(true);
  const [accounts, setAccounts] = useState<ZkLoginFullAccount[]>([]);
  const [loginStatus, setLoginStatus] =
    useState<loginStatus>('registerNewAccount');

  useEffect(() => {
    if (location.hash.includes('id_token')) {
      handleOauthResponse().then(({ status, accounts }) => {
        zkLogin.setZkLoginAccounts(restoreFullAccounts());
        zkLogin.setUseZkLoginState((prev) => ({
          ...prev,
          isInitializing: false,
        }));

        setAccounts(accounts as ZkLoginFullAccount[]);
        setLoginStatus(status);
        setIsInitializing(false);
      });
    }
  }, []);

  if (isInitializing)
    return (
      <Stack flexGrow={1} justifyContent='center' alignItems='center'>
        <LoadingPage text='Processing your account ...' />
      </Stack>
    );

  if (loginStatus === 'registerNewAccount') {
    return <NewUserPage newZkAccount={accounts[0]} />;
  }

  if (loginStatus === 'addAccount') {
    // return <NewUserPage newZkAccount={accounts[0]} />;
    return <AccountAddedPage accountAdded={accounts[0]} />;
  }

  if (loginStatus === 'restoreAccounts') {
    // return <NewUserPage newZkAccount={accounts[0]} />;
    return <AccountRestoredPage restoredAccounts={accounts} />;
  }

  return null;
}

export default OauthHandling;
