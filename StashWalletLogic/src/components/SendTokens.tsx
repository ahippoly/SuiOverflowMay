import { Button, Paper, Stack, Typography } from '@mui/material';
import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui.js/faucet';

import { useZkLogin } from '@/hooks/useZkLogin';

function SendTokens() {
  const zkLogin = useZkLogin();

  const getFaucetToken = async () => {
    await requestSuiFromFaucetV0({
      host: getFaucetHost('devnet'),
      recipient: zkLogin.activeAccount?.address || '',
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        p: 4,
      }}
    >
      <Stack gap={2} alignItems='center'>
        <Typography variant='h4'>
          {zkLogin.useZkLoginState.activeAccountSuiCoins} SUI
        </Typography>
        <Stack
          gap={2}
          direction='row'
          justifyContent='space-around'
          width='100%'
        >
          <Button variant='contained'>Send</Button>
          <Button variant='contained'>Swap</Button>
          <Button
            variant='contained'
            onClick={() => {
              getFaucetToken();
            }}
          >
            Faucet
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default SendTokens;
