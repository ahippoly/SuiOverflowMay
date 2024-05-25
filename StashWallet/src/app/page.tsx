
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
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';

import MainContainer from '@/components/MainContainer';


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
      </Box>
  );
}
