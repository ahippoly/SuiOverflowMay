import GoogleIcon from '@mui/icons-material/Google';

import LoginButton from "@/components/Login/LoginButton";

import { OauthTypes } from '@/enums/OauthTypes.enum';

function LoginWithGoogle() {

  return <LoginButton
    name={OauthTypes.google}
    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
    oauthBaseUrl='https://accounts.google.com/o/oauth2/v2/auth'
    icon={<GoogleIcon />}
  >
  </LoginButton>;
}

export default LoginWithGoogle;