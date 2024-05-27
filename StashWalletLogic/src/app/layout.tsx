'use client';

import {
  Box,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { useZkLogin } from '@/hooks/useZkLogin';

import MainContainer from '@/components/MainContainer';

import { ZkLoginAccountsContext } from '@/contexts/zkLoginInfoContext';
import { OauthTypes } from '@/enums/OauthTypes.enum';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
// export const metadata: Metadata = {
//   metadataBase: new URL(siteConfig.url),
//   title: {
//     default: siteConfig.title,
//     template: `%s | ${siteConfig.title}`,
//   },
//   description: siteConfig.description,
//   robots: { index: true, follow: true },
//   // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
//   // ! copy to /favicon folder
//   icons: {
//     icon: '/favicon/favicon.ico',
//     shortcut: '/favicon/favicon-16x16.png',
//     apple: '/favicon/apple-touch-icon.png',
//   },
//   manifest: `/favicon/site.webmanifest`,
//   openGraph: {
//     url: siteConfig.url,
//     title: siteConfig.title,
//     description: siteConfig.description,
//     siteName: siteConfig.title,
//     images: [`${siteConfig.url}/images/og.jpg`],
//     type: 'website',
//     locale: 'en_US',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: siteConfig.title,
//     description: siteConfig.description,
//     images: [`${siteConfig.url}/images/og.jpg`],
//     // creator: '@th_clarence',
//   },
//   // authors: [
//   //   {
//   //     name: 'Theodorus Clarence',
//   //     url: 'https://theodorusclarence.com',
//   //   },
//   // ],
// };

const defaultZkLoginInfo: ZkLoginAccount = {
  ephemeralInfo: {
    ephemeralPrivateKey: '',
    ephemeralPublicKey: '',
    ephemeralExtendedPublicKey: '',
    randomness: '',
    nonce: '',
  },
  persistentInfo: {
    provider: OauthTypes.google,
    maxEpoch: '',
  },
};

const getStoredEphemeralInfo = (): ZkLoginEphemeralInfo[] => {
  const storedEphemeralInfos = window?.localStorage.getItem(
    'zkLoginEphemerealInfos'
  );
  const ephemeralInfo: ZkLoginEphemeralInfo[] = storedEphemeralInfos
    ? JSON.parse(storedEphemeralInfos)
    : [];
  return ephemeralInfo;
};

const getStoredPersistentInfo = (): ZkLoginPersistentInfo[] => {
  const storedPersistentInfos = window?.localStorage.getItem(
    'zkLoginPersistentInfos'
  );
  const persistentInfo: ZkLoginPersistentInfo[] = storedPersistentInfos
    ? JSON.parse(storedPersistentInfos)
    : [];
  return persistentInfo;
};

const getStoredZkLoginInfo = () => {
  const storedEphemeralInfos = getStoredEphemeralInfo();
  console.log(
    '🚀 ~ getStoredZkLoginInfo ~ storedEphemeralInfos:',
    storedEphemeralInfos
  );
  const storedPersistentInfos = getStoredPersistentInfo();
  console.log(
    '🚀 ~ getStoredZkLoginInfo ~ storedPersistentInfos:',
    storedPersistentInfos
  );
  const zkLoginInfo: ZkLoginAccount[] = [];
  for (let i = 0; i < storedEphemeralInfos.length; i++) {
    zkLoginInfo.push({
      ephemeralInfo: storedEphemeralInfos[i],
      persistentInfo: storedPersistentInfos[i],
    });
  }
  console.log('🚀 ~ getStoredZkLoginInfo ~ zkLoginInfo:', zkLoginInfo);
  return zkLoginInfo;
};

const storeZkLoginInfos = (zkLoginInfoByAccounts: ZkLoginInfoByAccounts) => {
  const ephemeralInfos = zkLoginInfoByAccounts.map(
    (info) => info.ephemeralInfo
  );
  const persistentInfos = zkLoginInfoByAccounts.map(
    (info) => info.persistentInfo
  );
  window.localStorage.setItem(
    'zkLoginEphemerealInfos',
    JSON.stringify(ephemeralInfos)
  );
  window.localStorage.setItem(
    'zkLoginPersistentInfos',
    JSON.stringify(persistentInfos)
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode =
    useMediaQuery('(prefers-color-scheme: dark)') && false;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  const [zkLoginAccounts, setZkLoginAccounts] = useState<ZkLoginInfoByAccounts>(
    getStoredZkLoginInfo()
  );

  const zkLogin = useZkLogin();

  useEffect(() => {
    storeZkLoginInfos(zkLoginAccounts);
  }, [zkLoginAccounts]);

  useEffect(() => {
    if (location.hash.includes('id_token')) zkLogin.handleOauthResponse();
    else zkLogin.prepareOauthConnection();
  }, []);

  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ZkLoginAccountsContext.Provider
            value={{
              zkLoginInfoByAccounts: zkLoginAccounts,
              setZkLoginInfoByAccounts: setZkLoginAccounts,
            }}
          >
            <Box
              sx={{
                backgroundColor: '#4158D0',
                backgroundImage:
                  'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <MainContainer>
                <Stack
                  direction='column'
                  spacing={2}
                  justifyContent='center'
                  sx={{
                    height: '100%',
                  }}
                >
                  {children}
                </Stack>
              </MainContainer>
            </Box>
          </ZkLoginAccountsContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
