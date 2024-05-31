'use client';

import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { useEffect, useState } from 'react';

import { prepareOauthConnection } from '@/lib/sui-related/zkLogin';
import {
  restoreActiveAccount,
  restoreFullAccounts,
} from '@/lib/sui-related/zkLoginClient';

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
    activeAccountSuiCoins: 0,
  });

  useEffect(() => {
    if (
      !location.hash.includes('id_token') &&
      !location.pathname.includes('/app/sign-in')
    ) {
      prepareOauthConnection();
      const storedAccounts = restoreFullAccounts();
      setZkLoginAccounts(storedAccounts);
      const restoredActiveAccount = restoreActiveAccount();
      if (restoredActiveAccount) setActiveAccount(restoredActiveAccount);
      else if (storedAccounts.length > 0) {
        setActiveAccount(storedAccounts[0]);
      }
      setZkLoginState((prev) => ({ ...prev, isInitializing: false }));
    }
  }, []);

  useEffect(() => {
    if (activeAccount) {
      const interval = setInterval(() => {
        (async () => {
          console.log('alive');
          if (activeAccount) {
            const client = new SuiClient({
              url: getFullnodeUrl('devnet'),
            });
            const tokens = await client.getCoins({
              owner: activeAccount.address,
            });
            console.log('🚀 ~ tokens:', tokens);
            setZkLoginState((prev) => ({
              ...prev,
              activeAccountSuiCoins:
                Number(tokens?.data?.[0]?.balance || 0) / 1000000000,
            }));
          }
        })();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeAccount]);

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
