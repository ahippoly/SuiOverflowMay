'use client';

import { LoadingButton } from '@mui/lab';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useZkLogin } from '@/hooks/useZkLogin';
import {
  buildMultisigSuggestions,
  fullAccountToFetchedAccount,
} from '@/lib/sui-related/zkLogin';
import {
  createNewMultisigAccount,
  saveActiveAccount,
  saveMultisigAccountsWithOldOnes,
} from '@/lib/sui-related/zkLoginClient';

import UseMultisigAccountModal from '../Modals/UseMultisigAccountModal';
import WalletCardAdapter from '../Wallet/WalletCardAdapter';

function AccountAddedPage({
  accountAdded,
}: {
  accountAdded: ZkLoginFullAccount;
}) {
  const zkLogin = useZkLogin();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount>();
  const [loadingConfirmation, setLoadingConfirmation] = useState(false);
  const router = useRouter();

  const accountsForMultisig: ZkLoginFetchedAccount[] = useMemo(
    () => zkLogin.zkLoginAccounts.map(fullAccountToFetchedAccount),
    [zkLogin.zkLoginAccounts]
  );

  const [multisigAccounts, setMultisigAccounts] = useState<MultiSigAccount[]>(
    []
  );

  useEffect(() => {
    buildMultisigSuggestions(accountsForMultisig).then((suggestedMultisig) => {
      setMultisigAccounts(suggestedMultisig);
    });
  }, [accountsForMultisig]);

  const onAccountSelected = (account: WalletAccount) => {
    setSelectedAccount(account);
    setModalOpened(true);
  };

  const confirmAccountSelection = async (multisigAccount: MultiSigAccount) => {
    setLoadingConfirmation(true);
    const newMultisig = await createNewMultisigAccount(
      multisigAccount.components
    );

    zkLogin.setActiveAccount(newMultisig);
    zkLogin.setUseZkLoginState((prev) => ({
      ...prev,
      activeAccountAddress: newMultisig.address,
    }));
    zkLogin.setActiveAccount(newMultisig);
    saveActiveAccount(newMultisig);
    saveMultisigAccountsWithOldOnes([newMultisig]);
    setLoadingConfirmation(false);
    router.push('/app');
  };

  return (
    <Stack gap={2} alignItems='center' flexGrow={1}>
      {selectedAccount && selectedAccount.type == 'multisig' && (
        <UseMultisigAccountModal
          loadingConfirmation={loadingConfirmation}
          multisigAccount={selectedAccount as MultiSigAccount}
          open={modalOpened}
          onClose={() => setModalOpened(false)}
          onConfirm={confirmAccountSelection}
        />
      )}

      <Typography variant='h5'>Account added !</Typography>
      <Typography variant='body1' textAlign='center'>
        Would you like to create a Safe Account with it (recommanded)
      </Typography>
      <Container
        sx={{
          maxHeight: '300px',
          overflowY: 'auto',
          flexGrow: 1,
        }}
      >
        <Stack gap={2} width='100%'>
          {multisigAccounts.map((multisig) => (
            <WalletCardAdapter
              key={multisig.address}
              walletSource={multisig}
              clickCallback={onAccountSelected}
              isSelectable
            />
          ))}
        </Stack>
      </Container>
      <LoadingButton
        loading={loadingConfirmation}
        onClick={() => {
          confirmAccountSelection(multisigAccounts[0]);
        }}
        variant='contained'
      >
        Use suggested
      </LoadingButton>
      <Button variant='outlined'>Skip</Button>
    </Stack>
  );
}

export default AccountAddedPage;
