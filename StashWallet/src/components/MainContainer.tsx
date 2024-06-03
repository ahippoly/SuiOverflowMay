import { Container, Paper } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
function MainContainer({ children }: { children: React.ReactNode }) {
  const isMobile = !useMediaQuery((theme) => theme.breakpoints.up('sm'));

  if (isMobile) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          height: '100%',
          width: '100%',
          backgroundColor: 'background.default',
        }}
      >
        <>{children}</>
      </Paper>
    );
  }

  return (
    <Container maxWidth='xs'>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          height: '680px',
          width: '400px',
          backgroundColor: 'background.default',
        }}
      >
        <>{children}</>
      </Paper>
    </Container>
  );
}

export default MainContainer;
