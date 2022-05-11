import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Video, { LocalVideoTrack, RemoteVideoTrack, Room } from 'twilio-video'
import { useDisclosure } from '@chakra-ui/react'

import { getUserProfile } from 'utils/getUserProfile'
import { getToken } from 'utils/getToken'
import { supabase } from 'services/config'
import useParticipant from 'hooks/useParticipants'
import { useVideoContext } from 'context/VideoContext'
import { useRoomContext } from 'context/RoomContext'
import PeopleConnected from 'components/RoomDetails/PeopleConnected'
import VideoCallParticipants from 'components/RoomDetails/VideoCallParticipants'
import Member from 'components/RoomDetails/Member/'
import LayoutRoomDetails from 'components/Layout/LayoutRoomDetails'
import NotRoomFound from 'components/Errors/NotRoomFound'
import VideoCallActions from 'components/RoomDetails/VideoCallActions'
import CustomModal from 'components/Modal'
import ListRemoteMembers from 'components/RoomDetails/ListRemoteMembers'
import MemberFallback from 'components/RoomDetails/Member/MemberFallback'
import VideoCallScreenShared from 'components/RoomDetails/VideoCallScreenShared'

type Props = {
  profile: any
  roomId: string
}
// Set video call capacity: https://www.twilio.com/console/video/configure

const RoomDetails = ({ profile, roomId }: Props) => {
  const { room, setRoom, screenTrack } = useVideoContext()
  const { participants } = useParticipant()
  const { roomSelected } = useRoomContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  //Information of current user logged in
  const { id, full_name } = profile

  // This userId must be less than 128 characters cause by twilio policies
  // Check: https://github.com/twilio/twilio-video.js/issues/221
  const userId = id + '|' + full_name

  useEffect(() => {
    if (roomSelected) {
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
    }
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  if (!roomSelected) return <NotRoomFound roomId={roomId} />
  return (
    <>
      <LayoutRoomDetails>
        {screenTrack && room && (
          <VideoCallScreenShared
            screenTrack={screenTrack as LocalVideoTrack | RemoteVideoTrack}
            full_name={full_name}
          />
        )}
        {/* Render all the participants of the meeting  */}
        <VideoCallParticipants>
          {room ? (
            <>
              <Member member={room?.localParticipant} />
              <ListRemoteMembers participants={participants} />
            </>
          ) : (
            <MemberFallback userIdentity={full_name} />
          )}
        </VideoCallParticipants>
        {room && <VideoCallActions onOpen={onOpen} />}
      </LayoutRoomDetails>
      <CustomModal title={`Participants: ${participants.length}`} isOpen={isOpen} onClose={onClose}>
        <PeopleConnected participants={participants} />
      </CustomModal>
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
