'use client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  jwtToAddress,
} from '@mysten/zklogin';
import { useEffect, useState } from 'react';

import { getCurrentEpoch } from '@/lib/sui-related/utils';
import { generateZkProofClient } from '@/lib/sui-related/zkLogin';
import { generateUserSalt } from '@/lib/sui-related/zkLoginServer';

type KeyPairObj = {
  publicKey: string;
  secretKey: string;
};

interface ZkLoginInfo {
  ephemeralPrivateKey: string;
  ephemeralPublicKey: string;
  ephemeralExtendedPublicKey: string;
  randomness: string;
  userSalt: string;
  nonce: string;
  maxEpoch: string;
}

// export const completeZkLoginFlowAfterOauth = async () => {};

const defaultZkLoginInfo: ZkLoginInfo = {
  ephemeralPrivateKey: '',
  randomness: '',
  userSalt: '',
  nonce: '',
  maxEpoch: '',
  ephemeralPublicKey: '',
  ephemeralExtendedPublicKey: '',
};

export const useZkLogin = () => {
  const [ZkLoginInfo, setZkLoginInfo] = useState<ZkLoginInfo>(
    JSON.parse(
      window?.sessionStorage.getItem('ZkLoginInfo') ||
        JSON.stringify(defaultZkLoginInfo)
    )
  );

  useEffect(() => {
    window?.sessionStorage.setItem('ZkLoginInfo', JSON.stringify(ZkLoginInfo));
  }, [ZkLoginInfo]);

  const prepareZkLogin = async () => {
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const maxEpoch = Number((await getCurrentEpoch()).epoch) + 10;

    const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
      ephemeralKeyPair.getPublicKey()
    );

    const nonce = await generateNonce(
      ephemeralKeyPair.getPublicKey(),
      maxEpoch,
      randomness
    );

    const salt = await generateUserSalt();

    const newZkLoginInfo: ZkLoginInfo = {
      ephemeralPrivateKey: ephemeralKeyPair.export().privateKey,
      ephemeralPublicKey: ephemeralKeyPair.getPublicKey().toBase64(),
      ephemeralExtendedPublicKey: extendedEphemeralPublicKey,
      randomness,
      userSalt: salt,
      nonce,
      maxEpoch: maxEpoch.toString(),
    };

    setZkLoginInfo(newZkLoginInfo);

    return { ...newZkLoginInfo };
  };

  const getZkProof = async (jwt: string) => {
    const zkLoginAddress = jwtToAddress(jwt, ZkLoginInfo.userSalt);
    const zkProof = await generateZkProofClient(
      jwt,
      ZkLoginInfo.ephemeralExtendedPublicKey,
      ZkLoginInfo.userSalt,
      ZkLoginInfo.randomness,
      ZkLoginInfo.maxEpoch
    );

    return { zkProof, zkLoginAddress };
  };

  return {
    ...ZkLoginInfo,
    prepareZkLogin,
    getZkProof,
  };
};
