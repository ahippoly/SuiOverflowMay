
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
import Logo from '@/components/Logo'; // Assuming you have a Logo component

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
        <Box sx={{ marginBottom: 4, padding: 2 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 56 56" className="h-14 w-14">
            <rect width="54" height="54" x="1" y="1" stroke="#000" strokeWidth="2" rx="27"></rect>
            <path fill="#000" d="M18.353 35.064c.921 3.438 4.363 6.551 11.483 4.644 6.794-1.821 11.052-7.41 9.948-11.53-.381-1.423-1.53-2.387-3.3-2.23l-15.832 1.32c-.997.076-1.454-.088-1.718-.716-.256-.599-.11-1.241 1.094-1.85l12.048-6.183c.924-.47 1.539-.666 2.101-.468.352.128.584.638.371 1.267l-.781 2.306c-.959 2.83 1.094 3.488 2.25 3.178 1.751-.469 2.163-2.136 1.599-4.24-1.43-5.337-7.09-6.17-12.223-4.796-5.222 1.4-9.748 5.63-8.366 10.789.325 1.215 1.444 2.186 2.74 2.157l1.978-.005c.407-.01.26.024 1.046-.041.784-.065 2.88-.323 2.88-.323l10.286-1.164.265-.038c.602-.103 1.056.053 1.44.715.576.991-.302 1.738-1.352 2.633l-.085.072-9.041 7.792c-1.55 1.337-2.639.834-3.02-.589l-1.35-5.04c-.334-1.244-1.55-2.221-2.974-1.84-1.78.477-1.924 2.55-1.487 4.18Z"></path>
          </svg>
        </Box>
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
