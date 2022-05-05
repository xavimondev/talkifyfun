import { useRef, useEffect } from 'react'
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react'

type Props = {
  screenTrack: any
}

const ScreenShared = ({ screenTrack }: Props) => {
  console.log('Sharing with', screenTrack)
  const screenRef = useRef<HTMLVideoElement>(null)
  // const bg = useColorModeValue('blue.400', '#181b29')

  useEffect(() => {
    // attach the screen track to the video element
    if (screenTrack) {
      screenTrack.attach(screenRef.current)
      return () => {
        screenTrack.detach()
      }
    }
  }, [screenTrack])

  return (
    <>
      <Box>
        <video ref={screenRef} autoPlay style={{ maxHeight: '80%', maxWidth: '80%' }} />
      </Box>
    </>
  )
}

export default ScreenShared
