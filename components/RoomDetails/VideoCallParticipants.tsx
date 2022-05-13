import React from 'react'
import { Grid, Flex, Heading, useColorModeValue } from '@chakra-ui/react'

import {
  COLUMNS_WITHOUT_SCREEN_SHARED,
  COLUMNS_WITH_SCREEN_SHARED,
  IS_MOBILE
} from 'config/constants'
import { useVideoContext } from 'context/VideoContext'

type Props = {
  children: React.ReactNode
}

const VideoCallParticipants = ({ children }: Props) => {
  const bg = useColorModeValue('blue.400', '#181b29')
  const { screenTrack } = useVideoContext()
  const gridTemplateColumns = screenTrack
    ? COLUMNS_WITH_SCREEN_SHARED
    : COLUMNS_WITHOUT_SCREEN_SHARED
  // TODO: Improve this weird logic ⬇
  const overflowDesktop = screenTrack ? 'unset' : 'scroll'
  const overflow = IS_MOBILE && screenTrack ? 'scroll' : overflowDesktop

  return (
    <>
      <Flex direction='column' bg={bg} rounded='lg' p={6} gap={8}>
        <Heading fontSize='lg' fontWeight='semibold'>
          Participants 🙍‍♂️
        </Heading>
        <Grid
          gridTemplateColumns={gridTemplateColumns}
          gap={3}
          overflow={overflow}
          alignItems='center'
          justifyItems='center'
          padding='2rem'
        >
          {children}
        </Grid>
      </Flex>
    </>
  )
}

export default VideoCallParticipants
