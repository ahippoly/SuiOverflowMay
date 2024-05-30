import { Card, Stack, Typography } from '@mui/material';
import React from 'react';

import { useZkLogin } from '@/hooks/useZkLogin';
import { shrinkString } from '@/lib/utils';

function WalletCard({
  statusComponent,
  accountName,
  walletAdress,
  IconComponent,
  selectable,
  walletAccount,
  clickCallback,
}: {
  statusComponent?: React.ReactNode;
  accountName: string;
  walletAdress: string;
  IconComponent: React.ReactNode;
  selectable?: boolean;
  walletAccount: WalletAccount;
  clickCallback?: (walletAccount: WalletAccount) => void;
}) {
  const zkLogin = useZkLogin();
  return (
    <Card
      onClick={() => {
        if (selectable === false) return;
        clickCallback && clickCallback(walletAccount);
        zkLogin.setSelectedAccount(walletAccount);
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
