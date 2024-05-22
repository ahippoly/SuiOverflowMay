import FacebookIcon from '@mui/icons-material/Facebook';

import LoginButton from "@/components/Login/LoginButton";

function LoginWithFacebook() {

  return <LoginButton
    name="Facebook"
    clientId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ''}
    oauthBaseUrl='https://www.facebook.com/v17.0/dialog/oauth'
    icon={<FacebookIcon />}
  >
  </LoginButton>;
}

export default LoginWithFacebook;