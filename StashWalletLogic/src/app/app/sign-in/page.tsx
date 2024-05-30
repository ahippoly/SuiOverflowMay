import { useEffect } from 'react';

import { useZkLogin } from '@/hooks/useZkLogin';
import {
  handleOauthResponse,
  restoreFullAccounts,
} from '@/lib/sui-related/zkLoginClient';

function OauthHandling() {
  const zkLogin = useZkLogin();

  useEffect(() => {
    if (location.hash.includes('id_token')) {
      handleOauthResponse().then(() => {
        zkLogin.setZkLoginAccounts(restoreFullAccounts());
        zkLogin.setUseZkLoginState((prev) => ({
          ...prev,
          isInitializing: false,
        }));
      });
    }
  }, []);

  return <></>;
}

export default OauthHandling;
