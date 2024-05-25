"use client"

import { Button } from "@mui/material";

import { useZkLogin } from "@/hooks/useZkLogin";

import { OauthTypes } from "@/enums/OauthTypes.enum";

function LoginButton(props: {
  name: OauthTypes;
  icon: React.ReactNode;
  oauthBaseUrl: string;
  clientId: string;
}) {

  const zkLoginInfoByProvider = useZkLogin();
  const zkLoginInfo = zkLoginInfoByProvider?.[props.name]?.[0];

  const params = new URLSearchParams({
    // Configure client ID and redirect URI with an OpenID provider
    client_id: props.clientId,
    redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || '',
    response_type: 'id_token',
    scope: 'openid',
    // See below for details about generation of the nonce
    nonce: zkLoginInfo?.nonce,
  });

  const loginOnClick = () => {
    if (!zkLoginInfo) {
      console.log("🚀 ~ loginOnClick ~ name:", props.name)
      console.log("🚀 ~ loginOnClick ~ zkLoginInfo:", zkLoginInfoByProvider)
      console.error('zkLoginInfo is not found');
      return;
    }
    const loginURL = `${props.oauthBaseUrl}?${params}`;
    console.log("🚀 ~ loginOnClick ~ loginURL:", loginURL)
    window.location.replace(loginURL);
  }

  return ( 
    <Button
      onClick={loginOnClick}
      variant="contained" 
      startIcon={props.icon}>
      Sign In with {props.name}
    </Button>

   );
}

export default LoginButton;