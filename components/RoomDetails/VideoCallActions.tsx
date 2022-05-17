import {
  Box,
  Grid,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { VIRTUAL_BACKGROUND_PATHS, IS_MOBILE } from 'config/constants'
import { useVideoContext } from 'context/VideoContext'
import useVideoProcessor from 'hooks/useVideoProcessor'
import {
  CameraDisableIc,
  CameraIc,
  LeaveRoomIc,
  LightningIc,
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
    screenTrack
  } = useVideoContext()

  const { changeUserBackground, hasProcessor, IS_CHROMIUM_SUPPORTED, modelConfig } =
    useVideoProcessor()
  const iconAudio = isAudioEnabled ? <MicrophoneIc /> : <MicrophoneMutedIc />
  const iconVideo = isVideoEnabled ? <CameraIc /> : <CameraDisableIc />

  return (
    <Grid
      p={4}
      bg='gray.900'
      rounded='lg'
      gridTemplateColumns={{
        base: 'repeat(3,65px)',
        md: 'repeat(6,40px)'
      }}
      gridTemplateRows={{
        base: 'repeat(2,40px)',
        md: '40px'
      }}
      gap={{
        base: 3,
        md: 2
      }}
      width='100%'
      placeContent='center'
    >
      {/* Audio option */}
      <Tooltip label='Toggle audio'>
        <IconButton size='md' aria-label='audio' icon={iconAudio} onClick={toggleUserAudio} />
      </Tooltip>
      {/* Video option */}
      <Tooltip label='Toggle video'>
        <IconButton
          size='md'
          aria-label='video'
          icon={iconVideo}
          onClick={toggleUserVideo}
          disabled={hasProcessor}
        />
      </Tooltip>

      {/* Leave the room */}
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
      {/* List of participants */}
      <Tooltip label='Participants'>
        <IconButton size='md' aria-label='participants' icon={<PeopleIc />} onClick={onOpen} />
      </Tooltip>
      {/* 
        Screen share is only available on desktop browsers according to the twilio's documentation 
        https://www.twilio.com/docs/video/screen-capture-chrome#screen-share-not-supported-on-mobile-web-browsers
      */}
      {!IS_MOBILE && (
        <Tooltip label='Screen share'>
          <IconButton
            size='md'
            aria-label='screen share'
            icon={<ScreenShareIc />}
            onClick={screenShare}
            disabled={Boolean(screenTrack)}
          />
        </Tooltip>
      )}
      {/* 
        Effects is only available in chromium desktop browsers
        Check: https://www.twilio.com/docs/video/javascript-v2-developing-safari-11
       */}
      {IS_CHROMIUM_SUPPORTED && (
        <Box display='flex' alignItems='baseline'>
          <Menu>
            <Tooltip label='Effects'>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<LightningIc />}
                disabled={!isVideoEnabled || !modelConfig.blur}
                width='full'
                mr='20px'
              />
            </Tooltip>
            <MenuList bg='gray.900'>
              <MenuItem
                minH='32px'
                onClick={() => changeUserBackground('disabled')}
                _hover={{ bg: 'gray.800' }}
              >
                Disabled
              </MenuItem>
              <MenuDivider />
              <MenuItem
                minH='32px'
                onClick={() => changeUserBackground('blur')}
                _hover={{ bg: 'gray.800' }}
              >
                Blur
              </MenuItem>
              <MenuDivider />
              {Object.keys(VIRTUAL_BACKGROUND_PATHS).map((key, index) => (
                <MenuItem
                  minH='32px'
                  key={index}
                  _hover={{ bg: 'gray.800' }}
                  onClick={() => changeUserBackground('virtual', key)}
                >
                  <Image
                    boxSize='2rem'
                    borderRadius='full'
                    src={VIRTUAL_BACKGROUND_PATHS[key]}
                    alt={key}
                    mr='12px'
                  />
                  <span>{key}</span>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* If there is no effect's model loaded yet, we will show Loading message */}
          {!modelConfig.blur && (
            <Box>
              <Text fontSize='md' fontWeight='semibold' color='red.500'>
                Loading...
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Grid>
  )
}

export default VideoCallActions
