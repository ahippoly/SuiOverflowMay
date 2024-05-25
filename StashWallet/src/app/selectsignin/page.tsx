"use client"

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function SelectSignin() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5dc",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1" align="center" sx={{ fontWeight: '900', marginBottom: 4 }}>1 of 2 suggested</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" size="large">Option 1</Button>
        <Button variant="contained" size="large">
          <span>Option 2</span>
          <CheckIcon className="ml-2" style={{ marginLeft: '8px', height: '24px', width: '24px', color: 'green' }} />
        </Button>
      </Box>
      <Box sx={{ marginTop: 8 }}>
        <Link href="#" passHref>
          <Button variant="outlined" size="large">Skip</Button>
        </Link>
      </Box>
    </Box>
  );
}