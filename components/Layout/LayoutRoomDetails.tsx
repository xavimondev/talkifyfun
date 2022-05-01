import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

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
      <Flex className='room' direction='column' m={8} gap={6} height='100vh'>
        <HeaderRoom />
        <Box height='100%'>{children}</Box>
      </Flex>
    </>
  )
}

export default LayoutRoomDetails
