'use client';

import { Stack, Typography } from '@mui/material';
import { StashedHost } from '@mysten/zksend';

function SignTransactionBlock() {
  const stashedHost = StashedHost.fromUrl(window.location.href);
  console.log(
    '🚀 ~ ConnectWallet ~ stashedHost:',
    stashedHost.getRequestData()
  );

  return (
    <Stack>
      <Typography variant='h1'>Sign Transaction</Typography>
    </Stack>
  );
}

export default SignTransactionBlock;
