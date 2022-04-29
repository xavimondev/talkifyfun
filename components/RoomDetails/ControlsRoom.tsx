import { ButtonGroup, Flex, IconButton, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import {
  BreakRoomIc,
  CameraDisableIc,
  CameraIc,
  LeaveRoomIc,
  MicrophoneIc,
  MicrophoneMutedIc,
  ScreenShareIc
} from 'components/Icons'
import { useVideoContext } from 'context/VideoContext'

const ControlsRoom = () => {
  const { toggleUserAudio, toggleUserVideo, isAudioEnabled, isVideoEnabled } = useVideoContext()
  const iconAudio = isAudioEnabled ? <MicrophoneIc /> : <MicrophoneMutedIc />
  const iconVideo = isVideoEnabled ? <CameraIc /> : <CameraDisableIc />
  return (
    <>
      <Flex
        position='absolute'
        bottom={24}
        borderRadius={20}
        p={3}
        bg='gray.700'
        gap={6}
        align='center'
        justify='center'
      >
        <Text color='red.500' fontWeight='bold' fontSize='md'>
          08:03
        </Text>
        <ButtonGroup orientation='horizontal' spacing={3}>
          <IconButton size='md' aria-label='audio' icon={iconAudio} onClick={toggleUserAudio} />
          <IconButton size='md' aria-label='video' icon={iconVideo} onClick={toggleUserVideo} />
          <NextLink href='/home' passHref>
            <Link>
              <IconButton
                size='md'
                bg='red.500'
                _hover={{
                  bg: 'red.500'
                }}
                aria-label='muted'
                icon={<LeaveRoomIc />}
              />
            </Link>
          </NextLink>
          <IconButton size='md' aria-label='screen share' icon={<ScreenShareIc />} />
          <IconButton size='md' aria-label='break rooms' icon={<BreakRoomIc />} />
        </ButtonGroup>
      </Flex>
    </>
  )
}

export default ControlsRoom
