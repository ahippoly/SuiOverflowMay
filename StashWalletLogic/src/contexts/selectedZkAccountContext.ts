'use client';

import { createContext } from 'react';

export const SelectedZkAccount = createContext<{
  selectedZkAccount: ZkLoginAccount | undefined;
  setSelectedZkAccount: React.Dispatch<
    React.SetStateAction<ZkLoginAccount | undefined>
  >;
}>({
  selectedZkAccount: undefined,
  setSelectedZkAccount: (prev) => {
    return prev;
  },
});
