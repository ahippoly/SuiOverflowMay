import { Stack, Typography } from '@mui/material';
import React from 'react';

function WalletCard({
  statusComponent,
  accountName,
  walletAdress,
  IconComponent,
}: {
  statusComponent: React.ReactNode;
  accountName: string;
  walletAdress: string;
  IconComponent: React.ReactNode;
}) {
  return (
    <Stack direction='row'>
      {statusComponent}
      {IconComponent}
      <Stack>
        <Typography>{accountName}</Typography>
        <Typography>{walletAdress}</Typography>
      </Stack>
    </Stack>
  );
}

export default WalletCard;
