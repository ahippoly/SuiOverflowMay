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
