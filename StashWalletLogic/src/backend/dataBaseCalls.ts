'use server';

import { Multisig, User, ZkAccount } from '@prisma/client';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import prisma from '@/lib/prisma';

const parseJwt = (jwt: string): JwtPayload => {
  if (!jwt) {
    throw new Error('JWT not provided');
  }

  const decodedJwt = jwtDecode(jwt);
  if (!decodedJwt) {
    throw new Error('JWT not decoded');
  }

  if (!decodedJwt.sub) {
    throw new Error('JWT sub not found');
  }

  return decodedJwt;
};

export const getUserFromJwt = async (jwt: string) => {
  const decodedJwt = parseJwt(jwt);
  if (!decodedJwt.sub) {
    throw new Error('JWT sub not found');
  }

  const sub = decodedJwt.sub;

  const user = await prisma.user.findFirst({
    where: {
      zkAccounts: {
        some: {
          sub: sub,
        },
      },
    },
  });

  return user;
};

export const getUserFromSub = async (sub: string) => {
  const user = await prisma.user.findFirst({
    where: {
      zkAccounts: {
        some: {
          sub: sub,
        },
      },
    },
  });

  return user;
};

export const getUsersFromSubs = async (subs: string[]) => {
  const users = await prisma.user.findMany({
    where: {
      zkAccounts: {
        some: {
          sub: {
            in: subs,
          },
        },
      },
    },
  });

  return users;
};

export const getUserAccounts = async (user: User): Promise<ZkAccount[]> => {
  const zkAccounts = await prisma.zkAccount.findMany({
    where: {
      userId: user.id,
    },
  });

  return zkAccounts;
};

export const getUserMultisigs = async (user: User): Promise<Multisig[]> => {
  const multisigs = await prisma.multisig.findMany({
    where: {
      userId: user.id,
    },
  });

  return multisigs;
};

export const createNewUser = async (newAccount: ZkAccount) => {
  const user = await prisma.user.create({
    data: {
      zkAccounts: {
        create: newAccount,
      },
    },
  });

  return user;
};

export const addAccountToUser = async (user: User, newAccount: ZkAccount) => {
  const account = await prisma.zkAccount.create({
    data: {
      ...newAccount,
      userId: user.id,
    },
  });

  return account;
};

export const addMultisigToUser = async (
  user: User,
  multisigComponents: ZkAccount[]
) => {
  const multisig = await prisma.multisig.create({
    data: {
      userId: user.id,
      components: {
        create: multisigComponents,
      },
    },
  });

  return multisig;
};
