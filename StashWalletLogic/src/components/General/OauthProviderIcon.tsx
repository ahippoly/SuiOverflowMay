import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { getOauthTypeFromIssuer } from '@/lib/sui-related/zkLogin';
function OauthProviderIcon({ issuer }: { issuer: string }) {
  const provider = getOauthTypeFromIssuer(issuer);

  switch (provider) {
    case 'google':
      return <GoogleIcon />;
    case 'facebook':
      return <FacebookIcon />;
    default:
      return <QuestionMarkIcon />;
  }
}

export default OauthProviderIcon;
