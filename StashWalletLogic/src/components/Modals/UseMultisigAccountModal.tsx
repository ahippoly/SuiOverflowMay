import { Button, Dialog, Stack, Typography } from '@mui/material';

import WalletCardAdapter from '../Wallet/WalletCardAdapter';

function UseMultisigAccountModal({
  multisigAccount,
  open,
  onClose,
}: {
  multisigAccount: MultiSigAccount;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack gap={4} p={4}>
        <Typography variant='h4'>This wallet is composed of </Typography>
        <Stack gap={2}>
          {multisigAccount.components.map((component) => (
            <WalletCardAdapter
              key={component.address}
              walletSource={component}
              isSelectable={false}
            />
          ))}
        </Stack>
        <Button variant='contained'>Use Safe wallet</Button>
      </Stack>
    </Dialog>
  );
}

export default UseMultisigAccountModal;
