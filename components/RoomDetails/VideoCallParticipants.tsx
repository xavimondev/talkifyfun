import React from 'react'
import { Grid, useColorModeValue } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

const VideoCallParticipants = ({ children }: Props) => {
  const bg = useColorModeValue('blue.400', '#181b29')

  return (
    <Grid
      bg={bg}
      gridTemplateColumns={{
        base: 'repeat(auto-fit,minmax(200px,1fr))',
        md: 'repeat(auto-fit,minmax(250px,1fr))',
        lg: 'repeat(auto-fit,minmax(450px,1fr))',
        '2xl': 'repeat(auto-fit,minmax(500px,1fr))'
      }}
      gap={3}
      overflow='scroll'
      alignItems='center'
      justifyItems='center'
      padding='2rem'
    >
      {children}
    </Grid>
  )
}

export default VideoCallParticipants
