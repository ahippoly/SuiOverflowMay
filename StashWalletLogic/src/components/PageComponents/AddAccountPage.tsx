import { Stack, Typography } from '@mui/material';

import AllLoginList from '../Login/AllLoginList';

function AddAccountPage() {
  return (
    <Stack
      justifyContent='center'
      spacing={2}
      sx={{
        height: '100%',
      }}
    >
      <Stack alignItems='center' gap={2} my='auto'>
        <Typography variant='h5'>Add new account</Typography>
        <Typography variant='body1' mb={5}>
          Sign in through a provider to continue
        </Typography>
        <AllLoginList />
      </Stack>
    </Stack>
  );
}

export default AddAccountPage;
