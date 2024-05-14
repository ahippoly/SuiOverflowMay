'use client'

import { useSession } from "next-auth/react";

import { signInGoogle } from "@/lib/authentification";


export function SignIn() {
  const sessions = useSession()

  const getSessions = async () => {

    console.log("🚀 ~ getSessions ~ sessions:", sessions)
  }


  return (
    <>
      <form
        action={signInGoogle}
      >
        <button type="submit">Signin with Google</button>
      </form>
      <button onClick={getSessions} >Get sesion</button>
    </>

  )
} 