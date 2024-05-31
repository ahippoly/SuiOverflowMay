import DoneAllIcon from '@mui/icons-material/DoneAll';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { Stack } from '@mui/material';

import { getOauthTypeFromIssuer } from '@/lib/sui-related/zkLogin';

import CircledIcon from '../General/CircledIcon';
import OauthProviderIcon from '../General/OauthProviderIcon';
import WalletCard from './WalletCard';

function WalletCardAdapter({
  walletSource,
  isSelectable,
  clickCallback,
  hasStatus,
}: {
  walletSource: WalletAccount;
  isSelectable?: boolean;
  clickCallback?: (walletAccount: WalletAccount) => void;
  hasStatus?: boolean;
}) {
  if (hasStatus === undefined) hasStatus = true;

  if (walletSource.type === 'zkFull') {
    const wallet = walletSource as ZkLoginFullAccount;
    return WalletCard({
      statusComponent: hasStatus && <GppMaybeIcon />,
      accountName: wallet.email,
      walletAdress: wallet.address,
      IconComponent: <OauthProviderIcon issuer={wallet.issuer} />,
      selectable: isSelectable,
      walletAccount: wallet,
      clickCallback,
    });
  }

  if (walletSource.type === 'zkPartial') {
    const wallet = walletSource as ZkLoginFetchedAccount;
    return WalletCard({
      statusComponent: hasStatus && <GppMaybeIcon />,
      accountName: wallet.email,
      walletAdress: wallet.address,
      IconComponent: <OauthProviderIcon issuer={wallet.issuer} />,
      selectable: isSelectable,
      walletAccount: wallet,
      clickCallback,
    });
  }

  if (walletSource.type === 'multisig') {
    const wallet = walletSource as MultiSigAccount;
    const walletName = wallet.components
      .map((component) => getOauthTypeFromIssuer(component.issuer))
      .join(' ');

    return WalletCard({
      statusComponent: <DoneAllIcon />,
      accountName: walletName,
      walletAdress: wallet.address,
      selectable: isSelectable,
      walletAccount: wallet,
      clickCallback,
      IconComponent: hasStatus && (
        <Stack spacing={-2} direction='column-reverse'>
          {wallet.components
            .map((component) => (
              <CircledIcon key={component.address}>
                <OauthProviderIcon
                  issuer={component.issuer}
                  color='primary.main'
                />
              </CircledIcon>
            ))
            .reverse()}
        </Stack>
      ),
    });
  }
}

export default WalletCardAdapter;
