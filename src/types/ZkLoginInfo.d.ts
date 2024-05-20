export {};

declare global {
  interface ZkLoginInfo {
    ephemeralPrivateKey: string;
    ephemeralPublicKey: string;
    ephemeralExtendedPublicKey: string;
    randomness: string;
    userSalt: string;
    nonce: string;
    maxEpoch: string;
  }
}
