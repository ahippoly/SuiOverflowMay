'use client';

import { Button, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { useZkLogin } from '@/hooks/useZkLogin';
import { fullAccountToFetchedAccount } from '@/lib/sui-related/zkLogin';

import UseMultisigAccountModal from '../Modals/UseMultisigAccountModal';
import MultisigSuggestionList from '../Wallet/MultisigSuggestionList';

function AccountAddedPage({
  accountAdded,
}: {
  accountAdded: ZkLoginFullAccount;
}) {
  const zkLogin = useZkLogin();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount>();

  const accountsForMultisig: ZkLoginFetchedAccount[] =
    zkLogin.zkLoginAccounts.map(fullAccountToFetchedAccount);

  const onAccountSelected = (account: WalletAccount) => {
    setSelectedAccount(account);
    setModalOpened(true);
  };

  return (
    <Stack gap={2} alignItems='center' flexGrow={1}>
      {selectedAccount && selectedAccount.type == 'multisig' && (
        <UseMultisigAccountModal
          multisigAccount={selectedAccount as MultiSigAccount}
          open={modalOpened}
          onClose={() => setModalOpened(false)}
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
        }}
      >
        <MultisigSuggestionList
          zkAccounts={accountsForMultisig}
          clickCallback={onAccountSelected}
        />
      </Container>
      <Button variant='contained'>Use suggested</Button>
      <Button variant='outlined'>Skip</Button>
    </Stack>
  );
}

export default AccountAddedPage;
