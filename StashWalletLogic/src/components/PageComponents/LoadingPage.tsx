import { CircularProgress, Stack, Typography } from '@mui/material';

function LoadingPage({ text }: { text?: string }) {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      gap={2}
      flexGrow={1}
      sx={{ my: 'auto' }}
    >
      <CircularProgress disableShrink />
      {text && <Typography variant='body1'>{text}</Typography>}
    </Stack>
  );
}

export default LoadingPage;
