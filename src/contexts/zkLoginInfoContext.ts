'use client';

import { createContext } from 'react';

export const ZkLoginInfoContext = createContext<{
  zkLoginInfo: ZkLoginInfo;
  setZkLoginInfo: React.Dispatch<React.SetStateAction<ZkLoginInfo>>;
}>({
  zkLoginInfo: {
    ephemeralPrivateKey: '',
    ephemeralPublicKey: '',
    ephemeralExtendedPublicKey: '',
    randomness: '',
    userSalt: '',
    nonce: '',
    maxEpoch: '',
  },
  setZkLoginInfo: (prev) => {
    return prev;
  },
});
