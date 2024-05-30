import { Button, Stack, Typography } from '@mui/material';

import AllLoginList from '../Login/AllLoginList';
import WalletCardAdapter from '../Wallet/WalletCardAdapter';

function NewUserPage({ newZkAccount }: { newZkAccount: ZkLoginFullAccount }) {
  return (
    <Stack
      gap={2}
      justifyContent='space-around'
      alignItems='center'
      flexGrow={1}
    >
      <Typography variant='h5'>Welcome aboard</Typography>
      <WalletCardAdapter walletSource={newZkAccount} />
      <Typography textAlign='center' variant='body1'>
        We recommand you to sign in with an other account to make your wallet
        safer
      </Typography>
      <AllLoginList />
      <Button variant='outlined'>Skip</Button>
    </Stack>
  );
}

export default NewUserPage;
