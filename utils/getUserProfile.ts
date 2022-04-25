import { User } from '@supabase/supabase-js'

import { Profile } from 'types'

export const getUserProfile = (user: User | null): Profile | null => {
  if (user) {
    const { user_metadata, id } = user
    const { full_name, avatar_url, email } = user_metadata
    return { id, email, full_name, avatar_url }
  }
  return null
}
