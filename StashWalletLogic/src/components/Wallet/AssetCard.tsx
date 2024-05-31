import { Stack, Typography } from '@mui/material';

function AssetCard({
  name,
  amount,
  symbol,
  icon,
  isArithmeticOperation,
}: {
  name: string;
  amount: number;
  symbol: string;
  icon: React.ReactNode;
  isArithmeticOperation?: boolean;
}) {
  return (
    <Stack direction='row' gap={2}>
      {icon}
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography>
          {isArithmeticOperation && amount > 0 ? '+' : ''}
          {amount}
        </Typography>
        <Typography>{symbol}</Typography>
      </Stack>
    </Stack>
  );
}

export default AssetCard;
