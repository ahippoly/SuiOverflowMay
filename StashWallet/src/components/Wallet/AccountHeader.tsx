import { Button, Stack } from '@mui/material';
import Link from 'next/link';

import { useZkLogin } from '@/hooks/useZkLogin';

import WalletCardAdapter from './WalletCardAdapter';

function AccountHeader() {
  const zkLogin = useZkLogin();

  return (
    <Stack
      maxWidth={360}
      gap={2}
      sx={{
        border: '1px solid',
        borderRadius: 4,
        p: 2,
      }}
    >
      <WalletCardAdapter
        walletSource={zkLogin.activeAccount || zkLogin.zkLoginAccounts[0]}
      />
      <Stack direction='row' gap={2}>
        <Link href='/app/switch-account'>
          <Button variant='text' color='primary'>
            Switch account
          </Button>
        </Link>

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
