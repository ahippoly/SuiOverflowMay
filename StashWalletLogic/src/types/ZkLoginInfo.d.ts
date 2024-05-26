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

  interface ZkLoginPersistentInfo {
    provider: OauthTypes;
    userSalt?: string;
    maxEpoch: string;
    jwt?: string;
    zkLoginAddress?: string;
  }

  interface ZkLoginEphemeralInfo {
    ephemeralPrivateKey: string;
    ephemeralPublicKey: string;
    ephemeralExtendedPublicKey: string;
    randomness: string;
    nonce: string;
    zkProof?: ZkProofSui;
  }

  interface ZkLoginAccount {
    persistentInfo: ZkLoginPersistentInfo;
    ephemeralInfo: ZkLoginEphemeralInfo;
  }

  interface MultisigWallet {
    address: string;
    publicKey: string;
    zkLoginInfoComponents: ZkLoginAccount[];
  }

  type ZkLoginInfoByAccounts = ZkLoginAccount[];
}
