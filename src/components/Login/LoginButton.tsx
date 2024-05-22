"use client"

import { Button } from "@mui/material";

import { useZkLogin } from "@/hooks/useZkLogin";

function LoginButton(props: {
  name: string;
  icon: React.ReactNode;
  oauthBaseUrl: string;
  clientId: string;
}) {

  const zkLoginInfo = useZkLogin();

  const params = new URLSearchParams({
    // Configure client ID and redirect URI with an OpenID provider
    client_id: props.clientId,
    redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || '',
    response_type: 'id_token',
    scope: 'openid',
    // See below for details about generation of the nonce
    nonce: zkLoginInfo.nonce,
  });

  const loginOnClick = () => {
    const loginURL = `${props.oauthBaseUrl}?${params}`;
    console.log("🚀 ~ loginOnClick ~ loginURL:", loginURL)
    window.location.replace(loginURL);
  }

  return ( 
    <Button
      onClick={loginOnClick}
    variant="contained" startIcon={props.icon}>
      Sign In with {props.name}
    </Button>

   );
}

export default LoginButton;