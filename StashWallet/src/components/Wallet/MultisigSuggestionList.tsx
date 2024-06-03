import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { buildMultisigSuggestions } from '@/lib/sui-related/zkLogin';

import WalletCardAdapter from './WalletCardAdapter';

function MultisigSuggestionList({
  zkAccounts,
  clickCallback,
}: {
  zkAccounts: ZkLoginFetchedAccount[];
  clickCallback?: (walletAccount: WalletAccount) => void;
}) {
  const [multisigAccounts, setMultisigAccounts] = useState<MultiSigAccount[]>(
    []
  );

  useEffect(() => {
    buildMultisigSuggestions(zkAccounts).then((suggestedMultisig) => {
      setMultisigAccounts(suggestedMultisig);
    });
  }, [zkAccounts]);

  return (
    <Stack gap={2} width='100%'>
      {multisigAccounts.map((multisig) => (
        <WalletCardAdapter
          key={multisig.address}
          walletSource={multisig}
          clickCallback={clickCallback}
          isSelectable
        />
      ))}
    </Stack>
  );
}

export default MultisigSuggestionList;
