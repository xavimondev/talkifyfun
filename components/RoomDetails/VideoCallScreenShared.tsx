import { useRef, useEffect } from 'react'
import { Participant } from 'twilio-video'
import { Flex, Heading } from '@chakra-ui/react'

import usePublication from 'hooks/usePublication'
import useTrackPublished from 'hooks/useTrackPublished'

type Props = {
  member: Participant
}

const VideoCallScreenShared = ({ member }: Props) => {
  const full_name = member.identity?.split('|')[1]
  const { publications } = usePublication(member)
  const screenTrack: any = useTrackPublished(publications[2])
  const screenRef = useRef<HTMLVideoElement>(null)

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
