'use client';

import { Button } from '@mui/material';

import { restoreAccountPreparation } from '@/lib/sui-related/zkLoginClient';

import { OauthTypes } from '@/enums/OauthTypes.enum';

function LoginButton(props: {
  name: OauthTypes;
  icon: React.ReactNode;
  oauthBaseUrl: string;
  clientId: string;
}) {
  const loginOnClick = () => {
    const zkLoginAccountPreparation = restoreAccountPreparation();
    if (!zkLoginAccountPreparation) return;

    const params = new URLSearchParams({
      // Configure client ID and redirect URI with an OpenID provider
      client_id: props.clientId,
      redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || '',
      response_type: 'id_token',
      scope: 'openid email',
      // See below for details about generation of the nonce
      nonce: zkLoginAccountPreparation.nonce,
    });

    const loginURL = `${props.oauthBaseUrl}?${params}`;
    console.log('🚀 ~ loginOnClick ~ loginURL:', loginURL);
    window.location.replace(loginURL);
  };

  return (
    <Button
      sx={{
        borderRadius: '25px',
        '&:hover': {
          backgroundColor: 'background.default',
          color: 'primary.main',
        },
      }}
      onClick={loginOnClick}
      variant='contained'
      startIcon={props.icon}
    >
      Sign In with {props.name}
    </Button>
  );
}

export default LoginButton;
