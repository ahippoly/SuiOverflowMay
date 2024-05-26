'use client';

// import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

import { useZkLogin } from '@/hooks/useZkLogin';

import LoginWithFacebook from '@/components/Login/LoginWithFacebook';
import LoginWithGoogle from '@/components/Login/LoginWithGoogle';
import ExecuteTransaction from '@/components/Wallet/ExecuteTransaction';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const zkLogin = useZkLogin();

  return (
    <>
      {/* <Button
        onClick={async () => {
          zkLogin.createMultiSigWallet([OauthTypes.google]);
        }}
        variant='contained'
        color='primary'
      >
        Create Multisig
      </Button> */}
      <ExecuteTransaction />
      <LoginWithGoogle />
      <LoginWithFacebook />
    </>
  );
}
