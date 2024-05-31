import { Stack, Typography } from '@mui/material';

// import suiIcon from '@/assets/suiLogo.png';

function YourAssets() {
  return (
    <Stack flexGrow={1}>
      <Typography variant='h5'>Your Assets</Typography>
      {/* <AssetCard
        name='SUI'
        amount={10}
        symbol='SUI'
        icon={<Avatar src={suiIcon} />}
      /> */}
    </Stack>
  );
}

export default YourAssets;
