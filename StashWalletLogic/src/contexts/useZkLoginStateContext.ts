import { createContext } from 'react';

export const UseZkLoginStateContext = createContext<{
  useZkLoginState: UseZkLoginState;
  setUseZkLoginState: React.Dispatch<React.SetStateAction<UseZkLoginState>>;
}>({
  useZkLoginState: {
    isFetchingAccounts: false,
    isPromptingTransaction: false,
    transactionState: 'idle',
  },
  setUseZkLoginState: (prev) => {
    return prev;
  },
});
