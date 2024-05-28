import { Button } from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';

function DisconnectAccount() {
  const zkLogin = useZkLogin();

  const handleDisconnect = async () => {
    if (!zkLogin.selectedZkAccount) return;
    zkLogin.disconnectAccount(zkLogin.selectedZkAccount);
  };

  return (
    <Button variant='contained' onClick={handleDisconnect}>
      Disconnect
    </Button>
  );
}

export default DisconnectAccount;
