'use server';

import { signIn } from '@/auth';

export const signInGoogle = async (nonce: string) => {
  await signIn('google', undefined, {
    // nonce: 'azazagiazjgiazgiazjigazgazgji',
  });
};
