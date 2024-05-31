'use client';

import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { StashedHost } from '@mysten/zksend';
import { useEffect, useState } from 'react';

import { useZkLogin } from '@/hooks/useZkLogin';
import { sendTokens } from '@/lib/sui-related/zkLogin';

import LoadingPage from '@/components/PageComponents/LoadingPage';
import NoWalletFound from '@/components/PageComponents/NoWalletFound';
import TransactionData from '@/components/Wallet/TransactionData';
import WalletCardAdapter from '@/components/Wallet/WalletCardAdapter';

function SignTransactionBlock() {
  const zkLogin = useZkLogin();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stashedHost = StashedHost.fromUrl(window.location.href);
    console.log('🚀 ~ SignTransactionBlock ~ stashedHost:', stashedHost);
  }, []);
  if (zkLogin.useZkLoginState.isInitializing) return <LoadingPage />;
  if (zkLogin.zkLoginAccounts.length === 0) return <NoWalletFound />;

  const onClickApprove = async () => {
    const stashedHost = StashedHost.fromUrl(window.location.href);
    setLoading(true);
    if (!zkLogin.activeAccount) {
      setLoading(false);
      return;
    }
    const { bytes, signature } = await sendTokens(
      zkLogin.activeAccount,
      '0x7afcf98c3ad845087cd9bca85ddf11c3aa13b8afe9f87ccff5595f66d6ec9422',
      1
    );

    setLoading(false);
    stashedHost.sendMessage({
      type: 'resolve',
      data: {
        bytes,
        signature,
        type: 'sign-transaction-block',
      },
    });
    window.close();
  };

  const onClickReject = () => {
    const stashedHost = StashedHost.fromUrl(window.location.href);
    stashedHost.sendMessage({
      type: 'reject',
    });
    window.close();
  };

  return (
    <Stack justifyContent='center' alignItems='center' gap={2} flexGrow={1}>
      <Typography alignSelf='center' variant='h6'>
        Sign Transaction
      </Typography>
      <WalletCardAdapter
        walletSource={zkLogin.activeAccount || zkLogin.zkLoginAccounts[0]}
      />
      <TransactionData amount={-1} />
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
        onClick={onClickApprove}
      >
        Approve
      </LoadingButton>
      <LoadingButton
        variant='outlined'
        loading={loading}
        onClick={onClickReject}
      >
        Reject
      </LoadingButton>
    </Stack>
  );
}

export default SignTransactionBlock;
