import { Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { useZkLogin } from '@/hooks/useZkLogin';

import suiIcon from '@/assets/suiIcon.png';

import CircledIcon from './General/CircledIcon';
import AssetCard from './Wallet/AssetCard';

function YourAssets() {
  const zkLogin = useZkLogin();
  return (
    <Stack flexGrow={1} gap={3}>
      <Stack direction='row'>
        <Typography variant='h5'>Your Assets</Typography>
        <Divider variant='fullWidth' orientation='horizontal' flexItem />
      </Stack>
      <AssetCard
        name='SUI'
        amount={zkLogin.useZkLoginState.activeAccountSuiCoins}
        symbol='SUI'
        icon={
          <CircledIcon>
            <Image src={suiIcon} alt='asset' />
          </CircledIcon>
        }
      />
    </Stack>
  );
}

export default YourAssets;
