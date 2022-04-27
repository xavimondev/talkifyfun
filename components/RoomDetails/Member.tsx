import { Box, Flex } from '@chakra-ui/react'
import { Participant } from 'twilio-video'

import useTrack from 'hooks/useTrack'

import ControlsRoom from './ControlsRoom'

type Props = {
  member: Participant
}

const Member = ({ member }: Props) => {
  // console.log(member)
  const { audioRef, videoRef } = useTrack(member)
  return (
    <>
      <Flex
        // position='relative'
        direction='column'
        width={{
          base: '100%',
          lg: '65%',
          xl: '75%',
          '2xl': '75%'
        }}
        height={{
          base: '50%', // 0-48em
          lg: '100%',
          xl: '100%',
          '2xl': '75%'
        }}
        gap={6}
      >
        <Box borderRadius={10} overflow='hidden' width='auto' height='auto'>
          <video
            ref={videoRef}
            autoPlay={true}
            style={{
              width: '100%'
            }}
          />
          <audio ref={audioRef} autoPlay={true} muted={false} />
        </Box>
        <ControlsRoom />
      </Flex>
    </>
  )
}

export default Member
