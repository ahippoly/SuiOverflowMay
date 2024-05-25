import { Stack, Typography } from '@mui/material';
import { StashedHost } from '@mysten/zksend';

function ConnectWallet() {
  const stashedHost = StashedHost.fromUrl(window.location.href);
  console.log('🚀 ~ ConnectWallet ~ stashedHost:', stashedHost);

  return (
    <Stack>
      <Typography variant='h1'>Connect Wallet</Typography>
    </Stack>
  );
}

export default ConnectWallet;
