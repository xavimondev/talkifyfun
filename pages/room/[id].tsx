import { GetServerSideProps } from 'next'
import { User } from '@supabase/supabase-js'

import useRoom from 'hooks/useRoom'
import { useRoomContext } from 'context/RoomContext'
import { supabase } from 'services/config'
import PeopleConnected from 'components/RoomDetails/PeopleConnected'
import VideoCall from 'components/RoomDetails/VideoCall'
import FallbackVideo from 'components/RoomDetails/FallbackVideo'
import Member from 'components/RoomDetails/Member'
import LayoutRoomDetails from 'components/Layout/LayoutRoomDetails'
import NotRoomFound from 'components/Errors/NotRoomFound'

type Props = {
  userId: User['id']
  roomId: string
}

// Set video call capacity: https://www.twilio.com/console/video/configure
// DEFAULT TWILIO CAPACITY = 50
// CURRENT iwannaknowyu MAX_CAPACITY = 15

const RoomDetails = ({ userId, roomId }: Props) => {
  const { room, participants } = useRoom(userId, roomId)

  const { roomSelected } = useRoomContext()

  // console.log(roomSelected)
  if (!roomSelected) return <NotRoomFound roomId={roomId} />

  return (
    <>
      <LayoutRoomDetails>
        <VideoCall member={room?.localParticipant}>
          {/* <FallbackVideo /> */}
          {room ? <Member member={room?.localParticipant} /> : <FallbackVideo />}
        </VideoCall>
        <PeopleConnected participants={participants} />
      </LayoutRoomDetails>
    </>
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
