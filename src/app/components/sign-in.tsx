import { signInGoogle } from "@/lib/authentification";


export function SignIn() {
  return (
    <form
      action={signInGoogle}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 