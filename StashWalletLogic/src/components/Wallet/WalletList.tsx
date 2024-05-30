import { useZkLogin } from '@/hooks/useZkLogin';

import ZkWalletCard from './ZkWalletCard';

function WalletList() {
  const zkLogin = useZkLogin();

  const allAccounts = zkLogin.zkLoginAccounts;

  const allZkWallets = allAccounts.filter(
    (account) => account.type === 'zkFull'
  ) as ZkLoginFullAccount[];

  return allZkWallets.map((account) => (
    <ZkWalletCard zkAccount={account} key={account.address} />
  ));
}

export default WalletList;
