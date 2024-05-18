'use client'

import { useSession } from "next-auth/react";

import { useZkLogin } from "@/hooks/useZkLogin";
import { signInGoogle } from "@/lib/authentification";
import { generateZkLoginNonce } from "@/lib/sui-related/zkLogin";


export function SignIn() {
  const sessions = useSession()
  const zkLogin = useZkLogin();

  const getSessions = async () => {
    console.log("🚀 ~ getSessions ~ sessions:", sessions)
  }

  const OauthGoogle = async () => {
    const { ephemeralKeyPair, randomness } = await zkLogin.prepareZkLogin();
    const nonce = await generateZkLoginNonce(randomness, ephemeralKeyPair);
    signInGoogle(nonce);
  }


  const getZkProof = async () => {
    const { zkProof, zkLoginAddress } = await zkLogin.getZkProof(sessions.jwt);
    console.log("🚀 ~ getZkProof ~ zkProof", zkProof);
    console.log("🚀 ~ getZkProof ~ zkLoginAddress", zkLoginAddress);
  }
  

  return (
    <>
      <form
        action={OauthGoogle}
      >
        <button type="submit">Signin with Google</button>
      </form>
      <button onClick={getSessions} >Get sesion</button>
      <button onClick={getZkProof} >Generate zkProof</button>
    </>

  )
} 