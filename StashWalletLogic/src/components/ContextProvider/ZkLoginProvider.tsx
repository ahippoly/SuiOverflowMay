'use client';

import { useEffect, useState } from 'react';

import { useZkLogin } from '@/hooks/useZkLogin';
import { restoreFullAccounts } from '@/lib/sui-related/zkLoginClient';

import { SelectedZkAccountContext } from '@/contexts/selectedZkAccountContext';
import { UseZkLoginStateContext } from '@/contexts/useZkLoginStateContext';
import { ZkLoginAccountsContext } from '@/contexts/zkLoginInfoContext';

function ZkLoginProvider({ children }: { children: React.ReactNode }) {
  const [zkLoginAccounts, setZkLoginAccounts] = useState<ZkLoginFullAccount[]>(
    []
  );
  const [selectedAccount, setSelectedAccount] = useState<ZkLoginFullAccount>();
  const [zkLoginState, setZkLoginState] = useState<UseZkLoginState>({
    isFetchingAccounts: false,
    isPromptingTransaction: false,
    transactionState: 'idle',
    hasSkippedSecondAccountCreation: false,
    isInitializing: true,
  });

  const zkLogin = useZkLogin();

  useEffect(() => {
    if (
      !location.hash.includes('id_token') &&
      !location.pathname.includes('/app/sign-in')
    ) {
      zkLogin.prepareOauthConnection();
      const storedAccounts = restoreFullAccounts();
      setZkLoginAccounts(storedAccounts);
      setZkLoginState((prev) => ({ ...prev, isInitializing: false }));
    }
  }, []);

  return (
    <SelectedZkAccountContext.Provider
      value={{
        selectedZkAccount: selectedAccount,
        setSelectedZkAccount: setSelectedAccount,
      }}
    >
      <ZkLoginAccountsContext.Provider
        value={{
          zkLoginAccounts: zkLoginAccounts,
          setZkLoginAccounts: setZkLoginAccounts,
        }}
      >
        <UseZkLoginStateContext.Provider
          value={{
            useZkLoginState: zkLoginState,
            setUseZkLoginState: setZkLoginState,
          }}
        >
          {children}
        </UseZkLoginStateContext.Provider>
      </ZkLoginAccountsContext.Provider>
    </SelectedZkAccountContext.Provider>
  );
}

export default ZkLoginProvider;
