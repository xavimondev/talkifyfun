import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { User } from '@supabase/supabase-js'
import Video, { Room } from 'twilio-video'

import { getToken } from 'utils/getToken'
import { supabase } from 'services/config'
import { useVideoContext } from 'context/VideoContext'
import { useRoomContext } from 'context/RoomContext'
import useParticipant from 'hooks/useParticipants'
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
  // const [participants, setParticipants] = useState<Participant[]>([])
  const { room, setRoom } = useVideoContext()
  const { participants } = useParticipant()
  const { roomSelected } = useRoomContext()

  useEffect(() => {
    // Getting token for first time and then use it to connect to room
    getToken(roomId, userId).then((token) => {
      Video.connect(token, {
        name: roomId
      }).then((room) => {
        setRoom(room)
        // leaveRoom()
      })
    })

    return () => {
      setRoom((prevRoom: Room | null) => {
        if (prevRoom) {
          prevRoom.localParticipant.tracks.forEach((trackPublication: any) => {
            trackPublication.track.stop()
          })
          prevRoom.disconnect()
        }
        return null
      })
    }
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  if (!roomSelected) return <NotRoomFound roomId={roomId} />

  return (
    <>
      <LayoutRoomDetails>
        <VideoCall member={room?.localParticipant}>
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
