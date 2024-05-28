'use client';

import { useEffect, useState } from 'react';

import { useZkLogin } from '@/hooks/useZkLogin';
import { restoreFullAccounts } from '@/lib/sui-related/zkLoginClient';

import { SelectedZkAccountContext } from '@/contexts/selectedZkAccountContext';
import { ZkLoginAccountsContext } from '@/contexts/zkLoginInfoContext';

function ZkLoginProvider({ children }: { children: React.ReactNode }) {
  const [zkLoginAccounts, setZkLoginAccounts] = useState<ZkLoginFullAccount[]>(
    []
  );
  const [selectedAccount, setSelectedAccount] = useState<ZkLoginFullAccount>();

  const zkLogin = useZkLogin();

  useEffect(() => {
    if (location.hash.includes('id_token')) zkLogin.handleOauthResponse();
    else {
      zkLogin.prepareOauthConnection();
      const storedAccounts = restoreFullAccounts();
      setZkLoginAccounts(storedAccounts);
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
        {children}
      </ZkLoginAccountsContext.Provider>
    </SelectedZkAccountContext.Provider>
  );
}

export default ZkLoginProvider;
