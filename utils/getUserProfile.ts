import { User } from '@supabase/supabase-js'
import { Participant } from 'twilio-video'

import { Profile } from 'types'

export const getUserProfile = (user: User | null): Profile | null => {
  if (user) {
    const { user_metadata, id } = user
    const { full_name, avatar_url, email } = user_metadata
    return { id, email, full_name, avatar_url }
  }
  return null
}

export const getFullNameFromMember = (member: Participant) => {
  // member.identity seems like: 3094809384-23232-232323|Mi name
  return member.identity.split('|')[1]
}
