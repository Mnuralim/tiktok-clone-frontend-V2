'use server'

import { signIn } from '@/auth'

export async function signInGoogle() {
  return signIn('google', {
    redirectTo: '/',
  })
}
