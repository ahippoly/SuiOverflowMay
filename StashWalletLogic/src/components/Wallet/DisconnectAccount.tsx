import { Button } from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';

function DisconnectAccount() {
  const zkLogin = useZkLogin();

  const handleDisconnect = async () => {
    if (!zkLogin.selectedAccount) return;
    zkLogin.removeAccount(zkLogin.selectedAccount);
  };

  return (
    <Button variant='contained' onClick={handleDisconnect}>
      Remove account
    </Button>
  );
}

export default DisconnectAccount;
