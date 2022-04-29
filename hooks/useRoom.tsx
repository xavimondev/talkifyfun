import { useEffect, useState } from 'react'
import Video, { Participant } from 'twilio-video'
import { User } from '@supabase/supabase-js'

import { getToken } from 'utils/getToken'

const useRoom = (roomId: string, userId: User['id']) => {
  const [room, setRoom] = useState<Video.Room | null>(null)

  useEffect(() => {
    return () => {
      console.log('Executing first useEffect()')
      setRoom((prevRoom: any) => {
        if (prevRoom) {
          console.log('Bye', prevRoom)
          prevRoom.localParticipant.tracks.forEach((trackPublication: any) => {
            console.log('Disconnecting track', trackPublication)
            trackPublication.track.stop()
          })
          prevRoom.disconnect()
        }
        return null
      })
    }
  }, [roomId, userId])
  return {
    room
  }
}

export default useRoom
