import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { Participant } from 'twilio-video'

import { getFullNameFromMember } from 'utils/getUserProfile'

type PropsUserConnected = {
  fullName: string
  avatarUrl: string
}

const UserConnected = ({ fullName, avatarUrl }: PropsUserConnected): JSX.Element => {
  return (
    <Flex alignItems='center'>
      <Avatar size='sm' mr='5' name={fullName} src={avatarUrl} />
      <Text fontSize='md' color='white' fontWeight='semibold'>
        {fullName}
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
      <Flex direction='column' w='100%' gap={4}>
        {participants.length === 0
          ? 'No one is connected 😞'
          : participants.map((participant: Participant) => (
              <UserConnected
                key={participant.sid}
                fullName={getFullNameFromMember(participant)}
                avatarUrl={participant.identity}
              />
            ))}
      </Flex>
    </Box>
  )
}

export default PeopleConnected
