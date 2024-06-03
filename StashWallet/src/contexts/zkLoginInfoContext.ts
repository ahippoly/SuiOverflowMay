'use client';

import { createContext } from 'react';

export const ZkLoginAccountsContext = createContext<{
  zkLoginAccounts: ZkLoginFullAccount[];
  setZkLoginAccounts: React.Dispatch<
    React.SetStateAction<ZkLoginFullAccount[]>
  >;
}>({
  zkLoginAccounts: [],
  setZkLoginAccounts: (prev) => {
    return prev;
  },
});

export const MultisigAccountsContext = createContext<{
  multisigAccounts: MultiSigAccount[];
  setMultisigAccounts: React.Dispatch<React.SetStateAction<MultiSigAccount[]>>;
}>({
  multisigAccounts: [],
  setMultisigAccounts: (prev) => {
    return prev;
  },
});

export const PartialAccountsContext = createContext<{
  partialAccounts: ZkLoginFetchedAccount[];
  setPartialAccounts: React.Dispatch<
    React.SetStateAction<ZkLoginFetchedAccount[]>
  >;
}>({
  partialAccounts: [],
  setPartialAccounts: (prev) => {
    return prev;
  },
});
