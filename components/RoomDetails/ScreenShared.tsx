import { useRef, useEffect } from 'react'
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react'

import { useVideoContext } from 'context/VideoContext'

const ScreenShared = () => {
  const { screenTrack } = useVideoContext()
  const screenRef = useRef<HTMLVideoElement>(null)
  const bg = useColorModeValue('blue.400', '#181b29')

  useEffect(() => {
    // attach the screen track to the video element
    if (screenTrack) {
      screenTrack.attach(screenRef.current as HTMLMediaElement)
      return () => {
        screenTrack.detach()
      }
    }
  }, [screenTrack])

  return (
    <>
      <Flex
        bg={bg}
        rounded='lg'
        p={{ base: 4, lg: 6, xl: 6 }}
        gap={8}
        direction='column'
        overflow='scroll'
      >
        <Heading fontSize={{ base: 'sm', md: 'sm', lg: 'xl', xl: '2xl' }}>Screen Sharing</Heading>
        <Box>
          <video ref={screenRef} autoPlay style={{ maxHeight: '80%', maxWidth: '80%' }} />
        </Box>
      </Flex>
    </>
  )
}

export default ScreenShared
