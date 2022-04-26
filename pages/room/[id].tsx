import { GetServerSideProps } from 'next'
import { Participant } from 'twilio-video'
import { User } from '@supabase/supabase-js'

import { supabase } from 'services/config'
import Member from 'components/Member'
import useRoom from 'hooks/useRoom'

type Props = {
  userId: User['id']
  roomId: string
}

// Set video call capacity: https://www.twilio.com/console/video/configure
// DEFAULT TWILIO CAPACITY = 50
// CURRENT iwannaknowyu MAX_CAPACITY = 15

const RoomDetails = ({ userId, roomId }: Props) => {
  const { room, participants } = useRoom(roomId, userId)

  const remoteParticipants = participants.map((participant: Participant) => (
    <p key={participant.sid}>{participant.identity}</p>
  ))

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
