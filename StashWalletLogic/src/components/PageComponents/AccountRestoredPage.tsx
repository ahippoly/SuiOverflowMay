import { Container, Stack, Typography } from '@mui/material';

function AccountRestoredPage({
  restoredAccounts,
}: {
  restoredAccounts: WalletAccount[];
}) {
  return (
    <Stack gap={2} alignItems='center' flexGrow={1}>
      <Typography variant='h5'>Accounts restored</Typography>
      <Typography variant='body1' textAlign='center'>
        We found that you already have some accounts, which one would you like
        to use ?
      </Typography>
      <Container
        sx={{
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      ></Container>
    </Stack>
  );
}

export default AccountRestoredPage;
