import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Stack } from '@mui/material';

import { getOauthTypeFromIssuer } from '@/lib/sui-related/zkLogin';

import CircledIcon from '../General/CircledIcon';
import OauthProviderIcon from '../General/OauthProviderIcon';
import WalletCard from './WalletCard';
function MultisigWalletCard({
  multisigWallet,
}: {
  multisigWallet: MultiSigAccount;
}) {
  const walletName = multisigWallet.components
    .map((component) => getOauthTypeFromIssuer(component.issuer))
    .join(' ');

  return WalletCard({
    statusComponent: <DoneAllIcon />,
    accountName: walletName,
    walletAdress: multisigWallet.address,
    IconComponent: (
      <Stack spacing={-2} direction='column-reverse'>
        {multisigWallet.components.map((component) => (
          <CircledIcon key={component.address}>
            <OauthProviderIcon issuer={component.issuer} color='primary.main' />
          </CircledIcon>
        ))}
      </Stack>
    ),
  });
}

export default MultisigWalletCard;
