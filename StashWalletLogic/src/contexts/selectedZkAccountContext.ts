'use client';

import { createContext } from 'react';

export const SelectedZkAccount = createContext<{
  selectedZkAccount: ZkLoginFullAccount | undefined;
  setSelectedZkAccount: React.Dispatch<
    React.SetStateAction<ZkLoginFullAccount | undefined>
  >;
}>({
  selectedZkAccount: undefined,
  setSelectedZkAccount: (prev) => {
    return prev;
  },
});
