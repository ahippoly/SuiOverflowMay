import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { getOauthTypeFromIssuer } from '@/lib/sui-related/zkLogin';
function OauthProviderIcon({
  issuer,
  color,
}: {
  issuer: string;
  color?: string;
}) {
  const provider = getOauthTypeFromIssuer(issuer);

  switch (provider) {
    case 'google':
      return <GoogleIcon sx={{ color }} />;
    case 'facebook':
      return <FacebookIcon sx={{ color }} />;
    default:
      return <QuestionMarkIcon sx={{ color }} />;
  }
}

export default OauthProviderIcon;
