'use client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  jwtToAddress,
} from '@mysten/zklogin';
import { useContext } from 'react';

import { getCurrentEpoch } from '@/lib/sui-related/utils';
import { generateZkProofClient } from '@/lib/sui-related/zkLogin';
import { generateUserSalt } from '@/lib/sui-related/zkLoginServer';

import { ZkLoginInfoContext } from '@/contexts/zkLoginInfoContext';

// export const completeZkLoginFlowAfterOauth = async () => {};

export const useZkLogin = () => {
  const { zkLoginInfo, setZkLoginInfo } = useContext(ZkLoginInfoContext);

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
    const zkLoginAddress = jwtToAddress(jwt, zkLoginInfo.userSalt);
    const zkProof = await generateZkProofClient(
      jwt,
      zkLoginInfo.ephemeralExtendedPublicKey,
      zkLoginInfo.userSalt,
      zkLoginInfo.randomness,
      zkLoginInfo.maxEpoch
    );

    return { zkProof, zkLoginAddress };
  };

  return {
    ...zkLoginInfo,
    prepareZkLogin,
    getZkProof,
  };
};
