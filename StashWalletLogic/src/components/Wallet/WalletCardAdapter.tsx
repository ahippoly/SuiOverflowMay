import GppMaybeIcon from '@mui/icons-material/GppMaybe';

import OauthProviderIcon from '../General/OauthProviderIcon';
import WalletCard from './WalletCard';

function WalletCardAdapter({ walletSource }: { walletSource: WalletAccount }) {
  if (walletSource.type === 'zkFull') {
    const wallet = walletSource as ZkLoginFullAccount;
    return WalletCard({
      statusComponent: <GppMaybeIcon />,
      accountName: wallet.email,
      walletAdress: wallet.address,
      IconComponent: <OauthProviderIcon issuer={wallet.issuer} />,
    });
  }
}

export default WalletCardAdapter;
