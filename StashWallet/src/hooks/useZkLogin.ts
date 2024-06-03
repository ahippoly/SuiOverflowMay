'use client';

import { useContext } from 'react';

import {
  ActiveAccountContext,
  SelectedZkAccountContext,
} from '@/contexts/selectedZkAccountContext';
import { UseZkLoginStateContext } from '@/contexts/useZkLoginStateContext';
import { ZkLoginAccountsContext } from '@/contexts/zkLoginInfoContext';
// export const completeZkLoginFlowAfterOauth = async () => {};

export const useZkLogin = () => {
  const { zkLoginAccounts, setZkLoginAccounts } = useContext(
    ZkLoginAccountsContext
  );

  const { activeAccount, setActiveAccount } = useContext(ActiveAccountContext);
  const { selectedAccount, setSelectedAccount } = useContext(
    SelectedZkAccountContext
  );

  const { useZkLoginState, setUseZkLoginState } = useContext(
    UseZkLoginStateContext
  );

  const removeAccount = (account: WalletAccount) => {
    if (account.type == 'zkFull') {
      setZkLoginAccounts((prev) =>
        prev.filter(
          (a) => a.address !== (account as ZkLoginFullAccount).address
        )
      );
    }
  };

  const skipSecondAccountCreation = async () => {
    setUseZkLoginState((prev) => ({
      ...prev,
      hasSkippedSecondAccountCreation: true,
    }));
  };

  // TODO: send token with active account

  return {
    zkLoginAccounts,
    setZkLoginAccounts,
    selectedAccount,
    setSelectedAccount,
    activeAccount,
    setActiveAccount,
    removeAccount,
    useZkLoginState,
    setUseZkLoginState,
    skipSecondAccountCreation,
  };
};
