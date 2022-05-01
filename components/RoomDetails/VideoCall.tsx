import React from 'react'
import { Flex, Grid, Heading, useColorModeValue } from '@chakra-ui/react'

import useParticipant from 'hooks/useParticipants'
import { getDimensionsByParticipants } from 'utils/getDimensionsByParticipants'

type Props = {
  children: React.ReactNode
  full_name: string
}

const VideoCall = ({ full_name, children }: Props) => {
  const bg = useColorModeValue('blue.400', '#181b29')
  const { participants } = useParticipant()
  // Because, the first time we don't have remote participants, so, we need to add one(myself)
  const style = getDimensionsByParticipants(participants.length + 1)
  return (
    <Flex
      // w='100%'
      // height='100%'
      bg={bg}
      rounded='lg'
      p={{ base: 4, lg: 6, xl: 6 }}
      gap={8}
      direction='column'
      overflow='scroll'
    >
      <Heading fontSize={{ base: 'sm', md: 'sm', lg: 'xl', xl: '2xl' }}>
        Welcome 😊 {full_name}
      </Heading>
      <Grid
        width='full'
        height='auto'
        gap={2}
        maxHeight='full'
        maxWidth='full'
        gridAutoRows={style ? style.gridAutoRows : 'auto'}
        gridTemplateColumns={style ? style.gridTemplateColumns : 'auto'}
      >
        {children}
      </Grid>
    </Flex>
  )
}

export default VideoCall
