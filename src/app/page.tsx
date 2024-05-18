
"use client"

// import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

import { useZkLogin } from '@/hooks/useZkLogin';

import { SignIn } from '@/app/components/sign-in';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {

  const zkLogin = useZkLogin();

  // const restoredKey = Ed25519Keypair.fromSecretKey(new TextEncoder().encode("qrwfsdh3xn3hpn92ds09ffdcv0ezcmd2qk4c3qxckpldargc5qyf5uyjt35"));

  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Logo className='w-16' />
          <h1 className='mt-4'>Next.js + Tailwind CSS + TypeScript Starter</h1>
          <p className='mt-2 text-sm text-gray-800'>
            A starter for Next.js, Tailwind CSS, and TypeScript with Absolute
            Import, Seo, Link component, pre-configured with Husky{' '}
          </p>

          <p> privateKey : {zkLogin.ephemeralKeyPair.secretKey} </p>
          <p> publicKey : {zkLogin.ephemeralKeyPair.publicKey}</p>
          {/* <p> restoredKey : {restoredKey.getPublicKey().toBase64()}</p> */}

          <button onClick={zkLogin.prepareZkLogin}>Prepare zkLogin</button>

          <SignIn />


        </div>
      </section>
    </main>
  );
}
