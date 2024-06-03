'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack, Typography } from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';

import WalletCardAdapter from '@/components/Wallet/WalletCardAdapter';

function SwitchAccount() {
  const zkLogin = useZkLogin();

  return (
    <Stack>
      <Typography alignSelf='center' variant='h5'>
        Switch Account
      </Typography>
      <Typography variant='h6'>Safe accounts</Typography>
      <Stack spacing={2}>
        {zkLogin.multisigAccounts.map((account) => (
          <WalletCardAdapter
            walletSource={account}
            key={account.address}
            isSelectable
            endIcons={
              <>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          />
        ))}
        {zkLogin.multisigAccounts.length === 0 && (
          <Typography alignItems='center' variant='body1'>
            No Safe account found
          </Typography>
        )}
      </Stack>

      <Typography variant='h6'>Simple accounts</Typography>
      <Stack spacing={2}>
        {zkLogin.zkLoginAccounts.map((account) => (
          <WalletCardAdapter
            walletSource={account}
            key={account.address}
            isSelectable
            endIcons={
              <>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default SwitchAccount;
