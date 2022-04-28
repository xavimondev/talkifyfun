import { Box, Flex, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

import { showNotification } from 'utils/notify'
import { copyTextToClipboard } from 'utils/copyClipboard'
import { RoomCall } from 'types/room'
import { useRoomContext } from 'context/RoomContext'
import { ThreadIc } from 'components/Icons'
import AddRoom from 'components/Forms/AddRoom'

type PropsRoom = {
  room: RoomCall
  handleRoom: (room: RoomCall) => void
}

const Room = ({ room, handleRoom }: PropsRoom): JSX.Element => {
  const { id, name, amountParticipants } = room

  return (
    <Flex my={{ sm: '1rem', xl: '10px' }} alignItems='center' justifyContent='space-between'>
      <Flex direction='column'>
        <Text fontSize='md' color='white' fontWeight='bold' onClick={() => handleRoom(room)}>
          {name}
        </Text>
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

const CurrentRooms = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  const { listRooms, selectRoom } = useRoomContext()

  const handleRoom = async (room: RoomCall) => {
    // Set status to define room selected
    selectRoom(room)
    // Copy to clipboard the shareableCode and then show notification
    await copyTextToClipboard(room.shareableCode)
    showNotification('shareable code copied to clipboard', 'success')
  }

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
            <Room key={room.id} room={room} handleRoom={handleRoom} />
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

export default CurrentRooms
