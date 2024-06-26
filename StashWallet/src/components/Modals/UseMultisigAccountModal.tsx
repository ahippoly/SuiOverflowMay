import { LoadingButton } from '@mui/lab';
import { Dialog, Stack, Typography } from '@mui/material';

import WalletCardAdapter from '../Wallet/WalletCardAdapter';

function UseMultisigAccountModal({
  multisigAccount,
  open,
  onClose,
  onConfirm,
  loadingConfirmation,
}: {
  multisigAccount: MultiSigAccount;
  open: boolean;
  onClose: () => void;
  onConfirm: (multisigAccount: MultiSigAccount) => void;
  loadingConfirmation: boolean;
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
              hasStatus={false}
            />
          ))}
        </Stack>
        <LoadingButton
          onClick={() => {
            onConfirm(multisigAccount);
          }}
          variant='contained'
          loading={loadingConfirmation}
        >
          Use Safe wallet
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}

export default UseMultisigAccountModal;
