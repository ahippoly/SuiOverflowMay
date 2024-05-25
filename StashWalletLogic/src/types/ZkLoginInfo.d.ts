import { OauthTypes } from '@/enums/OauthTypes.enum';

export {};

declare global {
  interface ZkProofSui {
    proofPoints: {
      a: Iterable<string> & {
        length: number;
      };
      b: Iterable<
        Iterable<string> & {
          length: number;
        }
      > & {
        length: number;
      };
      c: Iterable<string> & {
        length: number;
      };
    };
    issBase64Details: {
      value: string;
      indexMod4: number;
    };
    headerBase64: string;
    addressSeed: string;
  }
  interface ZkLoginInfo {
    ephemeralPrivateKey: string;
    ephemeralPublicKey: string;
    ephemeralExtendedPublicKey: string;
    randomness: string;
    nonce: string;
    userSalt: string;
    maxEpoch: string;
    jwt?: string;
    zkProof?: ZkProofSui;
    zkLoginAddress?: string;
  }

  type ZkLoginInfoByProvider = Record<OauthTypes, ZkLoginInfo[]>;
}
