import GoogleIcon from '@mui/icons-material/Google';

import LoginButton from "@/components/Login/LoginButton";

function LoginWithGoogle() {

  return <LoginButton
    name="Google"
    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
    oauthBaseUrl='https://accounts.google.com/o/oauth2/v2/auth'
    icon={<GoogleIcon />}
  >
  </LoginButton>;
}

export default LoginWithGoogle;