import { Card, Stack, Typography } from '@mui/material';
import React from 'react';

import { shrinkString } from '@/lib/utils';

function WalletCard({
  statusComponent,
  accountName,
  walletAdress,
  IconComponent,
  selectable,
  clickCallback,
}: {
  statusComponent?: React.ReactNode;
  accountName: string;
  walletAdress: string;
  IconComponent: React.ReactNode;
  selectable?: boolean;
  clickCallback?: () => void;
}) {
  return (
    <Card
      onClick={() => {
        console.log('clicked');
      }}
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
        padding: 1,
        borderRadius: 4,
        width: '100%',
        cursor: `${selectable ? 'pointer' : 'unset'}`,
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
    </Card>
  );
}

export default WalletCard;
