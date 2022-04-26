import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import Video, { Participant } from 'twilio-video'
import { User } from '@supabase/supabase-js'

import { supabase } from 'services/config'
import { getToken } from 'utils/getToken'
import Member from 'components/Member'

type Props = {
  userId: User['id']
  roomId: string
}

// Set video call capacity: https://www.twilio.com/console/video/configure
// DEFAULT TWILIO CAPACITY = 50
// CURRENT iwannaknowyu MAX_CAPACITY = 15

const RoomDetails = ({ userId, roomId }: Props) => {
  const [room, setRoom] = useState<Video.Room>()
  const [participants, setParticipants] = useState<Participant[]>([])

  const remoteParticipants = participants.map((participant: Participant) => (
    <p key={participant.sid}>{participant.identity}</p>
  ))

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
        name: 'hello'
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
  return (
    <div className='room'>
      <h2>Room: {room?.name}</h2>
      <div className='local-participant'>
        {room ? <p key={room.localParticipant.sid}>{room.localParticipant.identity}</p> : ''}
      </div>
      <h3>Remote Participants</h3>
      <div className='remote-participants'>
        {room && (
          <>
            <Member key={room.localParticipant.sid} member={room.localParticipant} />
            {remoteParticipants}
          </>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { redirect: { destination: '/auth/login', permanent: false } }
  }

  return { props: { userId: user.id, roomId: query.id } }
}

export default RoomDetails
