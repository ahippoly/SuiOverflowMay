"use client"

import { Box, Typography, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { SiTwitch as TwitchIcon } from 'react-icons/si';
import Link from 'next/link';

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
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
      <Typography variant="h1" align="center" sx={{ fontWeight: '900', marginBottom: 12 }}>1 of 2 suggested</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckIcon sx={{ width: '48px', height: '48px', color: 'black' }} />
          <Button 
            variant="contained" 
            sx={{ 
              width: '300px', 
              height: '75px', 
              backgroundColor: 'black', 
              color: 'white', 
              borderRadius: '50px',
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              }
            }} 
            startIcon={<GoogleIcon style={{ fontSize: 32 }} />}
          >
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>Sign In with Google</Box>
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckIcon sx={{ width: '48px', height: '48px', color: 'black' }} />
          <Button 
            variant="contained" 
            sx={{ 
              width: '300px', 
              height: '75px', 
              backgroundColor: 'black', 
              color: 'white', 
              borderRadius: '50px',
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              }
            }} 
            startIcon={<TwitchIcon style={{ fontSize: 32 }}/>}
          >
                <Box sx={{ flexGrow: 1, textAlign: 'center' }}>Sign In with Twitch</Box>
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: 8 }}>
        <Link href="/walletdisplay/page.tsx" passHref>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              backgroundColor: 'white', 
              color: 'black', 
              border: '2px solid black', 
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
              }
            }}
          >
            Skip
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
