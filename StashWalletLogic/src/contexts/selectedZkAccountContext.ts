'use client';

import { createContext } from 'react';

export const SelectedZkAccountContext = createContext<{
  selectedAccount: WalletAccount | undefined;
  setSelectedAccount: React.Dispatch<
    React.SetStateAction<WalletAccount | undefined>
  >;
}>({
  selectedAccount: undefined,
  setSelectedAccount: (prev) => {
    return prev;
  },
});

export const ActiveAccountContext = createContext<{
  activeAccount: WalletAccount | undefined;
  setActiveAccount: React.Dispatch<
    React.SetStateAction<WalletAccount | undefined>
  >;
}>({
  activeAccount: undefined,
  setActiveAccount: (prev) => {
    return prev;
  },
});
