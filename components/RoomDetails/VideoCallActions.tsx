import { ButtonGroup, Flex, IconButton } from '@chakra-ui/react'
import NextLink from 'next/link'

import { useVideoContext } from 'context/VideoContext'
import {
  CameraDisableIc,
  CameraIc,
  LeaveRoomIc,
  MicrophoneIc,
  MicrophoneMutedIc,
  PeopleIc,
  ScreenShareIc
} from 'components/Icons'

type Props = {
  onOpen: () => void
}

const VideoCallActions = ({ onOpen }: Props) => {
  const {
    toggleUserAudio,
    toggleUserVideo,
    isAudioEnabled,
    isVideoEnabled,
    leaveRoom,
    screenShare,
    isSharing
  } = useVideoContext()
  const iconAudio = isAudioEnabled ? <MicrophoneIc /> : <MicrophoneMutedIc />
  const iconVideo = isVideoEnabled ? <CameraIc /> : <CameraDisableIc />

  return (
    <Flex
      position='sticky'
      bottom={0}
      p={4}
      bg='gray.900'
      rounded='lg'
      align='center'
      justify='center'
    >
      <ButtonGroup orientation='horizontal' spacing={3}>
        <IconButton size='md' aria-label='audio' icon={iconAudio} onClick={toggleUserAudio} />
        <IconButton size='md' aria-label='video' icon={iconVideo} onClick={toggleUserVideo} />
        <NextLink href='/home' passHref>
          <IconButton
            size='md'
            bg='red.500'
            _hover={{
              bg: 'red.500'
            }}
            aria-label='muted'
            icon={<LeaveRoomIc />}
            onClick={leaveRoom}
          />
        </NextLink>
        <IconButton size='md' aria-label='participants' icon={<PeopleIc />} onClick={onOpen} />
        <IconButton
          size='md'
          aria-label='screen share'
          icon={<ScreenShareIc />}
          onClick={screenShare}
          disabled={isSharing}
        />
        {/* TODO: Launch with v2 */}
        {/* <IconButton size='md' aria-label='break rooms' icon={<BreakRoomIc />} /> */}
      </ButtonGroup>
    </Flex>
  )
}

export default VideoCallActions
