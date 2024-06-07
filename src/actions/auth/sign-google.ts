'use server'

import { signIn } from '@/auth'

export async function signInGoogle(redirectUrl: string) {
  return signIn('google', {
    redirectTo: redirectUrl,
  })
}
