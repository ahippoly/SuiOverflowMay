import FacebookIcon from '@mui/icons-material/Facebook';

import LoginButton from "@/components/Login/LoginButton";

function LoginWithFacebook() {

  return <LoginButton
    name="Facebook"
    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
    oauthBaseUrl='https://accounts.google.com/o/oauth2/v2/auth'
    icon={<FacebookIcon />}
  >
  </LoginButton>;
}

export default LoginWithFacebook;