'use client';

import { createContext } from 'react';

export const ZkLoginInfoContext = createContext<{
  zkLoginInfoByProvider: ZkLoginInfoByProvider;
  setZkLoginInfo: React.Dispatch<React.SetStateAction<ZkLoginInfoByProvider>>;
}>({
  zkLoginInfoByProvider: {
    facebook: [],
    google: [],
    slack: [],
    twitch: [],
  },
  setZkLoginInfo: (prev) => {
    return prev;
  },
});
