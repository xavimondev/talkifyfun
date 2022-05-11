import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

import Header from 'components/Header'
import { LoadingAnimateIc } from 'components/Icons'

type Props = {
  roomName: string
}

const RoomFallback = ({ roomName }: Props) => {
  return (
    <>
      <Header
        title={`Setting up ${roomName} room`}
        content={`Please wait a few seconds while we connect you to ${roomName}`}
      />
      <Flex minH='100vh' align='center' justify='center' direction='column' gap={4}>
        <Text
          fontSize={{
            base: 'xl',
            md: '4xl'
          }}
          fontWeight='bold'
        >
          Connecting to the room
        </Text>
        <Text
          color='red.400'
          fontSize={{
            base: 'md',
            md: '2xl'
          }}
          isTruncated
        >
          {roomName}
        </Text>
        <LoadingAnimateIc width='100px' height='100px' />
      </Flex>
    </>
  )
}

export default RoomFallback
