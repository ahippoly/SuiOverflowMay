import FacebookIcon from '@mui/icons-material/Facebook';

import LoginButton from "@/components/Login/LoginButton";

import { OauthTypes } from '@/enums/OauthTypes.enum';

function LoginWithFacebook() {

  return <LoginButton
    name={OauthTypes.facebook}
    clientId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ''}
    oauthBaseUrl='https://www.facebook.com/v17.0/dialog/oauth'
    icon={<FacebookIcon />}
  >
  </LoginButton>;
}

export default LoginWithFacebook;