import { User } from '@supabase/supabase-js'

export interface RoomCall {
  id?: number //Generate by supabase
  owner_id?: User['id']
  name: string
  total_participant?: number
  shareable_code: string
}
