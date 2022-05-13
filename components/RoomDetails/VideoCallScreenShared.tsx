import { useRef, useEffect } from 'react'
import { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video'
import { Flex, Heading } from '@chakra-ui/react'

type Props = {
  screenTrack: LocalVideoTrack | RemoteVideoTrack
}

const VideoCallScreenShared = ({ screenTrack }: Props) => {
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
        justify='center'
        align='center'
        p={4}
        gap={8}
        w='full'
        h='full'
      >
        <Heading fontSize='lg' fontWeight='semibold'>
          Screen Shared 🖥
        </Heading>
        <video ref={screenRef} autoPlay style={{ maxHeight: '85%', maxWidth: '85%' }} />
      </Flex>
    </>
  )
}

export default VideoCallScreenShared
