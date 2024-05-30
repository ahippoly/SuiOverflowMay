'use client';

import { Button, Container, Stack, Typography } from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';
import { fullAccountToFetchedAccount } from '@/lib/sui-related/zkLogin';

import MultisigSuggestionList from '../Wallet/MultisigSuggestionList';

function AccountAddedPage({
  accountAdded,
}: {
  accountAdded: ZkLoginFullAccount;
}) {
  const zkLogin = useZkLogin();

  const accountsForMultisig: ZkLoginFetchedAccount[] =
    zkLogin.zkLoginAccounts.map(fullAccountToFetchedAccount);

  return (
    <Stack gap={2} alignItems='center' flexGrow={1}>
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
        <MultisigSuggestionList zkAccounts={accountsForMultisig} />
      </Container>
      <Button variant='outlined'>Skip</Button>
    </Stack>
  );
}

export default AccountAddedPage;
