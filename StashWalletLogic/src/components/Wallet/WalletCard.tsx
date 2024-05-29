import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import { shrinkString } from '@/lib/utils';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
        padding: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
      }}
    >
      {statusComponent}
      {IconComponent}
      <Stack>
        <Typography variant='body1' fontWeight='bold' noWrap>
          {accountName}
        </Typography>
        <Typography variant='body2' noWrap>
          {shrinkString(walletAdress, 10, 5)}
        </Typography>
      </Stack>
    </Box>
  );
}

export default WalletCard;
