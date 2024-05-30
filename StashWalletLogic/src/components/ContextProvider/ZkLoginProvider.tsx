'use client';

import { useEffect, useState } from 'react';

import { prepareOauthConnection } from '@/lib/sui-related/zkLogin';
import { restoreFullAccounts } from '@/lib/sui-related/zkLoginClient';

import {
  ActiveAccountContext,
  SelectedZkAccountContext,
} from '@/contexts/selectedZkAccountContext';
import { UseZkLoginStateContext } from '@/contexts/useZkLoginStateContext';
import { ZkLoginAccountsContext } from '@/contexts/zkLoginInfoContext';

function ZkLoginProvider({ children }: { children: React.ReactNode }) {
  const [zkLoginAccounts, setZkLoginAccounts] = useState<ZkLoginFullAccount[]>(
    []
  );
  const [activeAccount, setActiveAccount] = useState<WalletAccount>();
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount>();
  const [zkLoginState, setZkLoginState] = useState<UseZkLoginState>({
    isFetchingAccounts: false,
    isPromptingTransaction: false,
    transactionState: 'idle',
    hasSkippedSecondAccountCreation: false,
    isInitializing: true,
  });

  useEffect(() => {
    if (
      !location.hash.includes('id_token') &&
      !location.pathname.includes('/app/sign-in')
    ) {
      prepareOauthConnection();
      const storedAccounts = restoreFullAccounts();
      setZkLoginAccounts(storedAccounts);
      setZkLoginState((prev) => ({ ...prev, isInitializing: false }));
    }
  }, []);

  return (
    <ActiveAccountContext.Provider
      value={{
        activeAccount: activeAccount,
        setActiveAccount: setActiveAccount,
      }}
    >
      <SelectedZkAccountContext.Provider
        value={{
          selectedAccount: selectedAccount,
          setSelectedAccount: setSelectedAccount,
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
    </ActiveAccountContext.Provider>
  );
}

export default ZkLoginProvider;
