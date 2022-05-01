import { Box } from '@chakra-ui/react'
import { Participant } from 'twilio-video'

import useTrack from 'hooks/useTrack'

type Props = {
  member: Participant
}

const Member = ({ member }: Props) => {
  const { audioRef, videoRef } = useTrack(member)

  return (
    <>
      {/* paddingTop='56.25%' position='relative' */}
      <Box borderRadius={10} width='100%' height='100%'>
        <video
          ref={videoRef}
          autoPlay={true}
          style={{
            width: '100%',
            // height: '100%',
            objectFit: 'cover'
            // position: 'absolute',
            // top: 0,
            // left: 0,
          }}
        />
        <audio ref={audioRef} autoPlay={true} muted={false} />
      </Box>
    </>
  )
}

export default Member
