import { Flex, Grid } from '@chakra-ui/react'
import React from 'react'

import Header from 'components/Header'
import HeaderRoom from 'components/RoomDetails/HeaderRoom'

type Props = {
  children: React.ReactNode
  roomName: string
}
const LayoutRoomDetails = ({ roomName, children }: Props) => {
  return (
    <>
      <Header title={`Room: ${roomName}`} content={`Welcome to the room 🙂: ${roomName}`} />
      <Flex className='room' direction='column' m={8} gap={6}>
        <HeaderRoom title={roomName} />
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
