'use server';

import { jwtDecode, JwtPayload } from 'jwt-decode';

import prisma from '@/lib/prisma';
import { generateUserSalt } from '@/lib/sui-related/zkLoginServer';

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

export const getOrCreateUserSalt = async (jwt: string) => {
  const decodedJwt = parseJwt(jwt);
  if (!decodedJwt.sub) {
    throw new Error('JWT sub not found');
  }

  const sub = decodedJwt.sub;

  const salts = await prisma.userSalt.findMany({
    where: {
      sub: sub,
    },
  });

  if (salts.length === 0) {
    const newSalt = await prisma.userSalt.create({
      data: {
        sub: sub,
        salt: await generateUserSalt(),
      },
    });

    return {
      salts: [newSalt.salt],
    };
  }

  return {
    salts: salts.map((salt) => salt.salt),
  };
};

export const addNewSaltToUser = async (jwt: string) => {
  const decodedJwt = parseJwt(jwt);
  if (!decodedJwt.sub) {
    throw new Error('JWT sub not found');
  }

  const sub = decodedJwt.sub;

  const newSalt = await prisma.userSalt.create({
    data: {
      sub: sub,
      salt: generateUserSalt(),
    },
  });

  return newSalt;
};
