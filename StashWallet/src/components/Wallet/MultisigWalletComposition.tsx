import { Stack } from '@mui/material';

import WalletCardAdapter from './WalletCardAdapter';

function MultisigWalletComposition({
  multisigAccount,
}: {
  multisigAccount: MultiSigAccount;
}) {
  return (
    <Stack gap={2}>
      {multisigAccount.components.map((component) => (
        <WalletCardAdapter key={component.address} walletSource={component} />
      ))}
    </Stack>
  );
}

export default MultisigWalletComposition;
