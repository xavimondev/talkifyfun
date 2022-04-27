import { Avatar, Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { Participant } from 'twilio-video'

import { PeopleIc } from 'components/Icons'

type PropsUserConnected = {
  name: string
  avatarUrl: string
}

const UserConnected = ({ name, avatarUrl }: PropsUserConnected): JSX.Element => {
  return (
    <Flex alignItems='center'>
      <Avatar size='sm' mr='5' name={name} src={avatarUrl} />
      <Text fontSize='md' color='white' fontWeight='semibold'>
        {name}
      </Text>
    </Flex>
  )
}

type PropsPeopleConnected = {
  participants: Participant[]
}

const PeopleConnected = ({ participants }: PropsPeopleConnected) => {
  const bg = useColorModeValue('blue.400', '#181b29')
  return (
    <Box w='full' bg={bg} rounded='lg' p={{ base: 4, lg: 6, xl: 6 }}>
      <Flex direction='row' alignItems='center' mb={6}>
        <PeopleIc />
        <Heading fontSize='xl' ml={4}>
          Users: {participants.length > 0 ? participants.length : 0}
        </Heading>
      </Flex>
      <Flex direction='column' w='100%' gap={4}>
        {participants.length === 0
          ? 'No one is connected 😞'
          : participants.map((participant: Participant) => (
              <UserConnected
                key={participant.sid}
                name={participant.identity}
                avatarUrl={participant.identity}
              />
            ))}
      </Flex>
    </Box>
  )
}

export default PeopleConnected
