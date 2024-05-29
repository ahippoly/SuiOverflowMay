'use client';

// import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import { Stack } from '@mui/material';

import Header from '@/components/General/Header';
import MainWalletPage from '@/components/Wallet/MainWalletPage';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Stack
      direction='column'
      spacing={2}
      sx={{
        height: '100%',
      }}
    >
      <Header />
      <Stack flexGrow={1} justifyContent='center' alignItems='center'>
        <MainWalletPage />
      </Stack>
    </Stack>
  );
}
