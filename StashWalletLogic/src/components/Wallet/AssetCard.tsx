import { Stack, Typography } from '@mui/material';

function AssetCard({
  name,
  amount,
  symbol,
  icon,
}: {
  name: string;
  amount: number;
  symbol: string;
  icon: React.ReactNode;
}) {
  return (
    <Stack direction='row' gap={2}>
      {icon}
      <Stack direction='row' gap={1}>
        <Typography>{amount}</Typography>
        <Typography>{symbol}</Typography>
      </Stack>
    </Stack>
  );
}

export default AssetCard;
