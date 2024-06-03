import { useZkLogin } from '@/hooks/useZkLogin';

import WalletCardAdapter from './WalletCardAdapter';

function WalletList() {
  const zkLogin = useZkLogin();

  const allAccounts = zkLogin.zkLoginAccounts;

  const allZkWallets = allAccounts.filter(
    (account) => account.type === 'zkFull'
  ) as ZkLoginFullAccount[];

  return allZkWallets.map((account) => (
    <WalletCardAdapter walletSource={account} key={account.address} />
  ));
}

export default WalletList;
