import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
  generateRandomness,
  getExtendedEphemeralPublicKey,
  jwtToAddress,
} from '@mysten/zklogin';
import { useState } from 'react';

import { generateUserSalt, generateZkProof } from '@/lib/sui-related/zkLogin';

type KeyPairObj = {
  publicKey: string;
  secretKey: string;
};

// export const completeZkLoginFlowAfterOauth = async () => {};

export const useZkLogin = () => {
  const [ephemeralKeyPair, setEphemeralKeyPair] = useState<KeyPairObj>(
    JSON.parse(window.sessionStorage.getItem('ephemeralKeyPair') || '{}')
  );
  const [extendedEphemeralPublicKey, setExtendedEphemeralPublicKey] =
    useState<string>(
      window.sessionStorage.getItem('extendedEphemeralPublicKey') || ''
    );
  const [randomness, setRandomness] = useState<string>(
    window.sessionStorage.getItem('randomness') || '{}'
  );
  const [userSalt, setUserSalt] = useState<string>(
    window.sessionStorage.getItem('userSalt') || ''
  );

  const prepareZkLogin = async () => {
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();

    ephemeralKeyPair.getPublicKey().toBase64();

    const newKeyPair = {
      publicKey: ephemeralKeyPair.getPublicKey().toBase64(),
      secretKey: ephemeralKeyPair.getSecretKey(),
    };

    sessionStorage.setItem('ephemeralKeyPair', JSON.stringify(newKeyPair));
    sessionStorage.setItem('randomness', randomness);
    setEphemeralKeyPair(newKeyPair);
    setRandomness(randomness);
    setExtendedEphemeralPublicKey(
      getExtendedEphemeralPublicKey(ephemeralKeyPair.getPublicKey())
    );

    return { ephemeralKeyPair, randomness };
  };

  const getZkProof = async (jwt: string) => {
    const salt = await generateUserSalt();
    setUserSalt(salt);
    const zkLoginAddress = jwtToAddress(jwt, salt);
    const zkProof = await generateZkProof(
      jwt,
      extendedEphemeralPublicKey,
      salt,
      randomness
    );

    return { zkProof, zkLoginAddress };
  };

  return {
    ephemeralKeyPair,
    randomness,
    userSalt,
    prepareZkLogin,
    getZkProof,
  };
};
