'use client';

import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { StashedHost } from '@mysten/zksend';
import { useEffect, useState } from 'react';

import { useZkLogin } from '@/hooks/useZkLogin';

import LoadingPage from '@/components/PageComponents/LoadingPage';
import NoWalletFound from '@/components/PageComponents/NoWalletFound';
import WalletCardAdapter from '@/components/Wallet/WalletCardAdapter';

function ConnectWallet() {
  const zkLogin = useZkLogin();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stashedHost = StashedHost.fromUrl(window.location.href);
    console.log('🚀 ~ ConnectWallet ~ stashedHost:', stashedHost);
  }, []);
  if (zkLogin.useZkLoginState.isInitializing) return <LoadingPage />;
  if (zkLogin.zkLoginAccounts.length === 0) return <NoWalletFound />;

  const onClickConnect = () => {
    const stashedHost = StashedHost.fromUrl(window.location.href);
    stashedHost.sendMessage({
      type: 'resolve',
      data: {
        address: zkLogin.activeAccount?.address || '',
        type: 'connect',
      },
    });
    setLoading(true);
    window.close();
  };

  return (
    <Stack justifyContent='center' alignItems='center' gap={2} flexGrow={1}>
      <Typography alignSelf='center' variant='h6'>
        Current Wallet
      </Typography>
      <WalletCardAdapter
        walletSource={zkLogin.activeAccount || zkLogin.zkLoginAccounts[0]}
      />
      {/* <Typography alignSelf='center' variant='h6'>
        Other wallers
      </Typography>
      <Stack gap={2}>

      </Stack> */}

      <LoadingButton
        sx={{
          mt: 4,
        }}
        variant='contained'
        loading={loading}
        onClick={onClickConnect}
      >
        Connect
      </LoadingButton>
    </Stack>
  );
}

export default ConnectWallet;
