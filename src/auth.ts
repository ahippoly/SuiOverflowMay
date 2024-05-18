import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      checks: ['nonce'],
      authorization: {
        params: {
          scope: 'openid',
          nonce: 'test de fou',
          // response_type: 'id_token',
          codeChallengeMethod: '',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account, profile }) {
      // console.log("🚀 ~ signIn ~ profile:", profile)
      // console.log("🚀 ~ signIn ~ account:", account)

      return true; // Do different verification for other providers that don't have `email_verified`
    },
    jwt(params) {
      // console.log('🚀 ~ jwt ~ params:', params);
      if (params.profile) {
        params.token.iss = params.profile.iss;
        params.token.sub = params.profile.sub || '';
        params.token.nonce = params.profile.nonce;
        params.token.aud = params.profile.aud;
      }
      if (params.account) {
        params.token.jwt = params.account.id_token;
      }

      return params.token;
    },
    session(params) {
      // console.log('🚀 ~ session ~ params:', params);
      params.session.jwt = params.token.jwt;
      return params.session;
    },
  },
});
