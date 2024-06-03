import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { shrinkString } from '@/lib/utils';

import suiIcon from '@/assets/suiIcon.png';

import CircledIcon from '../General/CircledIcon';
import AssetCard from './AssetCard';

function TransactionAssetTransfer({
  asset,
  amount,
  addressConcerned,
}: {
  asset: string;
  amount: number;
  addressConcerned: string;
}) {
  const textColor = (() => {
    if (amount === 0) {
      return 'text.primary';
    } else if (amount < 0) {
      return 'error.main';
    } else {
      return 'success.main';
    }
  })();

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      gap={2}
      sx={{
        color: textColor,
      }}
    >
      <AssetCard
        name='Sui'
        amount={Number(amount)}
        symbol='SUI'
        isArithmeticOperation={amount !== 0}
        icon={
          <CircledIcon>
            <Image src={suiIcon} alt='asset' />
          </CircledIcon>
        }
      />
      <Typography variant='body2' noWrap>
        {shrinkString(addressConcerned, 10, 5)}
      </Typography>
    </Stack>
  );
}

export default TransactionAssetTransfer;
