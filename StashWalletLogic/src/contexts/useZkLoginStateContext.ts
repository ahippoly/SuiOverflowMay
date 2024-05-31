import { createContext } from 'react';

export const UseZkLoginStateContext = createContext<{
  useZkLoginState: UseZkLoginState;
  setUseZkLoginState: React.Dispatch<React.SetStateAction<UseZkLoginState>>;
}>({
  useZkLoginState: {
    isFetchingAccounts: false,
    isPromptingTransaction: false,
    transactionState: 'idle',
    isInitializing: false,
    hasSkippedSecondAccountCreation: false,
    activeAccountSuiCoins: 0,
  },
  setUseZkLoginState: (prev) => {
    return prev;
  },
});
