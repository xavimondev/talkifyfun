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
import { getUserProfile } from 'utils/getUserProfile'

type Props = {
  profile: any
  roomId: string
}

// Set video call capacity: https://www.twilio.com/console/video/configure
// DEFAULT TWILIO CAPACITY = 50
// CURRENT iwannaknowyu MAX_CAPACITY = 15

const RoomDetails = ({ profile, roomId }: Props) => {
  const { room, setRoom } = useVideoContext()
  const { participants } = useParticipant()
  const { roomSelected } = useRoomContext()
  //Information of current user logged in
  const { id: userId, avatar_url, full_name, email } = profile
  useEffect(() => {
    // Getting token for first time and then use it to connect to room
    getToken(roomId, userId).then((token) => {
      Video.connect(token, {
        name: roomId
      }).then((room) => {
        setRoom(room)
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
        <VideoCall full_name={full_name}>
          {room ? (
            <Member member={room?.localParticipant} />
          ) : (
            <FallbackVideo avatar_url={avatar_url} full_name={full_name} />
          )}
        </VideoCall>
        <PeopleConnected participants={participants} />
      </LayoutRoomDetails>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  const profile = getUserProfile(user)
  if (!user) {
    return { redirect: { destination: '/auth/login', permanent: false } }
  }

  return { props: { profile: profile, roomId: query.id } }
}

export default RoomDetails
