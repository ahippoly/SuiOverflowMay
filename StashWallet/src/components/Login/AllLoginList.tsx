import { Stack } from '@mui/material';

import LoginWithFacebook from './LoginWithFacebook';
import LoginWithGoogle from './LoginWithGoogle';

function AllLoginList() {
  return (
    <Stack gap={2}>
      <LoginWithGoogle />
      <LoginWithFacebook />
    </Stack>
  );
}

export default AllLoginList;
