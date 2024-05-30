import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { createMultiSigFromFetchedAccounts } from '@/lib/sui-related/zkLogin';

import WalletCardAdapter from './WalletCardAdapter';

const buildMultisigSuggestions = async (
  zkAccounts: ZkLoginFetchedAccount[]
) => {
  const suggestedMultisig: MultiSigAccount[] = [];

  for (let i = 0; i < zkAccounts.length - 1; i++) {
    for (let j = i + 1; j < zkAccounts.length; j++) {
      const account1 = zkAccounts[i];
      const account2 = zkAccounts[j];

      const multisig = await createMultiSigFromFetchedAccounts(
        [account1, account2],
        1
      );
      suggestedMultisig.push(multisig);
    }
  }

  return suggestedMultisig;
};

function MultisigSuggestionList({
  zkAccounts,
}: {
  zkAccounts: ZkLoginFetchedAccount[];
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
    <Stack>
      {multisigAccounts.map((multisig) => (
        <WalletCardAdapter key={multisig.address} walletSource={multisig} />
      ))}
    </Stack>
  );
}

export default MultisigSuggestionList;
