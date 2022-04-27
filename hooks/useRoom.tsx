import { useEffect, useState } from 'react'
import Video, { Participant } from 'twilio-video'
import { User } from '@supabase/supabase-js'

import { getToken } from 'utils/getToken'

const useRoom = (roomId: string, userId: User['id']) => {
  const [room, setRoom] = useState<Video.Room>()
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    const participantConnected = (participant: Participant) => {
      setParticipants((prevParticipants: Participant[]) => [...prevParticipants, participant])
    }
    const participantDisconnected = (participant: Participant) => {
      setParticipants((prevParticipants: Participant[]) =>
        prevParticipants.filter((p: Participant) => p !== participant)
      )
    }

    getToken(roomId, userId).then((token) => {
      Video.connect(token, {
        name: roomId
      }).then((room) => {
        setRoom(room)
        room.on('participantConnected', participantConnected)
        room.on('participantDisconnected', participantDisconnected)
        room.participants.forEach(participantConnected)
      })
    })

    return () => {
      setRoom((currentRoom: any) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach((trackPublication: any) => {
            trackPublication.track.stop()
          })
          currentRoom.disconnect()
          return null
        } else {
          return currentRoom
        }
      })
    }
  }, [roomId, userId])

  return {
    room,
    participants
  }
}

export default useRoom
