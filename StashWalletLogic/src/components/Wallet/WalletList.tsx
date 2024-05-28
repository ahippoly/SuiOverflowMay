import { useZkLogin } from '@/hooks/useZkLogin';

import ZkWallet from './ZkWallet';

function WalletList() {
  const zkLogin = useZkLogin();

  const allAccounts = zkLogin.zkLoginAccounts;

  const allZkWallets = allAccounts.filter(
    (account) => account.type === 'zkFull'
  ) as ZkLoginFullAccount[];

  return allZkWallets.map((account) => (
    <ZkWallet zkAccount={account} key={account.address} />
  ));
}

export default WalletList;
