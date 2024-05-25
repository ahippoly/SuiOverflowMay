
"use client"

// import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import { Box, Stack, Typography, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { SiTwitch as TwitchIcon } from 'react-icons/si';
import { SiX as TwitterIcon } from 'react-icons/si';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SvgIcon from '@mui/material/SvgIcon';
import Link from '@mui/material/Link';

import MainContainer from '@/components/MainContainer';

function DoorClosedIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M14 12v.01" />
    </SvgIcon>
  );
}

function LinkIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </SvgIcon>
  );
}

function LinkedinIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </SvgIcon>
  );
}


// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {

  return (
      <Box
        sx={{
          backgroundColor: "#eeeeee",
          //backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Stack 
          direction="column" 
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '100%',
          }}
        >
          <Typography variant="h1" align="center" sx={{ fontWeight: '900' }}>OWN</Typography>
          <Typography variant="h1" align="center" sx={{ fontWeight: '900' }}>DIGITAL ASSETS</Typography>
          <Typography variant="h1" align="center" sx={{ fontWeight: '900' }}>ON SUI</Typography>
          
          <Stack 
            direction="column" 
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              marginTop: 4,
            }}
          >
            <Button 
              variant="contained" 
              sx={{ 
                width: '200px', 
                height: '50px', 
                backgroundColor: 'black', 
                color: 'white', 
                borderRadius: '25px', 
                fontSize: '0.75rem',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                }
              }} 
              startIcon={<GoogleIcon />}
            >
              Sign In with Google
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                width: '200px', 
                height: '50px', 
                backgroundColor: 'black', 
                color: 'white', 
                borderRadius: '25px', 
                fontSize: '0.75rem',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                }
              }} 
              startIcon={<TwitchIcon />}
            >
              Sign In with Twitch
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                width: '200px', 
                height: '50px', 
                backgroundColor: 'white', 
                color: 'black', 
                border: '2px solid black', 
                borderRadius: '25px', 
                fontSize: '0.75rem',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                }
              }} 
              startIcon={<WalletIcon />}
            >
              Connect Wallet
            </Button>
          </Stack>
        </Stack>
        <Stack 
            direction="row" 
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              marginTop: 4,
            }}
          >
            <TwitterIcon style={{ fontSize: 24 }} />
          </Stack>

          <Stack 
            direction="row" 
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              marginTop: 4,
              fontSize: '0.875rem',
            }}
          >
            <Typography>©2024 ZIODAR LABS. ALL RIGHTS RESERVED.</Typography>
            <Link href="#" sx={{ textDecoration: 'none', color: 'inherit' }}>FAQ</Link>
            <Link href="#" sx={{ textDecoration: 'none', color: 'inherit' }}>TERMS & CONDITIONS</Link>
            <Link href="#" sx={{ textDecoration: 'none', color: 'inherit' }}>PRIVACY POLICY</Link>
            <Link href="#" sx={{ textDecoration: 'none', color: 'inherit' }}>MANAGE COOKIES</Link>
          </Stack>
      </Box>
  );
}
