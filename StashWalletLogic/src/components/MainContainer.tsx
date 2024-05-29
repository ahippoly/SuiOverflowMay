import { Container, Paper } from '@mui/material';

function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth='xs'>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          height: ' 680px',
          width: '400px',
        }}
      >
        {children}
      </Paper>
    </Container>
  );
}

export default MainContainer;
