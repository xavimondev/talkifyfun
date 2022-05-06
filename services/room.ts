import { User } from '@supabase/supabase-js'

import { RoomCall } from 'types/room'

import { supabase } from './config'

// Create a new room on database
export const saveRoomDatabase = async (room: RoomCall) => {
  try {
    const { data, error } = await supabase.from<RoomCall>('rooms').insert(room)
    if (error) {
      throw new Error('Error creating room')
    }
    return data
  } catch (error) {
    return null
  }
}

// List room by owner
export const listRoomsByOwner = async (userId: User['id']) => {
  try {
    const { data, error } = await supabase
      .from<RoomCall>('rooms')
      .select('id,name,shareable_code,total_participant')
      .eq('owner_id', userId)
      .order('id', { ascending: false })

    if (error) {
      throw new Error('Error listing rooms')
    }
    return data
  } catch (error) {
    return null
  }
}
