import { supabase } from './config'
/**
 * Authentication with provider
 */
type Provider = 'google' | 'discord'

export const signInWithProvider = async (provider: Provider) => {
  try {
    const { user, error } = await supabase.auth.signIn(
      {
        provider: provider
      }
      // {
      //   redirectTo: 'http://localhost:3000/home'
      // }
    )
    if (error) throw new Error('An error ocurred during authentication')
    return user
  } catch (error) {
    console.error(error)
  }
}

/** Logout */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error('An error ocurred during logout')
  } catch (error) {
    console.error(error)
  }
}
