import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { toZkLoginPublicIdentifier } from '@mysten/sui.js/zklogin';
import { genAddressSeed, generateNonce, jwtToAddress } from '@mysten/zklogin';
import { jwtDecode } from 'jwt-decode';

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

export const saveAccountPreparation = (
  zkLoginInfo: ZkLoginAccountPreparation
) => {
  window.localStorage.setItem(
    'zkLoginAccountPreparation',
    JSON.stringify(zkLoginInfo)
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

  const zkProof = (await generateZkProofClient(
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

export const generateZkProofClient = async (
  jwt: string,
  extendedEphemeralPublicKey: string,
  salt: string,
  randomness: string,
  maxEpoch: string
) => {
  const proverEndpoint = 'https://prover-dev.mystenlabs.com/v1';

  const saltNumber = BigInt(salt);
  const saltBase64 = Buffer.from(saltNumber.toString()).toString('base64');
  const randomnessNumber = BigInt(randomness);
  const randomnessBase64 = Buffer.from(randomnessNumber.toString()).toString(
    'base64'
  );
  const epochInfo = await getCurrentEpoch();

  const payload = JSON.stringify({
    jwt,
    extendedEphemeralPublicKey,
    salt,
    jwtRandomness: randomness,
    keyClaimName: 'sub',
    maxEpoch: maxEpoch,
  });
  console.log('🚀 ~ payload:', payload);
  return (
    await fetch(proverEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    })
  ).json();
};
