'use client';

export const signInWithGoogle = async (nonce: string) => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
    response_type: 'id_token',
    scope: 'openid',
    nonce: nonce,
  });
  params;
  const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  window.location.replace(loginURL);
  // console.log('🚀 ~ signInWithGoogle ~ params:', params.toString());
  // console.log('🚀 ~ signInWithGoogle ~ loginURL:', loginURL);
  // window.history.pushState({}, '', loginURL);
};
