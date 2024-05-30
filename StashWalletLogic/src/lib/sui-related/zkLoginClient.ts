'use client';

import queryString from 'query-string';

import {
  addAccount,
  registerNewUser,
  signIn,
} from '@/backend/userAccountHandling';

import {
  fullAccountToFetchedAccount,
  makeZkLoginFullAccountFromPreparation,
  parseJwt,
  restoreAccountsFromFetchedAccounts,
} from './zkLogin';

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

const getAndResetUrlToken = () => {
  const tokenInUrl = queryString.parse(location.hash);
  if (!tokenInUrl?.id_token) throw new Error('id_token not found');
  const token = tokenInUrl.id_token as string;
  window.location.hash = '';
  return token;
};

export const handleOauthResponse = async (): Promise<{
  status: loginStatus;
  accounts: WalletAccount[];
}> => {
  const token = getAndResetUrlToken();
  const zkAccountPreparation = restoreAccountPreparation();
  if (!zkAccountPreparation) throw new Error('no account preparation found');

  const storedAccounts = restoreFullAccounts();

  if (storedAccounts.length === 0) {
    const fetchedAccounts = await signIn(token);
    const fetchedZkLoginAccounts: ZkLoginFetchedAccount[] =
      fetchedAccounts.accounts.map((account) => ({
        email: account.email,
        issuer: account.issuer,
        publicIdentifier: account.publicIdentifier,
        salt: account.salt,
        sub: account.sub,
        type: 'zkPartial',
        address: account.address,
      }));
    if (fetchedAccounts.accounts.length > 0) {
      // restore accounts
      const restoredAccounts = await restoreAccountsFromFetchedAccounts(
        token,
        zkAccountPreparation,
        fetchedZkLoginAccounts
      );
      saveFullAccountsWithOldsOnes(restoredAccounts);
      resetAccountPreparation();
      return {
        status: 'restoreAccounts',
        accounts: restoredAccounts,
      };
    } else {
      const newAccount = await makeZkLoginFullAccountFromPreparation(
        token,
        zkAccountPreparation
      );
      // register new account
      await registerNewUser(token, fullAccountToFetchedAccount(newAccount));
      saveFullAccountsWithOldsOnes([newAccount]);
      resetAccountPreparation();
      return {
        status: 'registerNewAccount',
        accounts: [newAccount],
      };
    }
  } else {
    // add account
    const newAccount = await makeZkLoginFullAccountFromPreparation(
      token,
      zkAccountPreparation
    );
    const firstAccountDecodedJwt = parseJwt(storedAccounts[0].jwt);
    await addAccount(
      firstAccountDecodedJwt.sub as string,
      fullAccountToFetchedAccount(newAccount)
    );
    saveFullAccountsWithOldsOnes([newAccount]);
    resetAccountPreparation();
    return {
      status: 'addAccount',
      accounts: [newAccount],
    };
  }
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

export const resetAccountPreparation = () => {
  window.localStorage.removeItem('zkLoginAccountPreparation');
};

export const saveHasSkippedSecondAccountCreation = () => {
  window.localStorage.setItem(
    'hasSkippedSecondAccountCreation',
    JSON.stringify(true)
  );
};

export const restoreHasSkippedSecondAccountCreation = () => {
  const hasSkipped = window.localStorage.getItem(
    'hasSkippedSecondAccountCreation'
  );
  return hasSkipped ? true : false;
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
