
"use client"

// import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import { Box, Stack } from '@mui/material';

import MainContainer from '@/components/MainContainer';


// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {

  return (
      <Box
        sx={{
          backgroundColor: "#4158D0",
          backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <MainContainer>
          <Stack 
          direction="column" 
          spacing={2}
          justifyContent="center"
            sx={{
              height: '100%',
            }}
          >
            
          </Stack>
        </MainContainer>
      </Box>
  );
}
