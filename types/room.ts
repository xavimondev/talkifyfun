import { User } from '@supabase/supabase-js'

export interface RoomCall {
  id?: number //Generate by supabase
  owner_id?: User['id']
  name: string
  total_participant?: number
  shareable_code: string
}

export interface Activity {
  id?: number //Generate by supabase
  user_id?: User['id']
  title: string
  created_at?: string
}
