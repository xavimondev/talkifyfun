// import { User } from '@supabase/supabase-js'

import { User } from '@supabase/supabase-js'

import { Activity } from 'types/room'

import { supabase } from './config'

// Create a new activity on database
export const saveActivityDatabase = async (activity: Activity) => {
  try {
    const { data, error } = await supabase
      .from<Activity>('activities')
      .insert(activity, { returning: 'minimal' })

    if (error) {
      throw new Error('Error creating activity')
    }
    return data
  } catch (error) {
    return null
  }
}

// List activities by user
export const listActivitiesByUser = async (userId: User['id']) => {
  try {
    const { data, error } = await supabase
      .from<Activity>('activities')
      .select('id,title,created_at')
      .eq('user_id', userId)
      .order('id', { ascending: false })

    if (error) {
      throw new Error('Error listing rooms')
    }
    return data
  } catch (error) {
    return null
  }
}
