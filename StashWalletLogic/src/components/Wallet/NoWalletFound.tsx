import { Stack, Typography } from '@mui/material';

import AllLoginList from '../Login/AllLoginList';

function NoWalletFound() {
  return (
    <Stack alignItems='center' gap={2} my='auto'>
      <Typography variant='h5'>Welcome to SuiSafe !</Typography>
      <Typography variant='body1' mb={5}>
        The safest online wallet
      </Typography>
      <AllLoginList />
    </Stack>
  );
}

export default NoWalletFound;
