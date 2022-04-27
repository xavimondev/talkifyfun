import { Box, Button, Flex, Heading, Input, Link, Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

import { AddIc, ThreadIc } from 'components/Icons'
import { RoomCall } from 'types/room'
import AddRoom from 'components/Forms/AddRoom'

type PropsRoom = {
  room: RoomCall
}

const Room = ({ room }: PropsRoom): JSX.Element => {
  const { id, name, amountParticipants, shareableCode } = room
  return (
    <Flex my={{ sm: '1rem', xl: '10px' }} alignItems='center' justifyContent='space-between'>
      <Flex direction='column'>
        <NextLink href={`/room/${id}`} passHref>
          <Link
            _hover={{
              textDecoration: 'none'
            }}
          >
            <Text fontSize='md' color='white' fontWeight='bold'>
              {name}
            </Text>
          </Link>
        </NextLink>
        <Text fontSize='sm' color='#a1a2a9' fontFamily='body' fontWeight='semibold' me='16px'>
          Participants: {amountParticipants}
        </Text>
      </Flex>
      <NextLink href={`/room/${id}`} passHref>
        <Link
          borderRadius='md'
          padding={2}
          variant='solid'
          fontSize='sm'
          fontWeight='semibold'
          bg='red.600'
          _hover={{ bg: 'red.500' }}
        >
          JOIN
        </Link>
      </NextLink>
    </Flex>
  )
}

type PropsRooms = {
  listRooms: RoomCall[]
}
const CurrentRooms = ({ listRooms }: PropsRooms) => {
  const bg = useColorModeValue('blue.400', '#181b29')
  return (
    <Box w='full' bg={bg} rounded='lg' p={6}>
      <Flex direction='row' alignItems='center' mb={6}>
        <ThreadIc />
        <Heading fontSize='xl' ml={4}>
          Rooms available
        </Heading>
      </Flex>
      <Flex direction='column' w='100%' gap={6}>
        <AddRoom />
        <Flex direction='column' w='100%' gap={2}>
          {listRooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

export default CurrentRooms
