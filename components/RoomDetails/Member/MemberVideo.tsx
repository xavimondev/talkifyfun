import { Box, Text } from '@chakra-ui/react'
import { Participant } from 'twilio-video'

import useTrack from 'hooks/useTrack'

type Props = {
  videoTrack: any
  audioTrack: any
  member: Participant
}

const MemberVideo = ({ videoTrack, audioTrack, member }: Props) => {
  const { videoRef, audioRef } = useTrack(videoTrack, audioTrack)
  const full_name = member.identity?.split('|')[1]

  return (
    <>
      <Box width='auto' height='full' position='relative'>
        <Text
          position='absolute'
          bottom={4}
          right={3}
          fontSize='sm'
          fontWeight='semibold'
          color='#fff'
          backgroundColor='rgba(0, 15, 47, 0.5)'
          borderRadius='md'
          py={1}
          px={3}
        >
          {full_name}
        </Text>
        <video
          ref={videoRef}
          autoPlay={true}
          style={{
            height: '100%',
            filter: 'none',
            objectFit: 'contain'
          }}
        />
        <audio ref={audioRef} autoPlay={true} muted={false} />
      </Box>
    </>
  )
}

export default MemberVideo
