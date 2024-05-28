import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { MultiSigPublicKey } from '@mysten/sui.js/multisig';
import {
  toZkLoginPublicIdentifier,
  ZkLoginPublicIdentifier,
} from '@mysten/sui.js/zklogin';
import { genAddressSeed, generateNonce, jwtToAddress } from '@mysten/zklogin';
import { ZkAccount } from '@prisma/client';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { getCurrentEpoch } from '@/lib/sui-related/utils';

import { OauthTypes } from '@/enums/OauthTypes.enum';

export const generateZkLoginNonce = async (
  randomness: string,
  ephemeralKeyPair: Ed25519Keypair
) => {
  const epochInfo = await getCurrentEpoch();

  const maxEpoch = Number(epochInfo.epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
  const nonce = generateNonce(
    ephemeralKeyPair.getPublicKey(),
    maxEpoch,
    randomness
  );

  return nonce;
};

export const fetchedAccountToZkAccount = (
  fetchedAccount: ZkLoginFetchedAccount
): Omit<ZkAccount, 'userId'> => ({
  sub: fetchedAccount.sub,
  email: fetchedAccount.email,
  issuer: fetchedAccount.issuer,
  salt: fetchedAccount.salt,
  publicIdentifier: fetchedAccount.publicIdentifier,
});

export const parseJwt = (jwt: string): JwtPayload => {
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

export const fullAccountToFetchedAccount = (
  fullAccount: ZkLoginFullAccount
): ZkLoginFetchedAccount => {
  const decodedJwt = jwtDecode(fullAccount.jwt) as ExtendedJwtPayload;
  return {
    sub: decodedJwt.sub as string,
    email: decodedJwt.email as string,
    salt: fullAccount.userSalt,
    issuer: fullAccount.issuer,
    publicIdentifier: fullAccount.publicIdentifier,
    type: 'zkPartial',
  };
};

export const getOauthTypeFromJwt = (jwt: string): OauthTypes | null => {
  const decodedJwt = jwtDecode(jwt);
  if (!decodedJwt.iss) return null;

  switch (decodedJwt.iss) {
    case 'https://accounts.google.com':
      return OauthTypes.google;
    case 'https://www.facebook.com':
      return OauthTypes.facebook;
    default:
      return null;
  }
};

export const fetchZkProof = async (zkLoginInfo: ZkLoginAccount) => {
  const jwt = zkLoginInfo.persistentInfo.jwt;
  const userSalt = zkLoginInfo.persistentInfo.userSalt;
  if (!jwt || !userSalt) return new Error('jwt or userSalt is missing');
  const zkLoginAddress = jwtToAddress(jwt, userSalt);

  const zkProof = (await generateZkProof(
    jwt,
    zkLoginInfo.ephemeralInfo.ephemeralExtendedPublicKey,
    userSalt,
    zkLoginInfo.ephemeralInfo.randomness,
    zkLoginInfo.persistentInfo.maxEpoch
  )) as ZkProofSui;

  return { zkProof, zkLoginAddress };
};

export const getZkLoginPublicIdentifier = (zkLoginInfo: ZkLoginAccount) => {
  if (!zkLoginInfo.persistentInfo.jwt) return null;
  const decodedJwt = jwtDecode(zkLoginInfo.persistentInfo.jwt);
  if (!decodedJwt.sub || !decodedJwt.aud || !decodedJwt.iss) return null;
  if (!zkLoginInfo.persistentInfo.userSalt) return null;
  const addressSeed = genAddressSeed(
    zkLoginInfo.persistentInfo.userSalt,
    'sub',
    decodedJwt.sub,
    decodedJwt.aud as string
  );

  const pkZklogin = toZkLoginPublicIdentifier(addressSeed, decodedJwt.iss);
  return pkZklogin;
};

export const restoreAccountsFromFetchedAccounts = async (
  jwt: string,
  accountPreparation: ZkLoginAccountPreparation,
  fetchedAccounts: ZkLoginFetchedAccount[]
): Promise<ZkLoginFullAccount[]> => {
  const decodedJwt = jwtDecode(jwt) as ExtendedJwtPayload;
  if (!decodedJwt.sub || !decodedJwt.aud || !decodedJwt.iss)
    throw new Error('JWT sub, aud, or iss not found');

  const provider = getOauthTypeFromJwt(jwt);
  if (!provider) throw new Error('Provider not found');

  const restoredAccounts: ZkLoginFullAccount[] = [];
  for (const fetchedAccount of fetchedAccounts) {
    if (
      fetchedAccount.sub !== decodedJwt.sub ||
      fetchedAccount.email !== decodedJwt.email ||
      fetchedAccount.issuer !== decodedJwt.iss
    )
      continue;

    const address = jwtToAddress(jwt, fetchedAccount.salt);
    const addressSeed = genAddressSeed(
      fetchedAccount.salt,
      'sub',
      decodedJwt.sub,
      decodedJwt.aud as string
    );
    const pkZklogin = toZkLoginPublicIdentifier(addressSeed, decodedJwt.iss);

    const zkProof = await generateZkProof(
      jwt,
      accountPreparation.ephemeralExtendedPublicKey,
      fetchedAccount.salt,
      accountPreparation.randomness,
      accountPreparation.maxEpoch
    );

    restoredAccounts.push({
      type: 'zkFull',
      issuer: decodedJwt.iss as string,
      userSalt: fetchedAccount.salt,
      maxEpoch: accountPreparation.maxEpoch,
      jwt,
      address: address,
      email: decodedJwt.email as string,
      ephemeralPrivateKey: accountPreparation.ephemeralPrivateKey,
      ephemeralPublicKey: accountPreparation.ephemeralPublicKey,
      ephemeralExtendedPublicKey: accountPreparation.ephemeralExtendedPublicKey,
      randomness: accountPreparation.randomness,
      nonce: accountPreparation.nonce,
      addressSeed: addressSeed.toString(),
      publicIdentifier: pkZklogin.toBase64(),
      zkProof: zkProof,
    });
  }

  return restoredAccounts;
};

export const buildMultiSigWallet = async (
  zkLogins: ZkLoginFetchedAccount[],
  threshold: number
) => {
  const publicZkKeys = zkLogins.map(
    (account) => new ZkLoginPublicIdentifier(account.publicIdentifier)
  );

  const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
    threshold: threshold,
    publicKeys: publicZkKeys.map((zkKey) => ({
      publicKey: zkKey,
      weight: 1,
    })),
  });

  // const multisigAddress = multiSigPublicKey.toSuiAddress();

  return multiSigPublicKey;
};

