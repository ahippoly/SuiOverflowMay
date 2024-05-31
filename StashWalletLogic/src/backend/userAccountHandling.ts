'use server';

import { Multisig, ZkAccount } from '@prisma/client';

import { fetchedAccountToZkAccount } from '@/lib/sui-related/zkLogin';

import {
  addAccountToUser,
  addMultisigToUser,
  createNewUser,
  getUserAccounts,
  getUserFromJwt,
  getUserFromSub,
  getUserMultisigs,
  getUsersFromSubs,
} from './dataBaseCalls';

export const signIn = async (
  jwt: string
): Promise<{ accounts: ZkAccount[]; multisigs: Multisig[] }> => {
  const user = await getUserFromJwt(jwt);
  if (!user) return { accounts: [], multisigs: [] };

  const accounts = await getUserAccounts(user);
  const multisigs = await getUserMultisigs(user);

  return { accounts, multisigs };
};

export const registerNewUser = async (
  jwt: string,
  newAccount: ZkLoginFetchedAccount
) => {
  const user = await getUserFromJwt(jwt);
  if (user) throw new Error('User already exists');

  // Create new user and account
  await createNewUser(newAccount);
  return true;
};

export const addAccount = async (
  otherAccountSub: string,
  newAccount: ZkLoginFetchedAccount
) => {
  const user = await getUserFromSub(otherAccountSub);
  if (!user) throw new Error('User not found');

  // Create new account
  await addAccountToUser(user, newAccount);
  return true;
};

export const addMultisig = async (
  multisigAccounts: ZkLoginFetchedAccount[]
) => {
  const potentialUsers = await getUsersFromSubs(
    multisigAccounts.map((a) => a.sub)
  );
  if (potentialUsers.length > 1)
    throw new Error('Multiple users found, Only one user should be found');
  if (potentialUsers.length === 0) throw new Error('No user found');
  const user = potentialUsers[0];

  // Create multisig
  const multisigComponents = multisigAccounts
    .map(fetchedAccountToZkAccount)
    .map((a) => ({
      ...a,
      userId: user.id,
    }));
  console.log('🚀 ~ multisigComponents:', multisigComponents);
  await addMultisigToUser(user, multisigComponents);
  return true;
};
