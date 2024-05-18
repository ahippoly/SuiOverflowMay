import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { generateNonce } from '@mysten/zklogin';

import { getCurrentEpoch } from '@/lib/sui-related/utils';

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

export const generateZkProof = async (
  jwt: string,
  extendedEphemeralPublicKey: string,
  salt: string,
  randomness: string
) => {
  'use server';

  const proverEndpoint = 'https://prover-dev.mystenlabs.com/v1';
  fetch(proverEndpoint, {
    method: 'POST',
    body: JSON.stringify({
      jwt,
      extendedEphemeralPublicKey,
      salt,
      jwtRandomness: randomness,
      keyClaimName: 'sub',
      maxEpoch: 10,
    }),
  });
};

export const generateUserSalt = async (): Promise<string> => {
  'use server';

  // generate a number between 0 and 2n**128n

  const n = BigInt(2);
  const exponent = BigInt(128);
  const maxNumber = n ** exponent;

  const randomNumber = BigInt(Math.floor(Math.random() * Number(maxNumber)));

  return randomNumber.toString();
};
