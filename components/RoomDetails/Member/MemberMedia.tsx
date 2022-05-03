import { Box } from '@chakra-ui/react'

import useTrack from 'hooks/useTrack'

type Props = {
  videoTrack: any
  audioTrack: any
}

const MemberMedia = ({ videoTrack, audioTrack }: Props) => {
  const { videoRef, audioRef } = useTrack(videoTrack, audioTrack)

  return (
    <>
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

export default MemberMedia
