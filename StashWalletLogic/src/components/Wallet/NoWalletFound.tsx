import { Stack, Typography } from '@mui/material';

import AllLoginList from '../Login/AllLoginList';

function NoWalletFound() {
  return (
    <Stack>
      <Typography variant='h1'>No Acount Found</Typography>
      <AllLoginList />
    </Stack>
  );
}

export default NoWalletFound;
