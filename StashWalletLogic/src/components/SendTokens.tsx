import { Button, Paper, Stack, Typography } from '@mui/material';

function SendTokens() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        p: 4,
      }}
    >
      <Stack gap={2} alignItems='center'>
        <Typography variant='h4'>10 SUI</Typography>
        <Stack
          gap={2}
          direction='row'
          justifyContent='space-around'
          width='100%'
        >
          <Button variant='contained'>Send</Button>
          <Button variant='contained'>Swap</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default SendTokens;
