'use client';

export const restoreFullAccounts = (): ZkLoginFullAccount[] => {
  const storedAccounts = window.localStorage.getItem('zkLoginFullAccounts');
  if (!storedAccounts) return [];
  return JSON.parse(storedAccounts);
};

export const restoreFetchedAccounts = (): ZkLoginFetchedAccount[] => {
  const storedAccounts = window.localStorage.getItem('zkLoginFetchedAccounts');
  if (!storedAccounts) return [];
  return JSON.parse(storedAccounts);
};

export const saveFetchedAccountsWithOldsOnes = (
  newFetchedAccounts: ZkLoginFetchedAccount[]
) => {
  const storedAccounts = restoreFetchedAccounts();
  for (const newAccount of newFetchedAccounts) {
    const existingAccount = storedAccounts.find(
      (account) => account.salt === newAccount.salt
    );
    if (!existingAccount) storedAccounts.push(newAccount);
  }
  window.localStorage.setItem(
    'zkLoginFetchedAccounts',
    JSON.stringify(storedAccounts)
  );
};

export const saveFullAccountsWithOldsOnes = (
  newFullAccounts: ZkLoginFullAccount[]
) => {
  const storedAccounts = restoreFullAccounts();
  for (const newAccount of newFullAccounts) {
    const existingAccount = storedAccounts.find(
      (account) => account.userSalt === newAccount.userSalt
    );
    if (!existingAccount) storedAccounts.push(newAccount);
  }
  window.localStorage.setItem(
    'zkLoginFullAccounts',
    JSON.stringify(storedAccounts)
  );
};

export const restoreAccountPreparation =
  (): ZkLoginAccountPreparation | null => {
    const storedAccountPreparation = window.localStorage.getItem(
      'zkLoginAccountPreparation'
    );
    if (!storedAccountPreparation) return null;
    return JSON.parse(storedAccountPreparation);
  };

export const saveAccountPreparation = (
  zkLoginInfo: ZkLoginAccountPreparation
) => {
  window.localStorage.setItem(
    'zkLoginAccountPreparation',
    JSON.stringify(zkLoginInfo)
  );
};