export const makeZkLoginFullAccountFromPreparation = async (
  jwt: string,
  zkLoginPreparation: ZkLoginAccountPreparation
): Promise<ZkLoginFullAccount> => {
  const decodedJwt = jwtDecode(jwt) as ExtendedJwtPayload;
  if (!decodedJwt.sub || !decodedJwt.aud || !decodedJwt.iss)
    throw new Error('JWT sub, aud, or iss not found');

  const provider = getOauthTypeFromJwt(jwt);
  if (!provider) throw new Error('Provider not found');

  const salt = generateUserSalt();
  const address = jwtToAddress(jwt, salt);

  const addressSeed = genAddressSeed(
    salt,
    'sub',
    decodedJwt.sub,
    decodedJwt.aud as string
  );
  const pkZklogin = toZkLoginPublicIdentifier(addressSeed, decodedJwt.iss);

  const zkProof = await generateZkProof(
    jwt,
    zkLoginPreparation.ephemeralExtendedPublicKey,
    salt,
    zkLoginPreparation.randomness,
    zkLoginPreparation.maxEpoch
  );

  return {
    type: 'zkFull',
    issuer: decodedJwt.iss as string,
    userSalt: salt,
    maxEpoch: zkLoginPreparation.maxEpoch,
    jwt,
    address: address,
    email: decodedJwt.email as string,
    ephemeralPrivateKey: zkLoginPreparation.ephemeralPrivateKey,
    ephemeralPublicKey: zkLoginPreparation.ephemeralPublicKey,
    ephemeralExtendedPublicKey: zkLoginPreparation.ephemeralExtendedPublicKey,
    randomness: zkLoginPreparation.randomness,
    nonce: zkLoginPreparation.nonce,
    addressSeed: addressSeed.toString(),
    publicIdentifier: pkZklogin.toBase64(),
    zkProof: zkProof,
  };
};

export const generateZkProof = async (
  jwt: string,
  extendedEphemeralPublicKey: string,
  salt: string,
  randomness: string,
  maxEpoch: string
): Promise<ZkProofSui> => {
  const proverEndpoint = 'https://prover-dev.mystenlabs.com/v1';

  const payload = JSON.stringify({
    jwt,
    extendedEphemeralPublicKey,
    salt,
    jwtRandomness: randomness,
    keyClaimName: 'sub',
    maxEpoch: maxEpoch,
  });
  const res = await fetch(proverEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  });
  if (!res.ok)
    throw new Error('Failed to generate zkProof : ' + res.statusText);
  return res.json();
};

export const generateUserSalt = (): string => {
  // generate a number between 0 and 2n**128n

  const n = BigInt(2);
  const exponent = BigInt(128);
  const maxNumber = n ** exponent;

  const randomNumber = BigInt(Math.floor(Math.random() * Number(maxNumber)));

  return randomNumber.toString();
};
