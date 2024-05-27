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
