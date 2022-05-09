import { Box } from '@chakra-ui/react'

import useTrack from 'hooks/useTrack'

type Props = {
  videoTrack: any
  audioTrack: any
}

const MemberVideo = ({ videoTrack, audioTrack }: Props) => {
  const { videoRef, audioRef } = useTrack(videoTrack, audioTrack)

  return (
    <>
      <Box width='auto' height='full'>
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
