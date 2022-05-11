import { useRef, useEffect } from 'react'
import { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video'
import { Flex, Heading } from '@chakra-ui/react'

type Props = {
  screenTrack: LocalVideoTrack | RemoteVideoTrack
  full_name: string
}

const VideoCallScreenShared = ({ screenTrack, full_name }: Props) => {
  const screenRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // attach the screen track to the video element
    if (screenTrack) {
      screenTrack.attach(screenRef.current!)
      return () => {
        screenTrack.detach()
      }
    }
  }, [screenTrack])

  return (
    <>
      <Flex
        direction='column'
        bg='gray.900'
        rounded='lg'
        p={6}
        align='center'
        justify='center'
        gap={8}
        w='full'
        h='full'
      >
        <Heading fontSize='lg'>{full_name} is sharing screen</Heading>
        <video ref={screenRef} autoPlay style={{ maxHeight: '80%', maxWidth: '80%' }} />
      </Flex>
    </>
  )
}

export default VideoCallScreenShared
