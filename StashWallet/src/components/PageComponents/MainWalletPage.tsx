import { Stack } from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';

import SendTokens from '../SendTokens';
import AccountHeader from '../Wallet/AccountHeader';
import YourAssets from '../YourAssets';
import LoadingPage from './LoadingPage';
import NoWalletFound from './NoWalletFound';

function MainWalletPage() {
  const zkLogin = useZkLogin();

  if (zkLogin.useZkLoginState.isInitializing) return <LoadingPage />;
  if (zkLogin.zkLoginAccounts.length === 0) return <NoWalletFound />;

  return (
    <Stack
      justifyContent='flex-start'
      alignItems='flex-start'
      gap={2}
      flexGrow={1}
    >
      <AccountHeader />
      <YourAssets />
      <SendTokens />
    </Stack>
  );
}

export default MainWalletPage;
