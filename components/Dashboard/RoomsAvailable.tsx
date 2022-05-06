import { Box, Flex, Heading, IconButton, Link, Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

import { showNotification } from 'utils/notify'
import { copyTextToClipboard } from 'utils/copyClipboard'
import { RoomCall } from 'types/room'
import { useRoomContext } from 'context/RoomContext'
import { CopyToClipboardIc, ThreadIc } from 'components/Icons'
import AddRoom from 'components/Forms/AddRoom'

type PropsRoom = {
  room: RoomCall
  handleRoom: (room: RoomCall) => void
  copyCode: (code: string) => void
}

const Room = ({ room, handleRoom, copyCode }: PropsRoom): JSX.Element => {
  const { id, name, total_participant, shareable_code } = room

  return (
    <Flex my={{ sm: '1rem', xl: '10px' }} alignItems='center' justifyContent='space-between'>
      <Flex direction='column'>
        <NextLink href={`/room/${id}`} passHref>
          <Link>
            <Text fontSize='md' color='white' fontWeight='bold' onClick={() => handleRoom(room)}>
              {name}
            </Text>
          </Link>
        </NextLink>
        <Text fontSize='sm' color='#a1a2a9' fontFamily='body' fontWeight='semibold' me='16px'>
          Participants: {total_participant}
        </Text>
      </Flex>
      <IconButton
        aria-label='Copy code'
        fontSize='sm'
        fontWeight='semibold'
        bg='red.600'
        _hover={{ bg: 'red.500' }}
        icon={<CopyToClipboardIc />}
        onClick={() => copyCode(shareable_code)}
      />
    </Flex>
  )
}

const RoomsAvailable = () => {
  const { listRooms, selectRoom, isLoading } = useRoomContext()
  const bg = useColorModeValue('blue.400', '#181b29')

  // Set status to define room selected
  const handleRoom = async (room: RoomCall) => {
    selectRoom(room)
  }

  // Copy to clipboard the shareableCode and then show notification
  const copyCode = async (code: string) => {
    await copyTextToClipboard(code)
    showNotification('shareable code copied to clipboard', 'success')
  }

  return (
    <Box w='full' h='full' bg={bg} rounded='lg' p={6}>
      <Flex direction='row' alignItems='center' mb={6}>
        <ThreadIc />
        <Heading fontSize='xl' ml={4}>
          Rooms available
        </Heading>
      </Flex>
      <Flex direction='column' gap={6}>
        <AddRoom />
        <Flex direction='column' gap={2}>
          {isLoading && <Text>Loading Data...</Text>}
          {listRooms.map((room) => (
            <Room key={room.id} room={room} handleRoom={handleRoom} copyCode={copyCode} />
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

export default RoomsAvailable
