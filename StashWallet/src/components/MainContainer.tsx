'use client';

import { Container, Paper } from '@mui/material';
function MainContainer({
  children,
  isMobile,
}: {
  children: React.ReactNode;
  isMobile?: boolean;
}) {
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
        {children}
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
        {children}
      </Paper>
    </Container>
  );
}

export default MainContainer;
