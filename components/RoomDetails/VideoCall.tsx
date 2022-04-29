import React from 'react'
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  full_name: string
}

const VideoCall = ({ full_name, children }: Props) => {
  const bg = useColorModeValue('blue.400', '#181b29')

  return (
    <Flex w='auto' bg={bg} rounded='lg' p={{ base: 4, lg: 6, xl: 6 }} gap={8} direction='column'>
      <Heading fontSize={{ base: 'sm', md: 'sm', lg: 'xl', xl: '2xl' }}>
        Welcome 😊 {full_name}
      </Heading>
      {children}
    </Flex>
  )
}

export default VideoCall
