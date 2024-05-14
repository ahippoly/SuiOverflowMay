import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    checks: ['nonce'],
    authorization: {
      params: {
        scope: 'openid',
        nonce: 'test de fou',
        // response_type: 'id_token',
        codeChallengeMethod: ''
      }
    }
  })],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("🚀 ~ signIn ~ profile:", profile)
      console.log("🚀 ~ signIn ~ account:", account)
      
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
})