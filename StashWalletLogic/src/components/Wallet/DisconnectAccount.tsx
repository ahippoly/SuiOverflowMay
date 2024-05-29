import { Button } from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';

function DisconnectAccount() {
  const zkLogin = useZkLogin();

  const handleDisconnect = async () => {
    if (!zkLogin.selectedZkAccount) return;
    zkLogin.removeAccount(zkLogin.selectedZkAccount);
  };

  return (
    <Button variant='contained' onClick={handleDisconnect}>
      Remove account
    </Button>
  );
}

export default DisconnectAccount;
