import { Paper, Stack, Typography } from '@mui/material';

import TransactionAssetTransfer from './TransactionAssetTransfer';

function TransactionData({ amount }: { amount: number }) {
  return (
    <Paper sx={{ p: 4, width: '100%' }} elevation={0}>
      <Stack gap={2}>
        <Typography variant='h6'>Transaction will do</Typography>
        <TransactionAssetTransfer
          asset='SUI'
          amount={-1}
          addressConcerned='0x1234567890'
        />
        <TransactionAssetTransfer
          asset='SUI'
          amount={1}
          addressConcerned='0x1234567890'
        />
      </Stack>
    </Paper>
  );
}

export default TransactionData;
