import React from 'react'
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { Participant } from 'twilio-video'

type Props = {
  children: React.ReactNode
  member: Participant | undefined
}

const VideoCall = ({ member, children }: Props) => {
  const bg = useColorModeValue('blue.400', '#181b29')

  return (
    <Flex w='auto' bg={bg} rounded='lg' p={{ base: 4, lg: 6, xl: 6 }} gap={8} direction='column'>
      <Heading fontSize={{ base: 'sm', md: 'sm', lg: 'md', xl: '2xl' }}>
        Welcome 😊 {member?.identity}
      </Heading>
      {children}
    </Flex>
  )
}

export default VideoCall
