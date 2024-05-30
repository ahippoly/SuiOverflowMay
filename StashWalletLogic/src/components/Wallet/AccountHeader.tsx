import { Button, Stack } from '@mui/material';
import Link from 'next/link';

import { useZkLogin } from '@/hooks/useZkLogin';

import WalletCardAdapter from './WalletCardAdapter';

function AccountHeader() {
  const zkLogin = useZkLogin();

  return (
    <Stack maxWidth={360} gap={2}>
      <WalletCardAdapter walletSource={zkLogin.zkLoginAccounts[0]} />
      <Stack direction='row' gap={2}>
        <Button variant='text' color='primary'>
          Switch account
        </Button>
        <Link href='/app/add-account'>
          <Button variant='text' color='primary'>
            Add account
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}

export default AccountHeader;
