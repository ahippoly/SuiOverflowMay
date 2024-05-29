import { CircularProgress, Stack } from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';

import AccountHeader from './AccountHeader';
import NoWalletFound from './NoWalletFound';

function MainWalletPage() {
  const zkLogin = useZkLogin();

  if (zkLogin.useZkLoginState.isInitializing)
    return <CircularProgress disableShrink />;
  if (zkLogin.zkLoginAccounts.length === 0) return <NoWalletFound />;

  return (
    <Stack justifyContent='flex-start' alignItems='flex-start'>
      <AccountHeader />
    </Stack>
  );
}

export default MainWalletPage;
