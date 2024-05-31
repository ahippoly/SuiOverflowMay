import { Paper, Stack, Typography } from '@mui/material';

import TransactionAssetTransfer from './TransactionAssetTransfer';

function TransactionData({
  amount,
  fromAddress,
  toAddress,
}: {
  amount: number;
  fromAddress: string;
  toAddress: string;
}) {
  return (
    <Paper sx={{ p: 4, width: '100%' }} elevation={0}>
      <Stack gap={2}>
        <Typography variant='h6'>Transaction will do</Typography>
        <TransactionAssetTransfer
          asset='SUI'
          amount={-amount}
          addressConcerned={fromAddress}
        />
        <TransactionAssetTransfer
          asset='SUI'
          amount={amount}
          addressConcerned={toAddress}
        />
      </Stack>
    </Paper>
  );
}

export default TransactionData;
