import { Button, Stack } from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';

import WalletCardAdapter from './WalletCardAdapter';

function AccountHeader() {
  const zkLogin = useZkLogin();

  return (
    <Stack>
      <WalletCardAdapter walletSource={zkLogin.zkLoginAccounts[0]} />
      <Stack direction='row' gap={2}>
        <Button variant='contained' color='primary'>
          Switch account
        </Button>
        <Button variant='contained' color='primary'>
          Add account
        </Button>
      </Stack>
    </Stack>
  );
}

export default AccountHeader;
