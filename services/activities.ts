// import { User } from '@supabase/supabase-js'

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
