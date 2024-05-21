import { Container, Paper, Stack } from "@mui/material";

function MainContainer({ children } : { children: React.ReactNode }) {
  return ( 
  <Container maxWidth="xs">
    <Paper elevation={8}>
      <Stack spacing={2}>
        {children}
      </Stack>
    </Paper>
  </Container> );
}

export default MainContainer;