import MultisigWalletCard from './MultisigWallet';
import ZkWalletCard from './ZkWalletCard';

function WalletCardAdapter({ walletSource }: { walletSource: WalletAccount }) {
  if (walletSource.type === 'zkFull') {
    const wallet = walletSource as ZkLoginFullAccount;
    return ZkWalletCard({ zkAccount: wallet });
  }

  if (walletSource.type === 'multisig') {
    const wallet = walletSource as MultiSigAccount;
    return MultisigWalletCard({ multisigWallet: wallet });
  }
}

export default WalletCardAdapter;
