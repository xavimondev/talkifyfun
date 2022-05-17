import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Video, { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video'
import { useDisclosure } from '@chakra-ui/react'

import { IS_MOBILE } from 'config/constants'
import { getUserProfile } from 'utils/getUserProfile'
import { getToken } from 'utils/getToken'
import { supabase } from 'services/config'
import useParticipant from 'hooks/useParticipants'
import useRefresh from 'hooks/useRefresh'
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
import VideoCallScreenShared from 'components/RoomDetails/VideoCallScreenShared'
import RoomFallback from 'components/RoomDetails/RoomFallback'
import NotPermission from 'components/Errors/NotPermission'

type Props = {
  profile: any
  roomId: string
}
// Set video call capacity: https://www.twilio.com/console/video/configure

const RoomDetails = ({ profile, roomId }: Props) => {
  const { room, setRoom, screenTrack, clearRoom } = useVideoContext()
  const { participants } = useParticipant()
  const { roomSelected } = useRoomContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMediaAllowed, setIsMediaAllowed] = useState<boolean>(true)
  //Information of current user logged in
  const { id, full_name } = profile

  // This userId must be less than 128 characters cause by twilio policies
  // Check: https://github.com/twilio/twilio-video.js/issues/221
  const userId = id + '|' + full_name

  useRefresh()

  useEffect(() => {
    if (roomSelected) {
      // Getting token for first time and then use it to connect to room
      getToken(roomId, userId).then((token) => {
        Video.connect(token, {
          name: roomId
        })
          .then((room) => {
            setRoom(room)
          })
          .catch(() => {
            setIsMediaAllowed(false)
          })
      })

      window.addEventListener('beforeunload', clearRoom)
      // Add a listener when mobile user close their browser
      if (IS_MOBILE) {
        window.addEventListener('pagehide', clearRoom)
      }

      return () => {
        window.removeEventListener('beforeunload', clearRoom)
        if (IS_MOBILE) {
          window.removeEventListener('pagehide', clearRoom)
        }
      }
    }
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  if (!isMediaAllowed) return <NotPermission />
  if (!roomSelected) return <NotRoomFound roomId={roomId} />
  if (!room) return <RoomFallback roomName={roomSelected!.name} />

  return (
    <>
      <LayoutRoomDetails>
        {screenTrack && (
          <VideoCallScreenShared screenTrack={screenTrack as LocalVideoTrack | RemoteVideoTrack} />
        )}
        {/* Render all the participants of the meeting  */}
        <VideoCallParticipants>
          <Member member={room.localParticipant} />
          <ListRemoteMembers participants={participants} />
        </VideoCallParticipants>
        <VideoCallActions onOpen={onOpen} />
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
