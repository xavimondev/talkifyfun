import React from 'react'
import { Flex, Grid } from '@chakra-ui/react'

import { useRoomContext } from 'context/RoomContext'
import Header from 'components/Header'
import HeaderRoom from 'components/RoomDetails/HeaderRoom'

type Props = {
  children: React.ReactNode
}

const LayoutRoomDetails = ({ children }: Props) => {
  const { roomSelected } = useRoomContext()
  return (
    <>
      <Header
        title={`Room: ${roomSelected?.name}`}
        content={`Welcome to the room 🙂: ${roomSelected?.name}`}
      />
      <Flex className='room' direction='column' m={8} gap={6}>
        <HeaderRoom />
        <Grid
          gridTemplateColumns={{ base: '1fr', md: '2fr 1fr', lg: '2fr 1fr', xl: '3fr 1fr' }}
          gridTemplateRows={{ base: '500px', lg: '550px', xl: '650px' }}
          gap={6}
        >
          {children}
        </Grid>
      </Flex>
    </>
  )
}

export default LayoutRoomDetails
