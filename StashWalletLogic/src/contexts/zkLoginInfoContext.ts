'use client';

import { createContext } from 'react';

export const ZkLoginAccountsContext = createContext<{
  zkLoginInfoByAccounts: ZkLoginInfoByAccounts;
  setZkLoginInfoByAccounts: React.Dispatch<
    React.SetStateAction<ZkLoginInfoByAccounts>
  >;
}>({
  zkLoginInfoByAccounts: [],
  setZkLoginInfoByAccounts: (prev) => {
    return prev;
  },
});
