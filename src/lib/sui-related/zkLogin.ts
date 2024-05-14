import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { generateNonce, generateRandomness } from '@mysten/zklogin';

import { getCurrentEpoch } from '@/lib/sui-related/utils';


export const generateZkLoginNonce = async () => {
  const epochInfo = await getCurrentEpoch();
  
  const maxEpoch = Number(epochInfo.epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
  const ephemeralKeyPair = new Ed25519Keypair();
  const randomness = generateRandomness();
  const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
  console.log("🚀 ~ generateZkLoginNonce ~ nonce:", nonce)

  return nonce;
}
