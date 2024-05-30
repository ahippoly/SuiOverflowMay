'use client';

import { Stack, Typography } from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';

function AccountAddedPage({
  accountAdded,
}: {
  accountAdded: ZkLoginFullAccount;
}) {
  const zkLogin = useZkLogin();

  return (
    <Stack>
      <Typography variant='h5'>Account added !</Typography>
      <Typography variant='body1'>
        Would you like to create a Safe Account with it (recommanded)
      </Typography>
    </Stack>
  );
}

export default AccountAddedPage;
