'use server';

import { getCurrentEpoch } from '@/lib/sui-related/utils';

export const generateUserSalt = (): string => {
  // generate a number between 0 and 2n**128n

  const n = BigInt(2);
  const exponent = BigInt(128);
  const maxNumber = n ** exponent;

  const randomNumber = BigInt(Math.floor(Math.random() * Number(maxNumber)));

  return randomNumber.toString();
};

export const generateZkProof = async (
  jwt: string,
  extendedEphemeralPublicKey: string,
  salt: string,
  randomness: string
) => {
  const proverEndpoint = 'https://prover-dev.mystenlabs.com/v1';

  const saltNumber = BigInt(salt);
  const saltBase64 = Buffer.from(saltNumber.toString()).toString('base64');
  const randomnessNumber = BigInt(randomness);
  const randomnessBase64 = Buffer.from(randomnessNumber.toString()).toString(
    'base64'
  );
  const epochInfo = await getCurrentEpoch();
  const maxEpoch = Number(epochInfo.epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.

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
