'use client'

import { jwtDecode } from "jwt-decode";
import queryString from "query-string";
import { useMemo } from "react";

import { useZkLogin } from "@/hooks/useZkLogin";
import { signInWithGoogle } from "@/lib/Oauth/Google";

export function SignIn() {
  const zkLogin = useZkLogin();
  const { token, decodedToken} =
    useMemo(() => {
    const tokenInUrl = queryString.parse(location.hash);
    if (!tokenInUrl?.id_token) return {decodedToken: null, token: null};
    const token = tokenInUrl.id_token as string;
    if (!token) return {decodedToken: null, token: null};
    const decodedToken = jwtDecode(token as string);
    return {
      decodedToken, 
      token};
  }, [])

  const test = async () => {
    console.log("🚀 ~ test ~ zkLogin:", zkLogin)
  }



  const getZkProof = async () => {
    if (!token) return;
    const { zkProof, zkLoginAddress } = await zkLogin.getZkProof(token);
    console.log("🚀 ~ getZkProof ~ zkProof", zkProof);
    console.log("🚀 ~ getZkProof ~ zkLoginAddress", zkLoginAddress);
  }
  

  return (
    <>
      <button onClick={()=> signInWithGoogle(zkLogin.nonce)} >sign in goole</button>
      <button onClick={getZkProof} >Generate zkProof</button>
      <button onClick={test} >Test key</button>
    </>

  )
} 