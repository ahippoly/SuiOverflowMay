import { OauthTypes } from '@/enums/OauthTypes.enum';

export {};

declare global {
  interface ZkLoginInfo {
    ephemeralPrivateKey: string;
    ephemeralPublicKey: string;
    ephemeralExtendedPublicKey: string;
    randomness: string;
    nonce: string;
    userSalt: string;
    maxEpoch: string;
    jwt?: string;
    zkProof?: string;
    zkLoginAddress?: string;
  }

  type ZkLoginInfoByProvider = Record<OauthTypes, ZkLoginInfo[]>;
}
